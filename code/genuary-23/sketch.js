/*
#264653 #2a9d8f #e9c46a #f4a261 #e76f51, no gradients.
–
I used todays colors on rounded rectangles in a perfect loop animation. The design is my own thing but I used a tutorial read (link below). After having the basic structure down I modified it with 2D noise and trigonometric functions. A for loop is going over the all colors and uses the numbers to render this colorful animation on stage. Used ffmpeg over the command line to convert the image output to this video. Thanks again ... for the read.
–
#genuary #genuary2021 is an artificially generated month of time where we build code that makes beautiful things. It happens during the month of January 2021. https://genuary2021.github.io/
-
https://bjango.com/articles/processingperfectloops/
https://editor.p5js.org/matthias-jaeger-net/sketches/wipG8Cd0S
–
#graphicdesign #generativeart #proceduralart #processing #javascript #fun #sketch #doodle #drawing #rendering #glitch #geometry #graz #abstract #dots #points #texture #minimal #geometric #javascript
*/


// Loop tools
function timeLoop(totalframes, offset) {
  return (frameCount + offset) % totalframes / totalframes;
}
function tri(t) {
  return t < 0.5 ? t * 2 : 2 - (t * 2);
}
function inOutSin(t) {
  return 0.5 - cos(PI * t) / 2;
}

// Given coloors
const colors = [
  '#2a9d8f',
  '#264653',
  '#f4a261',
  '#e76f51',
  '#e9c46a',
];

// Length: 4 seconds * 30 frames per second
const totalFrames = 120;

function setup() {
  createCanvas(800, 800);
  frameRate(30);
  noStroke();
  noiseSeed(123);
}

function draw() {
  if (frameCount < totalFrames + 1) {
    background('#264653');
    for (let index = 0; index < colors.length; index += 1) {
      for (let y = 0; y < height; y += 10) {
        fill(colors[index]);
        const v = inOutSin(tri(timeLoop(totalFrames, y - index))) * height;
        const n = noise(y * 0.01, timeLoop(totalFrames, index) * 0.01)
        const x = timeLoop(totalFrames, y + index) * width;
        rect(x - v * n, y + index * sin(y * index), 60 * n, v * n, 9);
      }
    }
    save(nf(frameCount, 4) + ".jpg");
  } else {
    noLoop();
  }
}

// Video conversion commands
// ffmpeg -framerate 30 -pattern_type glob -i '*.jpg' -c:v libx264 -pix_fmt yuv420p out.mp4
