// var s1 = function (sketch) {
//   let boundary;

//   sketch.setup = function () {
//     let canvas1 = sketch.createCanvas(window.innerWidth, window.innerHeight);
//     boundary = new Boundary(300, 100, 300, 300);
//   };

//   sketch.draw = function () {
//     sketch.background(10);
//     boundary.show();
//   };

//   class Boundary {
//     constructor(x1, y1, x2, y2) {
//       this.a = sketch.createVector(x1, y1);
//       this.b = sketch.createVector(x2, y2);
//     }

//     show() {
//       sketch.stroke(255);
//       sketch.line(this.a.x, this.a.y, this.b.x, this.b.y);
//     }
//   }

//   class Ray{
//     constructor(){
//       this.position = createVector();
//     }
//   }
// };

// new p5(s1);

/*
  https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection

  intersection wiki and formulas
*/

let walls = [];
let emmiter;
let canvas1;

const sceneW = window.innerWidth / 2;
const sceneH = window.innerHeight - 100;

let sliderFOV, sliderRes;

function setup() {
  canvas1 = createCanvas(window.innerWidth, sceneH);
  canvas1.parent(document.querySelector(".canvas"));
  // wall = new Boundary(100, 100, 200, 300);
  for (let i = 0; i < 5; i++) {
    let x1 = random(sceneW);
    let x2 = random(sceneW);
    let y1 = random(sceneH);
    let y2 = random(sceneH);
    walls.push(new Boundary(x1, y1, x2, y2));
  }
  walls.push(new Boundary(0, 0, sceneW, 0));
  walls.push(new Boundary(sceneW, 0, sceneW, sceneH));
  walls.push(new Boundary(sceneW, sceneH, 0, sceneH));
  walls.push(new Boundary(0, sceneH, 0, 0));
  emmiter = new Emmiter();

  sliderFOV = createSlider(0, 180, 60);
  sliderFOV.input(changeFOV);
  sliderFOV.parent(document.querySelector(".fov"));
  sliderRes = createSlider(5, 200, 100);
  sliderRes.input(changeResolution);
  sliderRes.parent(document.querySelector(".res"));
}

function changeFOV() {
  const fov = sliderFOV.value();
  emmiter.updateFOV(fov);
}
function changeResolution() {
  let res = sliderRes.value() / 100;
  res = map(res, 0.05, 2, 2, 0.05);
  emmiter.updateRes(res);
}
// function windowResized() {
//   canvas1.resize(window.innerWidth, window.innerHeight);
// }

function mouseWheel(event) {
  let angle = event.delta / Math.abs(event.delta);
  emmiter.rotate(angle * 0.1);
}

function draw() {
  background(10);

  emmiter.show();
  if (mouseX <= sceneW && mouseY <= sceneH) {
    emmiter.update(constrain(mouseX, 0, sceneW), constrain(mouseY, 0, sceneH));
  }

  for (let wall of walls) {
    wall.show();
  }

  const scene = emmiter.look(walls);
  const w = sceneW / scene.length;
  push();
  translate(sceneW, 0);
  noStroke();
  for (let i = 0; i < scene.length; i++) {
    const sq = scene[i] * scene[i];
    const WSq = sceneW * sceneW;
    let b = map(sq, 0, WSq, 255, 0);
    let h = map(scene[i], 0, sceneW, sceneH, 0);

    fill(b);
    rectMode(CENTER);
    rect(i * w + w / 2, sceneH / 2, w + 1, h);
  }
  pop();
}

class Boundary {
  constructor(x1, y1, x2, y2) {
    this.a = createVector(x1, y1);
    this.b = createVector(x2, y2);
  }

  show() {
    stroke(255);
    line(this.a.x, this.a.y, this.b.x, this.b.y);
  }
}

class Ray {
  constructor(pos, angle) {
    this.pos = pos;
    this.dir = p5.Vector.fromAngle(angle);
  }

  lookAt(x, y) {
    this.dir.x = x - this.pos.x;
    this.dir.y = y - this.pos.y;
    this.dir.normalize();
  }

  setAngle(a) {
    this.dir = p5.Vector.fromAngle(a);
  }

  show() {
    stroke(255);
    push();
    translate(this.pos.x, this.pos.y);
    line(0, 0, this.dir.x * 10, this.dir.y * 10);
    pop();
  }

  cast(wall) {
    const x1 = wall.a.x;
    const x2 = wall.b.x;
    const y1 = wall.a.y;
    const y2 = wall.b.y;

    const x3 = this.pos.x;
    const y3 = this.pos.y;
    const x4 = this.pos.x + this.dir.x;
    const y4 = this.pos.y + this.dir.y;

    const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (den == 0) {
      // if it equals zero, the 2 lines are parallel and would never intersect
      return;
    }

    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
    const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;

    if (t > 0 && t < 1 && u > 0) {
      const pt = createVector();
      pt.x = x1 + t * (x2 - x1);
      pt.y = y1 + t * (y2 - y1);
      return pt;
    } else {
      return;
    }
  }
}

class Emmiter {
  constructor() {
    this.pos = createVector(width / 2, height / 2);
    this.rays = [];
    this.rotation = 0;
    this.fov = 60;
    this.res = 1;
    for (let i = -this.fov / 2; i < this.fov / 2; i += this.res) {
      this.rays.push(new Ray(this.pos, radians(i)));
    }
  }

  rotate(angle) {
    this.rotation += angle;
    let index = 0;
    for (let i = -this.fov / 2; i < this.fov / 2; i += this.res) {
      this.rays[index].setAngle(radians(i) + this.rotation);
      index++;
    }
  }

  show() {
    fill(255);
    ellipse(this.pos.x, this.pos.y, 4, 4);
    for (let ray of this.rays) {
      ray.show();
    }
  }

  look(walls) {
    const scene = [];
    for (let i = 0; i < this.rays.length; i++) {
      let closest = null;
      let record = Infinity;
      for (let wall of walls) {
        let pt = this.rays[i].cast(wall);

        if (pt) {
          let d = p5.Vector.dist(this.pos, pt);
          const a = this.rays[i].dir.heading() - this.rotation;
          d *= cos(a);
          if (d < record) {
            record = d;
            closest = pt;
          }
        }
      }
      if (closest) {
        stroke(255, 100);
        line(this.pos.x, this.pos.y, closest.x, closest.y);
      }
      scene[i] = record;
    }
    return scene;
  }

  update(x, y) {
    this.pos.x = x;
    this.pos.y = y;
  }

  updateFOV(fov) {
    this.fov = fov;
    this.rays = [];
    for (let i = -this.fov / 2; i < this.fov / 2; i += this.res) {
      this.rays.push(new Ray(this.pos, radians(i) + this.rotation));
    }
  }

  updateRes(res) {
    this.res = res;
    this.rays = [];
    for (let i = -this.fov / 2; i < this.fov / 2; i += this.res) {
      this.rays.push(new Ray(this.pos, radians(i) + this.rotation));
    }
  }
}
