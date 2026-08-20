/*
APOAM - Main JavaScript
*/

document.addEventListener("DOMContentLoaded", () => {

    initLoader();
    initNavbar();
    initGallery();
    initReveal();
    initCounters();
    initProgressBar();
    initSmoothScrolling();
    // initActiveMenu();
    initHeroParallax();

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

    const gallery = document.querySelector(".gallery");

    if(!gallery) return;

    // Apenas ficheiros cujo nome contém "gallery" podem ser usados.
    const galleryImages = [
        { original: "gallery1.jpg", base: "gallery1", largest: 1280 },
        { original: "gallery2.jpg", base: "gallery2", largest: 1280 },
        { original: "gallery3.jpg", base: "gallery3", largest: 1280 },
        { original: "gallery4.jpg", base: "gallery4", largest: 1014 },
        { original: "gallery5.jpg", base: "gallery5", largest: 1280 },
        { original: "gallery6.jpg", base: "gallery6", largest: 1280 },
        { original: "gallery7.JPG", base: "gallery7", largest: 1280 },
        { original: "gallery8.JPG", base: "gallery8", largest: 1280 },
        { original: "gallery9.JPG", base: "gallery9", largest: 1280 },
        { original: "gallery10.JPG", base: "gallery10", largest: 1280 },
        { original: "gallery11.JPG", base: "gallery11", largest: 1280 },
        { original: "gallery12.jpg", base: "gallery12", largest: 1280 },
        { original: "gallery13.jpg", base: "gallery13", largest: 1280 }
    ];

    // Baralha a lista e escolhe seis imagens diferentes em cada carregamento.
    const shuffled = [...galleryImages].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 6);

    gallery.innerHTML = "";

    selected.forEach((image, index) => {

        const picture = document.createElement("picture");
        const source = document.createElement("source");
        const img = document.createElement("img");

        source.type = "image/webp";
        source.srcset = [640, 960, image.largest]
            .filter((width, position, widths) => widths.indexOf(width) === position)
            .map(width => `assets/img/optimized/${image.base}-${width}.webp ${width}w`)
            .join(", ");
        source.sizes = "(max-width: 850px) 92vw, (max-width: 1100px) 46vw, 30vw";

        img.src = "assets/img/" + image.original;
        img.alt = "Galeria APOAM " + (index + 1);
        img.loading = "lazy";

        img.addEventListener("mouseenter", () => {
            img.style.transform = "scale(1.04)";
        });

        img.addEventListener("mouseleave", () => {
            img.style.transform = "";
        });

        picture.append(source, img);
        gallery.appendChild(picture);

    });

}
