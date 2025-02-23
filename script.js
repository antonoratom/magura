const buttons = document.querySelectorAll(".button");
const randomLetters = "АБВГҐДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯ".split("");

class Link {
  constructor(button, idx) {
    this.button = button;
    this.idx = idx;
    this.textElement = button.querySelector(".button-p"); // Select the specific child element
    if (!this.textElement) return; // Exit if no .button-p is found
    this.originalText = this.textElement.innerText;
    this.randomString = this.originalText.split("");
    this.frame = 0;
    this.addHoverEvent();
  }

  addHoverEvent() {
    this.button.addEventListener("mouseenter", () => {
      this.animate();
    });

    this.button.addEventListener("mouseleave", () => {
      this.frame = 0;
      setTimeout(() => {
        this.frame = 0;
      }, 1000);
    });
  }

  animate() {
    if (this.frame < 20) {
      // Adjust the number of frames for longer animation
      if (this.frame % 4 == 0) {
        // Adjust update frequency for smoother animation
        for (let i = 0; i < this.randomString.length; i++) {
          this.randomString[i] =
            randomLetters[Math.floor(Math.random() * randomLetters.length)];
        }
        this.textElement.innerText = this.randomString.join("");
      }
      this.frame++;
      requestAnimationFrame(this.animate.bind(this));
    } else {
      this.textElement.innerText = this.originalText;
    }
  }
}

buttons.forEach((button, idx) => {
  new Link(button, idx);
});

// Ensure GSAP and ScrollTrigger are loaded in your environment
gsap.registerPlugin(ScrollTrigger);

const sections = document.querySelectorAll("[wiggle-trigger]");

const randonNumbers = "1234567890".split("");

