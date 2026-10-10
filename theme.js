const THEME_STORAGE_KEY = 'localorder_theme';
const MOTION_SURFACE_SELECTOR = [
    '.card',
    '.task-card',
    '.partner-card',
    '.reward-card',
    '.achievement-card',
    '.team-card',
    '.home-feature-card',
    '.reward-stat-card',
    '.profile-action-btn'
].join(',');
const MOTION_BUTTON_SELECTOR = [
    '.cta-btn',
    '.auth-btn',
    '.action-btn',
    '.home-scan-btn',
    '.home-scan-stop',
    '.all-rewards-btn',
    '.team-invite-btn',
    '.team-join-btn',
    '.geo-btn',
    '.add-point-btn',
    '.modal-btn',
    '.profile-action-btn',
    '.theme-toggle',
    '.language-toggle'
].join(',');

function initializeRevealMotion() {
    const revealSelector = [
        'main > section',
        '.container > main > section',
        '.card',
        '.task-card',
        '.partner-card',
        '.reward-card',
        '.achievement-card',
        '.team-card',
        '.map-sidebar',
        '[data-reveal]'
    ].join(',');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const observer = !reduceMotion && 'IntersectionObserver' in window
        ? new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -36px 0px' })
        : null;
    const reveal = element => {
        if (!(element instanceof Element) || element.dataset.revealReady === 'true') return;
        element.dataset.revealReady = 'true';
        element.dataset.reveal = '';
        if (!observer) {
            element.classList.add('is-visible');
            return;
        }
        observer.observe(element);
    };
    const addInteractionMotion = element => {
        if (!(element instanceof Element) || element.dataset.motionReady === 'true') return;
        element.dataset.motionReady = 'true';

        if (element.matches(MOTION_SURFACE_SELECTOR)) {
            element.classList.add('motion-surface');
            if (!reduceMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
                element.addEventListener('pointermove', event => {
                    const bounds = element.getBoundingClientRect();
                    const horizontal = (event.clientX - bounds.left) / bounds.width - 0.5;
                    const vertical = (event.clientY - bounds.top) / bounds.height - 0.5;
                    element.style.setProperty('--tilt-x', `${(vertical * -3).toFixed(2)}deg`);
                    element.style.setProperty('--tilt-y', `${(horizontal * 3).toFixed(2)}deg`);
                });
                element.addEventListener('pointerleave', () => {
                    element.style.removeProperty('--tilt-x');
                    element.style.removeProperty('--tilt-y');
                });
            }
        }

        if (element.matches(MOTION_BUTTON_SELECTOR)) {
            element.classList.add('motion-button');
            element.addEventListener('pointerdown', event => {
                if (reduceMotion || event.button !== 0) return;
                const bounds = element.getBoundingClientRect();
                element.style.setProperty('--ripple-x', `${event.clientX - bounds.left}px`);
                element.style.setProperty('--ripple-y', `${event.clientY - bounds.top}px`);
                element.classList.remove('is-rippling');
                void element.offsetWidth;
                element.classList.add('is-rippling');
                window.setTimeout(() => element.classList.remove('is-rippling'), 650);
            });
        }
    };

    document.querySelectorAll(revealSelector).forEach(element => {
        reveal(element);
        addInteractionMotion(element);
    });
    document.querySelectorAll(`${MOTION_SURFACE_SELECTOR}, ${MOTION_BUTTON_SELECTOR}`).forEach(addInteractionMotion);

    new MutationObserver(records => {
        records.forEach(record => {
            record.addedNodes.forEach(node => {
                if (!(node instanceof Element)) return;
                const prepare = element => {
                    if (element.matches(revealSelector)) reveal(element);
                    addInteractionMotion(element);
                };
                prepare(node);
                node.querySelectorAll(`${revealSelector}, ${MOTION_SURFACE_SELECTOR}, ${MOTION_BUTTON_SELECTOR}`)
                    .forEach(prepare);
            });
        });
    }).observe(document.body, { childList: true, subtree: true });
}

function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
}

function updateThemeButton(button, theme) {
    const isDark = theme === 'dark';
    const isEnglish = window.LocalOrderI18n?.getLanguage() === 'en';
    button.innerHTML = isDark
        ? `<i class="fa-solid fa-sun" aria-hidden="true"></i><span>${isEnglish ? 'Light theme' : 'Светлая тема'}</span>`
        : `<i class="fa-solid fa-moon" aria-hidden="true"></i><span>${isEnglish ? 'Dark theme' : 'Тёмная тема'}</span>`;
    const label = isDark
        ? (isEnglish ? 'Switch to light theme' : 'Включить светлую тему')
        : (isEnglish ? 'Switch to dark theme' : 'Включить тёмную тему');
    button.setAttribute('aria-label', label);
    button.setAttribute('aria-pressed', String(isDark));
    button.title = label;
}

const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) || 'light';
applyTheme(savedTheme);

document.addEventListener('DOMContentLoaded', () => {
    initializeRevealMotion();

    const authArea = document.getElementById('auth-area');
    if (!authArea || !authArea.parentElement) return;

    const actions = document.createElement('div');
    actions.className = 'header-actions';
    authArea.parentElement.insertBefore(actions, authArea);
    actions.appendChild(authArea);

    const button = document.createElement('button');
    button.className = 'theme-toggle';
    button.type = 'button';
    updateThemeButton(button, savedTheme);
    actions.insertBefore(button, authArea);

    button.addEventListener('click', () => {
        const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
        applyTheme(nextTheme);
        localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
        updateThemeButton(button, nextTheme);
    });
});
