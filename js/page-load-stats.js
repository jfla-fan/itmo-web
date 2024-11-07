(function() {
    window.onload = function() {

        /* Display load time */
        const loadTime = performance.timing.loadEventStart - performance.timing.navigationStart;

        const footer = document.createElement('div');
        footer.id = 'load-time';
        footer.style.textAlign = 'center';
        footer.style.padding = '10px';
        footer.style.backgroundColor = '#333';
        footer.style.color = '#fff';
        footer.style.position = 'relative';
        footer.style.bottom = '0';
        footer.style.width = '100%';

        footer.innerHTML = `Page load time: ${loadTime} ms`;

        document.body.appendChild(footer);

        /* Hightlight active menus */
        const navLinks = document.querySelectorAll('nav ul li a');
        const sections = document.querySelectorAll('section.linkable');

        // Function to set active menu item based on the highest visible section
        const setActiveMenuItem = () => {
            let highestVisibleSection = null;

            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                if (rect.top >= 0 && rect.top < window.innerHeight) {
                    if (!highestVisibleSection || rect.top < highestVisibleSection.getBoundingClientRect().top) {
                        highestVisibleSection = section;
                    }
                }
            });

            if (highestVisibleSection) {
                const id = `#${highestVisibleSection.id}`;
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === id) {
                        link.classList.add('active');
                    }
                });
            }
        };

        // Click event for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault();

                navLinks.forEach(navLink => navLink.classList.remove('active'));
                this.classList.add('active');

                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }

                setActiveMenuItem();
            });
        });

        window.addEventListener('scroll', setActiveMenuItem);

        setActiveMenuItem();
    };
})();
