/*
Use Sound
–
This images visualize the frequency spectrum of live audio input over time. I reworked the p5.sound example code from a linear to a circular design and don't clear the background. As an input sound I used the smooth pop song "Night Train" from BUE (Link below). 
–
#genuary #genuary2021 is an artificially generated month of time where we build code that makes beautiful things. It happens during the month of January 2021. https://genuary2021.github.io/
-
https://soundcloud.com/buebuemusic
https://editor.p5js.org/matthias-jaeger-net/sketches/hRJVGrTvI
https://p5js.org/examples/sound-frequency-spectrum.html
–
#graphicdesign #generativeart #proceduralart #processing #javascript #fun #sketch #doodle #drawing #coolorful #colors #grayscale #graz #abstract #geometric #circles
*/

const colors = [
  '#7368C4',
  '#C67478',
  '#F5BA3A',
  '#AAAAFF',
  '#2589D3',
];

let mic, fft;

function setup() {
  createCanvas(800, 800);
  background(0);
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);
}

function draw() {
  //noStroke();
  //fill(0, 10);
  ///rect(0, 0, width, height);
  let spectrum = fft.analyze();
  let index = 0;
  for (let angle = 0; angle < TAU; angle += TAU / 255) {
    const radius = map(spectrum[index], 0, 255, 0, width);
    const x = 400 + cos(angle) * radius * noise(angle, frameCount * 0.01);
    const y = 400 + sin(angle) * radius * noise(angle, frameCount * 0.01);
    fill(colors[index % colors.length]);
    circle(x, y, noise(angle * 0.1, frameCount * 0.04) * 5);
    index += 1;
  }
}

function mousePressed() {
  save('gen28.jpg');
}