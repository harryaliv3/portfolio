document.addEventListener('DOMContentLoaded', () => {

    // 1. ASSET CONFIG
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

    // 2. POPULATE ARCHIVE
    const track = document.getElementById('archive-track');
    
    // We duplicate the list 3 times to ensure infinite feeling before we need to loop via JS (simplified logic)
    const fullList = [...assets, ...assets, ...assets];
    
    fullList.forEach(filename => {
        const div = document.createElement('div');
        div.className = 'archive-item';
        const img = document.createElement('img');
        img.src = `Asset/${filename}`;
        img.draggable = false; // Prevent default drag behavior
        div.appendChild(img);
        track.appendChild(div);
    });


    // 3. PHYSICS SCROLL ENGINE
    let currentX = 0;
    let targetX = 0;
    let speed = 0.5; // Base auto-scroll speed
    let baseSpeed = 0.5;
    let isDragging = false;
    let startX = 0;
    let dragStartX = 0;

    // Acceleration Zones
    const leftZone = document.getElementById('nav-left');
    const rightZone = document.getElementById('nav-right');

    leftZone.addEventListener('mouseenter', () => { speed = 4; }); // Fast forward
    leftZone.addEventListener('mouseleave', () => { speed = baseSpeed; });
    
    rightZone.addEventListener('mouseenter', () => { speed = -4; }); // Rewind
    rightZone.addEventListener('mouseleave', () => { speed = baseSpeed; });

    // Drag Logic
    const wrapper = document.querySelector('.archive-slider-wrapper');
    
    wrapper.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX;
        dragStartX = currentX;
        wrapper.style.cursor = 'grabbing';
    });

    window.addEventListener('mouseup', () => {
        isDragging = false;
        wrapper.style.cursor = 'grab';
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const x = e.pageX;
        const walk = (x - startX) * 2; // Scroll-fast multiplier
        currentX = dragStartX + walk;
    });

    // The Animation Loop
    function animate() {
        // If not dragging, apply auto-scroll speed
        if (!isDragging) {
            currentX -= speed;
        }

        // Infinite Loop Logic (Reset position when reaching end)
        const trackWidth = track.scrollWidth / 3; // Since we tripled the assets
        
        if (currentX <= -trackWidth * 2) {
            currentX = -trackWidth;
        }
        if (currentX > 0) {
            currentX = -trackWidth;
        }

        // Apply Transform
        track.style.transform = `translate3d(${currentX}px, 0, 0)`;
        
        // Update Progress Bar
        const progress = Math.abs(currentX) / (track.scrollWidth - window.innerWidth) * 100;
        document.getElementById('archive-progress').style.width = `${progress}%`;

        requestAnimationFrame(animate);
    }
    animate();


    // 4. CUSTOM CURSOR LOGIC
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorCircle = document.querySelector('.cursor-circle');
    
    document.addEventListener('mousemove', (e) => {
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
        
        // Slight delay for the circle (smooth follow)
        cursorCircle.animate({
            left: e.clientX + 'px',
            top: e.clientY + 'px'
        }, { duration: 500, fill: "forwards" });
    });

    // Hover States for Cursor
    document.querySelectorAll('a, button, .project-visual, .archive-slider-wrapper').forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
    });
});