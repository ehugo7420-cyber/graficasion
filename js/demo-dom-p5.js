// Demo: controles del DOM creados con p5.js (deslizador y botón)
var deslizador;
var colorCirculo;

function setup() {
  const c = createCanvas(400, 220);
  c.parent('dom-p5');

  const etiqueta = createSpan('Tamaño: ');          // texto como elemento del DOM
  etiqueta.parent('dom-p5-controles');

  deslizador = createSlider(10, 150, 60);           // mínimo, máximo, valor inicial
  deslizador.parent('dom-p5-controles');

  const boton = createButton('Cambiar color');
  boton.parent('dom-p5-controles');
  boton.mousePressed(function () {
    colorCirculo = color(random(255), random(255), random(255));
  });

  colorCirculo = color(39, 193, 224);
}

function draw() {
  background(255);
  fill(colorCirculo);
  stroke(23, 32, 46);
  strokeWeight(3);
  circle(width / 2, height / 2, deslizador.value() * 1.4);   // lee el valor del deslizador
}
