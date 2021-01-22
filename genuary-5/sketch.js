
/*
Noisy Black Dots
–
Do some code golf! How little code can you write to make something interesting? Share the sketch and its code together if you can.
–
#genuary #genuary2021 is an artificially generated month of time where we build code that makes beautiful things. It happens during the month of January 2021. https://genuary2021.github.io/
-
https://editor.p5js.org/matthias-jaeger-net/sketches/HSajJc6Ic
–
#graphicdesign #generativeart #proceduralart #processing #javascript #fun #sketch #doodle #drawing #rendering #glitch #geometry #graz #abstract #dots #points #algorithm #stippling #clouds #sphere #blackdots

Matthias Jäger, 2021-05-01
*/

function setup() {
  createCanvas(800, 800);
  background(255);
  fill(0);
  let radius = 330;
  const rotation = TAU * 500;
  const segment = TAU / 300;
  for (let angle = 0; angle < rotation; angle += segment) {
    const center = createVector(400, 400);
    const position = center.copy();
    const x = cos(angle) * radius;
    const y = sin(angle) * radius;
    const polar = createVector(x, y);
    const rx = random(-10, 10);
    const ry = random(-10, 10);
    const offset = createVector(rx, ry);
    position.add(polar);
    position.add(offset);
    const thick = noise(x * 0.01, y * 0.01) * 4;
    circle(position.x, position.y, thick);
    radius = radius - 0.0025;
  }
  save('black-dots.jpg');
}