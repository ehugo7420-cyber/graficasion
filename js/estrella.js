// Estrella fugaz — adaptación a p5.js del programa de Khan Academy (400 x 400)

var starX = 50;
var starY = 100;
var repetir = true;    // la casilla de la página activa o desactiva la repetición

function setup() {
  const c = createCanvas(400, 400);
  c.parent('lienzo');
}

function draw() {
  // fondo de noche
  background(10, 20, 50);

  // estrellas pequeñas
  fill(255, 255, 255);
  ellipse(80, 50, 3, 3);
  ellipse(300, 70, 3, 3);
  ellipse(150, 180, 3, 3);
  ellipse(350, 220, 3, 3);
  ellipse(250, 40, 3, 3);
  ellipse(48, 291, 3, 3);
  ellipse(177, 264, 3, 3);

  // estrella fugaz
  stroke(255, 255, 255);
  strokeWeight(3);
  line(starX - 10, starY - 10, starX - 50, starY - 50);

  // mover la estrella hacia la derecha y abajo
  starX += 3;
  starY += 2;

  // cuando la estrella sale de la pantalla, la animación puede volver a empezar
  if (repetir && starX > 460) reiniciar();
}

function reiniciar() {
  starX = 50;
  starY = 100;
}
