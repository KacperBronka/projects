function openWeb(name) {
  if (name == "intel") {
    window.open(
      "https://notebook.classroom.pionier.net.pl/user/e471aac2-ddf9-433f-9f3f-95ab91e9383b/lab/tree/python",
      "_blank"
    );
    return;
  }

  if (name.includes("/")) {
    window.open("https://www.w3schools.com/" + name, "_blank");
  } else {
    window.open("https://www.w3schools.com/" + name + "/default.asp", "_blank");
  }
}
let cards = document.querySelectorAll(".subgrid");
let cardTitles = document.querySelectorAll(".title");
let cardNames = [];
let dots = document.querySelectorAll(".dot");
let ilewyn = document.querySelector(".ilewyn");
let input = document.querySelector("header input");
let howManyDisplayed = 0;
let dotsBool = [true, true, true, true];
let i1 = [];
let i2 = [];
let i3 = [];
let i4 = [];
let alli = [];
let noMore = document.querySelector(".nomore");
for (let i = 0; i < cardTitles.length; i++) {
  cardNames.push(cardTitles[i].innerHTML.toUpperCase());
}
ilewyn.innerHTML = cards.length;

for (let i = 0; i < cards.length; i++) {
  if (cards[i].classList.contains("i1")) {
    i1.push(cards[i]);
  } else if (cards[i].classList.contains("i2")) {
    i2.push(cards[i]);
  } else if (cards[i].classList.contains("i3")) {
    i3.push(cards[i]);
  } else if (cards[i].classList.contains("i4")) {
    i4.push(cards[i]);
  }
}
alli.push(i1);
alli.push(i2);
alli.push(i3);
alli.push(i4);

input.addEventListener("input", () => {
  dots.forEach((elem) => {
    if (elem.classList.contains("blank")) {
      elem.classList.remove("blank");
    }
  });
  dotsBool.forEach((elem) => {
    elem = true;
  });
  for (let i = 0; i < cardNames.length; i++) {
    if (cardNames[i].includes(input.value.toUpperCase())) {
      cards[i].style.display = "flex";
    } else {
      cards[i].style.display = "none";
    }

    for (let j = 0; j < cards.length; j++) {
      if (!(cards[j].style.display == "none")) {
        howManyDisplayed += 1;
      }
    }
    ilewyn.innerHTML = howManyDisplayed;
    if (howManyDisplayed == 0) {
      noMore.style.display = "flex";
    } else {
      noMore.style.display = "none";
    }
    howManyDisplayed = 0;
  }
});

for (let i = 0; i < dots.length; i++) {
  dots[i].addEventListener("click", () => {
    dots[i].classList.toggle("blank");
    dotsBool[i] = !dotsBool[i];

    for (let j = 0; j < alli.length; j++) {
      if (dotsBool[j]) {
        for (let k = 0; k < alli[j].length; k++) {
          alli[j][k].style.display = "flex";
        }
      } else {
        for (let k = 0; k < alli[j].length; k++) {
          alli[j][k].style.display = "none";
        }
      }
    }

    for (let j = 0; j < cards.length; j++) {
      if (!(cards[j].style.display == "none")) {
        howManyDisplayed += 1;
      }
    }
    ilewyn.innerHTML = howManyDisplayed;
    if (howManyDisplayed == 0) {
      noMore.style.display = "flex";
    } else {
      noMore.style.display = "none";
    }
    howManyDisplayed = 0;
  });
}
