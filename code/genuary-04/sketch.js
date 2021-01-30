/**
 * Small areas of symmetry
 *
 * Matthias Jäger
 * genuary2021 | Day 4
 */

function reverseImg(buf) {
   const gfx = createGraphics(buf.width, buf.height);
   gfx.loadPixels();
   const buffer = buf.get();
   for (let i = 0; i < buf.width; i += 1) {
      for (let j = 0; j < buf.height; j += 1) {
         const x = buf.width - 1 - i;
         gfx.set(x, j, buffer.get(i, j));
      }
   }
   gfx.updatePixels();
   return gfx;
}

function sym(buf) {
   const gfx = createGraphics(buf.width, buf.height);
   const img1 = buf.get(0, 0, buf.width / 2, buf.height);
   // const img2 = buf.get(buf.width / 2, 0, buf.width, buf.height);
   gfx.image(img1, 0, 0);
   gfx.image(reverseImg(img1), buf.width / 2, 0);
   return gfx;
}

function setup() {
   createCanvas(800, 800);
   background(255);
   rectMode(CENTER);

   const rotations = 50;
   const areas = 30;
   const areaSize = 150;

   for (let layer = 0; layer < rotations; layer += 1) {
      noStroke();
      push();
      translate(width / 2, height / 2);
      rotate(random(TAU));
      fill(0, 30);
      rect(0, 0, 700, 10);
      fill(map(layer, 0, rotations, 0, 255));
      rect(4, 4, 700, 10);
      pop();
   }

   for (let layer = 0; layer < areas; layer += 1) {
      const w = areaSize;
      const x = floor(random(width - w));
      const y = floor(random(height - w));
      const img = this.get(x, y, w, w);
      image(sym(img), x, y);
   }

   save('gen4.jpg');
}
