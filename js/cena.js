// ¿Qué hay de cenar? — adaptación a p5.js del programa de Khan Academy (400 x 400)
// Es un dibujo estático: todo se dibuja una sola vez en setup().

function setup() {
  const c = createCanvas(400, 400);
  c.parent('lienzo');

  // mesa y plato
  background(186, 145, 20);             // mesa de madera
  fill(255, 255, 255);
  ellipse(200, 200, 350, 350);          // plato exterior
  ellipse(200, 200, 300, 300);          // plato interior

  // bistec
  fill(130, 60, 30);
  ellipse(190, 190, 120, 70);           // bistec

  // detalles del bistec
  stroke(80, 40, 20);
  line(160, 180, 190, 200);
  line(190, 170, 220, 190);
  line(170, 205, 210, 170);

  // puré de papa
  noStroke();
  fill(245, 235, 190);
  ellipse(110, 250, 70, 55);
  ellipse(125, 235, 60, 45);
  ellipse(105, 235, 50, 40);

  // verduras
  // brócoli
  fill(30, 130, 40);
  ellipse(270, 230, 35, 35);
  ellipse(290, 235, 35, 35);
  ellipse(280, 215, 35, 35);

  // zanahoria
  fill(255, 120, 20);
  ellipse(275, 265, 45, 18);
  ellipse(310, 255, 45, 18);

  // cubiertos
  // tenedor
  stroke(100, 100, 100);
  strokeWeight(4);
  line(350, 100, 350, 280);
  line(342, 100, 342, 130);
  line(350, 100, 350, 130);
  line(358, 100, 358, 130);
  line(340, 132, 359, 132);

  // cuchillo
  line(370, 100, 370, 280);
}
