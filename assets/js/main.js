/*
===========================================================
APOAM
Main JavaScript
===========================================================
*/

document.addEventListener("DOMContentLoaded", () => {

    loader();
    navbar();
    revealElements();
    counterAnimation();
    progressBar();
    smoothScrolling();
    activeMenu();
    heroParallax();
    cardHover();
    imageZoom();
    floatingEffect();

});

/* LOADER */
function loader(){

    window.addEventListener("load", () => {
        document.body.classList.add("loaded");
    });

}

/* NAVBAR */
function navbar(){

    const nav = document.querySelector(".navbar");
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if(!nav) return;

    const updateNav = () => {
        nav.classList.toggle("scrolled", window.scrollY > 80);
    };

    updateNav();
    window.addEventListener("scroll", updateNav, {passive:true});

    if(menuToggle && navMenu){

        menuToggle.addEventListener("click", () => {

            const open = nav.classList.toggle("menu-open");

            menuToggle.classList.toggle("active", open);

            menuToggle.setAttribute(
                "aria-expanded",
                open ? "true" : "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                open ? "Fechar menu" : "Abrir menu"
            );

        });

        navMenu.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                nav.classList.remove("menu-open");
                menuToggle.classList.remove("active");

                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Abrir menu");

            });

        });

    }

}

/* SCROLL REVEAL */
function revealElements(){

    const elements = document.querySelectorAll(
        ".card,.text,.image,.gallery img,.stats-container>div,.cta,.footer-grid"
    );

    if(!("IntersectionObserver" in window)){
        elements.forEach(el => el.classList.add("visible"));
        return;
    }

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if(entry.isIntersecting){
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }

        });

    }, {threshold:.15});

    elements.forEach(el => {
        el.classList.add("reveal");
        observer.observe(el);
    });

}

/* COUNTERS */
function counterAnimation(){

    const counters = document.querySelectorAll(".counter");

    if(!("IntersectionObserver" in window)){
        counters.forEach(counter => {
            counter.textContent = Number(counter.dataset.target || 0).toLocaleString();
        });
        return;
    }

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if(!entry.isIntersecting) return;

            const counter = entry.target;
            const target = parseInt(counter.dataset.target, 10) || 0;
            const duration = 1800;
            const step = Math.max(1, target / (duration / 16));
            let current = 0;

            function update(){

                current += step;

                if(current < target){
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(update);
                }else{
                    counter.textContent = target.toLocaleString();
                }

            }

            update();
            observer.unobserve(counter);

        });

    }, {threshold:.5});

    counters.forEach(counter => observer.observe(counter));

}

/* PROGRESS */
function progressBar(){

    const bar = document.createElement("div");
    bar.className = "progress-bar";
    document.body.appendChild(bar);

    const update = () => {

        const height =
            document.documentElement.scrollHeight - window.innerHeight;

        const progress =
            height > 0 ? (window.scrollY / height) * 100 : 0;

        bar.style.width = progress + "%";

    };

    update();
    window.addEventListener("scroll", update, {passive:true});

}

/* SMOOTH SCROLL */
function smoothScrolling(){

    document.querySelectorAll("a[href^='#']").forEach(anchor => {

        anchor.addEventListener("click", function(e){

            const selector = this.getAttribute("href");

            if(!selector || selector === "#") return;

            const target = document.querySelector(selector);

            if(!target) return;

            e.preventDefault();

            const navHeight =
                document.querySelector(".navbar")?.offsetHeight || 0;

            const top =
                target.getBoundingClientRect().top +
                window.scrollY -
                navHeight;

            window.scrollTo({
                top,
                behavior:"smooth"
            });

        });

    });

}

/* ACTIVE MENU */
function activeMenu(){

    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".navbar .nav-menu a");

    if(!sections.length || !navLinks.length) return;

    const update = () => {

        let current = "";

        sections.forEach(section => {

            const top = section.offsetTop - 130;

            if(window.scrollY >= top){
                current = section.getAttribute("id") || "";
            }

        });

        navLinks.forEach(link => {

            link.classList.toggle(
                "active",
                link.getAttribute("href") === "#" + current
            );

        });

    };

    update();
    window.addEventListener("scroll", update, {passive:true});

}

/* PARALLAX */
function heroParallax(){

    const hero = document.querySelector(".hero");

    if(!hero) return;

    window.addEventListener("scroll", () => {

        hero.style.backgroundPositionY =
            (window.scrollY * 0.35) + "px";

    }, {passive:true});

}

/* CARD HOVER */
function cardHover(){

    document.querySelectorAll(".card").forEach(card => {

        card.addEventListener("mousemove", e => {

            const rect = card.getBoundingClientRect();

            card.style.setProperty("--x", (e.clientX - rect.left) + "px");
            card.style.setProperty("--y", (e.clientY - rect.top) + "px");

        });

    });

}

/* IMAGE ZOOM */
function imageZoom(){

    document.querySelectorAll(".gallery img").forEach(img => {

        img.addEventListener("mouseenter", () => {
            img.style.transform = "scale(1.05)";
        });

        img.addEventListener("mouseleave", () => {
            img.style.transform = "";
        });

    });

}

/* FLOATING EFFECT */
function floatingEffect(){

    const update = () => {

        document.querySelectorAll(".float-circle").forEach(circle => {

            const x = (Math.random() * 15) - 7;
            const y = (Math.random() * 15) - 7;

            circle.style.transform =
                `translate(${x}px,${y}px)`;

        });

    };

    update();
    setInterval(update, 4000);

}

console.log(
    "%cAPOAM",
    "font-size:28px;font-weight:bold;color:#0A9396"
);

console.log("Site desenvolvido com ❤️");
