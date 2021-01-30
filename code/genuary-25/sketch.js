/*
Make a grid of permutations of something.
–
Unexpected results to come, thee future is ahead. I started with a grid and ended with a diffusion-limited aggregation patttern in the color. 
–
#genuary #genuary2021 is an artificially generated month of time where we build code that makes beautiful things. It happens during the month of January 2021. https://genuary2021.github.io/
-
https://editor.p5js.org/matthias-jaeger-net/sketches/Jt5myq1AK
–
#graphicdesign #generativeart #proceduralart #processing #javascript #fun #sketch #doodle #drawing #dots #stippling #geometry #graz #aggregation #curvy #geometric
*/

const colors = [
  '#7368C4',
  '#C67478',
  '#F5BA3A',
];

const spread = 100;
const attractors = [];
const particles = [];
const radius = 20;



function setup() {
  createCanvas(800, 800);
  noStroke();

  for (let x = 0; x < width; x += spread) {
    for (let y = 0; y < height; y += spread) {
      attractors.push(new Particle(x + spread / 2, y + spread / 2, random(colors)));
    }
  }

  for (let a = 0; a < 902; a++) {
    particles.push(new Particle(random(width), random(height), random(colors)));
  }

  for (let t = 0; t < 80; t++) {
    background(20);

    for (let attractor of attractors) {
      for (let i = particles.length - 1; i > 0; i--) {
        let d = dist(attractor.x, attractor.y, particles[i].x, particles[i].y);
        if (d < radius) {
          attractors.push(new Particle(particles[i].x, particles[i].y, attractor.c));
          particles.splice(i, 1);
        }
      }
    }

    // Render
    for (let particle of particles) {
      particle.update()
    }
    for (let attractor of attractors) {
      attractor.render()
    }
  }
}

class Particle {
  constructor(x, y, c) {
    this.x = x;
    this.y = y;
    this.c = c;
  }
  update() {
    this.x = this.x + random(-1, 1)
    this.y = this.y + random(-1, 1)
  }
  render() {
    fill(this.c);
    circle(this.x, this.y, radius);
  }
}

function keyPressed() {
  save('gen25.jpg');
}