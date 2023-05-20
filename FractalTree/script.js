let btn;
let axiom = "F";
let sentence = axiom;
let len = 50;
let gen = 0;
let rules = [];
let branches = [];
rules[0] = {
  a: "F",
  b: "FF+[+F-F-F]-[-F+F+F]",
};

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(51);
  btn = createButton("Generate");
  btn.mousePressed(generate);
  translate(width / 2, height);
}
function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight, false);
  background(51);
}
function generate() {
  if(gen>7) return;
  gen++;
  rules[0].b = document.querySelector("input").value;
  document.querySelector("input").setAttribute("disabled", "");
  background(51);
  stroke(255, 255, 255, 100);
  branches = [];

  for (let i = 0; i < sentence.length; i++) {
    if (sentence.charAt(i) == "F") {
      // branches.push(new Branch(createVector(0,0),createVector(0,-len)))
      line(0, 0, 0, -len);
      translate(0, -len);
      // len*=0.67;
    } else if (sentence.charAt(i) == "+") {
      rotate(PI / 6);
    } else if (sentence.charAt(i) == "-") {
      rotate(-PI / 6);
    } else if (sentence.charAt(i) == "[") {
      push();
    } else if (sentence.charAt(i) == "]") {
      noStroke();
      fill(0, 255, 100, 100);
      ellipse(0, 0, 4, 4);
      noFill();
      stroke(255, 255, 255, 100);
      pop();
    }
  }
  len *= 0.67;

  let nextSentence = "";
  for (let i = 0; i < sentence.length; i++) {
    let found = false;
    for (let j = 0; j < rules.length; j++) {
      if (sentence.charAt(i) == rules[j].a) {
        nextSentence += rules[j].b;
        found = true;
        break;
      }
    }
    if (!found) {
      nextSentence += sentence.charAt(i);
    }
  }
  sentence = nextSentence;
}

function draw() {
  resetMatrix();
  translate(width / 2, height);

  for (let i = 0; i < branches.length; i++) {
    branches[i].show();
  }
}

function Branch(beg, en) {
  this.begin = beg;
  this.end = en;

  this.show = function () {
    stroke(255);
    line(this.begin.x, this.begin.y, this.end.x, this.end.y);
  };
}

document.querySelector(".reset").addEventListener("click", () => {
  axiom = "F";
  sentence = axiom;
  len = 50;
  branches = [];
  background(51);
});
