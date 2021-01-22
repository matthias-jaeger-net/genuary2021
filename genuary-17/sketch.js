/**
 * Draw a line, pick a new color, move a bit.
 *
 * Matthias Jäger
 * genuary2021 | Day 17
 */

const colors = [
   '#7368C4',
   '#C67478',
   '#F5BA3A',
   '#AAAAFF',
   '#000000'
];

function setup() {
   createCanvas(800, 800);
   background(0);
   noFill();
   const small = 0.0015;
   const scaled = 6;
   const outScaled = 10.8531;
   const out = 200;
   let off = 300;
   for (let y = -out; y < height + out; y += scaled) {
      beginShape()
      for (let x = -out; x < width + out; x += scaled) {
         const n = noise(x * small, y * small);
         strokeWeight(n * scaled);
         stroke(random(colors));
         curveVertex(x, y + n * off);
         if (random(0, 1) > 0.949) {
            endShape();
            beginShape();
         }
      }
      // off += outScaled;
      endShape()
   }
}

function mousePressed() {
   save("gen17.jpg");
}
