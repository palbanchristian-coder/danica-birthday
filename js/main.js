document.addEventListener("DOMContentLoaded", () => {
  const $ = (selector) => document.querySelector(selector);
  const toast = $("#toast");
  let toastTimer;
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
  }

  // Mobile navigation
  const menuToggle = $("#menuToggle");
  const navigation = $("#navigation");
  menuToggle.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
  navigation.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }));

  // Birthday candle interaction
  const cake = $("#interactiveCake");
  const wishButton = $("#wishButton");
  const cakeHint = $("#cakeHint");
  function makeWish() {
    const blown = cake.classList.toggle("blown");
    cakeHint.textContent = blown
      ? "Your wish is on its way. May this year be kind to you! ♡"
      : "Your candle is glowing again. Make another wish!";
    wishButton.textContent = blown ? "Light the candle again ✨" : "Make a wish & blow the candle ✨";
    if (blown) {
      confettiBurst();
      showToast("A little birthday wish just for you, Ma'am Danica! ♡");
    }
  }
  cake.addEventListener("click", makeWish);
  cake.addEventListener("keydown", e => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); makeWish(); }
  });
  wishButton.addEventListener("click", makeWish);

  // Lightweight confetti made with DOM elements
  function confettiBurst() {
    const colors = ["#e9a9bd", "#c9b9e2", "#f4c98d", "#f4dce5", "#b7cbb4"];
    for (let i = 0; i < 34; i++) {
      const piece = document.createElement("span");
      piece.style.cssText = `position:fixed;z-index:100;top:42%;left:${35 + Math.random()*30}%;width:7px;height:10px;background:${colors[i % colors.length]};border-radius:2px;pointer-events:none;`;
      document.body.appendChild(piece);
      const x = (Math.random() - .5) * 520;
      const y = 250 + Math.random() * 260;
      piece.animate([
        { transform: "translate(0,0) rotate(0deg)", opacity: 1 },
        { transform: `translate(${x}px,${y}px) rotate(${Math.random()*720}deg)`, opacity: 0 }
      ], { duration: 1100 + Math.random()*700, easing: "cubic-bezier(.2,.7,.3,1)" }).onfinish = () => piece.remove();
    }
  }

  // Letters from home
  const letterPaper = $("#letterPaper");
  const letterTitle = $("#letterTitle");
  const letterText = $("#letterText");
  document.querySelectorAll("[data-letter]").forEach(button => {
    button.addEventListener("click", () => {
      const letter = window.homeLetters[Number(button.dataset.letter)];
      letterTitle.textContent = letter.title;
      letterText.textContent = letter.text;
      letterPaper.hidden = false;
      letterPaper.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });
  $("#closeLetter").addEventListener("click", () => { letterPaper.hidden = true; });

  // Random comforting reminders
  let previousMessage = -1;
  $("#messageButton").addEventListener("click", () => {
    const messages = window.homeMessages;
    let index = Math.floor(Math.random() * messages.length);
    if (messages.length > 1 && index === previousMessage) index = (index + 1) % messages.length;
    previousMessage = index;
    $("#randomMessage").textContent = messages[index];
  });

  // Audio note if the sample audio file has not been added
  const player = $("#musicPlayer");
  player.addEventListener("error", () => showToast("Add your-song.mp3 to assets/music to enable the music player."));
});
