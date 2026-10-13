// Día nevado soleado — adaptación a p5.js (400 x 400)
// Mismo dibujo del programa de Khan Academy, con los colores arreglados
// y con nieve que cae.

var copos = [];

function setup() {
  const c = createCanvas(400, 400);
  c.parent('lienzo');
  for (var i = 0; i < 80; i++) {
    copos.push({
      x: random(0, 400),
      y: random(0, 400),
      d: random(4, 9),      // diámetro del copo
      v: random(1, 3)       // velocidad de caída
    });
  }
}

function draw() {
  background(22, 160, 184);             // cielo
  noStroke();

  fill(225, 238, 250);
  rect(0, 300, 400, 110);               // el suelo, ahora cubierto de nieve

  fill(244, 247, 81);
  ellipse(80, 64, 100, 100);            // el sol

  // el muñeco de nieve (ahora blanco, con un borde suave)
  stroke(170, 195, 225);
  strokeWeight(2);
  fill(255, 255, 255);
  ellipse(200, 300, 150, 150);
  ellipse(200, 200, 100, 100);
  ellipse(200, 120, 75, 75);

  // la nieve que cae
  noStroke();
  fill(255, 255, 255);
  for (var i = 0; i < copos.length; i++) {
    var copo = copos[i];
    ellipse(copo.x, copo.y, copo.d, copo.d);
    copo.y = copo.y + copo.v;
    copo.x = copo.x + random(-0.5, 0.5);
    if (copo.y > 410) {                 // al llegar abajo, vuelve a caer desde arriba
      copo.y = -10;
      copo.x = random(0, 400);
    }
  }
}
