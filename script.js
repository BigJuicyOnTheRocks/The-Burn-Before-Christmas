
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

  if (!daysElement || !hoursElement || !minutesElement || !secondsElement) return;

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

  siteNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
    });
  });
}


// RSVP FORM — GOOGLE SHEETS CONNECTION

const rsvpForm = document.getElementById("rsvp-form");
const formNote = document.getElementById("form-note");

const scriptURL = "https://script.google.com/macros/s/AKfycbzl7KxVlHiupITBnZ3AtnI6PIhcfavHeNRjHvXTIZLPegmWvJmjgbUyHEQOSZeCHbXuUQ/exec";

if (rsvpForm && formNote) {
  rsvpForm.addEventListener("submit", async event => {
    event.preventDefault();

    const guestName = document.getElementById("guest-name").value.trim();
    const attendance = document.getElementById("attendance").value;

    if (!guestName || !attendance) {
      formNote.textContent = "Please complete both fields.";
      return;
    }

    const submitButton = rsvpForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    formNote.textContent = "Sending your RSVP...";

    const formData = new URLSearchParams();
    formData.append("firstName", guestName);
    formData.append("attendance", attendance);
    formData.append("notes", "");

    try {
      await fetch(scriptURL, {
        method: "POST",
        mode: "no-cors",
        body: formData
      });

      if (attendance === "yes") {
        formNote.textContent =
          `Thank you, ${guestName}! Your RSVP has been submitted. We can't wait to see you!`;
      } else {
        formNote.textContent =
          `Thank you for letting us know, ${guestName}. We'll miss you!`;
      }

      rsvpForm.reset();

    } catch (error) {
      formNote.textContent =
        "Something went wrong. Please try again or contact the host.";

      console.error("RSVP submission error:", error);

    } finally {
      submitButton.disabled = false;
    }
  });
}
