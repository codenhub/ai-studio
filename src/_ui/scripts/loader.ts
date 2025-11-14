import { gsap } from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

gsap.registerPlugin(DrawSVGPlugin);

let tl = gsap.timeline({
  repeat: -1,
  delay: 0,
  defaults: { ease: "power1.inOut", duration: 1.2, delay: 0 },
});

tl.to(".logo-loader path", {
  drawSVG: "100% 100%",
})
  .to(".logo-loader path", {
    drawSVG: "0% 100%",
  })
  .to(".logo-loader path", {
    drawSVG: "0% 0%",
  })
  .to(".logo-loader path", {
    drawSVG: "0% 100%",
  });
