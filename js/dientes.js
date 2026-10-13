// Dientes de conejo — adaptación a p5.js del programa de Khan Academy (400 x 400)
// Es un dibujo estático: todo se dibuja una sola vez en setup().

function setup() {
  const c = createCanvas(400, 400);
  c.parent('lienzo');

  background(255, 226, 232);          // fondo rosa claro

  stroke(120, 100, 105);              // borde gris suave
  strokeWeight(2);

  // orejas
  fill(248, 243, 238);
  ellipse(150, 70, 60, 120);          // left ear
  ellipse(240, 70, 60, 120);          // right ear

  // interior rosa de las orejas
  noStroke();
  fill(255, 182, 193);
  ellipse(150, 75, 30, 85);
  ellipse(240, 75, 30, 85);

  // cara
  stroke(120, 100, 105);
  fill(248, 243, 238);
  ellipse(200, 170, 150, 150);        // face

  // mejillas
  noStroke();
  fill(255, 170, 185);
  ellipse(148, 188, 28, 18);
  ellipse(252, 188, 28, 18);

  // ojos
  fill(0, 0, 0);
  var eyeSize = 35;
  ellipse(170, 150, eyeSize, eyeSize);  // left eye
  ellipse(230, 150, eyeSize, eyeSize);  // right eye

  // brillo de los ojos
  fill(255, 255, 255);
  ellipse(164, 144, 10, 10);
  ellipse(224, 144, 10, 10);

  // nariz
  fill(240, 110, 140);
  ellipse(200, 182, 18, 12);

  // bigotes
  stroke(110, 110, 110);
  strokeWeight(1);
  line(140, 190, 95, 180);
  line(140, 198, 95, 202);
  line(260, 190, 305, 180);
  line(260, 198, 305, 202);

  // boca
  stroke(0, 0, 0);
  strokeWeight(2);
  line(150, 200, 250, 200);           // mouth

  // dientes
  var toothLength = 20;
  fill(255, 255, 255);
  stroke(120, 100, 105);
  rect(185, 200, 15, toothLength);    // left tooth
  rect(200, 200, 15, toothLength);    // right tooth
}