// ---------- Demo 1: formas básicas ----------
(function () {
  const c = document.getElementById('demo-formas');
  if (!c) return;
  const ctx = c.getContext('2d');

  ctx.fillStyle = '#27c1e0';
  ctx.fillRect(20, 20, 150, 100);          // rectángulo relleno

  ctx.strokeStyle = '#17202e';
  ctx.lineWidth = 4;
  ctx.strokeRect(190, 20, 150, 100);       // solo el borde

  ctx.beginPath();                         // círculo con trazado
  ctx.arc(80, 200, 50, 0, Math.PI * 2);
  ctx.fillStyle = '#ffc933';
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();                         // triángulo con líneas
  ctx.moveTo(250, 250);
  ctx.lineTo(310, 150);
  ctx.lineTo(370, 250);
  ctx.closePath();
  ctx.fillStyle = '#3fa65a';
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#17202e';
  ctx.font = 'bold 18px sans-serif';
  ctx.fillText('fillText()', 20, 285);
})();

// ---------- Demo 2: animación con requestAnimationFrame ----------
(function () {
  const c = document.getElementById('demo-animacion');
  if (!c) return;
  const ctx = c.getContext('2d');
  let x = 60, y = 60, vx = 3, vy = 2.4;
  const r = 22;

  function cuadro() {
    ctx.clearRect(0, 0, c.width, c.height);   // borrar el cuadro anterior
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, c.width, c.height);

    x += vx; y += vy;
    if (x < r || x > c.width - r) vx = -vx;   // rebote en los bordes
    if (y < r || y > c.height - r) vy = -vy;

    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = '#27c1e0';
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#17202e';
    ctx.stroke();

    requestAnimationFrame(cuadro);            // pedir el siguiente cuadro
  }
  cuadro();
})();

// ---------- Demo 3: texto arcoíris (práctica de clase) ----------
(function () {
  const c = document.getElementById('demo-arcoiris');
  if (!c) return;
  const ctx = c.getContext('2d');
  ctx.font = 'bold 30px "Comic Sans MS", cursive, sans-serif';

  function dibujarArcoiris(texto, x, y) {
    const colores = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
    for (let i = 0; i < colores.length; i++) {
      ctx.fillStyle = colores[i];
      ctx.fillText(texto, x + i * 3, y + i * 3);
    }
  }
  dibujarArcoiris('¡Hello World!', 10, 50);
})();
