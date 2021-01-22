// TRIPLE NESTED LOOP
// Matthias Jäger, 2021-01-01

function setup() {
   createCanvas(800, 800, WEBGL);
   const half = width * 0.5;
   const side = width / 13;
   const halfSide = side * 0.5;
   const epsilon = 0.001;
   const phi = 0.65162948;
   camera(0, 0, 800, 0, 0, 0, 1, 0, 1);
   background(255);
   translate(-half, -half, 0);
   //translate(0, -half * 0.5, 0);
   rotateX(0);

   // The loop
   for (let x = 0; x < width; x += side) {
      for (let y = 0; y < height; y += side) {
         for (let z = -width; z < 0; z += side) {
            const flow = noise(epsilon * x, epsilon * y, epsilon * z);
            push();
            translate(x + halfSide, y + halfSide, z);
            rotateX(flow * TAU);
            rotateY(flow * TAU);
            rotateZ(flow * TAU);
            box(map(z, -width, 0, side * phi, 0), side * phi, 10);
            pop();
         }
      }
   }
   save('gen1.jpg');
}