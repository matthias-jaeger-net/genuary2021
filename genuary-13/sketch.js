/**
 * Do not repeat.
 *
 * Matthias Jäger
 * genuary2021 | Day 13
 */

function segpoint(x1, y1, x2, y2, len) {
   let v1 = createVector(x1, y1);
   let v2 = createVector(x2, y2);
   let direction = v2.sub(v1);
   let magnitude = direction.mag();
   direction.normalize();
   direction.mult(len);
   const x = x1 + direction.x;
   const y = y1 + direction.y;
   return createVector(x, y);
}

function setup() {
   createCanvas(800, 800);
   noStroke();
   const colors = [
      '#7368C4',
      '#C67478',
      '#F5BA3A',
      color(random(255), random(255), random(255))
   ];
   background(random(colors));
   fill(random(colors));
   triangle(400, 0, 0, height, width, height);
   fill(random(colors));
   circle(400, 400, 500);
   fill(random(colors));
   rect(400, 0, 400, 800);
   fill(random(colors));
   circle(400, 400, 400);
}

function mousePressed() {
   save("gen13.jpg");
}
