document.addEventListener("DOMContentLoaded", function () {
  const playerElements = document.querySelectorAll(".hero-select-player_cli");

  if (playerElements.length > 0) {
    // Set the fifth player as active by default
    const defaultPlayerIndex = 5;
    playerElements[defaultPlayerIndex].classList.add("active");

    const selectedValue =
      playerElements[defaultPlayerIndex].getAttribute("hero-select");

    // Ensure the correct background is displayed for the fifth player
    const isHeroType =
      playerElements[defaultPlayerIndex].getAttribute("character-type") ===
      "Hero";
    const sceneElements = isHeroType
      ? document.querySelectorAll("[character-scene]")
      : document.querySelectorAll(".hero-scene_wrap [character-scene]");

    sceneElements.forEach((sceneElement) => {
      sceneElement.style.display =
        sceneElement.getAttribute("hero-background") === selectedValue
          ? "block"
          : "none";
    });

    // Ensure the correct description is displayed for the fifth player
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

      // Check if the clicked element has the attribute [character-type="Hero"]
      const isHeroType = this.getAttribute("character-type") === "Hero";

      // Select the appropriate [character-scene] elements
      const sceneElements = isHeroType
        ? document.querySelectorAll("[character-scene]")
        : document.querySelectorAll(".hero-scene_wrap [character-scene]");

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
