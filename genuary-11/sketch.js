/*
Use something other than a computer as an autonomous process (or use a non-computer random source).
–
I didn't have a quartz to swing nor a sensor. Also I didn't feel like throwing a dice so I used two abitrairy landscape images as a lookup table. I measured all brightness values and divided by 255. What I end up is a single array with floating point numbers between 0 and 1. These numbers I used as a scaler for the radius of point rotating on a circle.

–
#genuary #genuary2021 is an artificially generated month of time where we build code that makes beautiful things. It happens during the month of January 2021. https://genuary2021.github.io/
-
https://editor.p5js.org/matthias-jaeger-net/sketches/MO5Ov35lh
–
#graphicdesign #generativeart #proceduralart #processing #javascript #fun #sketch #doodle #drawing #rendering #glitch #geometry #graz #abstract #dots #points #texture #minimal #geometric #javascript
*/


let img; 
let values = [];

function preload() {
  img = loadImage('IMG_6479.JPG');
}

function setup() {
  createCanvas(800, 800);
  img.resize(width*2, height*2);
  for (let x = 0; x < img.width; x++) {
    for (let y = 0; y < img.height; y++) {
      const c = img.get(x, y);
      const b = brightness(c);
      values.push(b/255.0);
    }
  }
  
  background(255);
  translate(width / 2, height / 2);

  let i = 0;
  for (let angle = 0; angle < TAU*200; angle += TAU / 100) {
    const r = values[i] * width;
    const x = cos(angle) * r;
    const y = sin(angle) * r;
    point(x, y);
    
    if (i < values.length) i++;  
    else i = 0;
  }
  save('image-noise.jpg');
}