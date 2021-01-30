/*
function f
–
This time I had to modify the given function f and added an exit condition to prevent too much recursion. After that and keeping my sanity I started jamming with circles and colors too make this geometric image for you after all. 
–
#genuary #genuary2021 is an artificially generated month of time where we build code that makes beautiful things. It happens during the month of January 2021. https://genuary2021.github.io/
-
https://editor.p5js.org/matthias-jaeger-net/sketches/qCV2k2JRX
–
#graphicdesign #generativeart #proceduralart #processing #javascript #fun #sketch #doodle #drawing #rendering #glitch #geometry #graz #abstract #linework #animation #nature #lines #minimal #geometric #tree #illustration
*/

function setup() {
  createCanvas(800, 800);
  background(0);
  noStroke();
  
  const colors = [
    '#7368C411',
    '#C6747811',
    '#F5BA3A11',
    '#3345EE11',
    '#AAAAAA11',
    '#EE223311',
    '#AAEEFF11E',
    '#00000011'
  ];

  const f = (x) => {
    if (floor(x) == 0) return;
    DRAWS(x);
    f(1 * x / 4);
    f(2 * x / 4);
    f(3 * x / 4);
  }

  const DRAWS = (x) => {
    const radius = x * 12;
    const rd = 30;
    const u = 400 + rd * random(-x, x);
    const v = 400 + rd * random(-x, x);
    fill(random(colors));
    circle(u, v, radius * 2);
    fill(random(colors));
    circle(u, v, radius * 1);
    fill(random(colors));
    circle(u, v, radius * 0.5);
  }

  f(33);

  save("gen21.jpg")
}