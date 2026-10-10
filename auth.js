const USERS_KEY = 'localorder_users';
const CURRENT_KEY = 'localorder_current';

function getUsers() {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
}

function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getCurrentUser() {
    const email = localStorage.getItem(CURRENT_KEY);
    if (!email) return null;
    return getUsers().find(u => u.email === email) || null;
}

function setCurrentUser(email) {
    localStorage.setItem(CURRENT_KEY, email);
}

function logout() {
    localStorage.removeItem(CURRENT_KEY);
    window.location.href = 'index.html';
}

function generateRefCode(name) {
    const clean = name.replace(/[^a-zA-Zа-яА-Я]/g, '').slice(0, 4).toUpperCase() || 'ECO';
    const num = Math.floor(1000 + Math.random() * 9000);
    return clean + num;
}

function registerUser(name, email, password) {
    const users = getUsers();

    if (users.find(u => u.email === email)) {
        return { ok: false, error: 'Пользователь с таким email уже существует' };
    }

    const urlParams = new URLSearchParams(window.location.search);
    const refCode = urlParams.get('ref');
    let referrer = null;

    if (refCode) {
        referrer = users.find(u => u.refCode === refCode);
    }

    const user = {
        name,
        email,
        password,
        avatar: '🌱',
        points: 450,
        registeredAt: new Date().toISOString(),
        history: [],
        completedTasks: [],
        refCode: generateRefCode(name),
        invitedBy: referrer ? referrer.email : null,
        invitedFriends: [],
        teamBonus: 0
    };

    users.push(user);

    if (referrer) {
        referrer.points = (referrer.points || 0) + 200;
        referrer.invitedFriends = referrer.invitedFriends || [];
        referrer.invitedFriends.push(email);
    }

    saveUsers(users);
    setCurrentUser(email);

    return { ok: true, user, referred: !!referrer };
}

function loginUser(email, password) {
    const user = getUsers().find(u => u.email === email);

    if (!user) return { ok: false, error: 'Пользователь не найден' };
    if (user.password !== password) return { ok: false, error: 'Неверный пароль' };

    let needUpdate = false;
    if (!user.refCode) {
        user.refCode = generateRefCode(user.name);
        needUpdate = true;
    }
    if (!user.invitedFriends) {
        user.invitedFriends = [];
        needUpdate = true;
    }
    if (!user.completedTasks) {
        user.completedTasks = [];
        needUpdate = true;
    }
    if (needUpdate) {
        const users = getUsers();
        const idx = users.findIndex(u => u.email === email);
        if (idx !== -1) {
            users[idx] = user;
            saveUsers(users);
        }
    }

    setCurrentUser(email);
    return { ok: true, user };
}

function updateUser(updatedUser) {
    const users = getUsers();
    const idx = users.findIndex(u => u.email === updatedUser.email);
    if (idx !== -1) {
        users[idx] = updatedUser;
        saveUsers(users);
    }
}

function renderAuthArea() {
    const area = document.getElementById('auth-area');
    if (!area) return;

    const user = getCurrentUser();

    if (!user) {
        area.innerHTML = `
            <button class="auth-btn" id="open-auth-btn">Вход/Регистрация</button>
        `;
        document.getElementById('open-auth-btn').addEventListener('click', () => openAuthModal('login'));
    } else {
        area.innerHTML = `
            <div class="user-menu" id="user-menu">
                <button class="user-btn" id="user-btn">
                    <span class="user-avatar">${user.avatar || '🌱'}</span>
                    <span class="user-name">${user.name}</span>
                    <span class="user-points">${user.points || 0} 💎</span>
                </button>
                <div class="user-dropdown" id="user-dropdown">
                    <a href="profile.html"><i class="fa-solid fa-user"></i> Мой профиль</a>
                    <a href="tasks.html"><i class="fa-solid fa-list-check"></i> Задания</a>
                    <a href="#" id="logout-link"><i class="fa-solid fa-right-from-bracket"></i> Выйти</a>
                </div>
            </div>
        `;

        const userBtn = document.getElementById('user-btn');
        const dropdown = document.getElementById('user-dropdown');

        userBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('open');
        });

        document.addEventListener('click', () => dropdown.classList.remove('open'));

        document.getElementById('logout-link').addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm('Выйти из аккаунта?')) logout();
        });
    }
}

function openAuthModal(tab = 'login') {
    const modal = document.getElementById('auth-modal');
    if (!modal) return;
    modal.classList.add('open');
    switchTab(tab);
}

function closeAuthModal() {
    const modal = document.getElementById('auth-modal');
    if (modal) modal.classList.remove('open');
}

function switchTab(tab) {
    document.querySelectorAll('.modal-tab').forEach(t => {
        t.classList.toggle('active', t.dataset.tab === tab);
    });
    document.querySelectorAll('.modal-form').forEach(f => f.classList.remove('active'));
    const form = document.getElementById(`form-${tab}`);
    if (form) form.classList.add('active');

    document.querySelectorAll('.form-error').forEach(e => e.textContent = '');
}

document.addEventListener('DOMContentLoaded', () => {
    renderAuthArea();

    document.querySelectorAll('.modal-tab').forEach(tab => {
        tab.addEventListener('click', () => switchTab(tab.dataset.tab));
    });

    const modal = document.getElementById('auth-modal');
    if (modal) {
        const closeBtn = document.getElementById('modal-close');
        if (closeBtn) closeBtn.addEventListener('click', closeAuthModal);

        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeAuthModal();
        });
    }

    const loginForm = document.getElementById('form-login');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value.trim();
            const password = document.getElementById('login-password').value;
            const result = loginUser(email, password);

            if (result.ok) {
                closeAuthModal();
                renderAuthArea();
                loginForm.reset();

                if (window.location.pathname.includes('profile') ||
                    window.location.pathname.includes('tasks') ||
                    window.location.pathname.includes('map')) {
                    setTimeout(() => location.reload(), 200);
                }
            } else {
                document.getElementById('login-error').textContent = result.error;
            }
        });
    }

    const registerForm = document.getElementById('form-register');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('reg-name').value.trim();
            const email = document.getElementById('reg-email').value.trim();
            const password = document.getElementById('reg-password').value;
            const password2 = document.getElementById('reg-password2').value;

            if (password !== password2) {
                document.getElementById('reg-error').textContent = 'Пароли не совпадают';
                return;
            }
            if (password.length < 6) {
                document.getElementById('reg-error').textContent = 'Пароль минимум 6 символов';
                return;
            }

            const result = registerUser(name, email, password);

            if (result.ok) {
                closeAuthModal();
                renderAuthArea();
                registerForm.reset();

                if (result.referred) {
                    setTimeout(() => {
                        alert('🎁 Вы зарегистрировались по приглашению! Ваш друг получил +200 баллов');
                    }, 300);
                }

                setTimeout(() => {
                    if (confirm('🎉 Аккаунт создан! Перейти в профиль?')) {
                        window.location.href = 'profile.html';
                    }
                }, 500);
            } else {
                document.getElementById('reg-error').textContent = result.error;
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAuthModal();
            const taskModal = document.getElementById('task-modal');
            if (taskModal) taskModal.classList.remove('open');
            const qrModal = document.getElementById('qr-modal');
            if (qrModal) qrModal.classList.remove('open');
            const addModal = document.getElementById('add-modal');
            if (addModal) addModal.classList.remove('open');
        }
    });
});

window.LocalOrder = {
    getCurrentUser,
    updateUser,
    logout,
    openAuthModal,
    getUsers,
    saveUsers
};