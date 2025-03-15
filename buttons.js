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
