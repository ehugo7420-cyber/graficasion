// Muñeco de nieve — adaptación a p5.js del programa de Khan Academy (400 x 400)
// Mismo cuerpo del programa original, ahora con sombrero, bufanda, ojos,
// nariz de zanahoria y boca. Es un dibujo estático: se dibuja una vez en setup().

function setup() {
  const c = createCanvas(400, 400);
  c.parent('lienzo');
  background(135, 185, 230);            // cielo de invierno

  // piso nevado
  noStroke();
  fill(255, 255, 255);
  rect(-2, 337, 401, 102);

  // brazos (ramas): se dibujan antes que el cuerpo para que salgan de atrás
  stroke(100, 65, 30);
  strokeWeight(5);
  line(160, 200, 94, 115);              // brazo izquierdo
  line(240, 200, 295, 105);             // brazo derecho
  line(94, 115, 80, 112);               // dedos de la rama izquierda
  line(94, 115, 98, 100);
  line(295, 105, 309, 101);             // dedos de la rama derecha
  line(295, 105, 296, 90);

  // cuerpo
  stroke(170, 195, 225);
  strokeWeight(2);
  fill(255, 255, 255);
  ellipse(200, 300, 150, 150);          // base
  ellipse(200, 200, 100, 100);          // panza
  ellipse(200, 120, 75, 75);            // cabeza

  noStroke();

  // botones
  fill(0, 0, 0);
  ellipse(200, 185, 10, 10);
  ellipse(200, 205, 10, 10);
  ellipse(200, 225, 10, 10);

  // bufanda
  fill(210, 40, 50);
  rect(168, 152, 64, 14);
  rect(212, 160, 16, 40);

  // ojos
  fill(0, 0, 0);
  ellipse(188, 110, 8, 8);
  ellipse(212, 110, 8, 8);

  // nariz de zanahoria
  fill(255, 130, 20);
  triangle(198, 118, 198, 128, 236, 124);

  // boca de carbón
  fill(0, 0, 0);
  ellipse(184, 134, 4, 4);
  ellipse(191, 139, 4, 4);
  ellipse(200, 141, 4, 4);
  ellipse(209, 139, 4, 4);
  ellipse(216, 134, 4, 4);

  // sombrero
  fill(25, 25, 25);
  rect(158, 78, 84, 8);                 // ala
  rect(172, 42, 56, 38);                // copa
  fill(210, 40, 50);
  rect(172, 66, 56, 8);                 // cinta
}
