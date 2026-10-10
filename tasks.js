const TASKS = [
    {
        id: 'tree',
        type: 'once',
        icon: '🌳',
        title: 'Посади дерево',
        desc: 'Посадите дерево во дворе или в парке рядом с домом',
        steps: ['Найти место', 'Купить саженец', 'Посадить', 'Сфотографировать'],
        reward: 100,
        deadline: '15 ноября',
        participants: 45,
        maxParticipants: 100,
        requiresQR: false
    },
    {
        id: 'plastic5',
        type: 'daily',
        icon: '🧴',
        title: 'Сдай 5 кг пластика',
        desc: 'Соберите и сдайте 5 кг пластика в любой пункт приёма',
        steps: ['Собрать пластик', 'Сдать в пункт приёма', 'Получить QR', 'Отсканировать'],
        reward: 150,
        deadline: 'сегодня',
        participants: 128,
        maxParticipants: 500,
        requiresQR: true
    },
    {
        id: 'nobag',
        type: 'weekly',
        icon: '🚫',
        title: 'Откажись от пакета',
        desc: 'Целую неделю используйте многоразовую сумку вместо пластикового пакета',
        steps: ['Взять сумку', 'Ходить в магазин 7 дней', 'Подтвердить'],
        reward: 50,
        deadline: '7 дней',
        participants: 234,
        maxParticipants: 1000,
        requiresQR: false
    },
    {
        id: 'park',
        type: 'special',
        icon: '🌿',
        title: 'Уборка парка',
        desc: 'Присоединяйтесь к субботнику в центральном парке',
        steps: ['Записаться', 'Прийти в парк', 'Собрать мусор', 'Сдать в пункт'],
        reward: 200,
        deadline: '20 ноября',
        participants: 12,
        maxParticipants: 20,
        requiresQR: true
    },
    {
        id: 'batteries',
        type: 'once',
        icon: '🔋',
        title: 'Сдай 10 батареек',
        desc: 'Соберите использованные батарейки и сдайте в спецпункт',
        steps: ['Собрать 10 батареек', 'Найти пункт', 'Сдать', 'Получить QR'],
        reward: 80,
        deadline: '1 декабря',
        participants: 67,
        maxParticipants: 200,
        requiresQR: true
    },
    {
        id: 'paper3',
        type: 'weekly',
        icon: '📄',
        title: 'Сдай 3 кг макулатуры',
        desc: 'Соберите и сдайте макулатуру в пункт приёма',
        steps: ['Собрать бумагу', 'Сдать', 'Отсканировать QR'],
        reward: 70,
        deadline: '7 дней',
        participants: 89,
        maxParticipants: 300,
        requiresQR: true
    },
    {
        id: 'water',
        type: 'daily',
        icon: '💧',
        title: 'Экономь воду',
        desc: 'Закрывайте кран, пока чистите зубы — 3 раза за день',
        steps: ['Утром', 'Днём', 'Вечером'],
        reward: 30,
        deadline: 'сегодня',
        participants: 342,
        maxParticipants: 1000,
        requiresQR: false
    },
    {
        id: 'light',
        type: 'daily',
        icon: '💡',
        title: 'Выключай свет',
        desc: 'Выключайте свет, выходя из комнаты',
        steps: ['Проверить', 'Выключить'],
        reward: 20,
        deadline: 'сегодня',
        participants: 456,
        maxParticipants: 2000,
        requiresQR: false
    },
    {
        id: 'recycle-all',
        type: 'special',
        icon: '♻️',
        title: 'Сдай 5 разных категорий',
        desc: 'Сдайте вторсырьё 5 разных типов за неделю',
        steps: ['Пластик', 'Бумага', 'Стекло', 'Батарейки', 'Одежда'],
        reward: 300,
        deadline: '14 дней',
        participants: 23,
        maxParticipants: 100,
        requiresQR: true
    },
    {
        id: 'clothes',
        type: 'once',
        icon: '👕',
        title: 'Сдай ненужную одежду',
        desc: 'Соберите одежду, которую не носите, и сдайте в пункт',
        steps: ['Собрать одежду', 'Постирать', 'Сдать', 'Получить QR'],
        reward: 90,
        deadline: '10 декабря',
        participants: 54,
        maxParticipants: 200,
        requiresQR: true
    },
    {
        id: 'share',
        type: 'weekly',
        icon: '📱',
        title: 'Расскажи друзьям',
        desc: 'Поделитесь ссылкой на Local Order в соцсетях',
        steps: ['Скопировать ссылку', 'Опубликовать', 'Подтвердить'],
        reward: 60,
        deadline: '7 дней',
        participants: 178,
        maxParticipants: 500,
        requiresQR: false
    },
    {
        id: 'glass',
        type: 'once',
        icon: '🍾',
        title: 'Сдай 3 кг стекла',
        desc: 'Соберите стеклотару и сдайте в пункт приёма',
        steps: ['Собрать стекло', 'Помыть', 'Сдать', 'Получить QR'],
        reward: 85,
        deadline: '25 ноября',
        participants: 41,
        maxParticipants: 150,
        requiresQR: true
    }
];

