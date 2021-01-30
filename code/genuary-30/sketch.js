/**
 * Replicate a natural concept (e.g. gravity, flocking, path following).
 *
 * Matthias Jäger
 * genuary2021 | Day 29
 */

// I refactored the demonstration of Craig Reynolds "Flocking" behavior
// by Daniel Shiffman [nature of code] to a non animated,
// colorful version that gives me a single static image every time I call it.

class Boid {
   constructor(x, y) {
      this.acceleration = createVector(0, 0);
      this.velocity = createVector(random(-1, 1), random(-1, 1));
      this.position = createVector(x, y);
      this.r = radius;
      this.maxspeed = 3;
      this.maxforce = 0.05;
      this.col = random(colors);
   }

   run(boids) {
      this.flock(boids);
      this.update();
      this.borders();
      this.render();
   }

   applyForce(force) {
      this.acceleration.add(force);
   }

   flock() {
      const sep = this.separate(boids);
      const ali = this.align(boids);
      const coh = this.cohesion(boids);
      sep.mult(1.5);
      ali.mult(1.0);
      coh.mult(1.0);
      this.applyForce(sep);
      this.applyForce(ali);
      this.applyForce(coh);
   }

   update() {
      this.velocity.add(this.acceleration);
      this.velocity.limit(this.maxspeed);
      this.position.add(this.velocity);
      this.acceleration.mult(0);
   }

   seek(target) {
      const desired = p5.Vector.sub(target, this.position);
      desired.normalize();
      desired.mult(this.maxspeed);
      const steer = p5.Vector.sub(desired, this.velocity);
      steer.limit(this.maxforce);
      return steer;
   }

   render() {
      push();
      fill(this.col);
      translate(this.position.x, this.position.y);
      circle(0, 0, this.r * 2)
      pop();
   }

   borders() {
      if (this.position.x < -this.r) this.position.x = width + this.r;
      if (this.position.y < -this.r) this.position.y = height + this.r;
      if (this.position.x > width + this.r) this.position.x = -this.r;
      if (this.position.y > height + this.r) this.position.y = -this.r;
   }

   separate() {
      const desiredseparation = 25.0;
      const steer = createVector(0, 0);
      let count = 0;
      for (let other of boids) {
         const d = p5.Vector.dist(this.position, other.position);
         if ((d > 0) && (d < desiredseparation)) {
            const diff = p5.Vector.sub(this.position, other.position);
            diff.normalize();
            diff.div(d);
            steer.add(diff);
            count += 1;
         }
      }
      if (count > 0) {
         steer.div(count);
      }
      if (steer.mag() > 0) {
         steer.normalize();
         steer.mult(this.maxspeed);
         steer.sub(this.velocity);
         steer.limit(this.maxforce);
      }
      return steer;
   }

   align() {
      const sum = createVector(0, 0);
      let count = 0;
      for (let i = 0; i < boids.length; i++) {
         let d = p5.Vector.dist(this.position, boids[i].position);
         if ((d > 0) && (d < neighbordist)) {
            sum.add(boids[i].velocity);
            count++;
         }
      }
      if (count > 0) {
         sum.div(count);
         sum.normalize();
         sum.mult(this.maxspeed);
         const steer = p5.Vector.sub(sum, this.velocity);
         steer.limit(this.maxforce);
         return steer;
      } else {
         return createVector(0, 0);
      }
   }

   cohesion() {
      const sum = createVector(0, 0);
      let count = 0;
      for (let i = 0; i < boids.length; i++) {
         const d = p5.Vector.dist(this.position, boids[i].position);
         if ((d > 0) && (d < neighbordist)) {
            sum.add(boids[i].position);
            count++;
         }
      }
      if (count > 0) {
         sum.div(count);
         return this.seek(sum);
      } else {
         return createVector(0, 0);
      }
   }
}

const colors = [
   '#7368C4',
   '#C67478',
   '#F5BA3A',
   '#3345EE',
   '#AAAAAA',
   '#EE2233',
   '#AAEEFF',
   '#000000'
];

const boids = [];
const neighbordist = 50;
const radius = 5;

function setup() {
   createCanvas(800, 800);
   background(21);
   stroke(21);

   for (let i = 0; i < 112; i++) {
      let b = new Boid(random(width), random(height));
      boids.push(b);
   }

   for (let i = 0; i < 900; i++) {
      for (let b of boids) {
         b.run(this.boids);
      }
   }

   save('gen30.jpg');
}
