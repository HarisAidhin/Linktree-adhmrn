document.addEventListener("DOMContentLoaded", function() {
    const floatingNotification = document.querySelector(".floating-notification");
    const notificationClose = document.querySelector(".notification-close");
    const themeToggle = document.querySelector(".theme-toggle");
    const musicToggle = document.querySelector(".music-toggle");
    const bgMusic = document.getElementById("bgMusic");
    
     
    let audioContext, audioSource, analyser;
    
    
    const themes = [
        { primary: "#053d96ff", secondary: "#88d3ce", accent: "#ff7e5f", dark: "#1a1a2e" },
        { primary: "#FF416C", secondary: "#FF4B2B", accent: "#FFD700", dark: "#0F2027" },
        { primary: "#4776E6", secondary: "#14bcffff", accent: "#00F260", dark: "#0F0C29" },
        { primary: "#06f3a8ff", secondary: "#185a9d", accent: "#F3904F", dark: "#000428" }
    ];
    
    let currentTheme = 0;
    let audioInitialized = false;
    
    
    setTimeout(() => {
        floatingNotification.classList.add("show");
    }, 1000);
    
    notificationClose.addEventListener("click", () => {
        floatingNotification.classList.remove("show");
    });
    
    
    themeToggle.addEventListener("click", () => {
        currentTheme = (currentTheme + 1) % themes.length;
        applyTheme(themes[currentTheme]);
    });
    
    function applyTheme(theme) {
        document.documentElement.style.setProperty("--primary-color", theme.primary);
        document.documentElement.style.setProperty("--secondary-color", theme.secondary);
        document.documentElement.style.setProperty("--accent-color", theme.accent);
        document.documentElement.style.setProperty("--dark-color", theme.dark);
    }
     
    musicToggle.addEventListener("click", async () => {
        try {
            if (!audioInitialized) {
                await initAudio();
                audioInitialized = true;
            }
            toggleMusic();
        } catch (error) {
            console.error("Audio error:", error);
            musicToggle.innerHTML = "<i class='fas fa-exclamation-triangle'></i>";
        }
    });
    
    async function initAudio() {
        try {
            
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
             
            audioSource = audioContext.createMediaElementSource(bgMusic);
            analyser = audioContext.createAnalyser();
            analyser.fftSize = 256;
            audioSource.connect(analyser);
            analyser.connect(audioContext.destination);
            
            
            bgMusic.volume = 0.5;
            
             
            document.body.addEventListener('click', resumeAudioContext, { once: true });
            
            console.log("Audio initialized successfully");
        } catch (error) {
            console.error("Audio initialization failed:", error);
            throw error;
        }
    }
    
    async function resumeAudioContext() {
        if (audioContext.state === 'suspended') {
            await audioContext.resume();
        }
    }
    
    function toggleMusic() {
        if (bgMusic.paused) {
            bgMusic.play()
                .then(() => {
                    musicToggle.innerHTML = "<i class='fas fa-pause'></i>";
                    initAudioVisualizer();
                })
                .catch(error => {
                    console.error("Playback failed:", error);
                    musicToggle.innerHTML = "<i class='fas fa-music'></i>";
                });
        } else {
            bgMusic.pause();
            musicToggle.innerHTML = "<i class='fas fa-music'></i>";
        }
    }
    
    function initAudioVisualizer() {
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        const canvas = document.getElementById("audio-canvas");
        const ctx = canvas.getContext("2d");
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        function draw() {
            if (bgMusic.paused) return;
            
            requestAnimationFrame(draw);
            analyser.getByteFrequencyData(dataArray);
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            const barWidth = (canvas.width / bufferLength) * 2.5;
            let x = 0;
            
            for (let i = 0; i < bufferLength; i++) {
                const barHeight = dataArray[i] / 2;
                const hue = i * 360 / bufferLength;
                ctx.fillStyle = `hsla(${hue}, 100%, 50%, 0.7)`;
                ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
                x += barWidth + 1;
            }
        }
        
        draw();
    }
    
   
    particlesJS("particles-js", {
        particles: {
            number: { value: 150, density: { enable: true, value_area: 1000 } },
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
                speed: 3,
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
                repulse: { distance: 150, duration: 0.4 },
                push: { particles_nb: 6 },
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
    });
    
   
    initFluidSimulation();
    init3DProfile();
    initMouseTrail();
    
    
    document.addEventListener('visibilitychange', () => {
        if (document.hidden && !bgMusic.paused) {
            bgMusic.pause();
            musicToggle.innerHTML = "<i class='fas fa-music'></i>";
        }
    });
});


function initFluidSimulation() {
    const canvas = document.getElementById("fluid-canvas");
    const ctx = canvas.getContext("2d");
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const points = [];
    const colors = ["#6e45e2", "#88d3ce", "#ff7e5f"];
    
    for (let i = 0; i < 80; i++) {
        points.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: Math.random() * 2 - 1,
            vy: Math.random() * 2 - 1,
            color: colors[Math.floor(Math.random() * colors.length)],
            radius: Math.random() * 4 + 2
        });
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < points.length; i++) {
            const p1 = points[i];
            
            p1.x += p1.vx;
            p1.y += p1.vy;
            
            if (p1.x < 0 || p1.x > canvas.width) p1.vx *= -1;
            if (p1.y < 0 || p1.y > canvas.height) p1.vy *= -1;
            
            for (let j = i + 1; j < points.length; j++) {
                const p2 = points[j];
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 200) {
                    ctx.beginPath();
                    ctx.strokeStyle = p1.color;
                    ctx.globalAlpha = 1 - distance / 200;
                    ctx.lineWidth = 0.8;
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                    ctx.closePath();
                }
            }
            
            ctx.beginPath();
            ctx.fillStyle = p1.color;
            ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
            ctx.fill();
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}


function init3DProfile() {
    const container = document.getElementById("profile-3d");
    const width = container.offsetWidth;
    const height = container.offsetHeight;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);
    
    const geometry = new THREE.IcosahedronGeometry(1, 3);
    const material = new THREE.MeshPhongMaterial({ 
        color: 0x6e45e2,
        emissive: 0x88d3ce,
        shininess: 100,
        wireframe: false,
        transparent: true,
        opacity: 0.9
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    
    const light = new THREE.PointLight(0xffffff, 1.5);
    light.position.set(5, 5, 5);
    scene.add(light);
    
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 1, 1);
    scene.add(directionalLight);
    
    camera.position.z = 3;
    
    function animate() {
        requestAnimationFrame(animate);
        
        mesh.rotation.x += 0.005;
        mesh.rotation.y += 0.01;
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    window.addEventListener("resize", () => {
        camera.aspect = container.offsetWidth / container.offsetHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.offsetWidth, container.offsetHeight);
    });
}


function initMouseTrail() {
    const canvas = document.getElementById("mouse-trail");
    const ctx = canvas.getContext("2d");
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const colors = ["#6e45e2", "#88d3ce", "#ff7e5f", "#ffffff"];
    
    document.addEventListener("mousemove", (e) => {
        for (let i = 0; i < 3; i++) {
            particles.push({
                x: e.clientX,
                y: e.clientY,
                size: Math.random() * 5 + 2,
                color: colors[Math.floor(Math.random() * colors.length)],
                speedX: Math.random() * 6 - 3,
                speedY: Math.random() * 6 - 3,
                life: 100
            });
        }
    });
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
            
            p.x += p.speedX;
            p.y += p.speedY;
            p.life--;
            p.size *= 0.99;
            
            if (p.life <= 0 || p.size <= 0.5) {
                particles.splice(i, 1);
                i--;
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}
