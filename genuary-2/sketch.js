/**
 * rule30
 *
 * Matthias Jäger
 * genuary2021 | Day 2
 */

const rule30 = (pattern) => {
   let state;
   if (pattern == '111') state = 0;
   if (pattern == '110') state = 0;
   if (pattern == '101') state = 0;
   if (pattern == '100') state = 1;
   if (pattern == '011') state = 1;
   if (pattern == '010') state = 1;
   if (pattern == '001') state = 1;
   if (pattern == '000') state = 0;
   return state;
}

const generate = (density) => {
   const states = [];
   for (let i = 0; i < density; i += 1)
      states[i] = random(0, 1) > 0.85 ? 0 : 1;
   return states;
}

const upadteStates = (density, states) => {
   for (let i = 0; i < density - 2; i++) {
      const left = states[i];
      const current = states[i + 1];
      const right = states[i + 2];
      const pattern = str(left) + str(current) + str(right);
      states[i] = rule30(pattern)
   }
   const left = states[0];
   const current = states[states.length - 1];
   const right = states[states.length - 2];
   const pattern = str(left) + str(current) + str(right);
   states[states.length - 1] = rule30(pattern)
}

function setup() {
   createCanvas(800, 800, WEBGL);
   background(255);
   noStroke();

   const density = floor(random(20, 60));
   const cells = generate(density);
   const padding = 80;
   const halfWidth = width * 0.5 - padding;
   const scaler = width - padding * 2;
   const cell = scaler / density;
   const effects = new Effects(this);
   const grain = effects.hatches.grain(cell, cell, 0.14, color(0), 1);

   for (let j = 0; j < scaler; j += cell) {
      upadteStates(density, cells);
      for (let i = 0; i < density; i++) {
         const x = i * cell + cell * 0.5 - halfWidth;
         const y = j + cell * 0.5 - halfWidth;
         const noiseScl = 0.01;
         const noiseMult = 112;
         const flow = noise(x * noiseScl, y * noiseScl);
         const tex = effects.hatches.grain(cell, cell, 0.04, color(0), 1);
         texture(grain);
         push();
         translate(x, y, 0);
         if (cells[i] == 1) box(cell, cell, cell + noiseMult * flow);
         else image(tex, 0, 0);
         pop();
      }
   }
   save('gen2.jpg');
}
