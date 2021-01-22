/**
 * SUBDIVISION
 *
 * Matthias Jäger
 * genuary2021 | Day 14
 */

const colors = [
   '#7368C4',
   '#C67478',
   '#F5BA3A',
   '#3345DDD'
];

function setup() {
   createCanvas(800, 800);
   noStroke();
   frameRate(1);
}

function draw() {
   background(random(colors));
   flower(400, 400, 400, 400, 1000);
}

function mousePressed() {
   save("gen14.jpg");
}


function midpoint(x1, y1, x2, y2) {
   let v1 = createVector(x1, y1);
   let v2 = createVector(x2, y2);
   let direction = v2.sub(v1);
   let magnitude = direction.mag();
   direction.normalize();
   direction.mult(magnitude * 0.5);
   const x = x1 + direction.x;
   const y = y1 + direction.y;
   return createVector(x, y);
}

function shrink(vec, origin, f) {
   const a = createVector(vec.x, vec.y);
   const b = createVector(origin.x, origin.y);
   const dir = b.sub(a);
   dir.mult(f);
   return createVector(vec.x + dir.x, vec.y + dir.y);
}


function flower(_x, _y, _ox, _oy, _r) {
   const blob = [];
   const radius = _r;
   const segments = random(40);
   for (let angle = 0; angle < TAU; angle += TAU / segments) {
      let xoff = map(cos(angle), -1, 1, 0, 30);
      let yoff = map(sin(angle), -1, 1, 0, 30);
      let radius = map(noise(xoff, yoff), 0, 1, 0, _r);

      const x = _ox + cos(angle) * radius;
      const y = _oy + sin(angle) * radius;
      const v = createVector(x, y)
      blob.push(v);
   }
   const closed = blob[0];
   blob.push(createVector(closed.x, closed.y));

   const max = 155;
   for (let layer = 15; layer < max; layer += 15) {
      beginShape()
      for (let index = 0; index < blob.length - 1; index++) {
         fill(random(colors));
         const v = blob[index];
         const v2 = blob[index + 1];
         const m = midpoint(v.x, v.y, v2.x, v2.y);

         const a = createVector(v.x, v.y);
         const b = createVector(_ox, _oy);
         const dir = b.sub(a);
         dir.mult(layer / max);

         const nm = p5.Vector.fromAngle(dir.heading());
         nm.mult(10);
         m.add(nm);
         const m1 = midpoint(v.x, v.y, m.x, m.y);
         const m2 = midpoint(v2.x, v2.y, m.x, m.y);

         const s1 = shrink(v, createVector(_ox, _oy), layer / max);
         const s2 = shrink(v2, createVector(_ox, _oy), layer / max);
         const s3 = shrink(m1, createVector(_ox, _oy), layer / max);
         const s4 = shrink(m2, createVector(_ox, _oy), layer / max);
         const s5 = shrink(m, createVector(_ox, _oy), layer / max);
         //const tl = p5.Vector.fromAngle(s2.heading()).mult(10);
         //const tr = p5.Vector.fromAngle(s1.heading()).mult(10);

         //const nm2 = p5.Vector.fromAngle(m.heading() - PI);
         //nm2.mult(119);

         vertex(s1.x, s1.y);
         vertex(s3.x, s3.y);
         vertex(m2.x, m2.y);
         vertex(s2.x, s2.y);
         vertex(s4.x, s4.y);
      }
      endShape(CLOSE);
   }
}
