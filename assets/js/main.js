
    const answers = [
      {keys: ["about", "manuel", "who", "profile"], text: "Manuel Diaz is a Software Engineer focused on frontend development. The resume highlights React, TypeScript, JavaScript, frontend architecture, automated testing, CI/CD, analytics and backend integration."},
      {keys: ["mcgraw", "smartbook"], text: "From Apr 2024 to Jun 2026, Manuel worked remotely with McGraw Hill in Copenhagen, focusing on SmartBook 2.0. The portfolio describes frontend architecture, an NX monorepo migration, Playwright E2E testing, accessibility/VPAT work, release optimization and i18n."},
      {keys: ["raiffeisen", "bank", "rbo"], text: "From Jun 2021 to Apr 2023, Manuel worked as a Frontend Engineer on Raiffeisen Business Online. The work included React, TypeScript, Redux, styled-components, Jest, analytics-driven UX improvements, Java/Spring integration and GitLab CI/CD."},
      {keys: ["stack", "technology", "tech", "react", "typescript"], text: "The listed stack includes TypeScript, JavaScript, React, Redux, HTML5/CSS3, styled-components, Bootstrap, Node.js, Express, Java/Spring, REST APIs, JWT, Jest, Playwright, GitLab CI/CD, NX, i18n, BabelEdit and Google Analytics."},
      {keys: ["education", "university", "degree", "study"], text: "Manuel completed a Master's Degree in Computer Science and Engineering at Sabancı University in Istanbul, Turkey, from 2016 to 2020. The resume also lists AWS Cloud Fundamentals."},
      {keys: ["impact", "metrics", "result"], text: "The resume reports approximately 20% less code duplication after the NX monorepo migration, 40% faster releases, 3× improved E2E test reliability, and 10× faster E2E execution compared with the previous Protractor setup."}
    ];
    function reply(q) {q = q.toLowerCase(); const a = answers.find(x => x.keys.some(k => q.includes(k))); return a ? a.text : "I can answer from the portfolio about Manuel's experience, SmartBook 2.0, Raiffeisen Business Online, BeautyConnect, technology stack, education, or reported engineering impact."}
    const chat = document.getElementById("chat"), messages = document.getElementById("messages"), input = document.getElementById("chatInput");
    function add(text, cls) {const d = document.createElement("div"); d.className = "msg " + cls; d.textContent = text; messages.appendChild(d); messages.scrollTop = messages.scrollHeight}
    function ask(q) {add(q, "user"); setTimeout(() => add(reply(q), "bot"), 280)}
    document.getElementById("chatToggle").onclick = () => chat.classList.toggle("open");
    document.getElementById("chatClose").onclick = () => chat.classList.remove("open");
    document.getElementById("chatForm").onsubmit = e => {e.preventDefault(); if (input.value.trim()) {ask(input.value.trim()); input.value = ""} };
    document.querySelectorAll(".quick button").forEach(b => b.onclick = () => ask(b.dataset.q));

    // Timeline interaction: show only the selected experience period.
    function selectStep(index, el) {
      document.querySelectorAll(".timeline .item").forEach(item => item.classList.remove("active"));
      if (el) el.classList.add("active");

      const cards = document.querySelectorAll(".exp-list .exp");
      cards.forEach((card, i) => {
        card.style.display = i === index ? "grid" : "none";
      });
    }

    // Initial state: first timeline circle is active and first experience is visible.
    document.addEventListener("DOMContentLoaded", () => {
      const first = document.querySelector(".timeline .item.active");
      selectStep(0, first);
    });

    const observer = new IntersectionObserver(es => es.forEach(e => {if (e.isIntersecting) e.target.classList.add("show")}), {threshold: .1});
    document.querySelectorAll(".reveal").forEach(e => observer.observe(e));
  


    const rings = document.querySelectorAll(".ring-progress");
    const radius = 70;
    const circumference = 2 * Math.PI * radius;

    rings.forEach(ring => {
      ring.style.strokeDasharray = circumference;
      ring.style.strokeDashoffset = circumference;
    });

    const ringObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const ring = entry.target;
          const percent = Number(ring.dataset.percent);
          // calculate final position
          const finalOffset =
            circumference -
            (circumference * percent) / 100;

          // animate 0% → target %
          setTimeout(() => {
            ring.style.strokeDashoffset = finalOffset;
          }, 200);
          ringObserver.unobserve(ring);
        }
      });
    }, {
      threshold: .5
    });

    rings.forEach(ring => {
      ringObserver.observe(ring);

    });
  


const themeToggle = document.getElementById("themeToggle");

themeToggle?.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");

  const icon = themeToggle.querySelector("i");
  icon.classList.toggle("fa-sun");
  icon.classList.toggle("fa-moon");
});



document.addEventListener("DOMContentLoaded", () => {

  const menuToggle = document.getElementById("menuToggle");
  const menu = document.querySelector(".links");
  const menuIcon = menuToggle?.querySelector("i");

  if (!menuToggle || !menu) return;

  menuToggle.addEventListener("click", (event) => {
    event.preventDefault();

    document.body.classList.toggle("mobile-menu-open");

    const opened = document.body.classList.contains("mobile-menu-open");

    menuIcon.className = opened
      ? "fa-solid fa-xmark"
      : "fa-solid fa-bars";
  });

  document.querySelectorAll(".links a").forEach(link => {
    link.addEventListener("click", () => {
      document.body.classList.remove("mobile-menu-open");
      if (menuIcon) {
        menuIcon.className = "fa-solid fa-bars";
      }

    });
  });

});

(function () {
  emailjs.init("YOUR_PUBLIC_KEY");
})();


const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if(name.length < 2){
        showStatus(
          "Please enter your name.",
          "error"
        );
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailPattern.test(email)){
        showStatus(
          "Please enter a valid email address.",
          "error"
        );
        return;
    }

    if(message.length < 10){
        showStatus(
          "Message must contain at least 10 characters.",
          "error"
        );
        return;
    }

    emailjs.send(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        {
            from_name: name,
            reply_email: email,
            message: message
        }
    )
    .then(() => {
        showStatus(
          "Message sent successfully!",
          "success"
        );
        contactForm.reset();
    })
    .catch((error)=>{
        console.log(error);
        showStatus(
          "Failed to send message. Try again later.",
          "error"
        );
    });
});

function showStatus(text,type){
    formStatus.innerHTML = text;
    formStatus.className = type;
}