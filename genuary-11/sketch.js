/**
 * Use something other than a computer as an autonomous process (or use a non-computer random source).
 *
 * Matthias Jäger
 * genuary2021 | Day 11
 */

let img;
let values = [];

function preload() {
   img = loadImage('IMG_6479.JPG');
}

function setup() {
   createCanvas(800, 800);
   img.resize(width * 2, height * 2);
   for (let x = 0; x < img.width; x++) {
      for (let y = 0; y < img.height; y++) {
         const c = img.get(x, y);
         const b = brightness(c);
         values.push(b / 255.0);
      }
   }

   background(255);
   translate(width / 2, height / 2);

   let i = 0;
   for (let angle = 0; angle < TAU * 200; angle += TAU / 100) {
      const r = values[i] * width;
      const x = cos(angle) * r;
      const y = sin(angle) * r;
      point(x, y);

      if (i < values.length) i++;
      else i = 0;
   }
   save('image-noise.jpg');
}
