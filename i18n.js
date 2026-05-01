// i18n.js - Language switcher
const DEFAULT_LANG = 'en';

function getLang() {
    return localStorage.getItem('dg_lang') || DEFAULT_LANG;
}

function setLang(lang) {
    localStorage.setItem('dg_lang', lang);
    applyTranslations(lang);
    document.documentElement.lang = lang;
}

function t(key) {
    const lang = getLang();
    return (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) || (TRANSLATIONS['en'][key]) || key;
}

function applyTranslations(lang) {
    const dict = TRANSLATIONS[lang] || TRANSLATIONS['en'];

    // Apply data-i18n text content
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) el.innerHTML = dict[key];
    });

    // Apply data-i18n-placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (dict[key]) el.placeholder = dict[key];
    });

    // Update language selector UI
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active-lang', btn.dataset.lang === lang);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Build language selector into nav
    const nav = document.querySelector('.global-nav');
    if (nav) {
        const selector = document.createElement('div');
        selector.className = 'lang-selector';
        selector.innerHTML = `
            <div class="lang-globe"><i class='bx bx-globe'></i></div>
            <div class="lang-dropdown">
                <button class="lang-btn" data-lang="en">🇺🇸 English</button>
                <button class="lang-btn" data-lang="hi">🇮🇳 हिन्दी</button>
                <button class="lang-btn" data-lang="ta">🇮🇳 தமிழ்</button>
                <button class="lang-btn" data-lang="te">🇮🇳 తెలుగు</button>
            </div>
        `;
        nav.appendChild(selector);

        selector.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                setLang(btn.dataset.lang);
                // Update timeline steps if on timeline page
                if (typeof window.reRenderTimeline === 'function') {
                    window.reRenderTimeline();
                }
            });
        });
    }

    applyTranslations(getLang());
});
