// resources.js
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('resourceSearch');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const resourceCards = document.querySelectorAll('.resource-card');

    function filterResources() {
        const searchTerm = searchInput.value.toLowerCase();
        const activeCategory = document.querySelector('.filter-btn.active').dataset.category;

        // Handle section header separately
        const sectionHeader = document.querySelector('.india-section-header');
        if (sectionHeader) {
            const showHeader = activeCategory === 'all' || activeCategory === 'india';
            sectionHeader.style.display = showHeader && !searchTerm ? 'block' : 'none';
        }

        resourceCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const desc = card.querySelector('p').textContent.toLowerCase();
            const category = card.dataset.category;

            const matchesSearch = title.includes(searchTerm) || desc.includes(searchTerm);
            const matchesCategory = activeCategory === 'all' || category === activeCategory;

            if (matchesSearch && matchesCategory) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease';
            } else {
                card.style.display = 'none';
            }
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', filterResources);
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => {
                b.classList.remove('active');
                b.style.background = 'transparent';
                b.style.color = 'var(--text-primary)';
                b.style.borderColor = 'var(--glass-border)';
            });
            
            e.target.classList.add('active');
            e.target.style.background = 'var(--primary-accent)';
            e.target.style.color = 'white';
            e.target.style.borderColor = 'var(--primary-accent)';
            
            filterResources();
        });
    });
});