const LEVELS = [
    { name: 'Новичок', icon: '🌱', min: 0, max: 500, color: '#4caf50' },
    { name: 'Эко-друг', icon: '🌿', min: 500, max: 2000, color: '#66bb6a' },
    { name: 'Эко-воин', icon: '🌳', min: 2000, max: 5000, color: '#2e7d32' },
    { name: 'Защитник природы', icon: '🏆', min: 5000, max: 99999, color: '#ffc107' }
];

const ACHIEVEMENTS = [
    { id: 'first', icon: '🥇', title: 'Первая сдача', desc: 'Сдать первое вторсырьё', condition: (u) => (u.history?.length || 0) >= 1 },
    { id: 'plastic5', icon: '🧴', title: '5 кг пластика', desc: 'Сдать 5 кг пластика', condition: (u) => (u.history?.filter(h => h.category === 'plastic').reduce((s, h) => s + h.weight, 0) || 0) >= 5 },
    { id: 'visits10', icon: '🔒', title: '10 посещений', desc: 'Посетить 10 пунктов приёма', condition: (u) => false },
    { id: 'paper', icon: '📄', title: 'Бумажный герой', desc: 'Сдать 10 кг макулатуры', condition: (u) => false },
    { id: 'battery', icon: '🔋', title: 'Батарейкин', desc: 'Сдать 50 батареек', condition: (u) => false },
    { id: 'all-cat', icon: '♻️', title: 'Мастер переработки', desc: 'Сдать все 5 категорий', condition: (u) => new Set(u.history?.map(h => h.category)).size >= 5 },
    { id: 'streak7', icon: '🔥', title: 'Неделя подряд', desc: 'Заходить 7 дней подряд', condition: (u) => false },
    { id: 'top10', icon: '🏅', title: 'Топ-10', desc: 'Войти в топ-10 недели', condition: (u) => false }
];

const LEADERBOARD = [
    { name: 'Иван П.', points: 2340, avatar: '🌳', rank: 1 },
    { name: 'Азиза К.', points: 1890, avatar: '🌿', rank: 2 },
    { name: 'Тимур Р.', points: 1650, avatar: '🌱', rank: 3 },
    { name: 'Лола М.', points: 1420, avatar: '🌸', rank: 4 },
    { name: 'Азиз Б.', points: 1280, avatar: '🍀', rank: 5 },
    { name: 'Дильноза С.', points: 1100, avatar: '🦋', rank: 6 },
    { name: 'Рустам Ш.', points: 980, avatar: '🌲', rank: 7 },
    { name: 'Камила Т.', points: 870, avatar: '🌺', rank: 8 },
    { name: 'Бекзод Н.', points: 760, avatar: '🍃', rank: 9 },
    { name: 'Гульнара А.', points: 650, avatar: '🌻', rank: 10 }
];

