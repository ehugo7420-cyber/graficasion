// El sol que explota — adaptación a p5.js del programa de Khan Academy (400 x 400)
// Nota: el fondo se pinta una sola vez, por eso el sol deja un rastro cada vez más grande.

var sunSize = 30;      // tamaño inicial del sol
var repetir = true;    // la casilla de la página activa o desactiva la repetición

function setup() {
  const c = createCanvas(400, 400);
  c.parent('lienzo');
  noStroke();
  background(82, 222, 240);            // cielo azul
}

function draw() {
  // aumenta el tamaño del sol
  sunSize = sunSize + 1;
  // el sol
  fill(255, 204, 0);
  ellipse(200, 298, sunSize, sunSize);

  // la tierra
  fill(76, 168, 67);
  rect(0, 300, 400, 100);

  // cuando el sol ya llenó el cielo, la animación puede volver a empezar
  if (repetir && sunSize > 800) reiniciar();
}

function reiniciar() {
  sunSize = 30;
  background(82, 222, 240);
}
