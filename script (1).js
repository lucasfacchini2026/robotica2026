/* ====================================================
   ROBOTICA ETEC 2026 -- script.js
   ==================================================== */

"use strict";

document.addEventListener("DOMContentLoaded", function () {

    // 1. AOS init
    if (typeof AOS !== "undefined") {
        AOS.init({ duration: 700, easing: "ease-out-cubic", once: true, offset: 70 });
    }

    // 2. Navbar scroll
    var nav = document.getElementById("mainNav");
    if (nav) {
        window.addEventListener("scroll", function () {
            nav.classList.toggle("scrolled", window.scrollY > 50);
        });
    }

    // 3. Active nav link
    var page = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".navbar-nav .nav-link[data-page]").forEach(function (link) {
        if (link.dataset.page === page) link.classList.add("active");
    });

    // 4. Back to top
    var btn = document.getElementById("backToTop");
    if (btn) {
        window.addEventListener("scroll", function () {
            btn.classList.toggle("visible", window.scrollY > 400);
        });
        btn.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // 5. FAQ accordion
    document.querySelectorAll(".faq-item").forEach(function (item) {
        var q = item.querySelector(".faq-q");
        if (q) {
            q.addEventListener("click", function () {
                var open = item.classList.contains("open");
                document.querySelectorAll(".faq-item").forEach(function (i) { i.classList.remove("open"); });
                if (!open) item.classList.add("open");
            });
        }
    });

    // 6. Form validation (PT)
    var form = document.getElementById("contactForm");
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            var name = document.getElementById("fieldName");
            var email = document.getElementById("fieldEmail");
            var phone = document.getElementById("fieldPhone");
            var rating = document.getElementById("fieldRating");
            var comment = document.getElementById("fieldComment");
            var feedback = document.getElementById("formFeedback");
            [name, email, phone, rating, comment].forEach(function (f) { if (f) f.classList.remove("is-invalid"); });
            var err = false;
            function invalid(f) { if (f) f.classList.add("is-invalid"); err = true; }
            if (!name || name.value.trim().length < 3) invalid(name);
            var emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email || !emailRx.test(email.value.trim())) invalid(email);
            if (!phone || phone.value.trim().replace(/\D/g,"").length < 8) invalid(phone);
            if (!rating || rating.value === "") invalid(rating);
            if (!comment || comment.value.trim().length < 10) invalid(comment);
            if (err) {
                if (feedback) { feedback.className = "form-feedback error"; feedback.textContent = "Por favor, corrija os campos destacados em vermelho."; feedback.style.display = "block"; feedback.scrollIntoView({ behavior: "smooth", block: "nearest" }); }
                return;
            }
            if (feedback) { feedback.className = "form-feedback success"; feedback.innerHTML = "<i class=\"fas fa-check-circle me-2\"></i>Obrigado, <strong>" + name.value.trim() + "</strong>! Sua mensagem foi recebida. Avalia\u00e7\u00e3o: <strong>" + rating.value + "/5</strong>."; feedback.style.display = "block"; }
            form.reset();
        });
    }

    // 6b. Form validation (EN)
    var formEn = document.getElementById("contactFormEn");
    if (formEn) {
        formEn.addEventListener("submit", function (e) {
            e.preventDefault();
            var name = document.getElementById("fieldNameEn");
            var email = document.getElementById("fieldEmailEn");
            var phone = document.getElementById("fieldPhoneEn");
            var rating = document.getElementById("fieldRatingEn");
            var comment = document.getElementById("fieldCommentEn");
            var feedback = document.getElementById("formFeedbackEn");
            [name, email, phone, rating, comment].forEach(function (f) { if (f) f.classList.remove("is-invalid"); });
            var err = false;
            function invalid(f) { if (f) f.classList.add("is-invalid"); err = true; }
            if (!name || name.value.trim().length < 3) invalid(name);
            var emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email || !emailRx.test(email.value.trim())) invalid(email);
            if (!phone || phone.value.trim().replace(/\D/g,"").length < 8) invalid(phone);
            if (!rating || rating.value === "") invalid(rating);
            if (!comment || comment.value.trim().length < 10) invalid(comment);
            if (err) {
                if (feedback) { feedback.className = "form-feedback error"; feedback.textContent = "Please correct the highlighted fields."; feedback.style.display = "block"; feedback.scrollIntoView({ behavior: "smooth", block: "nearest" }); }
                return;
            }
            if (feedback) { feedback.className = "form-feedback success"; feedback.innerHTML = "<i class=\"fas fa-check-circle me-2\"></i>Thank you, <strong>" + name.value.trim() + "</strong>! Your message was received. Rating: <strong>" + rating.value + "/5</strong>."; feedback.style.display = "block"; }
            formEn.reset();
        });
    }

    // 7. Counter animation
    var counters = document.querySelectorAll("[data-counter]");
    if (counters.length) {
        var obs = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting && !entry.target.dataset.animated) {
                    entry.target.dataset.animated = "1";
                    var el = entry.target;
                    var target = parseInt(el.dataset.counter, 10);
                    var step = target / 80;
                    var cur = 0;
                    var t = setInterval(function () {
                        cur += step;
                        if (cur >= target) { cur = target; clearInterval(t); }
                        el.textContent = Math.floor(cur).toLocaleString("pt-BR");
                    }, 20);
                }
            });
        }, { threshold: 0.6 });
        counters.forEach(function (c) { obs.observe(c); });
    }

    // 8. Close mobile menu on link click
    var collapse = document.querySelector(".navbar-collapse");
    var toggler = document.querySelector(".navbar-toggler");
    if (collapse && toggler) {
        document.querySelectorAll(".navbar-nav .nav-link").forEach(function (link) {
            link.addEventListener("click", function () {
                if (window.innerWidth < 992 && collapse.classList.contains("show")) toggler.click();
            });
        });
    }

    // 9. Smooth scroll for anchor links
    document.querySelectorAll("a[href^=\"#\"]").forEach(function (a) {
        a.addEventListener("click", function (e) {
            var target = document.querySelector(this.getAttribute("href"));
            if (target) {
                e.preventDefault();
                var top = target.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({ top: top, behavior: "smooth" });
            }
        });
    });

});
