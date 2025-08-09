document.addEventListener("DOMContentLoaded", function() {
    const floatingNotification = document.querySelector(".floating-notification");
    const notificationClose = document.querySelector(".notification-close");
    
    setTimeout(() => {
        floatingNotification.classList.add("show");
    }, 1000);
    
    notificationClose.addEventListener("click", () => {
        floatingNotification.classList.remove("show");
    });
    
    particlesJS("particles-js", {
        particles: {
            number: { value: 100, density: { enable: true, value_area: 1000 } },
            color: { value: "#ffffff" },
            shape: { 
                type: "circle",
                stroke: { width: 0, color: "#000000" },
                polygon: { nb_sides: 5 }
            },
            opacity: {
                value: 0.5,
                random: true,
                anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
            },
            size: {
                value: 3,
                random: true,
                anim: { enable: true, speed: 2, size_min: 0.1, sync: false }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#ffffff",
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: { enable: true, rotateX: 600, rotateY: 1200 }
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "repulse" },
                onclick: { enable: true, mode: "push" },
                resize: true
            },
            modes: {
                grab: { distance: 400, line_linked: { opacity: 1 } },
                bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
                repulse: { distance: 100, duration: 0.4 },
                push: { particles_nb: 4 },
                remove: { particles_nb: 2 }
            }
        },
        retina_detect: true
    });
    
    const socialLinks = document.querySelectorAll(".social-link");
    
    socialLinks.forEach(link => {
        link.addEventListener("mousemove", function(e) {
            const x = e.pageX - this.offsetLeft;
            const y = e.pageY - this.offsetTop;
            
            this.style.setProperty("--x", `${x}px`);
            this.style.setProperty("--y", `${y}px`);
        });
        
        link.addEventListener("click", function(e) {
            if(this.getAttribute("href") === "#") {
                e.preventDefault();
                
                const ripple = document.createElement("div");
                ripple.classList.add("ripple-effect");
                
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 1000);
            }
        });
    });
    
    const profileImage = document.querySelector(".profile-image");
    
    profileImage.addEventListener("mouseenter", function() {
        this.style.transform = "scale(1.05) rotate(5deg)";
    });
    
    profileImage.addEventListener("mouseleave", function() {
        this.style.transform = "scale(1) rotate(0deg)";
    });
});
