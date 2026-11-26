
// ==========================================
// THE BURN BEFORE CHRISTMAS
// Website interactions
// ==========================================


// COUNTDOWN TIMER
// December 19, 2026 at 5:00 PM

const eventDate = new Date("December 19, 2026 17:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = eventDate - now;

  const daysElement = document.getElementById("days");
  const hoursElement = document.getElementById("hours");
  const minutesElement = document.getElementById("minutes");
  const secondsElement = document.getElementById("seconds");

  if (distance <= 0) {
    daysElement.textContent = "00";
    hoursElement.textContent = "00";
    minutesElement.textContent = "00";
    secondsElement.textContent = "00";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor(
    (distance % (1000 * 60 * 60)) / (1000 * 60)
  );
  const seconds = Math.floor(
    (distance % (1000 * 60)) / 1000
  );

  daysElement.textContent = String(days).padStart(2, "0");
  hoursElement.textContent = String(hours).padStart(2, "0");
  minutesElement.textContent = String(minutes).padStart(2, "0");
  secondsElement.textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);


// MOBILE NAVIGATION

const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  // Close the menu after selecting a section
  siteNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
    });
  });
}


// RSVP PREVIEW

const rsvpForm = document.getElementById("rsvp-form");
const formNote = document.getElementById("form-note");

if (rsvpForm && formNote) {
  rsvpForm.addEventListener("submit", event => {
    event.preventDefault();

    const guestName = document.getElementById("guest-name").value.trim();
    const attendance = document.getElementById("attendance").value;

    if (!guestName || !attendance) {
      formNote.textContent = "Please complete both fields.";
      return;
    }

    if (attendance === "yes") {
      formNote.textContent =
        `Thank you, ${guestName}! Your preview RSVP is ready. We'll need to connect a form service to save it.`;
    } else {
      formNote.textContent =
        `Thank you for letting us know, ${guestName}. We'll miss you!`;
    }

    rsvpForm.reset();
  });
}
