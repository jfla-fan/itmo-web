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
    };
})();
