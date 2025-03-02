document.addEventListener("DOMContentLoaded", function () {
  console.log("test hero nav.js");
  const playerElements = document.querySelectorAll(".hero-select-player_cli");

  if (playerElements.length > 0) {
    playerElements[0].classList.add("active");
  }

  playerElements.forEach((playerElement) => {
    playerElement.addEventListener("click", function () {
      const currentActivePlayer = document.querySelector(
        ".hero-select-player_cli.active"
      );
      if (currentActivePlayer) {
        currentActivePlayer.classList.remove("active");
      }
      this.classList.add("active");

      const selectedValue = this.getAttribute("hero-select");

      const sceneElements = document.querySelectorAll("[character-scene]");
      sceneElements.forEach((sceneElement) => {
        sceneElement.style.display =
          sceneElement.getAttribute("hero-background") === selectedValue
            ? "block"
            : "none";
      });

      const descriptionElements = document.querySelectorAll(
        ".hero-player-description_cli"
      );
      descriptionElements.forEach((descriptionElement) => {
        if (
          descriptionElement.getAttribute("hero-description") === selectedValue
        ) {
          descriptionElement.style.display = "block";
          animateDescription(descriptionElement);
        } else {
          descriptionElement.style.display = "none";
        }
      });
    });
  });

  setTimeout(function () {
    const sceneElements = document.querySelectorAll("[character-scene]");
    let currentParent = null;
    let currentIndex = 0;

    sceneElements.forEach((sceneElement) => {
      const parentElement = sceneElement.parentElement;

      // Reset index if the parent changes
      if (parentElement !== currentParent) {
        currentParent = parentElement;
        currentIndex = 0;
      }

      sceneElement.style.display = currentIndex === 0 ? "block" : "none";
      currentIndex++;
    });
  }, 5000);

  const descriptionElements = document.querySelectorAll(
    ".hero-player-description_cli"
  );
  descriptionElements.forEach((descriptionElement, index) => {
    descriptionElement.style.display = index === 0 ? "block" : "none";
    if (index === 0) {
      animateDescription(descriptionElement);
    }
  });

  function animateDescription(descriptionElement) {
    const childElements = descriptionElement.querySelectorAll(
      ".hero-player-description_top, .hero-player-description_mid, .button"
    );
    childElements.forEach((childElement, index) => {
      childElement.classList.remove("visible"); // Reset visibility
      childElement.style.transitionDelay = `${index * 0.2}s`;
      childElement.classList.add("fade-in");
      setTimeout(() => {
        childElement.classList.add("visible");
        if (childElement.classList.contains("hero-player-description_mid")) {
          const paragraphElement = childElement.querySelector(
            ".hero-player-description"
          );
          if (paragraphElement) {
            typeWriterEffect(paragraphElement);
          }
          adjustPowerBars(childElement);
        }
        if (childElement.classList.contains("hero-player-description_top")) {
          animateWiggleNumbers(childElement);
        }
      }, 100); // Small delay to ensure transition applies
    });
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

  function adjustPowerBars(descriptionMidElement) {
    const powerBarWraps = descriptionMidElement.querySelectorAll(
      ".character-power_bar-wrap"
    );
    powerBarWraps.forEach((powerBarWrap, index) => {
      const powerBarTrigger = powerBarWrap.querySelector(
        '[hero-character-bar="trigger"]'
      );
      const powerBarTarget = powerBarWrap.querySelector(
        '[hero-character-bar="target"]'
      );
      if (powerBarTrigger && powerBarTarget) {
        const powerValue = parseInt(powerBarTrigger.textContent, 10); // Convert text to numeric value
        if (!isNaN(powerValue)) {
          powerBarTarget.style.width = "0%"; // Reset width to 0%
          powerBarTarget.style.transition = `width 0.8s ease-in-out ${
            index * 0.2
          }s`; // Animate width with delay
          setTimeout(() => {
            powerBarTarget.style.width = `${powerValue}%`; // Set width to target value
          }, 100); // Small delay to ensure transition applies
        }
      }
    });
  }

  function animateWiggleNumbers(topElement) {
    const wiggleTextElements = topElement.querySelectorAll(
      "[hero-wiggle-number]"
    );
    const randomNumbersArray = "1234567890".split("");

    wiggleTextElements.forEach((wiggleTextElement) => {
      const originalText = wiggleTextElement.innerText;
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
    });
  }
});

let lastScrollTop = 0;

window.addEventListener("scroll", function () {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;

  if (Math.abs(scrollTop - lastScrollTop) >= 1000) {
    ScrollTrigger.refresh();
    lastScrollTop = scrollTop;
  }
});
