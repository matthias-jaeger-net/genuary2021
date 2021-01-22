/**
 * Circles only
 *
 * Matthias Jäger
 * genuary2021 | Day 15
 */

let angle = 0;
let radius = 360;
let innerRadius = 100;
let epsilon = 0.01;
let rotation;
const frames = 600;

function setup() {
   createCanvas(900, 900);
   background(220);
   noFill();
   rotation = TAU * 18;
}

function draw() {
   if (angle <= rotation) {
      translate(400, 450);
      for (let layer = 1; layer > 0; layer -= 0.01) {
         let x = cos(angle * layer) * radius * layer;
         let y = sin(angle * layer) * radius * layer;
         const n = noise(x * epsilon, y * epsilon) * innerRadius;
         point(x + n, y);
      }
   } else {
      noLoop();
   }

   angle += rotation / frames;
}

function mousePressed() {
   save("gen16.jpg");
}
