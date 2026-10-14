// Demos de la página del DOM (JavaScript sin librerías)

// ---------- Demo 1: modificar un elemento ----------
(function () {
  const titulo = document.getElementById('dom-titulo');
  if (!titulo) return;

  const textos = ['Soy un título del DOM', '¡El texto cambió!', 'JavaScript me modificó'];
  let indice = 0;

  document.getElementById('dom-btn-texto').addEventListener('click', () => {
    indice = (indice + 1) % textos.length;
    titulo.textContent = textos[indice];              // cambia el texto
  });

  document.getElementById('dom-btn-color').addEventListener('click', () => {
    const matiz = Math.floor(Math.random() * 360);
    titulo.style.color = 'hsl(' + matiz + ', 70%, 40%)';  // cambia el estilo
  });

  document.getElementById('dom-btn-resaltar').addEventListener('click', () => {
    titulo.classList.toggle('resaltado');             // agrega o quita una clase
  });
})();

// ---------- Demo 2: crear y quitar elementos ----------
(function () {
  const lista = document.getElementById('dom-lista');
  const entrada = document.getElementById('dom-nueva');
  const boton = document.getElementById('dom-btn-agregar');
  if (!lista || !entrada || !boton) return;

  function agregar() {
    const texto = entrada.value.trim();
    if (texto === '') return;
    const item = document.createElement('li');        // 1. crear
    item.textContent = texto;                         // 2. darle contenido
    item.addEventListener('click', () => item.remove());  // 3. clic para quitarlo
    lista.append(item);                               // 4. agregarlo al árbol
    entrada.value = '';
    entrada.focus();
  }

  boton.addEventListener('click', agregar);
  entrada.addEventListener('keydown', (e) => { if (e.key === 'Enter') agregar(); });
})();

// ---------- Demo 3: reaccionar mientras se escribe ----------
(function () {
  const entrada = document.getElementById('dom-entrada');
  const eco = document.getElementById('dom-eco');
  if (!entrada || !eco) return;

  entrada.addEventListener('input', () => {
    const nombre = entrada.value.trim();
    eco.textContent = nombre === '' ? 'Hola, desconocido.' : 'Hola, ' + nombre + '.';
  });
})();
