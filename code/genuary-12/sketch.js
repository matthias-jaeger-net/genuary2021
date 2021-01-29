/**
 * Use an API
 *
 * Matthias Jäger
 * genuary2021 | Day 12
 */

function setup() {
   effects = new Effects(this);
   createCanvas(800, 800);
   background(50);
   fill(255);
   textAlign(CENTER, CENTER);
   textFont("Texturina");
   fill(240);
   textSize(100);
   text("I let go ", 400, 250);
   text("of what I was ", 400, 400);
   text("holding onto", 400, 550);
   image(effects.pixels.puzzle(this.get()), 0, 0);
   save("genuary-12");
}
