/**
 * function f
 *
 * Matthias Jäger
 * genuary2021 | Day 21
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
      '#AAEEFF11E', // :D
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
