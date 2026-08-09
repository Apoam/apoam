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

    const nav=document.querySelector(".navbar");

    window.addEventListener("scroll",()=>{

        if(window.scrollY>80){

            nav.classList.add("scrolled");

        }else{

            nav.classList.remove("scrolled");

        }

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

    nav.style.boxShadow=window.scrollY>60
        ?"0 15px 35px rgba(0,0,0,.18)"
        :"none";

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
