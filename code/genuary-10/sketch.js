/**
 * TREE
 *
 * Matthias Jäger
 * genuary2021 | Day 10
 */

const branches = [];
const xScale = 7.15;
const yScale = 9.15;
const angleLeft = 20;
const angleRight = 15;
const d = 30;
const cp = [];

function noisy_line(x1, y1, x2, y2) {
   let V1 = createVector(x1, y1);
   let V2 = createVector(x2, y2);
   let dir = V2.copy().sub(V1.copy());
   let origin = V1.copy();
   let unit = dir.copy().normalize();
   let lineLength = dir.mag();
   let noise_x = 0;
   let noise_y = 0;
   let noise_mult_x = random(20, 35);
   let noise_mult_y = random(20, 35);
   let noise_inc_x = random(0.001, 0.01);
   let noise_inc_y = random(0.001, 0.01);

   beginShape();
   for (let i = 0; i < lineLength; i++) {
      origin.add(unit);
      let x = noise(noise_x) * noise_mult_x;
      let y = noise(noise_y) * noise_mult_y;
      noise_x += noise_inc_x;
      noise_y += noise_inc_y;
      lerp(y, 0, 255);
      lerp(x, 0, 255);
      vertex(origin.x + x, origin.y + y);
   }
   endShape();
}


function poly(x, y, r, n, s) {
   beginShape()
   for (let a = 0; a < TAU; a += TAU / s) {
      vertex(cos(a) * r + x + random(-n, n), sin(a) * r + y + random(-n, n));
   }
   endShape();
}


function branch(originX, originY, angle, n) {
   if (n <= 0) return;

   const x = originX + cos(radians(angle)) * n * xScale + random(-d, d);
   const y = originY + sin(radians(angle)) * n * yScale + random(-d, d);
   const ds = n * n * 0.313;

   // Stem
   fill(0);
   strokeWeight(random(1, 2));
   beginShape()
   vertex(originX, originY);
   vertex(x, y);
   vertex(x + ds * 0.9, y);
   vertex(originX + ds, originY);
   endShape();
   noFill()

   // Leaves
   if (n < 7) {
      const r = random(23 - n);
      for (let t = 0; t < 3; t++) {
         const rsides = floor(random(3, 9));
         fill(255);
         poly(x + random(r * n), y + random(r * n), r, n, rsides);
      }
   }

   // Recursion
   branch(x, y, angle - angleLeft, n - 1);
   branch(x, y, angle + angleRight, n - 1);
}


function setup() {
   createCanvas(800, 800);
   background(255);

   // Stripes
   for (let y = 0; y < height - 100; y += random(80)) {
      noisy_line(-100, y, 400, y);
      noisy_line(400, y, width, y);
   }
   for (let y = 680; y < height; y += 2) {
      noisy_line(-100, y, width, y);
   }

   // Two trees on top of each other
   branch(400, 750, -90, 11);
   branch(400, 750, -90, 8);

   // Passe partout
   noFill();
   stroke(255);
   strokeWeight(60);
   rect(0, 0, width, height);

   save("tree.jpg");
}
