const typingText = document.querySelector(".lead");
const roles = ["Web Developer", "Designer", "Coder"];
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typingEffect() {
  const current = roles[roleIndex];

  if (!deleting) {
    typingText.textContent = current.slice(0, charIndex++);
  } else {
    typingText.textContent = current.slice(0, charIndex--);
  }

  if (charIndex === current.length + 1) {
    deleting = true;
    setTimeout(() => {}, 800);
  }

  if (deleting && charIndex === 0) {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
  }

  setTimeout(typingEffect, deleting ? 70 : 120);
}
typingEffect();



const sections = document.querySelectorAll("section");

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = "translateY(0)";
    }
  });
}, { threshold: 0.15 });

sections.forEach(sec => {
  sec.style.opacity = 0;
  sec.style.transform = "translateY(40px)";
  sec.style.transition = "0.8s ease";
  sectionObserver.observe(sec);
});

/* ======================================
   3. Skills Collapse – Auto Close Others
   ====================================== */

const skillItems = document.querySelectorAll(".skill-item");

skillItems.forEach(item => {
  item.addEventListener("click", () => {
    document
      .querySelectorAll(".skill-level.show")
      .forEach(open => {
        if (open !== item.nextElementSibling) {
          open.classList.remove("show");
        }
      });
  });
});

/* =================================
   4. Navbar Active Link on Scroll
   ================================= */

const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

/* ==========================
   5. Contact Form Validation
   ========================== */

const form = document.querySelector("form");

form.addEventListener("submit", e => {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (name.length < 3) {
    alert("Name must be at least 3 characters.");
    e.preventDefault();
    return;
  }

  if (!email.includes("@")) {
    alert("Enter a valid email address.");
    e.preventDefault();
    return;
  }

  if (message.length < 20) {
    alert("Message must be at least 20 characters.");
    e.preventDefault();
  }
});
function updateDateTime() {
  const now = new Date();

  const options = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  };

  document.getElementById("datetime").textContent =
    now.toLocaleDateString('en-US', options);
}

setInterval(updateDateTime, 1000);
updateDateTime();
/* ==========================
   Visitor Counter (Footer)
   ========================== */

fetch('https://api.countapi.xyz/hit/yashwanth-portfolio/visits')
  .then(response => response.json())
  .then(data => {
    document.getElementById('visitor-count').innerText = data.value;
  })
  .catch(() => {
    document.getElementById('visitor-count').innerText = 'N/A';
  });

