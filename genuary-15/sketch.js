/**
 * Let someone else decide the general rules of your piece.
 *
 * Matthias Jäger
 * genuary2021 | Day 15
 */

const colors = [
   '#7368C4',
   '#C67478',
   '#F5BA3A',
   '#3345DDD'
];

class Flake {
   constructor(origin, radius) {
      this.origin = origin;
      this.radius = radius;
      this.points = this.createPoints();
      this.speed = createVector(0, random(0.1, 0.05))
      this.position = this.origin.copy();
      this.velocity = createVector();
      this.acceleration = createVector();
      this.col = random(colors);
   }

   createPoints() {
      const blob = [];
      const modmax = 130;
      this.segments = random(3, 139);
      // Generate vectors
      for (let angle = 0; angle < TAU; angle += TAU / this.segments) {
         const xoff = map(cos(angle), -1, 1, 0, modmax);
         const yoff = map(sin(angle), -1, 1, 0, modmax);
         const roff = map(noise(xoff, yoff), 0, 1, 0, this.radius);
         const x = cos(angle) * roff;
         const y = sin(angle) * roff;
         const pos = createVector(x, y);
         blob.push(pos);
      }
      // Connect last and first element
      const closed = blob[0];
      blob.push(createVector(closed.x, closed.y));
      return blob;
   }

   addForce(f) {
      this.acceleration.add(f);
   }

   edges() {
      if (this.position.y > height + this.radius) {
         this.points = this.createPoints();
         this.velocity.mult(0)
         this.position.x = random(width);
         this.position.y = -this.radius;
      }
   }

   update() {
      this.addForce(this.speed)
      this.edges()
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
      this.acceleration.mult(0);
   }

   render() {
      noStroke();
      fill(this.col);
      push();
      const n = noise(this.position.x * 0.001, this.position.y * 0.001) * 300;
      translate(this.position.x + n, this.position.y);
      beginShape();
      for (let b of this.points) {
         vertex(b.x, b.y)
      }
      endShape();
      pop();
   }
}

let flakes = [];

function setup() {
   createCanvas(800, 800);
   background(random(colors))
   for (let f = 0; f < 50; f++)
      flakes.push(new Flake(createVector(random(width), random(-300, -800)), random(20, 300)));
}

function draw() {
   for (let flake of flakes) {
      flake.update()
      flake.render()
   }
}
