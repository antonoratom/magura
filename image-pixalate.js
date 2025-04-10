(function (root) {
  window.URL = window.URL || window.webkitURL || window.mozURL;

  function disableSmoothRendering(ctx) {
    ctx.webkitImageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled = false;
    ctx.msImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
    return ctx;
  }

  function Pixelate(image, opts) {
    opts = opts || {};
    this.image = image;
    this.setAmount(opts.amount);

    var imageLoaded = function () {
      this.imageUrl = image.src;
      this.width = image.clientWidth;
      this.height = image.clientHeight;

      this.canvas = document.createElement("canvas");
      this.canvas.style.display = "none";
      this.canvas.width = this.width;
      this.canvas.height = this.height;

      this.canvas.style.cssText =
        "image-rendering: optimizeSpeed;" + // FireFox < 6.0
        "image-rendering: -moz-crisp-edges;" + // FireFox
        "image-rendering: -o-crisp-edges;" + // Opera
        "image-rendering: -webkit-crisp-edges;" + // Chrome
        "image-rendering: crisp-edges;" + // Chrome
        "image-rendering: -webkit-optimize-contrast;" + // Safari
        "image-rendering: pixelated; " + // Future browsers
        "-ms-interpolation-mode: nearest-neighbor;"; // IE

      this.ctx = this.canvas.getContext("2d");
      this.ctx = disableSmoothRendering(this.ctx);

      this.image.parentNode.appendChild(this.canvas, this.image);
      this.image.onload = null;

      this.pixelImage = new Image();
      this.pixelImage.onload = function () {
        this.ready = true;
        this.render();
      }.bind(this);
      this.pixelImage.src = this.imageUrl;
    }.bind(this);

    if (this.image.complete) {
      imageLoaded();
    }

    this.image.onload = imageLoaded;

    return this;
  }

  Pixelate.prototype.setAmount = function (amount) {
    this.amount = 1 - (amount || 0);
    return this;
  };

  Pixelate.prototype.setWidth = function (width) {
    var height = (this.height / this.width) * width;
    this.width = width;
    this.height = height;
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.ctx = disableSmoothRendering(this.ctx);
    return this;
  };

  Pixelate.prototype.render = function () {
    if (!this.ready) return this;
    var w = this.width * (this.amount <= 0 ? 0.01 : this.amount);
    var h = this.height * (this.amount <= 0 ? 0.01 : this.amount);
    // render smaller image
    this.ctx.drawImage(this.pixelImage, 0, 0, w, h);
    // stretch the smaller image
    this.ctx.drawImage(this.canvas, 0, 0, w, h, 0, 0, this.width, this.height);
    this.image.src = this.canvas.toDataURL("image/png");
    return this;
  };

  if (typeof exports !== "undefined") {
    if (typeof module !== "undefined" && module.exports) {
      exports = module.exports = Pixelate;
    }
    exports.pixelate = Pixelate;
  } else if (typeof define === "function" && define.amd) {
    define([], function () {
      return Pixelate;
    });
  } else {
    root.Pixelate = Pixelate;
  }
})(this);

// ------- CODE TO ADJUST -------- //
$(".merch-cli").each(function () {
  const merchCli = $(this); // <-- cache current merch-cli
  const triggers = merchCli.find("[pixalate-img-trigger]");
  const targets = merchCli.find("[pixalate-img-target]");

  triggers.each(function () {
    const trigger = this;
    const triggerId = $(trigger).attr("pixalate-img-trigger");
    const target = targets.filter(`[pixalate-img-target='${triggerId}']`);

    if (target.length) {
      const image = target[0];
      const pixelate = new Pixelate(image, { amount: 0 });
      const pixel = { value: 0.9 };

      const pixaleteTl = gsap.timeline({
        paused: true,
        markers: true,
        onUpdate: () => {
          pixelate.setAmount(pixel.value).render();
        },
        defaults: {
          delay: 0.15,
        },
        ease: "power2.in",
      });

      pixaleteTl.set(pixel, { value: 0.97, delay: 0 });
      pixaleteTl.set(pixel, { value: 0.9 });
      pixaleteTl.set(pixel, { value: 0.86 });
      pixaleteTl.set(pixel, { value: 0 });

      $(trigger).on("click", function () {
        console.log(`Trigger clicked: ${triggerId}`);
        console.log(`Target affected: ${target.attr("pixalate-img-target")}`);

        // Scoped to current merch-cli
        triggers.removeClass("current-link");
        $(trigger).addClass("current-link");

        merchCli.find(".merch-preview_img-wrap").removeClass("current-tab");
        target.closest(".merch-preview_img-wrap").addClass("current-tab");

        pixaleteTl.restart();
      });

      window.addEventListener("resize", function () {
        pixelate.setWidth(image.parentNode.clientWidth).render();
      });
    }
  });
});
