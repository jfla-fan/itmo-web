(function() {
        /* Hightlight active menus */
        const navLinks = document.querySelectorAll('nav ul li a.menu--clickable');
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
                    link.classList.remove('menu--active');
                    if (link.getAttribute('href') === id) {
                        link.classList.add('menu--active');
                    }
                });
            }
        };

        // Click event for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault();

                navLinks.forEach(navLink => navLink.classList.remove('menu--active'));
                this.classList.add('menu--active');

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
})();