document.addEventListener('DOMContentLoaded', () => {
    const user = window.LocalOrder.getCurrentUser();

    const userData = user || { points: 0, history: [], completedTasks: [] };

    const points = userData.points || 0;
    const level = LEVELS.find(l => points >= l.min && points < l.max) || LEVELS[0];
    const levelProgress = ((points - level.min) / (level.max - level.min)) * 100;

    document.getElementById('level-badge').textContent = level.icon;
    document.getElementById('level-name').textContent = level.name;
    document.getElementById('level-current').textContent = points;
    document.getElementById('level-next').textContent = level.max === 99999 ? '∞' : level.max;
    document.getElementById('level-progress-bar').style.width = Math.min(levelProgress, 100) + '%';
    document.getElementById('user-total-points').textContent = points;

    const completed = userData.completedTasks?.length || 0;
    const total = TASKS.length;
    document.getElementById('tasks-done').textContent = completed;
    document.getElementById('tasks-total').textContent = total;
    document.getElementById('tasks-progress-bar').style.width = ((completed / total) * 100) + '%';

    renderAchievements(userData);

    renderTasks(userData, 'all');

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderTasks(userData, btn.dataset.filter);
        });
    });

    renderLeaderboard();

    document.getElementById('task-modal-close').addEventListener('click', () => {
        document.getElementById('task-modal').classList.remove('open');
    });
    document.getElementById('task-modal').addEventListener('click', (e) => {
        if (e.target === document.getElementById('task-modal')) {
            e.target.classList.remove('open');
        }
    });

    document.getElementById('qr-modal-close').addEventListener('click', () => {
        document.getElementById('qr-modal').classList.remove('open');
    });
    document.getElementById('qr-modal').addEventListener('click', (e) => {
        if (e.target === document.getElementById('qr-modal')) {
            e.target.classList.remove('open');
        }
    });

    document.getElementById('qr-submit').addEventListener('click', () => {
        const code = document.getElementById('qr-input').value.trim().toUpperCase();
        const err = document.getElementById('qr-error');

        if (code.length < 4) {
            err.textContent = 'Код должен быть минимум 4 символа';
            return;
        }

        const taskId = document.getElementById('qr-modal').dataset.taskId;
        const task = TASKS.find(t => t.id === taskId);

        if (!user) {
            err.textContent = 'Войдите в аккаунт, чтобы получить баллы';
            return;
        }

        completeTask(user, task);
        document.getElementById('qr-modal').classList.remove('open');
        document.getElementById('qr-input').value = '';
        err.textContent = '';
    });
});

function renderAchievements(user) {
    const container = document.getElementById('achievements-grid');
    let unlockedCount = 0;

    container.innerHTML = ACHIEVEMENTS.map(a => {
        const unlocked = a.condition(user);
        if (unlocked) unlockedCount++;

        return `
            <div class="achievement ${unlocked ? 'unlocked' : 'locked'}" title="${a.desc}">
                <div class="achievement-icon">${a.icon}</div>
                <div class="achievement-info">
                    <div class="achievement-title">${a.title}</div>
                    <div class="achievement-desc">${a.desc}</div>
                </div>
                ${unlocked ? '<i class="fa-solid fa-circle-check achievement-check"></i>' : '<i class="fa-solid fa-lock achievement-lock"></i>'}
            </div>
        `;
    }).join('');

    document.getElementById('achievements-count').textContent = `${unlockedCount} из ${ACHIEVEMENTS.length}`;
}

function renderTasks(user, filter = 'all') {
    const container = document.getElementById('tasks-grid');
    const completed = user.completedTasks || [];

    const filtered = filter === 'all' ? TASKS : TASKS.filter(t => t.type === filter);

    container.innerHTML = filtered.map(task => {
        const isDone = completed.includes(task.id);
        const typeLabel = {
            once: '⭐ Разовое',
            daily: '🔁 Ежедневно',
            weekly: '📅 Еженедельно',
            special: '🎯 Особое'
        }[task.type];

        const progressPercent = Math.round((task.participants / task.maxParticipants) * 100);

        return `
            <div class="task-card ${isDone ? 'done' : ''}" data-id="${task.id}">
                <div class="task-header">
                    <div class="task-icon">${task.icon}</div>
                    <div class="task-type-badge type-${task.type}">${typeLabel}</div>
                </div>
                <h3 class="task-title">${task.title}</h3>
                <p class="task-desc">${task.desc}</p>
                
                <div class="task-meta">
                    <div class="task-meta-item">
                        <i class="fa-solid fa-users"></i>
                        ${task.participants}/${task.maxParticipants}
                    </div>
                    <div class="task-meta-item">
                        <i class="fa-solid fa-clock"></i>
                        ${task.deadline}
                    </div>
                </div>

                <div class="task-progress-mini">
                    <div class="task-progress-mini-fill" style="width: ${progressPercent}%"></div>
                </div>

                <div class="task-footer">
                    <div class="task-reward">+${task.reward} 💎</div>
                    ${isDone 
                        ? `<button class="task-btn done" disabled><i class="fa-solid fa-check"></i> Выполнено</button>`
                        : `<button class="task-btn" onclick="openTask('${task.id}')">Участвовать</button>`
                    }
                </div>
            </div>
        `;
    }).join('');

    if (filtered.length === 0) {
        container.innerHTML = `<div class="empty-state" style="grid-column: 1/-1;">
            <i class="fa-solid fa-list-check"></i>
            <p>Заданий этой категории нет</p>
        </div>`;
    }
}

