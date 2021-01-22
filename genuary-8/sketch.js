/**
 * Curve only
 *
 * Matthias Jäger
 * genuary2021 | Day 8
 */

function halm(x, y, t, h, q) {
   const r = random(-q, q);
   push();
   translate(x, y);
   beginShape();
   curveVertex(-t, 0);
   curveVertex(-t, 0);
   curveVertex(-t, -h / 2);
   curveVertex(r, -h);
   curveVertex(r, -h);
   curveVertex(t, -h / 2);
   curveVertex(t, 0);
   curveVertex(t, 0);
   endShape();
   pop();
}

function setup() {
   createCanvas(800, 800);
   background(255);
   let x = 0;
   let y = 0;

   for (let t = 0; t < 600; t++) {
      x = random(width);
      y = random(height + 100);
      const h = random(300);
      for (let b = 0; b < floor(random(10)); b++) {
         halm(x, y, random(3, 5), random(h), noise(b * 0.001) * h);
      }
   }

   save('gen8.jpg');
}
