// Inspector del DOM: dibuja el árbol de etiquetas de cada página del sitio.
// 1) Carga el HTML de la página elegida (fetch; si no se puede, usa la copia de paginas-data.js).
// 2) Lo convierte en un árbol de objetos con DOMParser (el mismo DOM que arma el navegador).
// 3) Dibuja ese árbol con elementos HTML y CSS, y deja abrir y cerrar las ramas.
(function () {
  const PAGINAS = [
    { archivo: 'index.html', nombre: 'Inicio' },
    { archivo: 'canvas.html', nombre: 'El canvas' },
    { archivo: 'p5.html', nombre: 'p5.js' },
    { archivo: 'dom.html', nombre: 'El DOM' },
    { archivo: 'dom-inspector.html', nombre: 'Inspector DOM' },
    { archivo: 'proyectos/rana.html', nombre: 'Rana' },
    { archivo: 'proyectos/dientes.html', nombre: 'Dientes de conejo' },
    { archivo: 'proyectos/cena.html', nombre: '¿Qué hay de cena?' },
    { archivo: 'proyectos/nevado.html', nombre: 'Día nevado soleado' },
    { archivo: 'proyectos/muneco.html', nombre: 'Muñeco de nieve' }
  ];

  const NIVEL_INICIAL = 3;                              // niveles abiertos al cargar
  const CONTENEDORES_CANVAS = ['lienzo', 'demo-p5', 'dom-p5'];  // p5.js crea ahí su <canvas>

  const selector = document.getElementById('selector-paginas');
  const contenedorArbol = document.getElementById('arbol');
  const zonaScroll = document.getElementById('arbol-scroll');
  const detalle = document.getElementById('detalle');
  const estado = document.getElementById('inspector-estado');
  if (!selector || !contenedorArbol || !zonaScroll || !detalle) return;

  let cajaSeleccionada = null;
  let turno = 0;   // evita que una carga lenta pise a otra más reciente

  // ---------- 1. Obtener el HTML ----------
  async function obtenerHTML(archivo) {
    try {
      const respuesta = await fetch(archivo, { cache: 'no-store' });
      if (!respuesta.ok) throw new Error(respuesta.status);
      return { html: await respuesta.text(), origen: 'archivo publicado' };
    } catch (error) {
      if (window.PAGINAS_HTML && window.PAGINAS_HTML[archivo]) {
        return { html: window.PAGINAS_HTML[archivo], origen: 'copia incluida en el sitio' };
      }
      throw error;
    }
  }

  // ---------- 2. Convertir el DOM en un árbol de objetos ----------
  function textoPropio(el) {
    if (el.tagName === 'SCRIPT' || el.tagName === 'STYLE') return '';
    let texto = '';
    el.childNodes.forEach((n) => { if (n.nodeType === 3) texto += n.textContent; });
    texto = texto.replace(/\s+/g, ' ').trim();
    return texto.length > 120 ? texto.slice(0, 117) + '...' : texto;
  }

  function convertir(el, rutaPadre) {
    const tag = el.tagName.toLowerCase();
    const ruta = rutaPadre ? rutaPadre + ' > ' + tag : tag;
    const atributos = {};
    for (const a of el.attributes) atributos[a.name] = a.value;

    const nodo = {
      tag, atributos, ruta,
      id: el.id || '',
      clase: el.classList.length ? el.classList[0] : '',
      texto: textoPropio(el),
      cuenta: 1, grupo: [],
      virtual: false, hijos: []
    };
    nodo.grupo.push(nodo);

    // Hijos: los elementos hoja consecutivos con la misma etiqueta se agrupan (por ejemplo "link ×4")
    for (const hijoDOM of el.children) {
      const hijo = convertir(hijoDOM, ruta);
      const anterior = nodo.hijos[nodo.hijos.length - 1];
      if (anterior && !anterior.virtual && anterior.tag === hijo.tag &&
          anterior.hijos.length === 0 && hijo.hijos.length === 0) {
        anterior.cuenta += 1;
        anterior.grupo.push(hijo);
      } else {
        nodo.hijos.push(hijo);
      }
    }

    // Los dibujos de p5.js: el <canvas> no está en el HTML, lo crea createCanvas() al ejecutarse
    if (CONTENEDORES_CANVAS.includes(el.id) && el.children.length === 0) {
      nodo.hijos.push({
        tag: 'canvas', atributos: {}, ruta: ruta + ' > canvas', id: '', clase: '',
        texto: '', cuenta: 1, grupo: [], virtual: true, hijos: []
      });
      nodo.hijos[0].grupo.push(nodo.hijos[0]);
    }
    return nodo;
  }

  function estadisticas(nodo, prof) {
    let total = nodo.virtual ? 0 : nodo.cuenta;
    let maxima = prof;
    for (const h of nodo.hijos) {
      const e = estadisticas(h, prof + 1);
      total += e.total;
      maxima = Math.max(maxima, e.maxima);
    }
    return { total, maxima };
  }

  // ---------- 3. Dibujar el árbol ----------
  function fijarAbierto(li, abierto) {
    if (!li._ul) return;
    li._ul.classList.toggle('cerrado', !abierto);
    li._marca.textContent = abierto ? '▾' : '▸ ' + li._ul.children.length;
    li._caja.setAttribute('aria-expanded', abierto);
  }

  function crearNodo(nodo, prof) {
    const li = document.createElement('li');
    li.dataset.prof = prof;

    const caja = document.createElement('button');
    caja.type = 'button';
    caja.className = 'nodo' + (nodo.virtual ? ' virtual' : '');

    const etiqueta = document.createElement('span');
    etiqueta.className = 'etq';
    etiqueta.textContent = '<' + nodo.tag + '>' + (nodo.cuenta > 1 ? ' ×' + nodo.cuenta : '');
    caja.append(etiqueta);

    const sub = nodo.id ? '#' + nodo.id : (nodo.clase ? '.' + nodo.clase : (nodo.virtual ? 'creado por p5.js' : ''));
    if (sub) {
      const s = document.createElement('span');
      s.className = 'sub';
      s.textContent = sub;
      caja.append(s);
    }

    li.append(caja);
    li._caja = caja;

    if (nodo.hijos.length) {
      const marca = document.createElement('span');
      marca.className = 'marca';
      caja.append(marca);
      li._marca = marca;

      const ul = document.createElement('ul');
      nodo.hijos.forEach((h) => ul.append(crearNodo(h, prof + 1)));
      li.append(ul);
      li._ul = ul;
      fijarAbierto(li, prof < NIVEL_INICIAL);
    }

    caja.addEventListener('click', () => {
      seleccionar(nodo, caja);
      if (li._ul) fijarAbierto(li, li._ul.classList.contains('cerrado'));
    });
    return li;
  }

  // ---------- Panel de detalle ----------
  function fila(lista, titulo, valor) {
    const dt = document.createElement('dt');
    dt.textContent = titulo;
    const dd = document.createElement('dd');
    if (valor instanceof Node) dd.append(valor); else dd.textContent = valor;
    lista.append(dt, dd);
  }

  function seleccionar(nodo, caja) {
    if (cajaSeleccionada) cajaSeleccionada.classList.remove('seleccionado');
    cajaSeleccionada = caja;
    caja.classList.add('seleccionado');

    detalle.textContent = '';
    const titulo = document.createElement('h3');
    titulo.textContent = '<' + nodo.tag + '>';
    const lista = document.createElement('dl');

    fila(lista, 'Ruta en el árbol', nodo.ruta);
    fila(lista, 'Profundidad', String(nodo.ruta.split(' > ').length - 1));
    fila(lista, 'Hijos directos', nodo.hijos.length ? String(nodo.hijos.reduce((s, h) => s + h.cuenta, 0)) : 'ninguno');

    const nombres = Object.keys(nodo.atributos);
    if (nombres.length) {
      const ul = document.createElement('ul');
      nombres.forEach((n) => {
        const li = document.createElement('li');
        const v = nodo.atributos[n];
        li.textContent = n + '="' + (v.length > 70 ? v.slice(0, 67) + '...' : v) + '"';
        ul.append(li);
      });
      fila(lista, 'Atributos', ul);
    } else {
      fila(lista, 'Atributos', 'ninguno');
    }
    if (nodo.texto) fila(lista, 'Texto propio', '"' + nodo.texto + '"');
    if (nodo.cuenta > 1) fila(lista, 'Grupo', nodo.cuenta + ' elementos <' + nodo.tag + '> seguidos y sin hijos, mostrados como una sola caja. Se ven los atributos del primero.');
    if (nodo.virtual) fila(lista, 'Nota', 'Este elemento no está escrito en el HTML. p5.js lo crea con createCanvas() cuando se ejecuta el dibujo.');

    detalle.append(titulo, lista);
  }

  // ---------- Cargar una página ----------
  function centrar() {
    zonaScroll.scrollLeft = Math.max(0, (zonaScroll.scrollWidth - zonaScroll.clientWidth) / 2);
    zonaScroll.scrollTop = 0;
  }

  async function cargar(archivo) {
    const mio = ++turno;
    selector.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', b.dataset.archivo === archivo));
    estado.textContent = 'Cargando ' + archivo + '...';
    try {
      const { html, origen } = await obtenerHTML(archivo);
      if (mio !== turno) return;
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const raiz = convertir(doc.documentElement, '');
      const est = estadisticas(raiz, 0);

      contenedorArbol.textContent = '';
      cajaSeleccionada = null;
      const ul = document.createElement('ul');
      const liRaiz = crearNodo(raiz, 0);
      ul.append(liRaiz);
      contenedorArbol.append(ul);

      seleccionar(raiz, liRaiz._caja);
      estado.textContent = archivo + ' · ' + est.total + ' elementos · ' + est.maxima + ' niveles de profundidad · fuente: ' + origen;
      centrar();
    } catch (error) {
      if (mio !== turno) return;
      contenedorArbol.textContent = '';
      estado.textContent = 'No se pudo cargar ' + archivo + '.';
    }
  }

  // ---------- Controles ----------
  function aplicarNivel(nivel) {
    contenedorArbol.querySelectorAll('li').forEach((li) => {
      fijarAbierto(li, Number(li.dataset.prof) < nivel);
    });
    centrar();
  }
  document.getElementById('btn-expandir').addEventListener('click', () => aplicarNivel(99));
  document.getElementById('btn-inicial').addEventListener('click', () => aplicarNivel(NIVEL_INICIAL));
  document.getElementById('btn-contraer').addEventListener('click', () => aplicarNivel(1));

  PAGINAS.forEach((p) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'chip';
    b.dataset.archivo = p.archivo;
    b.setAttribute('aria-pressed', 'false');
    b.textContent = p.nombre;
    b.addEventListener('click', () => cargar(p.archivo));
    selector.append(b);
  });

  cargar(PAGINAS[0].archivo);
})();
