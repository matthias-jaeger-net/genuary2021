/*
Draw a line. Wrong answers only.
–
For today's program I refactored an older line graphic program (2018-2020) to use the color-scheme I have been working on latley. The script allows you to draw lines with your mouse, but not like you would expect. A certain number of randomly orientated unit vectors is multiplied by a randomly picked constant length. All generated lines are tested and only those that do not intersect an existing line-segement are permitted in the graph.      
–
#genuary #genuary2021 is an artificially generated month of time where we build code that makes beautiful things. It happens during the month of January 2021. https://genuary2021.github.io/
-
https://editor.p5js.org/matthias-jaeger-net/sketches/-wi-IPM0-
–
#graphicdesign #generativeart #proceduralart #processing #javascript #fun #sketch #doodle #drawing #rendering #glitch #geometry #graz #abstract #interactive #minimal #geometric #lines #linework #colorful
*/


/** LINE SEGMENT INTERRSECTION MATH */
// https://www.geeksforgeeks.org/check-if-two-given-line-segments-intersect/

// The function checks if point q lies on line segment 'pr' 
function onSegment(p, q, r) {
  if (q.x <= max(p.x, r.x) && q.x >= min(p.x, r.x) &&
    q.y <= max(p.y, r.y) && q.y >= min(p.y, r.y))
    return true;
  return false;
}


// To find orientation of ordered triplet (p, q, r)
function orientation(p, q, r) {
  const val = int((q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y));
  // colinear 
  if (val == 0) return 0;
  // clock-wise 1 or counterclock-wise 2
  return (val > 0) ? 1 : 2;
}


// Returns true if line segment 'p1q1' and 'p2q2' intersect
function intersect(p1, q1, p2, q2) {
  // Find the four orientations needed for general and special cases 
  const o1 = orientation(p1, q1, p2);
  const o2 = orientation(p1, q1, q2);
  const o3 = orientation(p2, q2, p1);
  const o4 = orientation(p2, q2, q1);
  
  // General case 
  if (o1 != o2 && o3 != o4) return true;
  // Special Cases 
  // p1, q1 and p2 are colinear and p2 lies on segment p1q1 
  if (o1 == 0 && onSegment(p1, p2, q1)) return true;
  // p1, q1 and q2 are colinear and q2 lies on segment p1q1 
  if (o2 == 0 && onSegment(p1, q2, q1)) return true;
  // p2, q2 and p1 are colinear and p1 lies on segment p2q2 
  if (o3 == 0 && onSegment(p2, p1, q2)) return true;
  // p2, q2 and q1 are colinear and q1 lies on segment p2q2 
  if (o4 == 0 && onSegment(p2, q1, q2)) return true;
  return false; // Doesn't fall in any of the above cases
}

/** LINE SEGMENT RENDERING */

class Line {
  constructor(vStart, vEnd) {
    this.a = vStart;
    this.b = vEnd;
    this.colors = [
      '#7368C4', '#C67478',
      '#F5BA3A', '#3345EE',
      '#AAAAAA', '#EE2233',
      '#AAEEFF', '#000000'
    ];
    this.col = random(this.colors);
  }
  render() {
    stroke(this.col)
    line(this.a.x, this.a.y, this.b.x, this.b.y);
  }
}


/** P5 FUNCTIONS */

const longs = [60, 80, 30, 10, 4];
const attempts = 145;
const offset = 62;
let graph = [];

function setup() {
  createCanvas(800, 800);
  background(0);
}

function draw() {
  for (let notIntersectingLine of graph) {
    notIntersectingLine.render();
  }
}

function mouseDragged() {
  for (let times = 0; times < attempts; times++) {
    const v1 = p5.Vector.random2D().mult(random(longs));
    const ro1 = random(-offset, offset);
    const ro2 = random(-offset, offset);
    const v2 = createVector(mouseX + ro1, mouseY + ro2);
    v1.add(v2);
    const next = new Line(v1, v2);
    let intersections = 0;
    for (let g of graph) {
      const intersects = intersect(g.a, g.b, next.a, next.b);
      if (intersects == true) {
        intersections++;
      }
    }
    if (intersections == 0) {
      graph.push(next);
    }
  }
}

function keyPressed() {
  save('gen22.jpg');
}