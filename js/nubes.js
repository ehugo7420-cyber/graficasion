// Nubes que se separan — adaptación a p5.js del programa de Khan Academy (400 x 400)

// posiciones de las nubes
var leftX = 140;
var rightX = 260;
var sunRadius = 100;
var repetir = true;    // la casilla de la página activa o desactiva la repetición

function setup() {
  const c = createCanvas(400, 400);
  c.parent('lienzo');
  noStroke();
}

function draw() {
  // mover la nube izquierda
  leftX -= 1;

  // mover la nube derecha
  rightX += 1;

  // el sol aumenta 2 píxeles
  sunRadius += 2;

  // fondo azul del cielo
  background(184, 236, 255);

  // sol
  fill(255, 170, 0);
  ellipse(200, 100, sunRadius, sunRadius);

  // nubes
  fill(255, 255, 255);

  // nube izquierda
  ellipse(leftX, 150, 126, 97);
  ellipse(leftX + 62, 150, 70, 60);
  ellipse(leftX - 62, 50, 70, 60);

  // nube derecha
  ellipse(rightX, 100, 126, 97);
  ellipse(rightX + 62, 100, 70, 60);
  ellipse(rightX - 62, 100, 70, 60);

  // cuando las nubes ya salieron de la pantalla, la animación puede volver a empezar
  if (repetir && leftX < -110) reiniciar();
}

function reiniciar() {
  leftX = 140;
  rightX = 260;
  sunRadius = 100;
}
