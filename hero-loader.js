console.log('test-message);
// loaderAnimation.js
function startLoadingAnimation() {
  const start = performance.now();

  const imgLoad = new imagesLoaded(
    "body",
    { background: true },
    onImagesLoaded
  );
  const numImages = imgLoad.images.length;
  const minAnimationTime = 3500; // Minimum animation time in milliseconds

  imgLoad.on("progress", function (instance, image) {
    const progress = instance.progressedCount / numImages;
    document.querySelector("[loader-p]").textContent = `${Math.round(
      progress * 100
    )}`;

    gsap.to("[loader-bar]", {
      width: `${progress * 100}%`,
      duration: minAnimationTime / 1000,
      ease: "none",
    });

    gsap.to("[loader-p]", {
      textContent: Math.round(progress * 100),
      duration: minAnimationTime / 1000,
      ease: "none",
      roundProps: "textContent",
    });
  });

  function onImagesLoaded() {
    const end = performance.now();
    const duration = end - start;
    const remainingTime = Math.max(minAnimationTime - duration, 0);

    // Create a GSAP timeline
    const heroTl = gsap.timeline();

    // Add animations to the timeline
    heroTl.to(".loader-wrap", {
      delay: remainingTime / 1000,
      opacity: 0,
      scale: 1,
      duration: 0.6,
    });

    const heroPlayers = document.querySelector("[hero-players]");
    heroTl.to(
      heroPlayers,
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
      },
      "<0"
    );

    heroTl.from(
      "[hero-imgs-character]",
      {
        scale: 0.8,
        duration: 0.8,
      },
      "<0"
    );

    heroTl.to(
      "[hero-character-wrap]",
      {
        opacity: 1,
        duration: 0,
      },
      "<0"
    );

    heroTl.to(
      "[hero-imgs-loop]",
      {
        opacity: 0,
        duration: 0,
      },
      "<0"
    );
    heroTl.to(
      "[cta-on-load]",
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
      },
      "<0.2"
    );

    heroTl.set("[hero-imgs-loop]", { display: "none" }, "<0");

    heroTl.to(
      "[hero-nav]",
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        onComplete: function () {
          // Start Lenis when the timeline completes
          lenis.start();
        },
      },
      "<0.4"
    );
  }
}

// Export the function to be called from the module
export { startLoadingAnimation };
