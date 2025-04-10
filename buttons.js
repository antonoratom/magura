const buttons = document.querySelectorAll("[for-button]");
const randomLetters = "ЂЉЊЋЌЎЏ".split("");

class Link {
  constructor(button, idx) {
    this.button = button;
    this.idx = idx;
    this.textElement = button.querySelector("[for-button-p]"); // Select the specific child element
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

var updateAttributes = function () {
  var targets = document.querySelectorAll(
    '[fs-mirrorclick-element^="target-"]'
  );
  var triggers = document.querySelectorAll(
    '[fs-mirrorclick-element^="trigger-"]'
  );
  console.log("Targets found:", targets.length);
  console.log("Triggers found:", triggers.length);

  if (targets.length === 3 && triggers.length === 3) {
    targets.forEach(function (target, index) {
      var number = 301 + index;
      var newTarget = "target-" + number;
      target.setAttribute("fs-mirrorclick-element", newTarget);
    });

    triggers.forEach(function (trigger, index) {
      var number = 301 + index;
      var newTrigger = "trigger-" + number;
      trigger.setAttribute("fs-mirrorclick-element", newTrigger);
    });

    console.log("Attributes updated successfully.");

    // Disconnect the observer once the attributes are updated
    observer.disconnect();
  }
};

$(document).ready(function () {
  const $follower = $("[trigger-to-play-sound]");
  let mouseMoveHandler;

  if ($follower.length) {
    // Track mouse movement
    mouseMoveHandler = function (e) {
      $follower.css({
        left: e.pageX + "px",
        top: e.pageY + "px",
        position: "absolute",
        transform: "translate(-50%, -95%)",
        pointerEvents: "none", // optional: makes sure it doesn’t block clicks
      });
    };

    $(document).on("mousemove", mouseMoveHandler);

    // On first click, fade out and remove tracking
    $(document).one("click", function () {
      $(document).off("mousemove", mouseMoveHandler); // stop tracking

      $follower.fadeOut(300, function () {
        $follower.remove(); // optional: remove from DOM after fade
      });
    });
  }
});
