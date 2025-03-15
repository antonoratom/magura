// gsap.to(".hero-pc_bg", { opacity: 1, duration: 0.4, delay: 1.3 });

// ----- IMAGE RANDOMIZER HERO ----- //
const images = document.querySelectorAll(".hero-loader-img_bl img");
let currentIndex = 0;
const totalImages = images.length;

function cycleImageOpacity() {
  // Set all images to opacity 0
  gsap.set(images, { opacity: 0 });

  // Set the current image to opacity 1
  gsap.to(images[currentIndex], { opacity: 1, duration: 0 });

  // Move to the next image index
  currentIndex = (currentIndex + 1) % totalImages;
}

// Run the function every 0.2 seconds
setInterval(cycleImageOpacity, 100);
// ----- IMAGE RANDOMIZER HERO ENDS ----- //

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

document.addEventListener("DOMContentLoaded", function () {
  const soundWrap = document.querySelector(".sound-wrap");

  soundWrap.addEventListener("click", function () {
    const soundBars = soundWrap.querySelectorAll(".sound-bar");

    soundBars.forEach(function (bar) {
      bar.classList.toggle("sound-pause");
    });
  });
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

if (window.innerWidth > 991) {
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

    const firstTarget = document.querySelector("[hero-snap='first']");
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

    const cardHeightElement = document.querySelector(
      "[character-card-snap-height]"
    );

    if (cardHeightElement) {
      const scrollSnapTargets = document.querySelectorAll(
        "[character-scroll-snap]"
      );
      scrollSnapTargets.forEach((target) => {
        ScrollTrigger.create({
          trigger: target,
          start: "top top",
          end: "bottom top",
          snap: {
            snapTo: (progress) => {
              return progress < 0.5 ? 0 : 1;
            },
            duration: 1.2,
            ease: "sine",
            delay: 0.05,
            directional: true,
          },
          // markers: { startColor: "green", endColor: "red", label: "Snap" }, // Enable markers for debugging
        });
      });
    }
  })();
}

document.querySelector("[copy-url]").addEventListener("click", function () {
  const rootDomain = window.location.origin; // Get the root domain
  const donateUrl = `${rootDomain}/donate`; // Append /donate
  navigator.clipboard.writeText(donateUrl); // Copy the URL to clipboard
});
