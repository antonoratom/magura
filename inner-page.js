document.addEventListener("DOMContentLoaded", function () {
  // Typewriter effect
  const paragraphElement = document.querySelector(".hero-player-description");
  if (paragraphElement) {
    typeWriterEffect(paragraphElement);
  }

  // Power bars - use querySelectorAll for these specifically
  const powerBarTriggers = document.querySelectorAll(
    '[character-bar="trigger"]'
  );
  const powerBarTargets = document.querySelectorAll('[character-bar="target"]');

  // Make sure we have matching pairs of triggers and targets
  if (
    powerBarTriggers.length > 0 &&
    powerBarTriggers.length === powerBarTargets.length
  ) {
    adjustPowerBars(powerBarTriggers, powerBarTargets);
  }

  // Wiggle numbers
  const wiggleTextElement = document.querySelector("[hero-wiggle-number]");
  if (wiggleTextElement) {
    animateWiggleNumber(wiggleTextElement);
  }

  function typeWriterEffect(paragraphElement) {
    const textContent = paragraphElement.textContent;
    paragraphElement.textContent = ""; // Clear the text content
    paragraphElement.classList.add("typewriter");
    let charIndex = 0;
    const typingSpeed = 1400 / textContent.length; // Calculate typing speed based on text length

    function type() {
      if (charIndex < textContent.length) {
        paragraphElement.textContent += textContent.charAt(charIndex);
        charIndex++;
        setTimeout(type, typingSpeed);
      } else {
        paragraphElement.classList.remove("typewriter"); // Remove cursor effect after typing
      }
    }

    type();
  }

  function adjustPowerBars(triggers, targets) {
    // Process each pair of trigger and target
    for (let i = 0; i < triggers.length; i++) {
      const powerBarTrigger = triggers[i];
      const powerBarTarget = targets[i];

      const powerValue = parseInt(powerBarTrigger.textContent, 10); // Convert text to numeric value
      if (!isNaN(powerValue)) {
        powerBarTarget.style.width = "0%"; // Reset width to 0%
        powerBarTarget.style.transition = `width 0.8s ease-in-out ${i * 0.2}s`; // Animate width with delay
        setTimeout(() => {
          powerBarTarget.style.width = `${powerValue}%`; // Set width to target value
        }, 100); // Small delay to ensure transition applies
      }
    }
  }

  function animateWiggleNumber(wiggleTextElement) {
    const originalText = wiggleTextElement.innerText;
    const randomNumbersArray = "1234567890".split("");
    const randomString = originalText.split("");
    let frameCount = 0;

    const animateFrame = () => {
      if (frameCount < 100) {
        if (frameCount % 6 === 0) {
          for (let i = 0; i < randomString.length; i++) {
            randomString[i] =
              randomNumbersArray[
                Math.floor(Math.random() * randomNumbersArray.length)
              ];
          }
          wiggleTextElement.innerText = randomString.join("");
        }
        frameCount++;
        requestAnimationFrame(animateFrame);
      } else {
        wiggleTextElement.innerText = originalText;
      }
    };

    animateFrame();
  }
});
const innerHeroTl = gsap.timeline();

innerHeroTl.from(
  "[inner-h]",
  {
    opacity: 0,
    duration: 0.6,
  },
  ".40"
);
innerHeroTl.from(
  "[inner-arrow]",
  {
    opacity: 0,
    x: "-58%",
    duration: 1,
  },
  "<.4"
);
innerHeroTl.from(
  "[section-hero-frame]",
  {
    opacity: 0,
    scale: 0.98,
    duration: 0.8,
  },
  ">"
);

// ----- HORIZONTAL SCROLL FOR MERCH ----- //
const scrollContainer = document.querySelector(".hero-page-merch-cli");

let isDown = false;
let startX;
let scrollLeft;

scrollContainer.addEventListener("mousedown", (e) => {
  isDown = true;
  scrollContainer.classList.add("active");
  startX = e.pageX - scrollContainer.offsetLeft;
  scrollLeft = scrollContainer.scrollLeft;
});

scrollContainer.addEventListener("mouseleave", () => {
  isDown = false;
  scrollContainer.classList.remove("active");
});

scrollContainer.addEventListener("mouseup", () => {
  isDown = false;
  scrollContainer.classList.remove("active");
});

scrollContainer.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - scrollContainer.offsetLeft;
  const walk = (x - startX) * 1.5; // scroll-fast
  scrollContainer.scrollLeft = scrollLeft - walk;
});
