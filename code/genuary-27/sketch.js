/**
 * Monochrome gradients without lines.
 *
 * Matthias Jäger
 * genuary2021 | Day 27
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
