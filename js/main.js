
document.addEventListener("DOMContentLoaded", () => {

  // =================================
  // BASIC SELECTORS
  // =================================

  const $ = (selector) => document.querySelector(selector);

  const toast = $("#toast");
  let toastTimer;

  function showToast(message) {
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 2600);
  }


  // =================================
  // MOBILE NAVIGATION
  // =================================

  const menuToggle = $("#menuToggle");
  const navigation = $("#navigation");

  if (menuToggle && navigation) {

    menuToggle.addEventListener("click", () => {

      const isOpen = navigation.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));

    });

    navigation.querySelectorAll("a").forEach(link => {

      link.addEventListener("click", () => {

        navigation.classList.remove("open");

        menuToggle.setAttribute("aria-expanded", "false");

      });

    });

  }


  // =================================
  // BIRTHDAY CANDLE INTERACTION
  // =================================

  const cake = $("#interactiveCake");
  const wishButton = $("#wishButton");
  const cakeHint = $("#cakeHint");

  function makeWish() {

    if (!cake || !cakeHint || !wishButton) return;

    const blown = cake.classList.toggle("blown");

    cakeHint.textContent = blown
      ? "Your wish is on its way. May this year be kind to you! ♡"
      : "Your candle is glowing again. Make another wish!";

    wishButton.textContent = blown
      ? "Light the candle again ✨"
      : "Make a wish & blow the candle ✨";

    if (blown) {

      confettiBurst();

      showToast("A little birthday wish just for you, Ma'am Danica! ♡");

    }

  }

  if (cake) {

    cake.addEventListener("click", makeWish);

    cake.addEventListener("keydown", e => {

      if (e.key === "Enter" || e.key === " ") {

        e.preventDefault();

        makeWish();

      }

    });

  }

  if (wishButton) {

    wishButton.addEventListener("click", makeWish);

  }


  // =================================
  // CONFETTI ANIMATION
  // =================================

  function confettiBurst() {

    const colors = [
      "#e9a9bd",
      "#c9b9e2",
      "#f4c98d",
      "#f4dce5",
      "#b7cbb4"
    ];

    for (let i = 0; i < 34; i++) {

      const piece = document.createElement("span");

      piece.style.cssText = `
        position: fixed;
        z-index: 100;
        top: 42%;
        left: ${35 + Math.random() * 30}%;
        width: 7px;
        height: 10px;
        background: ${colors[i % colors.length]};
        border-radius: 2px;
        pointer-events: none;
      `;

      document.body.appendChild(piece);

      const x = (Math.random() - 0.5) * 520;

      const y = 250 + Math.random() * 260;

      piece.animate(
        [
          {
            transform: "translate(0,0) rotate(0deg)",
            opacity: 1
          },
          {
            transform: `translate(${x}px,${y}px) rotate(${Math.random() * 720}deg)`,
            opacity: 0
          }
        ],
        {
          duration: 1100 + Math.random() * 700,
          easing: "cubic-bezier(.2,.7,.3,1)"
        }
      ).onfinish = () => piece.remove();

    }

  }


  // =================================
  // LETTERS FROM HOME
  // =================================

  const letterPaper = $("#letterPaper");
  const letterTitle = $("#letterTitle");
  const letterText = $("#letterText");
  const closeLetter = $("#closeLetter");

  const homeLetters = [

    {
      title: "Dear Ma'am Danica,",

      text: "If you are missing home today, I hope you remember that distance cannot erase the people and memories that make you feel loved. It's okay to miss familiar faces, food, places, and routines. Take your time, be gentle with yourself, and remember that you have people back home who are wishing you well."
    },

    {
      title: "For a difficult day,",

      text: "Teaching, adjusting to a different country, and building a life far from what is familiar takes courage. You do not have to make every day a perfect one. Take a breath, rest when you need to, and give yourself credit for showing up. Tomorrow is another chance."
    },

    {
      title: "A little reminder,",

      text: "Even when we are not nearby, you are not forgotten. I hope you find kind people to share a laugh with, places that slowly feel familiar, and little moments that make Indonesia feel more like a second home. You deserve friendship and warmth wherever life takes you."
    },

    {
      title: "Just for your smile,",

      text: "This is your reminder to smile, drink some water, eat something delicious, and do one little thing that makes you happy. You are appreciated not only for being a teacher, but simply for being you. Sending a big virtual hug!"
    }

  ];

  document.querySelectorAll("[data-letter]").forEach(button => {

    button.addEventListener("click", () => {

      const index = Number(button.dataset.letter);

      const letter = homeLetters[index];

      if (!letter || !letterPaper || !letterTitle || !letterText) return;

      letterTitle.textContent = letter.title;

      letterText.textContent = letter.text;

      letterPaper.hidden = false;

      letterPaper.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });

    });

  });

  if (closeLetter && letterPaper) {

    closeLetter.addEventListener("click", () => {

      letterPaper.hidden = true;

    });

  }


// =================================
// RANDOM COMFORTING REMINDERS
// =================================

const messages = [
  "You have already made it through so many new beginnings. Be proud of how far you've come.",
  "Even on the days you feel far away, remember that you are thought of, appreciated, and cheered on.",
  "You don't have to be strong every minute. Rest is part of the journey, too.",
  "A little reminder: you are doing better than you think. Keep giving yourself the kindness you give others.",
  "May you find good people, lovely places, and small reasons to smile wherever you are.",
  "Home is made of people and memories. The love you carry can travel with you.",
  "One day at a time, Ma'am Danica. You're growing through every experience."
];

let previousMessage = -1;

const messageButton = $("#messageButton");
const randomMessage = $("#randomMessage");

if (messageButton && randomMessage) {
  messageButton.addEventListener("click", () => {
    let index = Math.floor(Math.random() * messages.length);

    if (messages.length > 1 && index === previousMessage) {
      index = (index + 1) % messages.length;
    }

    previousMessage = index;
    randomMessage.textContent = messages[index];
  });
}


  // =================================
  // MUSIC PLAYER
  // =================================

  const player = $("#musicPlayer");

  if (player) {

    player.addEventListener("error", () => {

      showToast("The music file could not be loaded. Please check its location. ♡");

    });

  }

});
