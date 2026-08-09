/*
APOAM - Main JavaScript
*/

document.addEventListener("DOMContentLoaded", () => {

    initLoader();
    initNavbar();
    initReveal();
    initCounters();
    initProgressBar();
    initSmoothScrolling();
    initActiveMenu();
    initHeroParallax();
    initGallery();

});


function initLoader(){

    document.body.classList.add("loaded");

}


function initNavbar(){

    const nav = document.querySelector(".navbar");
    const toggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".nav-menu");

    if(!nav) return;

    /* Sombra da navbar ao fazer scroll */
    const updateShadow = () => {
        nav.classList.toggle("scrolled", window.scrollY > 20);
    };

    updateShadow();

    window.addEventListener("scroll", updateShadow, {
        passive: true
    });

    /* Menu mobile */
    if(!toggle || !menu) return;

    toggle.addEventListener("click", () => {

        const open = nav.classList.toggle("menu-open");

        toggle.classList.toggle("active", open);

        toggle.setAttribute(
            "aria-expanded",
            open ? "true" : "false"
        );

        toggle.setAttribute(
            "aria-label",
            open ? "Fechar menu" : "Abrir menu"
        );

    });

    /* Fecha o menu ao clicar num link */
    menu.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            nav.classList.remove("menu-open");
            toggle.classList.remove("active");

            toggle.setAttribute(
                "aria-expanded",
                "false"
            );

            toggle.setAttribute(
                "aria-label",
                "Abrir menu"
            );

        });

    });

    /* Fecha o menu ao voltar para desktop */
    window.addEventListener("resize", () => {

        if(window.innerWidth > 850){

            nav.classList.remove("menu-open");
            toggle.classList.remove("active");

            toggle.setAttribute(
                "aria-expanded",
                "false"
            );

            toggle.setAttribute(
                "aria-label",
                "Abrir menu"
            );

        }

    });

}

function initReveal(){

    const elements = document.querySelectorAll(
        ".card, .text, .image, .gallery img, .stats-container > div, .footer-grid"
    );

    if(!("IntersectionObserver" in window)){
        elements.forEach(el => el.classList.add("visible"));
        return;
    }

    const observer = new IntersectionObserver(entries => {

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

function initCounters(){

    const counters = document.querySelectorAll(".counter");

    if(!("IntersectionObserver" in window)){
        counters.forEach(c => c.textContent = Number(c.dataset.target || 0).toLocaleString());
        return;
    }

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if(!entry.isIntersecting) return;

            const counter = entry.target;
            const target = Number(counter.dataset.target || 0);
            const duration = 1600;
            const start = performance.now();

            const update = now => {

                const progress = Math.min((now - start) / duration, 1);
                const value = Math.floor(target * progress);

                counter.textContent = value.toLocaleString();

                if(progress < 1){
                    requestAnimationFrame(update);
                }else{
                    counter.textContent = target.toLocaleString();
                }

            };

            requestAnimationFrame(update);
            observer.unobserve(counter);

        });

    }, {threshold:.5});

    counters.forEach(counter => observer.observe(counter));

}

function initProgressBar(){

    const bar = document.createElement("div");
    bar.className = "progress-bar";
    document.body.appendChild(bar);

    const update = () => {

        const total = document.documentElement.scrollHeight - window.innerHeight;
        const progress = total > 0 ? (window.scrollY / total) * 100 : 0;

        bar.style.width = progress + "%";

    };

    update();
    window.addEventListener("scroll", update, {passive:true});

}

function initSmoothScrolling(){

    document.querySelectorAll("a[href^='#']").forEach(anchor => {

        anchor.addEventListener("click", event => {

            const selector = anchor.getAttribute("href");

            if(!selector || selector === "#") return;

            const target = document.querySelector(selector);

            if(!target) return;

            event.preventDefault();

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

function initActiveMenu(){

    const sections = document.querySelectorAll("section[id]");
    const links = document.querySelectorAll(".nav-menu a");

    if(!sections.length || !links.length) return;

    const update = () => {

        let current = "";

        sections.forEach(section => {

            if(window.scrollY >= section.offsetTop - 140){
                current = section.id;
            }

        });

        links.forEach(link => {

            link.classList.toggle(
                "active",
                link.getAttribute("href") === "#" + current
            );

        });

    };

    update();
    window.addEventListener("scroll", update, {passive:true});

}

function initHeroParallax(){

    const hero = document.querySelector(".hero");

    if(!hero) return;

    window.addEventListener("scroll", () => {

        hero.style.backgroundPositionY =
            (window.scrollY * 0.15) + "px";

    }, {passive:true});

}

function initGallery(){

    document.querySelectorAll(".gallery img").forEach(img => {

        img.addEventListener("mouseenter", () => {
            img.style.transform = "scale(1.04)";
        });

        img.addEventListener("mouseleave", () => {
            img.style.transform = "";
        });

    });

}
