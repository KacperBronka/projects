const phoho = document.querySelector("one #pawelforemnyziwonicza"),
   title = document.querySelector("one #alan1"),
   sub1 = document.querySelector("one #alan2"),
   sub2 = document.querySelector("one #alan3"),
   nr = document.querySelector("one #alan4"),
   zakres = document.querySelector("one #alan5"),
   clr = document.querySelector("one #alan6"),
   btn = document.querySelector("one #alanDziokXD");

title.addEventListener("input", () => {
   document.querySelector("one .title").innerText = title.value;
});
sub1.addEventListener("input", () => {
   document.querySelector("one .sub1").innerText = sub1.value;
});
sub2.addEventListener("input", () => {
   document.querySelector("one .sub2").innerText = sub2.value;
});
nr.addEventListener("input", () => {
   document.querySelector("one .nr").innerText = nr.value;
   if (nr.value == "" || nr.value == null) {
      document.querySelector("one .txt").style.width = "100%";
      document.querySelector("one .nr").style.width = "0%";
   } else {
      document.querySelector("one .txt").style.width = "80%";
      document.querySelector("one nr").style.width = "20%";
   }
});
phoho.addEventListener("input", () => {
   document.querySelector("one .bg").style.backgroundImage = `url("${phoho.value}")`;
});
clr.addEventListener("input", () => {
   document.querySelector("one .zakres").style.background = clr.value;
});
zakres.addEventListener("input", () => {
   document.querySelector("one .zakres").innerHTML = zakres.value.replace(/ /g, "&nbsp;").replace(/>/g, "&gt;").replace(/</g, "&lt;");
});
btn.addEventListener("mousedown", () => {
   window.print();
});
//---------------------------------------------------------------------------------------------------------------------------------------------
const phohoD = document.querySelector("two #pawelforemnyziwoniczaD"),
   titleD = document.querySelector("two #alan1D"),
   titleD2 = document.querySelector("two #alan1i5D"),
   subD = document.querySelector("two #alan2D"),
   auD1 = document.querySelector("two #alan3D"),
   auD2 = document.querySelector("two #alan4D"),
   nrD = document.querySelector("two #alan5D"),
   clrD1 = document.querySelector("two #alan6D"),
   clrD2 = document.querySelector("two #alan7D"),
   clrD3 = document.querySelector("two #alan8D"),
   btnD = document.querySelector("two #alanDziokXDD");

titleD.addEventListener("input", () => {
   document.querySelector("two .title1").innerText = titleD.value;
});
titleD2.addEventListener("input", () => {
   document.querySelector("two .title2").innerText = titleD2.value;
});
subD.addEventListener("input", () => {
   document.querySelector("two .sub").innerText = subD.value;
});
auD1.addEventListener("input", () => {
   document.querySelector("two .author1").innerText = auD1.value;
});
auD2.addEventListener("input", () => {
   document.querySelector("two .author2").innerText = auD2.value;
});
nrD.addEventListener("input", () => {
   document.querySelector("two .nr").innerText = nrD.value;
});
phohoD.addEventListener("input", () => {
   document.querySelector("two .mainImg").style.backgroundImage = `url("${phohoD.value}")`;
});
clrD1.addEventListener("input", () => {
   document.querySelector("two .content").style.setProperty("--clr1", clrD1.value);
});
clrD2.addEventListener("input", () => {
   document.querySelector("two .content").style.setProperty("--clr2", clrD2.value);
});
clrD3.addEventListener("input", () => {
   document.querySelector("two .content").style.setProperty("--clr3", clrD3.value);
});
btn.addEventListener("mousedown", () => {
   window.print();
});
//--------------------------------------------------------------------------------------------------------------------
const photoM = document.querySelector("three #pawelforemnyziwoniczaM"),
   titleM = document.querySelector("three #alan1M"),
   subM = document.querySelector("three #alan2M"),
   auM = document.querySelector("three #alan3M"),
   zakresM = document.querySelector("three #alan4M"),
   nrM = document.querySelector("three #alan5M"),
   clrM1 = document.querySelector("three #alan6M"),
   clrM2 = document.querySelector("three #alan7M"),
   clrM3 = document.querySelector("three #alan8M"),
   clrM4 = document.querySelector("three #alan9M"),
   btnM = document.querySelector("three #alanDziokXDM");

