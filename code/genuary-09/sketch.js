/**
 * Interference patterns
 *
 * Matthias Jäger
 * genuary2021 | Day 9
 */

class Interferenz {
   constructor(x, y) {
      this.pos = createVector(x, y);
   }
   render() {
      for (let layer = 300; layer > 0; layer--) {
         circle(this.pos.x, this.pos.y, 8 * layer);
      }
   }
   update(w) {
      this.off = createVector(cos(w) * 3, sin(w) * 3);
      this.pos.add(this.off);
   }
   set() {
      this.pos.x = mouseX;
      this.pos.y = mouseY;
   }
}

let interferenzA;
let interferenzB;
let interferenzC;

let welleA;
let welleB;
let welleC;

function setup() {
   createCanvas(800, 800);
   interferenzA = new Interferenz(400, 400);
   interferenzB = new Interferenz(400, 400);
   interferenzC = new Interferenz(400, 400);
   welleA = 0;
   welleB = 0;
   welleC = 0;
}

function draw() {
   background(255);
   stroke(0)
   noFill();
   strokeWeight(2);
   interferenzA.render();
   interferenzA.update(welleA);
   interferenzB.render();
   interferenzB.update(welleB);
   interferenzC.render();
   interferenzC.set();
   welleA += 0.02;
   welleB -= 0.04;
   welleC -= 0.03;
}

function mousePressed() {
   save('gen9.jpg');
}
