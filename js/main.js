// ---------- Menú móvil ----------
const botonMenu = document.getElementById('boton-menu');
const menu = document.getElementById('menu');
if (botonMenu && menu) {
  botonMenu.addEventListener('click', () => {
    const abierto = menu.classList.toggle('abierto');
    botonMenu.setAttribute('aria-expanded', abierto);
  });
}

// ---------- Visor de código (páginas de proyecto) ----------
// Carga el archivo .js del dibujo y lo muestra en pantalla.
const botonCodigo = document.getElementById('ver-codigo');
const bloqueCodigo = document.getElementById('bloque-codigo');
if (botonCodigo && bloqueCodigo) {
  botonCodigo.addEventListener('click', async () => {
    if (!bloqueCodigo.hidden) {
      bloqueCodigo.hidden = true;
      botonCodigo.textContent = 'Ver código';
      return;
    }
    try {
      const respuesta = await fetch(botonCodigo.dataset.archivo);
      if (!respuesta.ok) throw new Error(respuesta.status);
      bloqueCodigo.querySelector('code').textContent = await respuesta.text();
    } catch (error) {
      bloqueCodigo.querySelector('code').textContent =
        'No se pudo cargar el código. Abre el sitio desde GitHub Pages o un servidor local.';
    }
    bloqueCodigo.hidden = false;
    botonCodigo.textContent = 'Ocultar código';
  });
}

// ---------- Portada: plano cartesiano interactivo con canvas 2D ----------
const plano = document.getElementById('plano');
if (plano) {
  const ctx = plano.getContext('2d');
  const W = plano.width, H = plano.height;
  let mx = W / 2, my = H / 2;

  plano.addEventListener('pointermove', (e) => {
    const r = plano.getBoundingClientRect();
    mx = (e.clientX - r.left) * (W / r.width);
    my = (e.clientY - r.top) * (H / r.height);
    dibujar();
  });

  function dibujar() {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, W, H);

    // Cuadrícula cada 40 px
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#dbe6ee';
    ctx.beginPath();
    for (let x = 0; x <= W; x += 40) { ctx.moveTo(x, 0); ctx.lineTo(x, H); }
    for (let y = 0; y <= H; y += 40) { ctx.moveTo(0, y); ctx.lineTo(W, y); }
    ctx.stroke();

    // Origen (0, 0) arriba a la izquierda
    ctx.fillStyle = '#17202e';
    ctx.font = 'bold 14px ui-monospace, Consolas, monospace';
    ctx.fillText('(0, 0)', 8, 20);

    // Líneas guía hacia el puntero
    ctx.strokeStyle = '#27c1e0';
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.moveTo(mx, 0); ctx.lineTo(mx, H);
    ctx.moveTo(0, my); ctx.lineTo(W, my);
    ctx.stroke();
    ctx.setLineDash([]);

    // Punto
    ctx.fillStyle = '#ffc933';
    ctx.strokeStyle = '#17202e';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(mx, my, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Etiqueta con las coordenadas
    const texto = 'x: ' + Math.round(mx) + '   y: ' + Math.round(my);
    ctx.fillStyle = '#17202e';
    const ancho = ctx.measureText(texto).width + 16;
    const bx = Math.min(mx + 16, W - ancho - 4);
    const by = Math.min(my + 16, H - 34);
    ctx.fillRect(bx, by, ancho, 26);
    ctx.fillStyle = '#ffffff';
    ctx.fillText(texto, bx + 8, by + 18);
  }
  dibujar();
}
