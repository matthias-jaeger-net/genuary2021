/**
 * Use Sound.
 *
 * Matthias Jäger
 * genuary2021 | Day 28
 */

// https://soundcloud.com/buebuemusic
// https://p5js.org/examples/sound-frequency-spectrum.html

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
   // Also nice
   // noStroke();
   // fill(0, 10);
   // rect(0, 0, width, height);
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
