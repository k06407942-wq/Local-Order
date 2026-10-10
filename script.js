const HOME_TASKS = [
    {
        id: 'park',
        title: 'Уборка в парке',
        desc: 'Присоединяйтесь к субботнику в центральном парке. Соберите мусор и помогите природе.',
        reward: 50,
        current: 12,
        max: 20,
        imgClass: 'img-task-1'
    },
    {
        id: 'tree',
        title: 'Посади дерево',
        desc: 'Посадите свое дерево во дворе или на специальной аллее города.',
        reward: 100,
        current: 45,
        max: 100,
        imgClass: 'img-task-2'
    },
    {
        id: 'nobag',
        title: 'Откажись от пакета',
        desc: 'Используйте многоразовую сумку вместо пластикового пакета в магазине.',
        reward: 20,
        current: 80,
        max: 100,
        imgClass: 'img-task-3'
    }
];

const HOME_REWARDS = [
    {
        id: 'coffee10',
        icon: '☕',
        title: 'Кофейня "Green Bean"',
        desc: 'Скидка 10% за 100 баллов',
        price: 100
    },
    {
        id: 'ecobag',
        icon: '🛍️',
        title: 'Эко-Маркет',
        desc: 'Купон на 50000 сумм за 300 баллов',
        price: 300
    }
];

const HOME_RECYCLE_POINTS = [
    { name: 'Фандомат (Чиланзар)', address: 'ул. Бунёдкор, 7А', lat: 41.2794, lng: 69.2032, categories: 'Пластик, стекло' },
    { name: 'Hashar Week (Сергели)', address: 'ул. Янги Сергели, 127', lat: 41.2215, lng: 69.2226, categories: 'Пластик, бумага' },
    { name: 'Узвторцветмет (Яшнабад)', address: 'Махаллинский сход Файзли', lat: 41.1913, lng: 69.2373, categories: 'Бумага' },
    { name: 'Пункт приёма (Юнусабад)', address: 'ул. Амира Темура, 107', lat: 41.3560, lng: 69.2880, categories: 'Бумага, пластик' },
    { name: 'Пункт приёма (Мирабад)', address: 'Eski Otchopar passage 1, 2', lat: 41.2680, lng: 69.3121, categories: 'Стекло, бумага' },
    { name: 'Korzinka (центр)', address: 'ул. Шота Руставели, 5', lat: 41.3110, lng: 69.2401, categories: 'Батарейки' },
    { name: 'Пункт приёма одежды', address: 'ул. Бабура, 10', lat: 41.2930, lng: 69.2600, categories: 'Одежда' }
];


function getSafeUser() {
    if (window.LocalOrder && typeof window.LocalOrder.getCurrentUser === 'function') {
        return window.LocalOrder.getCurrentUser();
    }
    return null;
}

