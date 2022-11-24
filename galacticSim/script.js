let planets = [];
let attractors = [];
let static = [];
const _G = 0.05;

let rElem = document.querySelector("#r");
let massElem = document.querySelector("#mass");
let staticElem = document.querySelector("#static");
let attractElem = document.querySelector("#attract");

let mouseStart;
let startForce;

let supernova = false;

let colors = [
  [0, 255, 255],
  [0, 0, 255],
  [255, 0, 255],
  [143, 0, 255],
  [50, 205, 50],
  [160, 32, 240],
];
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  let sun = new Celestial(width / 2, height / 2, 80, 200, createVector(0, 0));
  planets.push(sun);
  static.push(sun);
  attractors.push(sun);
  planets.push(new Celestial(width / 2 + 250, height / 2, 50, 20, createVector(0, 7)));
  mouseStart = null;
}

function draw() {
  background(12);
  for (let i = 0; i < planets.length; i++) {
    planets[i].show();
    if (!static.includes(planets[i])) {
      planets[i].update();
    } else {
      planets[i].super();
    }
  }
  if (mouseIsPressed === true && mouseStart != null) {
    drawArrow(mouseStart, createVector(mouseX, mouseY), "maroon");
  }
  //   noLoop();
}

document.querySelector("#clr").addEventListener("click", () => {
  planets = [];
  static = [];
  attractors = [];
  supernova = false;
  document.querySelector("#r").value = "";
  document.querySelector("#mass").value = "";
  document.querySelector("#static").checked = false;
  document.querySelector("#attract").checked = false;
});

function mousePressed() {
  mouseStart = createVector(mouseX, mouseY);
}
function mouseReleased() {
  if ((mouseStart.y < document.querySelector(".settings").offsetHeight && mouseStart.x < document.querySelector(".settings").offsetWidth) || mouseStart.x < document.querySelector(".menu").offsetWidth || supernova) return;
  let radius = rElem.value;
  let mass = massElem.value;
  if (radius == "" || radius <= 0 || mass == "" || mass <= 0) return;
  let isStatic = staticElem.checked;
  let isAttractor = attractElem.checked;
  let planet = new Celestial(mouseStart.x, mouseStart.y, radius, mass, startForce);
  planets.push(planet);

  if (isStatic) {
    static.push(planet);
  }
  if (isAttractor) {
    attractors.push(planet);
  }

  mouseStart = null;
}
function Celestial(x_, y_, r_, mass_, startV_) {
  this.x = x_;
  this.y = y_;
  this.r = r_;
  this.mass = mass_;
  this.v = startV_;

  this.show = function () {
    noFill();
    if (attractors.includes(this)) {
      fill("#ffd70010");
    }
    stroke("gold");
    if (this.mass == 1000 && this.r == 20 && static.includes(this) && attractors.includes(this)) {
      noFill();
      stroke(255);
    }
    if (this.r < 100 && this.mass >= 3000 && static.includes(this)) {
      fill("cyan");
      strokeWeight(4);
      stroke("blue");
      drawingContext.filter = "blur(7px)";
    }
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
    strokeWeight(1);
    drawingContext.filter = "none";
  };
  this.update = function () {
    updateGravity(this);
    this.x += this.v.x;
    this.y += this.v.y;

    // this.vec = createVector(0, 0);
  };
  let exploded = false;
  let system;
  let particleCount = 0;
  system = new ParticleSystem(createVector(this.x, this.y));
  this.super = function () {
    if (this.r < 100 && this.mass >= 3000 && this.r > 5) {
      //shrink planet
      this.r -= deltaTime * 0.01;
    }
    system.run();
    if (this.r < 6) {
      if (particleCount < 155) {
        //add particles
        system.addParticle();
        particleCount++;
      }
      if (!exploded) {
        exploded = true;
        supernova = true;
        this.mass = 0;
        this.r = 0;
        static = [this];
        attractors = [];
        for (let i = 0; i < planets.length; i++) {
          if (planets[i] == this) continue;

          let expForce = createVector(planets[i].x, planets[i].y).sub(createVector(this.x, this.y)); // push all planets away from this
          planets[i].v = expForce.limit(15);
        }
        setTimeout(() => {
          //delete all planets after 7 seconds
          planets = [];
          supernova = false;
        }, 7000);
      }
    }
  };
}