sections.forEach((section) => {
  const textElements = section.querySelectorAll("[wiggle-target]");

  textElements.forEach((textElement) => {
    const originalText = textElement.innerText;
    const randomString = originalText.split("");
    let frame = 0;

    const animateText = () => {
      frame = 0;
      const animateFrame = () => {
        if (frame < 20) {
          if (frame % 4 === 0) {
            for (let i = 0; i < randomString.length; i++) {
              randomString[i] =
                randonNumbers[Math.floor(Math.random() * randonNumbers.length)];
            }
            textElement.innerText = randomString.join("");
          }
          frame++;
          requestAnimationFrame(animateFrame);
        } else {
          textElement.innerText = originalText;
        }
      };
      animateFrame();
    };

    ScrollTrigger.create({
      trigger: section,
      start: "top 80%", // Adjust as necessary for when you want the animation to start
      onEnter: animateText,
      onLeave: () => (textElement.innerText = originalText),
      onEnterBack: animateText,
      onLeaveBack: () => (textElement.innerText = originalText),
      // markers: true, // Remove or set to false in production
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const wraps = document.querySelectorAll(".wrap");

  wraps.forEach((wrap) => {
    const trigger = wrap.querySelector(".trigger");
    const target = wrap.querySelector(".target");
    const targetValue = parseInt(trigger.dataset.value, 10);

    let currentValue = 0;
    const interval = setInterval(() => {
      if (currentValue < targetValue) {
        currentValue++;
        target.textContent = `${currentValue}%`;
      } else {
        clearInterval(interval);
      }
    }, 20);
  });
});

//PIXELS REVEALING ——— GSAP
$("[pixels-trigger]").each(function () {
  let pixelTl = gsap.timeline({
    scrollTrigger: {
      trigger: $(this),
      start: "top bottom",
      end: "400% bottom",
      // markers: true,
      scrub: true,
    },
  });
  pixelTl.to(
    $(this).find("[pixel-top-line='eight'] .pixel_item"),
    {
      opacity: -2,
      stagger: { amount: 0.4, from: "random" },
    },
    0
  );

  pixelTl.to(
    $(this).find("[pixel-top-line='seven'] .pixel_item"),
    {
      opacity: -1,
      stagger: { amount: 0.4, from: "random" },
    },
    "-=0.8"
  );

  pixelTl.to(
    $(this).find("[pixel-top-line='six'] .pixel_item"),
    {
      opacity: -0.5,
      stagger: { amount: 0.4, from: "random" },
    },
    "-=0.8"
  );

  pixelTl.to(
    $(this).find("[pixel-top-line='fifth'] .pixel_item"),
    {
      opacity: 0,
      stagger: { amount: 0.4, from: "random" },
    },
    "-=0.8"
  );

  pixelTl.to(
    $(this).find("[pixel-top-line='fourth'] .pixel_item"),
    {
      opacity: 0,
      stagger: { amount: 0.4, from: "random" },
    },
    "-=0.8"
  );

  pixelTl.to(
    $(this).find("[pixel-top-line='third'] .pixel_item"),
    {
      opacity: 0,
      stagger: { amount: 0.4, from: "random" },
    },
    "-=0.8"
  );

  pixelTl.to(
    $(this).find("[pixel-top-line='second'] .pixel_item"),
    {
      opacity: 0,
      stagger: { amount: 0.4, from: "random" },
    },
    "-=0.8"
  );

  pixelTl.to(
    $(this).find("[pixel-top-line='first'] .pixel_item"),
    {
      opacity: 0,
      stagger: { amount: 0.4, from: "random" },
    },
    "-=0.8"
  );
});

document.addEventListener("DOMContentLoaded", function () {
  const soundWrap = document.querySelector(".sound-wrap");

  soundWrap.addEventListener("click", function () {
    const soundBars = soundWrap.querySelectorAll(".sound-bar");

    soundBars.forEach(function (bar) {
      bar.classList.toggle("sound-pause");
    });
  });
});

let charactersScrubTl = gsap.timeline({
  defaults: { duration: 1 },
  scrollTrigger: {
    trigger: " [characters='trigger']",
    start: "top top",
    end: "bottom bottom",
    scrub: true,
    // markers: true,
  },
});

charactersScrubTl.to("[characters='target']", {
  x: "-100%",
});

let heroPcScrubTl = gsap.timeline({
  scrollTrigger: {
    trigger: " [hero-pc='trigger']",
    start: "top top",
    end: "bottom top",
    scrub: true,
    // markers: true,
  },
});

heroPcScrubTl.to("[hero-pc='target']", {
  scale: "1",
  // y: "0.5%",
});
heroPcScrubTl.to(
  "[hero-pc-text='target']",
  {
    scale: "4",
    opacity: "0",
  },
  0
);
heroPcScrubTl.to(
  "[hero-pc-text-l='target']",
  {
    x: "-125%",
  },
  0
);
heroPcScrubTl.to(
  "[hero-pc-text-r='target']",
  {
    x: "125%",
  },
  0
);
heroPcScrubTl.to(
  "[hero-pc-cta='target']",
  {
    y: "-200%",
    scale: "4",
  },
  0
);

document.addEventListener("DOMContentLoaded", function () {
  // Get the width of the .characters-scroll_cont element
  let charScrollCont = document.querySelector(".characters-scroll_cont");
  if (charScrollCont) {
    let charScrollContWidth = charScrollCont.offsetWidth;
    let mainWrapForCaracters = document.querySelector(
      ".main-wrap.for-caracters"
    );
    if (mainWrapForCaracters) {
      mainWrapForCaracters.style.height = charScrollContWidth + "px";
    }
  }

  // Get the width of the .about-brigade_wrap element
  let aboutScrollCont = document.querySelector(".about-brigade_wrap");
  if (aboutScrollCont) {
    let aboutScrollContWidth = aboutScrollCont.offsetWidth;
    let mainWrapForAbout = document.querySelector(
      ".main-wrap.bg-2.for-about-brigade"
    );
    if (mainWrapForAbout) {
      mainWrapForAbout.style.height = aboutScrollContWidth + "px";
    }
  }
});

// Select the last .merch-cli element
const lastMerchCli = document.querySelector(".merch-cli:last-of-type");

// Check if the element exists
if (lastMerchCli) {
  // Get the child element .merch-preview_wrap
  const merchPreviewWrap = lastMerchCli.querySelector(".merch-preview_wrap");

  // Check if the child element exists
  if (merchPreviewWrap) {
    // Get the width of the child element
    const width = window.getComputedStyle(merchPreviewWrap).width;

    // Select all .collections-heros-intro elements
    const collectionsHerosIntros = document.querySelectorAll(
      ".collections-heros-intro"
    );

    // Iterate over each element and set the width
    collectionsHerosIntros.forEach((collectionsHerosIntro) => {
      collectionsHerosIntro.style.width = width;
    });
  }
}

// ---------- HERO SCROLL TL ---------- //

let screenHolderTlScrub = gsap.timeline({
  scrollTrigger: {
    trigger: ".hero-scroll-trigger_second",
    start: "-75% top",
    end: "0% top",
    scrub: true,
    // markers: true,
  },
});
screenHolderTlScrub.to(
  "[screen-holder]",
  {
    height: "100vh",
  },
  0
);

let screenHolderTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".hero-scroll-trigger_second",
    start: "0% 25%",
    end: "0% 25%",
    // markers: true,
    toggleActions: "play none play reverse",
  },
});

screenHolderTl.from(
  "[hero-logo]",
  {
    y: "24px",
    opacity: 0,
  },
  0
);
screenHolderTl.from(
  "[hero-cta]",
  {
    y: "-24px",
    opacity: 0,
  },
  0
);

let screenRemoverTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".hero-scroll-trigger_second",
    start: "bottom bottom",
    end: "bottom bottom",
    // markers: true,
    toggleActions: "play none play reverse",
  },
});
screenRemoverTl.to(
  ".hero-pc_item.center.mid",
  {
    opacity: 0,
    duration: ".2",
  },
  0
);