function renderHomeTasks() {
    const container = document.getElementById('home-tasks-grid');
    if (!container) return;

    const user = getSafeUser();
    const completed = user?.completedTasks || [];

    container.innerHTML = HOME_TASKS.map(task => {
        const isDone = completed.includes(task.id);
        const progressPercent = Math.round((task.current / task.max) * 100);

        return `
            <div class="card" data-reveal>
                <div class="card-img ${task.imgClass}"></div>
                <div class="card-content">
                    <h3>${task.title}</h3>
                    <p>${task.desc}</p>
                    <div class="progress-container">
                        <div class="progress-info">
                            <span>Участники</span>
                            <span>${task.current}/${task.max}</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${progressPercent}%;"></div>
                        </div>
                    </div>
                    <div class="card-footer">
                        <span class="points-reward">+${task.reward} баллов</span>
                        ${isDone
                            ? `<button class="action-btn done" disabled><i class="fa-solid fa-check"></i> Выполнено</button>`
                            : `<button class="action-btn" onclick="completeHomeTask('${task.id}')">Участвовать</button>`
                        }
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

window.completeHomeTask = function(taskId) {
    const user = getSafeUser();

    if (!user) {
        alert('Войдите в аккаунт, чтобы выполнить задание');
        if (window.LocalOrder) window.LocalOrder.openAuthModal('login');
        return;
    }

    const task = HOME_TASKS.find(t => t.id === taskId);
    if (!task) return;

    user.completedTasks = user.completedTasks || [];
    if (user.completedTasks.includes(task.id)) {
        alert('Это задание уже выполнено');
        return;
    }

    user.points = (user.points || 0) + task.reward;
    user.completedTasks.push(task.id);

    user.taskHistory = user.taskHistory || [];
    user.taskHistory.unshift({
        taskId: task.id,
        title: task.title,
        reward: task.reward,
        date: new Date().toISOString()
    });

    window.LocalOrder.updateUser(user);

    renderHomeTasks();
    updateHomeBalance();

    if (typeof renderAuthArea === 'function') renderAuthArea();

    alert(`🎉 Задание "${task.title}" выполнено!\n+${task.reward} баллов`);
};

function updateHomeBalance() {
    const pointsEl = document.getElementById('user-points');
    if (!pointsEl) return;

    const user = getSafeUser();
    pointsEl.textContent = user?.points || 0;
}

function renderHomeRewards() {
    const container = document.getElementById('home-rewards-list');
    if (!container) return;

    const user = getSafeUser();
    const userPoints = user?.points || 0;

    container.innerHTML = HOME_REWARDS.map(r => {
        const progressPercent = Math.min((userPoints / r.price) * 100, 100);

        return `
            <div class="home-reward-item">
                <div class="home-reward-icon">${r.icon}</div>
                <div class="home-reward-info">
                    <div class="home-reward-title">${r.title}</div>
                    <div class="home-reward-partner">${r.desc}</div>
                    <div class="home-reward-progress">
                        <div class="home-reward-progress-fill" style="width: ${progressPercent}%;"></div>
                    </div>
                </div>
                <div class="home-reward-price">${r.price} 💎</div>
            </div>
        `;
    }).join('');
}

function initSidebar() {
    const menuBlocks = document.querySelectorAll('.menu-block');
    if (!menuBlocks.length) return;

    menuBlocks.forEach(block => {
        const header = block.querySelector('.menu-item');
        if (!header) return;

        header.addEventListener('click', () => {
            menuBlocks.forEach(b => {
                if (b !== block) b.classList.remove('open');
            });

            block.classList.toggle('open');

            document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('active'));
            header.classList.add('active');
        });
    });
}

function initCtaButton() {
    const ctaBtn = document.querySelector('.cta-btn');
    const mapSection = document.querySelector('.map-container');

    if (ctaBtn && mapSection) {
        ctaBtn.addEventListener('click', (e) => {
            e.preventDefault();
            mapSection.scrollIntoView({ behavior: 'smooth' });
        });
    }
}

function initMap() {
    const mapContainer = document.getElementById('map');
    if (!mapContainer) return;

    if (mapContainer._leaflet_id) return;

    if (typeof L === 'undefined') return;

    const map = L.map('map').setView([41.311151, 69.279737], 12);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);

    HOME_RECYCLE_POINTS.forEach(point => {
        const icon = L.divIcon({
            className: 'home-map-leaflet-icon',
            html: '<span class="home-map-marker"><i class="fa-solid fa-recycle"></i></span>',
            iconSize: [40, 40],
            iconAnchor: [20, 20],
            popupAnchor: [0, -18]
        });
        const marker = L.marker([point.lat, point.lng], { icon }).addTo(map);
        marker.bindPopup(`
            <div class="home-point-popup">
                <strong>${point.name}</strong>
                <span><i class="fa-solid fa-location-dot"></i> ${point.address}</span>
                <span><i class="fa-solid fa-recycle"></i> ${point.categories}</span>
                <a href="https://www.google.com/maps/dir/?api=1&destination=${point.lat},${point.lng}" target="_blank" rel="noopener noreferrer">
                    Построить маршрут <i class="fa-solid fa-arrow-up-right-from-square"></i>
                </a>
            </div>
        `);
    });
}

function initHomeScanner() {
    const startButton = document.getElementById('home-scan-start');
    const stopButton = document.getElementById('home-scan-stop');
    const status = document.getElementById('home-scanner-status');
    const placeholder = document.getElementById('home-scanner-placeholder');
    const result = document.getElementById('home-scan-result');
    const scannedCode = document.getElementById('home-scan-code');
    if (!startButton || !stopButton || !status || !placeholder || !result || !scannedCode) return;

    let scanner = null;
    let isRunning = false;
    let scanHandled = false;

    const stopScanner = async () => {
        if (!scanner || !isRunning) return;
        await scanner.stop();
        isRunning = false;
        startButton.hidden = false;
        startButton.disabled = false;
        stopButton.hidden = true;
        placeholder.hidden = false;
    };

    startButton.addEventListener('click', async () => {
        if (typeof window.Html5Qrcode === 'undefined') {
            status.textContent = 'Не удалось загрузить сканер. Проверьте подключение к интернету и обновите страницу.';
            return;
        }
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            status.textContent = 'Для доступа к камере откройте сайт по HTTPS или на localhost.';
            return;
        }

        startButton.disabled = true;
        status.textContent = 'Запрашиваем доступ к камере…';

        try {
            if (!scanner) scanner = new window.Html5Qrcode('home-qr-reader');
            scanHandled = false;
            result.hidden = true;
            await scanner.start(
                { facingMode: 'environment' },
                { fps: 10, qrbox: { width: 210, height: 210 } },
                async decodedText => {
                    if (scanHandled) return;
                    scanHandled = true;
                    scannedCode.textContent = `Код: ${decodedText}`;
                    result.hidden = false;
                    status.textContent = 'QR-код считан. Покажите его сотруднику пункта: приложение не подтверждает сдачу и не начисляет оплату автоматически.';
                    await stopScanner();
                },
                () => {}
            );
            isRunning = true;
            startButton.hidden = true;
            stopButton.hidden = false;
            placeholder.hidden = true;
            status.textContent = 'Наведите камеру на QR-код пункта приёма.';
        } catch (error) {
            startButton.disabled = false;
            placeholder.hidden = false;
            status.textContent = `Не удалось включить камеру: ${error.message || 'проверьте разрешение на доступ к камере'}.`;
        }
    });

    stopButton.addEventListener('click', async () => {
        try {
            await stopScanner();
            status.textContent = 'Сканирование остановлено.';
        } catch (error) {
            status.textContent = `Не удалось остановить камеру: ${error.message || 'попробуйте обновить страницу'}.`;
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        initSidebar();
        initCtaButton();
        renderHomeTasks();
        updateHomeBalance();
        renderHomeRewards();
        initMap();
        initHomeScanner();
    }, 50);

    window.addEventListener('storage', () => {
        renderHomeTasks();
        updateHomeBalance();
        renderHomeRewards();
    });
});