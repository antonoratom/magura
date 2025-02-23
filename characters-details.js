// Define a reusable module for animations
const AnimationModule = (() => {
  const addVisibleClassToElements = (element) => {
    const childElements = element.querySelectorAll(
      ".person-card-cont_top, .person-card-cont_mid, .person-card-cont_bot"
    );
    childElements.forEach((childElement, index) => {
      childElement.classList.remove("visible");
      childElement.style.transitionDelay = `${index * 0.2}s`;
      childElement.classList.add("fade-in");
      setTimeout(() => {
        childElement.classList.add("visible");
        if (childElement.classList.contains("person-card-cont_mid")) {
          adjustProgressBars(childElement);
        }
        if (childElement.classList.contains("person-card-cont_top")) {
          animateRandomNumbers(childElement);
        }
      }, 100);
    });
  };

  const adjustProgressBars = (midElement) => {
    const progressBarWrappers = midElement.querySelectorAll(
      ".character-power_bar-wrap"
    );
    progressBarWrappers.forEach((barWrap, index) => {
      const barTrigger = barWrap.querySelector('[character-bar="trigger"]');
      const barTarget = barWrap.querySelector('[character-bar="target"]');
      if (barTrigger && barTarget) {
        const powerValue = parseInt(barTrigger.textContent, 10);
        if (!isNaN(powerValue)) {
          barTarget.style.width = "0%";
          barTarget.style.transition = `width 0.8s ease-in-out ${index * 0.2}s`;
          setTimeout(() => {
            barTarget.style.width = `${powerValue}%`;
          }, 100);
        }
      }
    });
  };

  const animateRandomNumbers = (topElement) => {
    const randomTextElements = topElement.querySelectorAll(
      "[data-wiggle-number]"
    );
    const randomNumbersArray = "1234567890".split("");

    randomTextElements.forEach((textElement, index) => {
      // Store the initial text content in a data attribute
      if (!textElement.dataset.originalText) {
        textElement.dataset.originalText = textElement.innerText;
      }
      const originalText = textElement.dataset.originalText;
      console.log(`Initial Value [Element ${index}]: ${originalText}`); // Log the initial value with index

      let frameCount = 0;

      const animateFrame = () => {
        if (frameCount < 100) {
          if (frameCount % 6 === 0) {
            const randomString = Array.from(originalText)
              .map(
                () =>
                  randomNumbersArray[
                    Math.floor(Math.random() * randomNumbersArray.length)
                  ]
              )
              .join("");
            textElement.innerText = randomString;
            console.log(`Randomized Value [Element ${index}]: ${randomString}`); // Log the randomized value with index
          }
          frameCount++;
          requestAnimationFrame(animateFrame);
        } else {
          // Restore the original text from the data attribute
          textElement.innerText = originalText;
          console.log(`Restored Value [Element ${index}]: ${originalText}`); // Log the restored value with index
        }
      };

      animateFrame();
    });
  };

  const animateDescription = (descriptionElement) => {
    const childElements = descriptionElement.querySelectorAll(
      ".person-card-cont_top, .person-card-cont_mid, .person-card-cont_bot"
    );
    childElements.forEach((childElement, index) => {
      childElement.classList.remove("visible");
      childElement.style.transitionDelay = `${index * 0.2}s`;
      childElement.classList.add("fade-in");
      setTimeout(() => {
        childElement.classList.add("visible");
        if (childElement.classList.contains("person-card-cont_mid")) {
          const paragraphElement = childElement.querySelector(
            ".hero-player-description"
          );
          if (paragraphElement) {
            typeWriterEffect(paragraphElement);
          }
          adjustProgressBars(childElement);
        }
        if (childElement.classList.contains("person-card-cont_top")) {
          // Ensure this call is only done once per element
          if (!childElement.dataset.randomized) {
            animateRandomNumbers(childElement);
            childElement.dataset.randomized = true; // Set a flag to prevent reanimation
          }
        }
      }, 100);
    });
  };

  const typeWriterEffect = (paragraphElement) => {
    const textContent = paragraphElement.textContent;
    paragraphElement.textContent = "";
    paragraphElement.classList.add("typewriter");
    let charIndex = 0;
    const typingSpeed = 1400 / textContent.length;

    const type = () => {
      if (charIndex < textContent.length) {
        paragraphElement.textContent += textContent.charAt(charIndex);
        charIndex++;
        setTimeout(type, typingSpeed);
      } else {
        paragraphElement.classList.remove("typewriter");
      }
    };

    type();
  };

  return {
    addVisibleClassToElements,
    adjustProgressBars,
    animateRandomNumbers,
    animateDescription,
  };
})();

// Integrate with GSAP ScrollTrigger
document.addEventListener("DOMContentLoaded", () => {
  const triggers = document.querySelectorAll("[chaacter-scroll-trigger]");

  triggers.forEach((trigger) => {
    const dynamicData = trigger.getAttribute("chaacter-scroll-trigger");
    const target = document.querySelector(
      `[chaacter-scroll-target='${dynamicData}']`
    );

    if (target) {
      gsap.fromTo(
        target,
        { opacity: 0 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: trigger,
            start: "top center",
            end: "bottom center",
            scrub: true,
            // markers: true,
            onEnter: () => {
              AnimationModule.addVisibleClassToElements(target);
              AnimationModule.animateDescription(target);
            },
          },
        }
      );
    }
  });
});

//------ CALCULATE WIDTH OF BAR, SET PERCENTS --------//
// Select elements by their attributes
let collectedCurrentElement = document.querySelector("[collected-current]");
let collectedGoalElement = document.querySelector("[collected-goal]");
let collectedPercentsElement = document.querySelector("[collected-percents]");
let collectedBarElement = document.querySelector("[collected-bar]");

// Convert the text content to numeric values
let collectedCurrent = parseFloat(collectedCurrentElement.innerText);
let collectedGoal = parseFloat(collectedGoalElement.innerText);

// Calculate the percentage
let collectedPercents = (collectedCurrent * 100) / collectedGoal;

// Update the collected-percents element
collectedPercentsElement.innerText = collectedPercents.toFixed(0);

// Set the width of the collected-bar
collectedBarElement.style.width = collectedPercents + "%";
