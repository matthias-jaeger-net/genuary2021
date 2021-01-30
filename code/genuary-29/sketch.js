/*
Any shape, none can touch.
–
Colorful circles growing in a circle until they touch any circle inside a circle.
–
#genuary #genuary2021 is an artificially generated month of time where we build code that makes beautiful things. It happens during the month of January 2021. https://genuary2021.github.io/
-
https://editor.p5js.org/matthias-jaeger-net/sketches/XKjuWBqC9
–
#graphicdesign #generativeart #proceduralart #processing #javascript #fun #sketch #doodle #drawing #circles #colorful #colors #graz #abstract #geometric
*/

const times = 2200;
const circles = [];
const touchDist = 8;
const perimeter = 320;

const colors = [
  '#1234DE',
  '#E35633',
  '#AAEEAA',
  '#287323',
  '#FFEE11'
]

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

  save('gen28.jpg');
}