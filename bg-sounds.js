$(document).ready(function () {
  let backgroundSound = new Howl({
    src: [
      "https://cdn.jsdelivr.net/gh/antonoratom/magura@0.1.0/sounds/IM%20Music.m4a",
    ],
    autoplay: true,
    loop: true, // Enable looping
    mute: true, // Start muted to comply with autoplay restrictions
  });

  // Unmute after user interaction
  $(document).one("click", function () {
    backgroundSound.mute(false);
  });

  let clickAnchorScroll = new Howl({
    src: [
      "https://cdn.jsdelivr.net/gh/antonoratom/magura@0.1.0/sounds/Click%20Wide%20Button.m4a",
    ],
  });
  let clickButton = new Howl({
    src: [
      "https://cdn.jsdelivr.net/gh/antonoratom/magura@0.1.0/sounds/On%20Click.m4a",
    ],
  });

  let hoverSound = new Howl({
    src: [
      "https://cdn.jsdelivr.net/gh/antonoratom/magura@0.1.0/sounds/Hover.m4a",
    ],
  });

  // Toggle mute/unmute functionality on click
  $("#sound").on("click", function () {
    $(this).toggleClass("muted");
    if ($(this).hasClass("muted")) {
      Howler.mute(true);
    } else {
      Howler.mute(false);
    }
  });

  // Play click sound
  $("[data-button-click]").on("click", function () {
    clickButton.play();
  });

  // Play click sound
  $("[data-anchor-click]").on("click", function () {
    clickAnchorScroll.play();
  });

  // Play hover sound
  $("[data-hover]").on("mouseenter", function () {
    hoverSound.play();
  });
});
