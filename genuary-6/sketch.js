/**
 * Triangle subdivision
 *
 * Matthias Jäger
 * genuary2021 | Day 6
 */

function segpoint(v1, v2, len) {
   let direction = v2.copy().sub(v1.copy());
   let magnitude = direction.mag();
   direction.normalize();
   direction.mult(magnitude * len);
   const x = v1.x + direction.x;
   const y = v1.y + direction.y;
   const z = v1.z + direction.z
   return createVector(x, y, z);
}

function renderTriangle(triangle) {
   const a = triangle[0];
   const b = triangle[1];
   const c = triangle[2];
   beginShape();
   vertex(a.x, a.y, a.z);
   vertex(b.x, b.y, b.z);
   vertex(c.x, c.y, c.z);
   endShape(CLOSE);
}

function divide(triangle) {
   const half = 0.5;
   const a = triangle[0];
   const b = triangle[1];
   const c = triangle[2];
   return [
      [a, segpoint(a, b, half), segpoint(a, c, half)],
      [segpoint(a, c, half), c, segpoint(b, c, half)],
      [segpoint(b, c, half), segpoint(a, c, half), segpoint(a, b, half)],
      [segpoint(a, b, half), segpoint(b, c, half), b]
   ];
}

function renderDivison(triangles) {
   for (let tri of triangles) {
      const div = divide(tri);
      for (let tri of div) {
         renderTriangle(tri);
      }
   }
}

let n = 0;
let m = 0;
let offA;
let points;

function setup() {
   createCanvas(800, 800, WEBGL);
   stroke(0)
   fill(255, 20)
   strokeWeight(2)
   const padding = 150;
   points = [
      createVector(0, -400 + padding, 0),
      createVector(400 - padding, 400 - padding, 0),
      createVector(-400 + padding, 400 - padding, 0)
   ];
   background(0);
}

function draw() {
   rotateX(n);
   const div = divide(points);
   const div2 = [];

   for (let tri of div)
      div2.push(divide(tri));

   for (let tri of div2) {
      for (let w of tri) {
         for (let p of w) {
            p.z = noise(p.x * 0.001, p.y * 0.01, n) * 200;
         }
         renderTriangle(w)
      }
   }
   n += 0.01;
}
