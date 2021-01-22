/**
 * Make something human
 *
 * Matthias Jäger
 * genuary2021 | Day 3
 */

let human, effects;

function preload() {
   // human = loadImage('sketch1.png');
   // human = loadImage('sketch2.png');
   human = loadImage('sketch3.png');
}

function setup() {
   effects = new Effects(this);

   createCanvas(800, 800);
   background(0);
   blendMode(SCREEN);

   // image(effects.pixels.mosaic(human), 0, 0);
   image(effects.pixels.linify(human), 0, 0);
   image(effects.pixels.glitch(human), 0, 0);
   image(effects.pixels.puzzle(human), 0, 0);
   /// image(effects.pixels.shrink(human), 0, 0);

   image(human, 0, 0);
   save('gen3.jpg');
}
