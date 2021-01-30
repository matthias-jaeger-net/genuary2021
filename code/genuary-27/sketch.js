/*
Monochrome gradients without lines.
–
Wrote a function that returns an image with a  linear gradient from black to white. Then used it in a composition loop.
–
#genuary #genuary2021 is an artificially generated month of time where we build code that makes beautiful things. It happens during the month of January 2021. https://genuary2021.github.io/
-
https://editor.p5js.org/matthias-jaeger-net/sketches/eIE_wX3xH
–
#graphicdesign #generativeart #proceduralart #processing #javascript #fun #sketch #doodle #drawing #gradient #blackandwhite #grayscale #graz #abstract #geometric #
*/

function createGradient(w, h) {
  const gfx = createGraphics(w, h);
  gfx.loadPixels();
  for (let x = 0; x < gfx.width; x += 1) {
    for (let y = 0; y < gfx.height; y += 1) {
      gfx.set(x, y, color(map(y, 0, gfx.height, 0, 255)));
    }
  }
  gfx.updatePixels();
  return gfx;
}

function setup() {
  createCanvas(800, 800);
  image(createGradient(800, 800), 0, 0);
  translate(400, 400);
  const segments = 30 //floor(random(10, 40));
  const radius = 300;
  const e = 0.02;
  for (let inner = 0; inner < 1; inner += random(0.1)) {
    for (let angle = 0; angle < TAU; angle += TAU / segments) {
      const x = cos(angle) * radius * inner;
      const y = sin(angle) * radius + inner;
      const n = noise(x * e, y * e);
      push();
      translate(x, y);
      imageMode(CENTER);
      rotate(n * angle);
      image(createGradient(10 + floor(10 * n), 10 + width * n), 0, 0);
      pop();
    }
  }
  save('gen27.jpg');
}