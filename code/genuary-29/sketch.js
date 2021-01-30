/**
 * Any shape, none can touch.
 *
 * Matthias Jäger
 * genuary2021 | Day 29
 */

const times = 2200;
const circles = [];
const touchDist = 8;
const perimeter = 320;

const colors = [
   '#7368C4',
   '#C67478',
   '#F5BA3A',
   '#3345EE',
   '#AAAAAA',
   // '#000000'
];

class Circle {
   constructor(position, radius) {
      this.growing = true;
      this.position = position;
      this.radius = radius;
      this.col = random(colors);
   }
   update() {
      this.radius += 1;
   }
   render() {
      noStroke();
      fill(this.col);
      circle(this.position.x, this.position.y, this.radius * 2);
   }
}

function attemptCircle() {
   let attempedCircle;
   const randomPointInside = p5.Vector.random2D();
   randomPointInside.mult(random(perimeter));
   randomPointInside.add(400, 400);
   attempedCircle = new Circle(randomPointInside, 1);
   for (let other of circles) {
      const x1 = attempedCircle.position.x;
      const y1 = attempedCircle.position.y;
      const x2 = other.position.x;
      const y2 = other.position.y;
      const d = dist(x1, y1, x2, y2);
      if (d < other.radius + touchDist) {
         attempedCircle = undefined;
         break;
      }
   }
   if (attempedCircle) {
      return attempedCircle;
   }
}

function setup() {
   createCanvas(800, 800);
   background(0);
   for (let t = 0; t < times; t++) {
      const attemptedCircle = attemptCircle();
      if (attemptedCircle) {
         circles.push(attemptedCircle);
      }

      for (let currentCircle of circles) {
         currentCircle.render();
         if (currentCircle.growing) {
            currentCircle.update();
            for (let other of circles) {
               if (other != currentCircle) {
                  const x1 = currentCircle.position.x;
                  const y1 = currentCircle.position.y;
                  const x2 = other.position.x;
                  const y2 = other.position.y;
                  const d = dist(x1, y1, x2, y2);
                  const radialSum = currentCircle.radius + other.radius;
                  if (d < radialSum + touchDist) {
                     currentCircle.growing = false;
                  }
               }
            }
         }
      }
   }

   save('gen29.jpg');
}
