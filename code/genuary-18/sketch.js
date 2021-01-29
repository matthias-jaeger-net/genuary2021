/**
 * One process grows, another process prunes.
 *
 * Matthias Jäger
 * genuary2021 | Day 18
 */

const colors = [
   '#7368C4',
   '#C67478',
   '#F5BA3A',
   '#3345EE',
   '#AAAAAA'
];

let diameter = 700;
let shift = 12;
let alpha = 255;

function setup() {
   createCanvas(800, 800);
   background(0);
   strokeWeight(2);
   noFill();
}

function draw() {
   stroke(random(colors));
   x = 400 + random(-shift, shift);
   y = 400 + random(-shift, shift);
   circle(x, y, diameter);
   strokeWeight(alpha * 0.03)
   stroke(0, alpha)
   fill(0, alpha);
   circle(x + noise(x * 0.001, y * 0.001) * 10, y + noise(x * 0.001, y * 0.001) * 10, diameter);
   if (diameter > 15) {
      diameter = diameter - 5;
      shift -= 0.5;
      alpha -= 2;
   } else {
      noLoop();
      save("gen18.jpg");
   }
}