window.openTask = function(taskId) {
    const user = window.LocalOrder.getCurrentUser();
    if (!user) {
        alert('Войдите в аккаунт, чтобы участвовать в заданиях');
        window.LocalOrder.openAuthModal('login');
        return;
    }

    const task = TASKS.find(t => t.id === taskId);
    if (!task) return;

    const modal = document.getElementById('task-modal');
    const content = document.getElementById('task-modal-content');

    const stepsHTML = task.steps.map((step, i) => `
        <div class="task-step">
            <div class="task-step-num">${i + 1}</div>
            <div class="task-step-text">${step}</div>
        </div>
    `).join('');

    content.innerHTML = `
        <div class="task-modal-header">
            <div class="task-modal-icon">${task.icon}</div>
            <h2>${task.title}</h2>
            <p class="modal-subtitle">${task.desc}</p>
        </div>

        <div class="task-modal-steps">
            <div class="task-modal-title">Как выполнить:</div>
            ${stepsHTML}
        </div>

        <div class="task-modal-reward">
            <div>
                <div style="font-size:12px; opacity:0.8;">Награда</div>
                <div style="font-size:22px; font-weight:700;">+${task.reward} 💎</div>
            </div>
            <div style="text-align:right;">
                <div style="font-size:12px; opacity:0.8;">Дедлайн</div>
                <div style="font-size:14px; font-weight:600;">${task.deadline}</div>
            </div>
        </div>

        ${task.requiresQR 
            ? `<button class="modal-btn" onclick="openQR('${task.id}')">
                <i class="fa-solid fa-qrcode"></i> Отсканировать QR-код
               </button>`
            : `<button class="modal-btn" onclick="completeTask(window.LocalOrder.getCurrentUser(), TASKS.find(t => t.id === '${task.id}'))">
                <i class="fa-solid fa-check"></i> Отметить выполненным
               </button>`
        }
    `;

    modal.classList.add('open');
};

window.openQR = function(taskId) {
    document.getElementById('task-modal').classList.remove('open');
    document.getElementById('qr-modal').classList.add('open');
    document.getElementById('qr-modal').dataset.taskId = taskId;
    document.getElementById('qr-error').textContent = '';
};

window.completeTask = function(user, task) {
    if (!user || !task) return;

    user.points = (user.points || 0) + task.reward;

    user.completedTasks = user.completedTasks || [];
    if (!user.completedTasks.includes(task.id)) {
        user.completedTasks.push(task.id);
    }

    window.LocalOrder.updateUser(user);

    document.getElementById('task-modal').classList.remove('open');
    document.getElementById('qr-modal').classList.remove('open');

    alert(`🎉 Задание выполнено! +${task.reward} баллов`);

    location.reload();
};


function renderLeaderboard() {
    const user = window.LocalOrder.getCurrentUser();
    const userPoints = user?.points || 0;

    const container = document.getElementById('leaderboard');
    
    container.innerHTML = LEADERBOARD.map((item, i) => {
        const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}`;
        return `
            <div class="leaderboard-item">
                <div class="leaderboard-rank rank-${i + 1}">${medal}</div>
                <div class="leaderboard-avatar">${item.avatar}</div>
                <div class="leaderboard-name">${item.name}</div>
                <div class="leaderboard-points">${item.points.toLocaleString('ru-RU')} 💎</div>
            </div>
        `;
    }).join('');

    if (user) {
        const userRank = LEADERBOARD.filter(l => l.points > userPoints).length + 1;
        if (userRank > 10) {
            container.innerHTML += `
                <div class="leaderboard-item leaderboard-you">
                    <div class="leaderboard-rank">${userRank}</div>
                    <div class="leaderboard-avatar">${user.avatar || '🌱'}</div>
                    <div class="leaderboard-name">${user.name} (вы)</div>
                    <div class="leaderboard-points">${userPoints.toLocaleString('ru-RU')} 💎</div>
                </div>
            `;
        }
    }
}