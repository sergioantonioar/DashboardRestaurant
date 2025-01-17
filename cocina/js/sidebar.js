function toggleSubmenu(event) {
    event.preventDefault();
    const submenu = event.currentTarget.nextElementSibling;
    submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
};