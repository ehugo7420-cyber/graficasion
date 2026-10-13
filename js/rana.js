// Rana — adaptación a p5.js del programa de Khan Academy (400 x 400)
// Es un dibujo estático: todo se dibuja una sola vez en setup().

function setup() {
  const c = createCanvas(400, 400);
  c.parent('lienzo');
  background(255);                  // en Khan el fondo es blanco por defecto

  var x = 250;
  var y = 150;

  noStroke();                       // quita los bordes de las figuras
  fill(30, 204, 91);                // color verde de rana

  ellipse(x, y, 200, 100);          // cara de la rana
  ellipse(x - 50, y - 50, 40, 40);  // cuenca del ojo izquierdo
  ellipse(x + 50, y - 50, 40, 40);  // cuenca del ojo derecho

  fill(255, 255, 255);              // color blanco ojos
  ellipse(x - 50, y - 50, 30, 30);  // ojo izquierdo
  ellipse(x + 50, y - 50, 30, 30);  // ojo derecho

  fill(0, 0, 0);                    // color negro pupilas
  rect(x - 55, y - 55, 10, 10);     // pupila izquierda
  rect(x + 45, y - 55, 10, 10);     // pupila derecha

  fill(0, 0, 0);                    // color negro de la boca
  ellipse(x, y, 140, 50);           // boca de la rana
}