(function () {
  // Register ScrollTrigger and ScrollToPlugin
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  // Select elements by their specific attributes
  const firstTarget = document.querySelector("[hero-snap='first']");

  // Create a ScrollTrigger for the first target with snapping to start or end
  ScrollTrigger.create({
    trigger: firstTarget,
    start: "top top",
    end: "bottom top",
    snap: {
      snapTo: (progress) => {
        // Snap to the top (0) if within the first 10% of progress, otherwise snap to the bottom (1)
        return progress < 0.1 ? 0 : 1;
      },
      duration: 1.2,
      ease: "sine",
      delay: 0.05,
      directional: true,
    },
    // markers: { startColor: "green", endColor: "red", label: "First" }, // Enable markers for debugging
  });
})();

// ---------- ABOUT BRIGADE TL ---------- //
let aboutBrigadeScrub = gsap.timeline({
  defaults: { duration: 1 },
  scrollTrigger: {
    trigger: " [about-brigade='trigger']",
    start: "top top",
    end: "bottom bottom",
    scrub: true,
    // markers: true,
  },
});

aboutBrigadeScrub.to("[about-brigade='target']", {
  x: "-100%",
});

let aboutBrigadeTlFirst = gsap.timeline({
  defaults: { duration: 1 },
  scrollTrigger: {
    trigger: " [about-tl='trigger']",
    start: "top top",
    end: "30% top",
    scrub: true,
    // markers: true,
  },
});

aboutBrigadeTlFirst.to("[about-tl-bg='target-1']", {
  width: "100%",
});
aboutBrigadeTlFirst.to(
  "[about-tl-line='target-1']",
  {
    x: "100.1%",
  },
  0
);

let aboutBrigadeTlSecond = gsap.timeline({
  defaults: { duration: 1 },
  scrollTrigger: {
    trigger: " [about-tl='trigger']",
    start: "31% top",
    end: "100% bottom",
    scrub: true,
    // markers: true,
  },
});

aboutBrigadeTlSecond.to("[about-tl-bg='target-2']", {
  width: "100%",
});
aboutBrigadeTlSecond.to(
  "[about-tl-line='target-2']",
  {
    x: "100.1%",
  },
  0
);