function updateGravity(celestial) {
  for (let i = 0; i < planets.length; i++) {
    if (planets[i] == celestial || !attractors.includes(planets[i])) continue;
    let force = createVector(planets[i].x, planets[i].y).sub(createVector(celestial.x, celestial.y));

    let distance = force.mag();
    distance = constrain(distance, 5, 25);

    let gravity = (_G * planets[i].mass * celestial.mass) / Math.pow(distance, 2);

    force.setMag(gravity);

    celestial.v.x += force.x;
    celestial.v.y += force.y;
  }
}

// Gravitational force between the two planet

// = G × M1 ×M2 / R²

// Where G is Gravitational constant =

// 6.6743 × 10 -¹¹

// M1 and M2 are mass of the planets

// R is the distance between the two planets.

document.querySelectorAll(".type").forEach((elem) => {
  elem.addEventListener("click", () => {
    rElem.value = elem.dataset.r;
    massElem.value = elem.dataset.mass;
    staticElem.checked = elem.dataset.static == "true" ? true : false;
    attractElem.checked = elem.dataset.attractor == "true" ? true : false;
  });
});

function drawArrow(base, vec, myColor) {
  if ((mouseY < document.querySelector(".settings").offsetHeight && mouseX < document.querySelector(".settings").offsetWidth) || mouseX < document.querySelector(".menu").offsetWidth) return;
  let radius = rElem.value;
  let mass = massElem.value;
  let static = staticElem.checked;
  if (radius == "" || radius <= 0 || mass == "" || mass <= 0 || static === true) {
    if (static === true) {
      mouseStart = createVector(mouseX, mouseY);
    }
    return;
  }
  push();
  let end = vec.sub(base);
  end = end.limit(120);
  stroke(myColor);
  strokeWeight(3);
  fill(myColor);
  ellipse(base.x, base.y, 10, 10);
  line(base.x, base.y, base.x + end.x, base.y + end.y);
  pop();

  startForce = createVector(base.x + end.x, base.y + end.y)
    .sub(base)
    .mult(0.1);
}

let system;

// A simple Particle class
let Particle = function (position) {
  this.velocity = createVector(random(-2, 2), random(-1, 1));
  this.position = position.copy();
  // this.position.x = this.position.x + random(-2, 2);
  // this.position.y = this.position.y + random(-1, 1);

  this.color = colors[Math.floor(Math.random() * colors.length)];
  this.lifespan = 70;
};

Particle.prototype.run = function () {
  this.update();
  this.display();
};

// Method to update position
Particle.prototype.update = function () {
  this.velocity.mult(1.04);
  this.position.add(this.velocity);
  this.lifespan -= 1;
};

// Method to display
Particle.prototype.display = function () {
  push();
  noStroke();
  fill(this.color[0], this.color[1], this.color[2], map(this.lifespan, 0, 70, 0, 255));
  drawingContext.filter = "blur(17px)";
  ellipse(this.position.x, this.position.y, 15, 15);
  drawingContext.filter = "none";
  pop();
};

// Is the particle still useful?
Particle.prototype.isDead = function () {
  return this.lifespan < 0;
};

let ParticleSystem = function (position) {
  this.origin = position.copy();
  this.particles = [];
};

ParticleSystem.prototype.addParticle = function () {
  this.particles.push(new Particle(this.origin));
};

ParticleSystem.prototype.run = function () {
  for (let i = this.particles.length - 1; i >= 0; i--) {
    let p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
};
