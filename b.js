window.onload = () => {
    const menuButton = document.getElementById('menu-button');
    const closeButton = document.getElementById('close-panel');
    const sidePanel = document.getElementById('side-panel');
    const menu = document.getElementById('menu');

    menuButton.addEventListener('click', () => {
        sidePanel.classList.remove('translate-x-full');
        sidePanel.classList.add('translate-x-0');
        menu.classList.add('hidden'); // Hide the menu when the side panel is open
    });

    closeButton.addEventListener('click', () => {
        sidePanel.classList.remove('translate-x-0');
        sidePanel.classList.add('translate-x-full');
    });
};
