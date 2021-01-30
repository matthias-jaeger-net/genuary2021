/*
500 lines
–
In color, with noise & animated. :D
–
#genuary #genuary2021 is an artificially generated month of time where we build code that makes beautiful things. It happens during the month of January 2021. https://genuary2021.github.io/
-
// https://editor.p5js.org/matthias-jaeger-net/sketches/PjEZOtDZW
–
#graphicdesign #generativeart #proceduralart #processing #javascript #fun #sketch #doodle #drawing #lines #linedrawing #geometry #graz #landscape #mountains #curves #curvy #geometric
*/

const colors = [
  '#7368C4',
  '#C67478',
  '#F5BA3A',
  '#000000'
];

const lineColors = [];
const totalLines = 500;
const totalFrames = 150;
const small = 0.0081251;
const off = 90;
const pad = 190;
const cell = 80;

function setup() {
  createCanvas(800, 800);
  frameRate(30);
  // n  oiseSeed(123);
  // randomSeed(123);

  for (let y = 0; y <= height-pad; y += (height) / totalLines) {
    lineColors.push(random(colors))
  }
}

function draw() {
  if (frameCount < totalFrames + 1) {
    background(0);
    noFill();
    translate(0, pad * 0.25)
    let index = 0;
    for (let y = 0; y <= height-pad; y += (height) / totalLines) {
      stroke(lineColors[index]);
      beginShape();
      for (let x = 0; x <= width; x += cell) {
        const n = noise(x * small, y * small, frameCount * small);
        curveVertex(x, y + n * off);
      }
      endShape();
      index += 1;
    }
    // ffmpeg -framerate 30 -pattern_type glob -i '*.jpg' -c:v libx264 -pix_fmt yuv420p out.mp4
    save(nf(frameCount, 4) + ".jpg");
  } else {
    noLoop();
  }
}