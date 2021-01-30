/*
No loops.
–
I used quite a bit of recursion and perlin noise multitplied by a small value to create today's images. Otherwise this is built from my recursive tree example, but uses circles on the calculated endpoints. The script seems unpredictable but  produces beautiful complex images.
–
#genuary #genuary2021 is an artificially generated month of time where we build code that makes beautiful things. It happens during the month of January 2021. https://genuary2021.github.io/
-
https://editor.p5js.org/matthias-jaeger-net/sketches/dlx6jPp_s
–
#graphicdesign #generativeart #proceduralart #processing #javascript #fun #sketch #doodle #drawing #rendering #glitch #geometry #graz #abstract #linework #animation #nature #lines #minimal #geometric #tree #illustration
*/


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

function branch(originX, originY, angle, level) {
  if (level <= 0) return;
  const xScale = 8;
  const yScale = 5;
  const off = 190;
  const epsilon = 0.001;
  const x = originX + cos(radians(angle)) * level * xScale;
  const y = originY + sin(radians(angle)) * level * yScale;
  const ns = noise(x * epsilon, y * epsilon);
  strokeWeight(ns * level * 0.5)
  stroke(colors[floor(ns * colors.length)])
  fill(0, 255 * ns)
  circle(x, y, ns * xScale * level);
  circle(originX, originY, ns * xScale * 2 * level);
  stroke(random(colors));
  line(x, y, originX, originY);
  circle(originX, originY, ns * xScale * 3 * level);
  branch(x, y, angle - off * ns, level - 1);
  branch(x, y, angle + off * ns, level - 1);
}

function setup() {
  createCanvas(800, 800);
  background(0);
  branch(400, 400, -90, 13);
  branch(400, 400, 90, 13);
}

function mousePressed() {
  save("gen20.jpg");
}