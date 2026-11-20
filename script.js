document.addEventListener("DOMContentLoaded", function () {

  // Favorite Button
  const favoriteBtn = document.querySelector(".favorite-btn");

  if (favoriteBtn) {
    favoriteBtn.addEventListener("click", function () {

      const isFavorite =
        this.classList.toggle("is-favorite");

      this.setAttribute("aria-pressed", isFavorite);

      const icon = this.querySelector("i");

      icon.classList.toggle("fa-solid", isFavorite);
      icon.classList.toggle("fa-regular", !isFavorite);

      this.setAttribute(
        "aria-label",
        isFavorite ? "Remove from favorites" : "Add to favorites"
      );

    });
  }

  // Share Button
  const shareBtn = document.querySelector(".share-btn");

  if (shareBtn) {
    shareBtn.addEventListener("click", async function () {

      const shareData = {
        title: "Mahindra Thar OG | CarNhomes",
        text: "Check out this car on CarNhomes!",
        url: window.location.href
      };

      try {
        if (navigator.share) {
          await navigator.share(shareData);
        } else if (navigator.clipboard &&
                   window.isSecureContext) {
          await navigator.clipboard.writeText(shareData.url);
          alert("Car link copied successfully!");
        } else {
          window.prompt("Copy this car link:", shareData.url);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          alert("Unable to share the car link.");
        }
      }

    });
  }

});


// REVIEW PART CODE START

document.addEventListener("DOMContentLoaded", function () {
  const track = document.getElementById("reviewTrack");
  const prev = document.getElementById("reviewPrev");
  const next = document.getElementById("reviewNext");
  const dotsBox = document.getElementById("reviewDots");

  if (!track) return;

  const cards = Array.from(track.querySelectorAll(".reviewCard"));

  function step() {
    const gap = parseFloat(getComputedStyle(track).columnGap) || 20;
    return cards[0].offsetWidth + gap;
  }

  // Dots
  function buildDots() {
    if (!dotsBox) return;
    dotsBox.innerHTML = "";
    cards.forEach(function () { dotsBox.appendChild(document.createElement("span")); });
  }

  function update() {
    const index = Math.round(track.scrollLeft / step());
    if (dotsBox) {
      Array.from(dotsBox.children).forEach(function (d, i) {
        d.classList.toggle("active", i === index);
      });
    }
    const maxScroll = track.scrollWidth - track.clientWidth - 2;
    if (prev) prev.disabled = track.scrollLeft <= 2;
    if (next) next.disabled = track.scrollLeft >= maxScroll;
  }

  if (prev) prev.addEventListener("click", function () { track.scrollBy({ left: -step(), behavior: "smooth" }); });
  if (next) next.addEventListener("click", function () { track.scrollBy({ left: step(), behavior: "smooth" }); });

  // Keyboard arrows when slider is focused
  track.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") track.scrollBy({ left: step(), behavior: "smooth" });
    if (e.key === "ArrowLeft") track.scrollBy({ left: -step(), behavior: "smooth" });
  });

  track.addEventListener("scroll", function () { window.requestAnimationFrame(update); });
  window.addEventListener("resize", update);

  buildDots();
  update();
});

// REVIEW PART CODE END

