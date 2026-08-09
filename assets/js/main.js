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

    heroParallax();

});

/* ==========================================================
LOADER
========================================================== */

function loader(){

    window.addEventListener("load", ()=>{

        document.body.classList.add("loaded");

    });

}

/* ==========================================================
STICKY NAVBAR
========================================================== */

function navbar(){

    const nav = document.querySelector(".navbar");

    if (!nav) return;

    window.addEventListener("scroll", () => {

        nav.classList.toggle(
            "scrolled",
            window.scrollY > 80
        );

    });

}

/* ==========================================================
SCROLL REVEAL
========================================================== */

function revealElements(){

    const elements=document.querySelectorAll(

        ".card,.text,.image,.gallery img,.stats-container>div,.cta,.footer-grid"

    );

    const observer=new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.classList.add("visible");

            }

        });

    },{

        threshold:.15

    });

    elements.forEach(el=>{

        el.classList.add("reveal");

        observer.observe(el);

    });

}

/* ==========================================================
COUNTERS
========================================================== */

function counterAnimation(){

    const counters=document.querySelectorAll(".counter");

    const observer=new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            if(!entry.isIntersecting) return;

            const counter=entry.target;

            const target=parseInt(counter.dataset.target);

            const duration=1800;

            const step=Math.max(1,target/(duration/16));

            let current=0;

            function update(){

                current+=step;

                if(current<target){ counter.textContent=Math.floor(current);
          requestAnimationFrame(update);
          }else{
          counter.textContent=target.toLocaleString();
          }
          }
          update();
          observer.unobserve(counter);
          });
          },{
          threshold:.5
          });
          counters.forEach(c=>observer.observe(c));

}

/* ==========================================================
PROGRESS BAR
========================================================== */

function progressBar(){

    const bar=document.createElement("div");

    bar.className="progress-bar";

    document.body.appendChild(bar);

    window.addEventListener("scroll",()=>{

        const scroll=window.scrollY;

        const height=document.documentElement.scrollHeight-window.innerHeight;

        const progress=(scroll/height)*100;

        bar.style.width=progress+"%";

    });

}

/* ==========================================================
SMOOTH SCROLL
========================================================== */

function smoothScrolling(){

    document.querySelectorAll("a[href^='#']").forEach(anchor=>{

        anchor.addEventListener("click",function(e){

            const target=document.querySelector(this.getAttribute("href"));

            if(!target) return;

            e.preventDefault();

            target.scrollIntoView({

                behavior:"smooth"

            });

        });

    });

}

/* ==========================================================
ACTIVE MENU
========================================================== */

const sections=document.querySelectorAll("section");

const navLinks=document.querySelectorAll(".navbar ul a");

window.addEventListener("scroll",()=>{

    let current="";

    sections.forEach(section=>{

        const top=section.offsetTop-120;

        const height=section.offsetHeight;

        if(scrollY>=top){

            current=section.getAttribute("id");

        }

    });

    navLinks.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href")==="#"+current){

            link.classList.add("active");

        }

    });

});

/* ==========================================================
PARALLAX HERO
========================================================== */

function heroParallax(){

    const hero=document.querySelector(".hero");

    window.addEventListener("scroll",()=>{

        hero.style.backgroundPositionY=(window.scrollY*0.35)+"px";

    });

}

/* ==========================================================
CARD HOVER
========================================================== */

document.querySelectorAll(".card").forEach(card=>{

    card.addEventListener("mousemove",(e)=>{

        const rect=card.getBoundingClientRect();

        const x=e.clientX-rect.left;

        const y=e.clientY-rect.top;

        card.style.setProperty("--x",x+"px");

        card.style.setProperty("--y",y+"px");

    });

});

/* ==========================================================
NAVBAR SHADOW
========================================================== */
/*
window.addEventListener("scroll",()=>{

    const nav=document.querySelector(".navbar");

});
*/

/* ==========================================================
IMAGE ZOOM
========================================================== */

document.querySelectorAll(".gallery img").forEach(img=>{

    img.addEventListener("mouseenter",()=>{

        img.style.transform="scale(1.05)";

    });

    img.addEventListener("mouseleave",()=>{

        img.style.transform="scale(1)";

    });

});

/* ==========================================================
RANDOM FLOATING EFFECT
========================================================== */

setInterval(()=>{

    document.querySelectorAll(".float-circle").forEach(circle=>{

        const x=(Math.random()*15)-7;

        const y=(Math.random()*15)-7;

        circle.style.transform=

        `translate(${x}px,${y}px)`;

    });

},4000);

/* ==========================================================
CONSOLE
========================================================== */

console.log(

"%cAPOAM",

"font-size:28px;font-weight:bold;color:#0A9396"

);

console.log(

"Site desenvolvido com ❤️"

);
/* ==========================================================
   MOBILE NAVIGATION
========================================================== */

const menuToggle = document.querySelector(".menu-toggle");
const navbar = document.querySelector(".navbar");
const navMenu = document.querySelector(".nav-menu");

if (menuToggle && navbar && navMenu) {

    menuToggle.addEventListener("click", () => {

        const open = navbar.classList.toggle("menu-open");

        menuToggle.classList.toggle("active", open);

        menuToggle.setAttribute(
            "aria-expanded",
            open ? "true" : "false"
        );

    });


    /* Fechar ao clicar num link */

    navMenu.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navbar.classList.remove("menu-open");

            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });

}