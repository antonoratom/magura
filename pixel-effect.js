//PIXELS SECTIONS REVEAL ——— GSAP
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

// ----- PAGE LOADING TIMELINE ----- //
gsap.to(".load_grid-item", {
  opacity: 0,
  duration: 0.1,
  stagger: { amount: 0.8, from: "random" },
  onComplete: () => {
    gsap.set(".load_grid", { display: "none" });
  },
});

// Code that runs on click of a link
$(document).ready(function () {
  $("a").on("click", function (e) {
    if (
      $(this).prop("hostname") === window.location.host &&
      $(this).attr("href").indexOf("#") === -1 &&
      $(this).attr("target") !== "_blank"
    ) {
      e.preventDefault();
      let destination = $(this).attr("href");
      gsap.set(".load_grid", { display: "grid" });
      gsap.fromTo(
        ".load_grid-item",
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.1,
          stagger: { amount: 0.8, from: "random" }, //you can also try a from: "start" or "end" -- get creative!
          onComplete: () => {
            window.location = destination;
          },
        }
      );
    }
  });

  // On click of the back button
  window.onpageshow = function (event) {
    if (event.persisted) {
      window.location.reload();
    }
  };
});
