
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
