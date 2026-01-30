document.addEventListener('DOMContentLoaded', () => {

    // 1. ASSET CONFIG
    // Keeping your original asset list
    const assets = ["01.jpg","02.jpg","03.jpg","04.jpg","05.jpg","06.jpg","07.jpg","08.jpg","09.jpg",
        "10.jpg","11.jpg","12.jpg","13.jpg","14.jpg","15.jpg","16.jpg","17.jpg","18.jpg","19.jpg",
        "20.jpg","21.jpg","22.jpg","23.jpg","24.jpg","25.jpg","26.jpg","27.jpg","28.jpg","29.jpg",
        "30.jpg","31.jpg","32.jpg","33.jpg","34.jpg","35.jpg","36.jpg","37.jpg","38.jpg","39.jpg",
        "40.jpg","41.jpg","42.jpg","43.jpg","44.jpg","45.jpg","46.jpg","47.jpg","48.jpg","49.jpg",
        "50.jpg","51.jpg","52.jpg","53.jpg","54.jpg","55.jpg","56.jpg","57.jpg","58.jpg","59.jpg",
        "60.jpg","61.jpg","62.jpg","63.jpg","64.jpg","65.jpg","66.jpg","67.jpg","68.jpg","69.jpg",
        "70.jpg","71.jpg","72.jpg","73.jpg","74.jpg","75.jpg","76.jpg","77.jpg","78.jpg","79.jpg",
        "80.jpg","81.jpg","82.jpg"
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