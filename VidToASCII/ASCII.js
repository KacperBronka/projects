const density = "Ñ@#W$&9876543210?!aboc;:+=-,._ ";

let video;
let asciiDiv;

function setup() {
  noCanvas();
  video = createCapture(VIDEO);
  video.size(96, 96);
  asciiDiv = createDiv();
}
function draw() {
  video.loadPixels();
  let asciiImage = "";
  for (let i = 0; i < video.height; i++) {
    for (let j = 0; j < video.width; j++) {
      let pixelIndex = (j + i * video.width) * 4;
      let r = video.pixels[pixelIndex + 0];
      let g = video.pixels[pixelIndex + 1];
      let b = video.pixels[pixelIndex + 2];

      let avg = (r + b + g) / 3;

      const len = density.length;
      const charIndex = floor(map(avg, 0, 255, len, 0));

      const char = density.charAt(charIndex);
      if (char == " ") asciiImage += "&nbsp;";
      else asciiImage += char;
    }
    asciiImage += "<br/>";
  }
  asciiDiv.html(asciiImage);
  image(video, 0, 0);
}
