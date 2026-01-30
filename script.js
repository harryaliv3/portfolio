document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. MOBILE MENU TOGGLE --- */
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle menu on button click
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    /* --- 2. ARCHIVE ASSETS --- */
    // I have restored your FULL original list here.
    const assets = [
        "_O0A0032 (1).jpg", "_O0A0324.jpg", "_O0A0801 (3).jpg", "_O0A0889.jpg", "_O0A1099 (4).jpg", 
        "_O0A1349.jpg", "_O0A1872 (1).jpg", "_O0A1875 (2).jpg", "_O0A2048.jpg", "_O0A2089.jpg", 
        "_O0A2094 (1).jpg", "_O0A2146 (2).jpg", "_O0A2187 (2).jpg", "_O0A2279.jpg", "_O0A2440 (1).jpg", 
        "_O0A2484 (2).jpg", "_O0A2690.jpg", "_O0A3848.jpg", "_O0A3932 (1).jpg", "_O0A3963 (3).jpg", 
        "_O0A4177.jpg", "_O0A4198.jpg", "_O0A4213.jpg", "_O0A5343 (1).jpg", "_O0A5378 (1).jpg", 
        "_O0A5435.jpg", "_O0A5674.jpg", "_O0A6965 (4).jpg", "_O0A7021.jpg", "_O0A7048.jpg", 
        "_O0A7563 (2).jpg", "_O0A8002.jpg", "_O0A8346.jpg", "_O0A8463 (2).jpg", "_O0A8553 (1).jpg", 
        "_O0A8712.jpg", "_O0A8717.jpg", "_O0A8829 (1).jpg", "_O0A9061.jpg", 
        "5_6285049055550636299 (1).jpg", "5_6334666334525195823.jpg", "Copy of 5_6312044475489191091.jpg", 
        "Copy of 5_6334864272387999694.jpg", "Copy of LRM_EXPORT_20190414_120134.jpg", 
        "DSC_0010.jpg", "DSC_0257.jpg", "DSC_7239.jpg", "DSC00528 (1) (1).jpg", "DSC05859 (2).jpg", 
        "DSC08320 (3).jpg", "DSC08959 (3).jpg", "Greater flamingo 4- water birds Hariprasad.jpg", 
        "Greater flamingo, 4-water birds, Hariprasad (1).jpg", "IMG_1430 (1).jpg", "IMG_20221021_150903.jpg", 
        "IMG_9877.jpg", "LRM_EXPORT_14033515479246_20191222_034113589.jpeg", 
        "LRM_EXPORT_1447011668142_20200501_111955663.jpeg", "LRM_EXPORT_20190122_122547.jpg", 
        "LRM_EXPORT_20190219_182517.jpg", "LRM_EXPORT_20190225_091034.jpg", "LRM_EXPORT_20190225_092625.jpg", 
        "LRM_EXPORT_20190228_011143.jpg", "LRM_EXPORT_20190228_101030.jpg", "LRM_EXPORT_20190228_110243.jpg", 
        "LRM_EXPORT_20190321_235033.jpg", "LRM_EXPORT_20190414_102355.jpg", "LRM_EXPORT_20190415_121345.jpg", 
        "LRM_EXPORT_20190424_195049.jpg", "LRM_EXPORT_20190604_211443.jpg", 
        "LRM_EXPORT_239422199673113_20200222_115300032.jpg", "LRM_EXPORT_277105147636172_20190827_181912485.jpg", 
        "LRM_EXPORT_279219095589741_20190827_185426433.jpeg", "LRM_EXPORT_280758891977553_20191123_020815574.jpeg", 
        "LRM_EXPORT_350461471832643_20191219_002332893.jpeg", "LRM_EXPORT_373420696009215_20191125_000848462.jpeg", 
        "LRM_EXPORT_387333190711256_20200524_165608179.jpeg", "LRM_EXPORT_47991701401575_20191107_201323622.jpeg", 
        "LRM_EXPORT_51724203312498_20191117_233948067.jpeg", "LRM_EXPORT_78339202494547_20190905_104117207-01.jpeg", 
        "PXL_20220824_093554068.jpg", "snapedit_1675184458509.jpg"
    ];

    const track = document.getElementById('archive-track');
    
    // We duplicate the list 3 times to ensure the loop feels infinite
    const fullList = [...assets, ...assets, ...assets]; 
    
    // Performance: Use DocumentFragment
    const fragment = document.createDocumentFragment();

    fullList.forEach(filename => {
        const div = document.createElement('div');
        div.className = 'archive-item';
        
        const img = document.createElement('img');
        
        // --- CRITICAL FIX: Changed 'Asset/' to 'Assets/' to match your folder ---
        img.src = `Assets/${filename}`; 
        
        img.loading = "lazy";
        img.draggable = false;
        img.alt = "Archive photograph"; 
        
        // Error handling: if image fails, log it
        img.onerror = function() {
            console.error(`Failed to load image: ${this.src}`);
        };

        div.appendChild(img);
        fragment.appendChild(div);
    });

    if (track) {
        track.appendChild(fragment);
    }

    /* --- 3. PHYSICS SLIDER (TOUCH ENABLED) --- */
    let currentX = 0;
    let isDragging = false;
    let startX = 0;
    let dragStartX = 0;
    const wrapper = document.querySelector('.archive-slider-wrapper');

    if (wrapper) {
        // Unified Start Function
        const startDrag = (x) => {
            isDragging = true;
            startX = x;
            dragStartX = currentX;
            wrapper.style.cursor = 'grabbing';
        };

        // Unified Move Function
        const moveDrag = (x) => {
            if (!isDragging) return;
            const walk = (x - startX) * 1.5; 
            currentX = dragStartX + walk;
        };

        const endDrag = () => {
            isDragging = false;
            wrapper.style.cursor = 'grab';
        };

        // Mouse Events
        wrapper.addEventListener('mousedown', e => startDrag(e.pageX));
        window.addEventListener('mousemove', e => moveDrag(e.pageX));
        window.addEventListener('mouseup', endDrag);

        // Touch Events
        wrapper.addEventListener('touchstart', e => startDrag(e.touches[0].pageX), { passive: true });
        window.addEventListener('touchmove', e => moveDrag(e.touches[0].pageX), { passive: true });
        window.addEventListener('touchend', endDrag);
    }

    // Animation Loop
    function animate() {
        if (!isDragging) {
            currentX -= 0.5; // Auto-scroll speed
        }

        if (track) {
            // Infinite Scroll Logic
            const trackWidth = track.scrollWidth / 3;
            
            // Safety check to ensure track has width
            if (trackWidth > 0) {
                if (currentX <= -trackWidth * 2) {
                    currentX = -trackWidth;
                    dragStartX += trackWidth; // Seamless reset
                } else if (currentX > 0) {
                    currentX = -trackWidth;
                    dragStartX -= trackWidth;
                }
                track.style.transform = `translate3d(${currentX}px, 0, 0)`;
            }
            
            // Progress Bar
            const progressBar = document.getElementById('archive-progress');
            if(progressBar) {
                 const maxScroll = track.scrollWidth - window.innerWidth;
                 const progress = (Math.abs(currentX) % maxScroll) / maxScroll * 100;
                 progressBar.style.width = `${Math.min(progress, 100)}%`;
            }
        }
        requestAnimationFrame(animate);
    }
    animate();

    /* --- 4. CUSTOM CURSOR (DESKTOP ONLY) --- */
    if (window.matchMedia("(hover: hover)").matches) {
        const cursorDot = document.querySelector('.cursor-dot');
        const cursorCircle = document.querySelector('.cursor-circle');
        
        if (cursorDot && cursorCircle) {
            let mouseX = -100, mouseY = -100;
            let circleX = -100, circleY = -100;

            document.addEventListener('mousemove', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
                cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
            });

            function animateCursor() {
                circleX += (mouseX - circleX) * 0.15;
                circleY += (mouseY - circleY) * 0.15;
                cursorCircle.style.transform = `translate3d(${circleX}px, ${circleY}px, 0) translate(-50%, -50%)`;
                requestAnimationFrame(animateCursor);
            }
            animateCursor();
        }
    }
});