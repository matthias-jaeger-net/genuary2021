/**
 * 2D Perspective.
 *
 * Matthias Jäger
 * genuary2021 | Day 26
 */

let buildingBuffer
let pixelGlitchBuffer
let neonGlitchBuffer

const colors = [
   '#7368C4',
   '#C67478',
   '#F5BA3A',
   '#000000'
];

function large_building(rows, cols, xscl, yscl) {
   let b = buildingBuffer
   for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
         b.rectMode(CENTER)
         b.push()
         b.translate(i * xscl, j * yscl)

         // Outer fill
         b.fill(random(colors))
         b.strokeWeight(8)
         b.rect(0, 0, xscl + random(-3, 3), yscl + random(-3, 3))

         // Inner fill
         b.strokeWeight(1)
         b.fill(random(colors))
         b.rect(0, 0, xscl * 0.9, yscl * 0.9)

         b.pop()
         b.rectMode(CORNER)
      }
   }
}

function small_building(rows, cols, xscl, yscl) {
   let b = buildingBuffer
   for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
         b.stroke(0)
         b.strokeWeight(3)
         b.fill(random(colors))
         b.rectMode(CENTER)
         b.push()
         b.translate(i * xscl, j * yscl)
         b.rect(0, 0, xscl + random(-30, 30), yscl)
         b.pop()
         b.rectMode(CORNER)
      }
   }
}

function keyPressed() {
   save("gen26.jpg")
}

function setup() {
   createCanvas(800, 800)
   background(0)
   buildingBuffer = createGraphics(width, height, WEBGL)
   pixelGlitchBuffer = createGraphics(width, height)
   neonGlitchBuffer = createGraphics(width, height)

   // Ground
   buildingBuffer.push()
   buildingBuffer.rotateX(PI * 0.5)
   buildingBuffer.translate(-900, -900)
   buildingBuffer.translate(0, 0, -400)
   large_building(100, 100, 200, 100)
   buildingBuffer.pop()

   // Large
   for (let i = 0; i < 14; i++) {
      buildingBuffer.push()
      buildingBuffer.translate(
         random(-width * 0.5, height * 0.5),
         random(-width * 0.5, height * 0.5)
      )
      buildingBuffer.rotateY(random(TAU))
      large_building(
         floor(random(3, 20)),
         floor(random(3, 20)),
         random(10, 100),
         random(10, 100)
      )
      buildingBuffer.pop()
   }

   // Small
   for (let i = 0; i < 140; i++) {
      buildingBuffer.push()
      buildingBuffer.translate(
         random(-width * 0.5, height * 0.5),
         random(-width * 0.5, height * 0.5)
      )
      small_building(
         floor(random(5, 10)),
         floor(random(5, 10)),
         random(15, 20),
         random(15, 20)
      )
      buildingBuffer.pop()
   }

   pixelGlitchBuffer.loadPixels()
   for (let x = 0; x < pixelGlitchBuffer.width; x++) {
      for (let y = 0; y < pixelGlitchBuffer.height; y++) {
         pixelGlitchBuffer.set(x, y, random(colors))
      }
   }
   pixelGlitchBuffer.updatePixels()

   let letters = "抽象之城AHI&3407632Y..a"
   neonGlitchBuffer.fill(random(colors))
   for (let i = 0; i < 20; i++) {
      neonGlitchBuffer.push()
      neonGlitchBuffer.translate(
         random(neonGlitchBuffer.width),
         random(neonGlitchBuffer.height)
      )
      neonGlitchBuffer.textSize(random(3, 80))
      let str = ""
      for (let i = 0; i < floor(random(1, 20)); i++) {
         str += letters.charAt(floor(random(letters.length)))
      }
      neonGlitchBuffer.text(str, 0, 0)
      neonGlitchBuffer.pop()
   }
   neonGlitchBuffer.filter(BLUR, 2)

   // Blend images together
   blendMode(SCREEN);
   image(buildingBuffer, 0, 0)
   image(pixelGlitchBuffer, 0, 0)
   image(neonGlitchBuffer, 0, 0)
}