titleM.addEventListener("input", () => {
   document.querySelector("three .title").innerText = titleM.value;
});
subM.addEventListener("input", () => {
   document.querySelector("three .sub").innerText = subM.value;
});
nrM.addEventListener("input", () => {
   document.querySelector("three .nr").innerText = nrM.value;
});
photoM.addEventListener("input", () => {
   document.querySelector("three .imgMain").style.backgroundImage = `url("${photoM.value}")`;
});
clrM1.addEventListener("input", () => {
   document.querySelector("three .content").style.setProperty("--clr1", clrM1.value);
});
clrM2.addEventListener("input", () => {
   document.querySelector("three .content").style.setProperty("--clr2", clrM2.value);
});
clrM3.addEventListener("input", () => {
   document.querySelector("three .content").style.setProperty("--clr3", clrM3.value);
});
clrM4.addEventListener("input", () => {
   document.querySelector("three .content").style.setProperty("--clr4", clrM4.value);
});
zakresM.addEventListener("input", () => {
   document.querySelector("three .footer").innerHTML = zakresM.value.replace(/ /g, "&nbsp;").replace(/>/g, "&gt;").replace(/</g, "&lt;");
});
auM.addEventListener("input", () => {
   document.querySelector("three .authors").innerHTML = auM.value.replace(/ /g, "&nbsp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/\\n/g, "<br>");
});
btn.addEventListener("mousedown", () => {
   window.print();
});
//--------------------------------------------------------------------------------------------------------------------
const photoR1 = document.querySelector("four #pawelforemnyziwoniczaR"),
   photoR2 = document.querySelector("four #pawelforemnyziwoniczaR2"),
   titleR1 = document.querySelector("four #alan1R"),
   titleR2 = document.querySelector("four #alan2R"),
   subjectR = document.querySelector("four #alan3R"),
   descR = document.querySelector("four #alan4R"),
   nrR = document.querySelector("four #alan5R"),
   clrR1 = document.querySelector("four #alan6R"),
   clrR2 = document.querySelector("four #alan7R"),
   clrR3 = document.querySelector("four #alan8R"),
   clrR4 = document.querySelector("four #alan9R"),
   clrR5 = document.querySelector("four #alan10R"),
   btnR = document.querySelector("four #alanDziokXDR");

titleR1.addEventListener("input", () => {
   document.querySelector("four .title1").innerText = titleR1.value;
});
titleR2.addEventListener("input", () => {
   document.querySelector("four .title2").innerText = titleR2.value;
});
descR.addEventListener("input", () => {
   document.querySelector("four .subtitle").innerText = descR.value;
});
nrR.addEventListener("input", () => {
   document.querySelector("four .nr").innerText = nrR.value;
});
photoR1.addEventListener("input", () => {
   document.querySelector("four .imgSmall").style.backgroundImage = `url("${photoR1.value}")`;
});
photoR2.addEventListener("input", () => {
   document.querySelector("four .imgMain").style.backgroundImage = `url("${photoR2.value}")`;
});
clrR1.addEventListener("input", () => {
   document.querySelector("four .card").style.setProperty("--clr1", clrR1.value);
});
clrR2.addEventListener("input", () => {
   document.querySelector("four .card").style.setProperty("--clr2", clrR2.value);
});
clrR3.addEventListener("input", () => {
   document.querySelector("four .card").style.setProperty("--clr3", clrR3.value);
});
clrR4.addEventListener("input", () => {
   document.querySelector("four .card").style.setProperty("--clr4", clrR4.value);
});
clrR5.addEventListener("input", () => {
   document.querySelector("four .card").style.setProperty("--clr5", clrR5.value);
});
subjectR.addEventListener("input", () => {
   document.querySelector("four .subject").innerHTML = subjectR.value;
});
btnR.addEventListener("mousedown", () => {
   window.print();
});
