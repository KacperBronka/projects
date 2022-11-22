let planets = [];
let attractors = [];
let static = [];
const _G = 0.05;

let rElem = document.querySelector("#r");
let massElem = document.querySelector("#mass");
let staticElem = document.querySelector("#static");
let attractElem = document.querySelector("#attract");

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  let sun = new Celestial(width / 2, height / 2, 80, 200);
  planets.push(sun);
  static.push(sun);
  attractors.push(sun);
  planets.push(new Celestial(width / 2 + 450, height / 2, 50, 20));
}

function draw() {
  background(12);
  for (let i = 0; i < planets.length; i++) {
    planets[i].show();
    if (static.includes(planets[i])) continue;
    planets[i].update();
  }
  //   noLoop();
}

document.querySelector("#clr").addEventListener("click", () => {
  planets = [];
  static = [];
  attractors = [];

  document.querySelector("#r").value = "";
  document.querySelector("#mass").value = "";
  document.querySelector("#static").checked = false;
  document.querySelector("#attract").checked = false;
});

function mousePressed() {
  if ((mouseY < document.querySelector(".settings").offsetHeight && mouseX < document.querySelector(".settings").offsetWidth) || mouseX < document.querySelector(".menu").offsetWidth) return;
  let radius = rElem.value;
  let mass = massElem.value;
  if (radius == "" || radius <= 0 || mass == "" || mass <= 0) return;
  let isStatic = staticElem.checked;
  let isAttractor = attractElem.checked;

  let planet = new Celestial(mouseX, mouseY, radius, mass);
  planets.push(planet);

  if (isStatic) {
    static.push(planet);
  }
  if (isAttractor) {
    attractors.push(planet);
  }
}

function Celestial(x_, y_, r_, mass_) {
  this.x = x_;
  this.y = y_;
  this.r = r_;
  this.mass = mass_;
  this.v = createVector(0, 7);

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
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
  };
  this.update = function () {
    updateGravity(this);
    this.x += this.v.x;
    this.y += this.v.y;

    // this.vec = createVector(0, 0);
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
