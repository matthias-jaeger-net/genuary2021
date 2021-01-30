/**
 * Increase the randomness along the Y-axis.
 *
 * Matthias Jäger
 * genuary2021 | Day 19
 */

const colors = [
   '#7368C4',
   '#C67478',
   '#F5BA3A',
   '#3345EE',
   '#AAAAAA',
   '#000000'
];

function setup() {
   createCanvas(800, 800);
   background(0);
   const n = 0.006;
   for (let x = -100; x < width; x += 15) {
      let a = 0;
      stroke(random(colors))
      strokeWeight(random(3))
      for (let y = 0; y < height; y++) {
         const nv = noise(x * n, y * n) * 140 + random(a);
         const px = x + nv;
         point(px, y);
         if (y > height / 4) a += 0.1;
         if (y > height / 2) a += 0.5;
      }
   }
   save("gen19.jpg");
}
