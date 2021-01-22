/**
 * Do some code golf!
 *
 * Matthias Jäger
 * genuary2021 | Day 5
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
   save('gen5.jpg');
}
