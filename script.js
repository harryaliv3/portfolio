document.addEventListener('DOMContentLoaded', () => {

    // 1. ASSET CONFIG
    // Keeping your original asset list
    const assets = [
        "_O0A0032 (1).jpg", "_O0A0324.jpg", "_O0A0801 (3).jpg", "_O0A0889.jpg", "_O0A1099 (4).jpg", 
        "_O0A1349.jpg", "_O0A1872 (1).jpg", "_O0A1875 (2).jpg", "_O0A2048.jpg", "_O0A2089.jpg", "_O0A2094 (1).jpg", 
        "_O0A2146 (2).jpg", "_O0A2187 (2).jpg", "_O0A2279.jpg", "_O0A2440 (1).jpg", "_O0A2484 (2).jpg", "_O0A2690.jpg",
        "_O0A3848.jpg", "_O0A3932 (1).jpg", "_O0A3963 (3).jpg", "_O0A4177.jpg", "_O0A4198.jpg", "_O0A4213.jpg", 
        "_O0A5343 (1).jpg", "_O0A5378 (1).jpg", "_O0A5435.jpg", "_O0A5674.jpg", "_O0A6965 (4).jpg", "_O0A7021.jpg", 
        "_O0A7048.jpg", "_O0A7563 (2).jpg", "_O0A8002.jpg", "_O0A8346.jpg", "_O0A8463 (2).jpg", "_O0A8553 (1).jpg", 
        "_O0A8712.jpg", "_O0A8717.jpg", "_O0A8829 (1).jpg", "_O0A9061.jpg", "5_6285049055550636299 (1).jpg", 
        "5_6334666334525195823.jpg", "Copy of 5_6312044475489191091.jpg", "Copy of 5_6334864272387999694.jpg", 
        "Copy of LRM_EXPORT_20190414_120134.jpg", "DSC_0010.jpg", "DSC_0257.jpg", "DSC_7239.jpg", "DSC00528 (1) (1).jpg", 
        "DSC05859 (2).jpg", "DSC08320 (3).jpg", "DSC08959 (3).jpg", "Greater flamingo 4- water birds Hariprasad.jpg", 
        "Greater flamingo, 4-water birds, Hariprasad (1).jpg", "IMG_1430 (1).jpg", "IMG_20221021_150903.jpg", "IMG_9877.jpg", 
        "LRM_EXPORT_14033515479246_20191222_034113589.jpg", "LRM_EXPORT_1447011668142_20200501_111955663.jpg", 
        "LRM_EXPORT_20190122_122547.jpg", "LRM_EXPORT_20190219_182517.jpg", "LRM_EXPORT_20190225_091034.jpg", 
        "LRM_EXPORT_20190225_092625.jpg", "LRM_EXPORT_20190228_011143.jpg", "LRM_EXPORT_20190228_101030.jpg", 
        "LRM_EXPORT_20190228_110243.jpg", "LRM_EXPORT_20190321_235033.jpg", "LRM_EXPORT_20190414_102355.jpg", 
        "LRM_EXPORT_20190415_121345.jpg", "LRM_EXPORT_20190424_195049.jpg", "LRM_EXPORT_20190604_211443.jpg", 
        "LRM_EXPORT_239422199673113_20200222_115300032.jpg", "LRM_EXPORT_277105147636172_20190827_181912485.jpg", 
        "LRM_EXPORT_279219095589741_20190827_185426433.jpg", "LRM_EXPORT_280758891977553_20191123_020815574.jpg", 
        "LRM_EXPORT_350461471832643_20191219_002332893.jpg", "LRM_EXPORT_373420696009215_20191125_000848462.jpg", 
        "LRM_EXPORT_387333190711256_20200524_165608179.jpg", "LRM_EXPORT_47991701401575_20191107_201323622.jpg", 
        "LRM_EXPORT_51724203312498_20191117_233948067.jpg", "LRM_EXPORT_78339202494547_20190905_104117207-01.jpg", 
        "PXL_20220824_093554068.jpg", "snapedit_1675184458509.jpg"
    ];

    // 2. GRID SYSTEM (OPTIMIZED)
    const gridContainer = document.getElementById('archive-grid');
    const loadMoreBtn = document.getElementById('load-more-btn');
    
    let currentIndex = 0;
    const itemsPerPage = 12; // Load 12 at a time

    function loadNextBatch() {
        const endIndex = Math.min(currentIndex + itemsPerPage, assets.length);
        const batch = assets.slice(currentIndex, endIndex);
        
        // Create Document Fragment for performance (Single DOM reflow)
        const fragment = document.createDocumentFragment();

        batch.forEach((filename, i) => {
            const div = document.createElement('div');
            div.className = 'archive-item';
            div.setAttribute('role', 'img');
            div.setAttribute('aria-label', `Archive photograph ${currentIndex + i + 1}`);

            const img = document.createElement('img');
            img.dataset.src = `Asset/${filename}`; // Store in data-src first
            img.alt = ""; // Decorative if parent has aria-label
            img.loading = "lazy"; // Native lazy loading
            
            // Intersection Observer to trigger fade-in
            observer.observe(div);

            div.appendChild(img);
            fragment.appendChild(div);
        });

        gridContainer.appendChild(fragment);
        
        // Load actual images with slight delay for visual stagger
        const newItems = Array.from(gridContainer.children).slice(currentIndex, endIndex);
        newItems.forEach((item, index) => {
            const img = item.querySelector('img');
            img.src = img.dataset.src;
            // Stagger animation
            setTimeout(() => {
                item.classList.add('loaded');
            }, index * 50);
        });

        currentIndex = endIndex;

        // Hide button if end of list
        if (currentIndex >= assets.length) {
            loadMoreBtn.style.display = 'none';
        }
    }

    // Initialize Intersection Observer for animation
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Initial Load
    loadNextBatch();

    // Event Listener for Load More
    loadMoreBtn.addEventListener('click', loadNextBatch);


    // 3. OPTIMIZED CURSOR
    // Only run custom cursor logic on non-touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (!isTouchDevice) {
        const cursorDot = document.querySelector('.cursor-dot');
        const cursorCircle = document.querySelector('.cursor-circle');
        
        let mouseX = 0, mouseY = 0;
        let circleX = 0, circleY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Dot moves instantly
            cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
        });

        // Animation Loop for smooth circle following (better performance than .animate)
        function animateCursor() {
            // Lerp (Linear Interpolation) for smoothness
            circleX += (mouseX - circleX) * 0.15;
            circleY += (mouseY - circleY) * 0.15;

            cursorCircle.style.transform = `translate(${circleX}px, ${circleY}px) translate(-50%, -50%)`;
            
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Hover States
        document.querySelectorAll('a, button, .project-visual, .archive-item').forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
        });
    }
});