// Demo de la página p5.js: círculos de colores que siguen al mouse.
function setup() {
  const c = createCanvas(480, 260);
  c.parent('demo-p5');
  colorMode(HSB, 360, 100, 100, 100);   // matiz, saturación, brillo, opacidad
  noStroke();
  background(210, 10, 98);
}

function draw() {
  if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height) return;
  // Un fondo casi transparente deja una estela
  fill(210, 10, 98, 12);
  rect(0, 0, width, height);

  // El matiz cambia con el tiempo; el tamaño, con la velocidad del mouse
  const velocidad = dist(mouseX, mouseY, pmouseX, pmouseY);
  fill((frameCount * 3) % 360, 80, 95);
  circle(mouseX, mouseY, 14 + velocidad);
}
