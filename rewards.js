// ============================================
// КАТАЛОГ НАГРАД
// ============================================
const REWARDS = [
    // ЕДА
    { id: 'coffee10', category: 'food', title: 'Скидка 10% в кофейне', partner: 'Green Bean', desc: 'Скидка на любой напиток', emoji: '☕', color: '#6d4c41', price: 100, value: '10%', realValue: 5000, minLevel: 0, stock: 999, popular: true },
    { id: 'coffee-free', category: 'food', title: 'Бесплатный кофе', partner: 'Green Bean', desc: 'Один напиток в подарок', emoji: '☕', color: '#4e342e', price: 250, value: '0 сум', realValue: 25000, minLevel: 0, stock: 150, popular: true },
    { id: 'fastfood20', category: 'food', title: 'Скидка 20% в FoodZone', partner: 'FoodZone', desc: 'На всё меню', emoji: '🍔', color: '#f57c00', price: 200, value: '20%', realValue: 15000, minLevel: 0, stock: 500 },
    { id: 'pizza', category: 'food', title: 'Пицца в подарок', partner: 'FoodZone', desc: 'Пицца 30 см при заказе от 100 000 сум', emoji: '🍕', color: '#d32f2f', price: 400, value: '1 шт', realValue: 60000, minLevel: 1, stock: 50 },

    // МАГАЗИНЫ
    { id: 'korzinka5', category: 'shops', title: 'Скидка 5% в Korzinka', partner: 'Korzinka', desc: 'На всю корзину', emoji: '🛒', color: '#d32f2f', price: 150, value: '5%', realValue: 10000, minLevel: 0, stock: 999, popular: true },
    { id: 'korzinka15', category: 'shops', title: 'Скидка 15% в Korzinka', partner: 'Korzinka', desc: 'На покупку от 100 000 сум', emoji: '🛒', color: '#b71c1c', price: 400, value: '15%', realValue: 30000, minLevel: 1, stock: 200 },
    { id: 'makro10', category: 'shops', title: 'Скидка 10% в Makro', partner: 'Makro', desc: 'На весь ассортимент', emoji: '🏪', color: '#1976d2', price: 200, value: '10%', realValue: 15000, minLevel: 0, stock: 300 },

    // РАЗВЛЕЧЕНИЯ
    { id: 'cinema', category: 'fun', title: 'Билет в кино', partner: 'CinemaPark', desc: 'Один билет на любой сеанс', emoji: '🎬', color: '#7b1fa2', price: 500, value: '1 билет', realValue: 50000, minLevel: 1, stock: 100, popular: true },
    { id: 'cinema2for1', category: 'fun', title: '2 билета по цене 1', partner: 'CinemaPark', desc: 'Второй билет бесплатно', emoji: '🎟️', color: '#9c27b0', price: 800, value: '2 билета', realValue: 100000, minLevel: 2, stock: 75 },
    { id: 'bowling', category: 'fun', title: 'Боулинг на час', partner: 'FoodZone', desc: 'Для компании до 4 человек', emoji: '🎳', color: '#e91e63', price: 600, value: '1 час', realValue: 80000, minLevel: 1, stock: 40 },

    // ЭКО-ТОВАРЫ
    { id: 'ecobag', category: 'eco', title: 'Эко-сумка Local Order', partner: 'EcoMarket', desc: 'Из переработанных материалов', emoji: '🛍️', color: '#388e3c', price: 300, value: '1 шт', realValue: 30000, minLevel: 0, stock: 200, popular: true },
    { id: 'bottle', category: 'eco', title: 'Многоразовая бутылка', partner: 'EcoMarket', desc: 'Из переработанного пластика', emoji: '🧴', color: '#2e7d32', price: 500, value: '1 шт', realValue: 50000, minLevel: 1, stock: 150 },
    { id: 'tshirt', category: 'eco', title: 'Футболка "Eco Warrior"', partner: 'EcoMarket', desc: '100% органический хлопок', emoji: '👕', color: '#1b5e20', price: 1000, value: '1 шт', realValue: 120000, minLevel: 2, stock: 50 },

    // БЛАГОТВОРИТЕЛЬНОСТЬ
    { id: 'tree-plant', category: 'charity', title: 'Посадить дерево за вас', partner: 'Local Order', desc: 'Мы посадим дерево от вашего имени', emoji: '🌳', color: '#2e7d32', price: 150, value: '1 дерево', realValue: 0, minLevel: 0, stock: 9999 },
    { id: 'charity-food', category: 'charity', title: 'Обед для нуждающегося', partner: 'Local Order', desc: 'Передадим обед в благотворительный фонд', emoji: '🍲', color: '#e65100', price: 200, value: '1 обед', realValue: 0, minLevel: 0, stock: 9999 },
    { id: 'charity-kids', category: 'charity', title: 'Помощь детям', partner: 'Local Order', desc: 'Передадим средства в детский фонд', emoji: '❤️', color: '#c62828', price: 500, value: '10 000 сум', realValue: 0, minLevel: 0, stock: 9999 },

    // VIP
    { id: 'vip-coffee', category: 'vip', title: 'Бесплатный кофе на неделю', partner: 'Green Bean', desc: '7 бесплатных кофе в течение недели', emoji: '☕', color: '#ffc107', price: 1000, value: '7 напитков', realValue: 175000, minLevel: 2, stock: 20 },
    { id: 'vip-cinema', category: 'vip', title: 'VIP-билет в кино для 2', partner: 'CinemaPark', desc: 'VIP-места и попкорн для двоих', emoji: '🎬', color: '#ff9800', price: 1500, value: 'VIP-зал', realValue: 250000, minLevel: 3, stock: 10 },
    { id: 'vip-tree', category: 'vip', title: 'Аллея вашего имени', partner: 'Local Order', desc: 'Посадим 5 деревьев и повесим табличку', emoji: '🌲', color: '#1b5e20', price: 2500, value: '5 деревьев', realValue: 0, minLevel: 3, stock: 5 }
];

// ============================================
// АУКЦИОНЫ
// ============================================
const AUCTIONS = [
    { id: 'auc1', title: 'Ужин на двоих в Eco Kitchen', emoji: '🍽️', color: '#d32f2f', currentBid: 850, minBid: 900, endsIn: '6ч 24м', participants: 12 },
    { id: 'auc2', title: 'Сертификат SPA на 200 000 сум', emoji: '💆', color: '#9c27b0', currentBid: 1200, minBid: 1300, endsIn: '12ч 45м', participants: 8 },
    { id: 'auc3', title: 'Именная аллея в парке (10 деревьев)', emoji: '🌳', color: '#2e7d32', currentBid: 2000, minBid: 2200, endsIn: '23ч 10м', participants: 5 }
];

// ============================================
// ПАРТНЁРЫ
// ============================================
const PARTNERS = [
    { name: 'Korzinka', logo: 'K', color: '#d32f2f', description: 'Продукты и товары на каждый день' },
    { name: 'Green Bean', logo: '☕', color: '#6d4c41', description: 'Кофе и напитки для хорошего дня' },
    { name: 'Makro', logo: 'M', color: '#1976d2', description: 'Покупки для дома и всей семьи' },
    { name: 'EcoMarket', logo: '🌿', color: '#388e3c', description: 'Полезные товары для экологичного образа жизни' },
    { name: 'FoodZone', logo: '🍔', color: '#f57c00', description: 'Еда и впечатления для отдыха' },
    { name: 'CinemaPark', logo: '🎬', color: '#7b1fa2', description: 'Кино и развлечения для всей семьи' }
];

// ============================================
// УРОВНИ
// ============================================
const REWARD_LEVELS = [
    { id: 0, name: 'Новичок', icon: '🌱', min: 0 },
    { id: 1, name: 'Эко-друг', icon: '🌿', min: 500 },
    { id: 2, name: 'Эко-воин', icon: '🌳', min: 2000 },
    { id: 3, name: 'Защитник природы', icon: '🏆', min: 5000 }
];

// ============================================
// УТИЛИТЫ
// ============================================
function getUserLevel(points) {
    let current = REWARD_LEVELS[0];
    for (const lvl of REWARD_LEVELS) {
        if (points >= lvl.min) current = lvl;
    }
    return current;
}

function generateCouponCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = 'LO-';
    for (let i = 0; i < 6; i++) {
        code += chars[Math.floor(Math.random() * chars.length)];
    }
    return code;
}

// ============================================
// ИНИЦИАЛИЗАЦИЯ
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const user = window.LocalOrder.getCurrentUser();
    const userData = user || { points: 0, exchanges: [], coupons: [] };

    // Баланс
    document.getElementById('user-balance').textContent = userData.points || 0;

    // Статистика
    const exchanges = userData.exchanges || [];
    document.getElementById('stat-exchanges').textContent = exchanges.length;
    document.getElementById('stat-spent').textContent = exchanges.reduce((s, e) => s + (e.price || 0), 0);
    const totalSaved = exchanges.reduce((s, e) => s + (e.realValue || 0), 0);
    document.getElementById('stat-saved').textContent = totalSaved.toLocaleString('ru-RU') + ' сум';

    // Все блоки
    renderDailyDeal(userData);
    renderPartners();
    renderAuctions(userData);
    renderRewards(userData, 'all');
    renderCoupons(userData);
    renderExchanges(userData);

    // Фильтры
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderRewards(userData, btn.dataset.filter);
        });
    });

    // Модалки
    setupModals();
});

// ============================================
// ЕЖЕДНЕВНАЯ АКЦИЯ
// ============================================
function renderDailyDeal(user) {
    const container = document.getElementById('daily-deal-section');
    if (!container) return;

    const today = new Date().getDate();
    const deal = REWARDS[today % REWARDS.length];
    const discountedPrice = Math.round(deal.price * 0.5);

    container.innerHTML = `
        <div class="daily-deal">
            <div class="daily-deal-badge">🔥 Только сегодня</div>
            <div class="daily-deal-content">
                <div class="daily-deal-emoji">${deal.emoji}</div>
                <div class="daily-deal-info">
                    <div class="daily-deal-title">${deal.title}</div>
                    <div class="daily-deal-desc">${deal.partner} · ${deal.desc}</div>
                    <div class="daily-deal-prices">
                        <span class="daily-deal-old">${deal.price} 💎</span>
                        <span class="daily-deal-new">${discountedPrice} 💎</span>
                        <span class="daily-deal-discount">−50%</span>
                    </div>
                </div>
                <button class="daily-deal-btn" onclick="openExchange('${deal.id}', ${discountedPrice})">
                    Получить
                </button>
            </div>
        </div>
    `;
}

// ============================================
// ПАРТНЁРЫ
// ============================================
function renderPartners() {
    const container = document.getElementById('partners-grid');
    if (!container) return;

    container.innerHTML = PARTNERS.map(p => `
        <button class="partner-card" type="button" data-partner="${p.name}" aria-label="Подробнее о партнёре ${p.name}">
            <div class="partner-logo" style="background: ${p.color};">${p.logo}</div>
            <div class="partner-name">${p.name}</div>
            <div class="partner-rewards">${REWARDS.filter(reward => reward.partner === p.name).length} награды</div>
            <span class="partner-card-hint">Подробнее <i class="fa-solid fa-arrow-up-right-from-square"></i></span>
        </button>
    `).join('');

    container.addEventListener('click', (event) => {
        const card = event.target.closest('[data-partner]');
        if (card) openPartnerInfo(card.dataset.partner);
    });
}

function openPartnerInfo(partnerName) {
    const partner = PARTNERS.find(item => item.name === partnerName);
    if (!partner) return;

    const rewards = REWARDS.filter(reward => reward.partner === partner.name);
    const searchQuery = encodeURIComponent(`${partner.name}, Tashkent, Uzbekistan`);
    const content = document.getElementById('partner-info-content');
    const modal = document.getElementById('partner-info-modal');

    content.innerHTML = `
        <div class="partner-info-header">
            <div class="partner-logo partner-info-logo" style="background: ${partner.color};">${partner.logo}</div>
            <div>
                <span class="partner-info-eyebrow"><i class="fa-solid fa-leaf"></i> Партнёр Local Order</span>
                <h2 id="partner-info-title">${partner.name}</h2>
                <p>${partner.description}</p>
            </div>
        </div>
        <div class="partner-info-layout">
            <section class="partner-map-section" aria-label="Карта филиалов партнёра">
                <div class="partner-info-section-title">
                    <span class="partner-info-section-icon"><i class="fa-solid fa-location-dot"></i></span>
                    <div><h3>Где найти</h3><p>Филиалы в Ташкенте</p></div>
                </div>
                <div class="partner-map-frame">
                    <iframe
                        src="https://maps.google.com/maps?q=${searchQuery}&output=embed"
                        title="Карта филиалов ${partner.name} в Ташкенте"
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade">
                    </iframe>
                </div>
                <a class="partner-map-link" href="https://www.google.com/maps/search/?api=1&query=${searchQuery}" target="_blank" rel="noopener noreferrer">
                    Открыть карту <i class="fa-solid fa-arrow-up-right-from-square"></i>
                </a>
            </section>
            <section class="partner-offers-section" aria-label="Награды партнёра">
                <div class="partner-info-section-title">
                    <span class="partner-info-section-icon"><i class="fa-solid fa-gift"></i></span>
                    <div><h3>Что можно получить</h3><p>${rewards.length} ${rewards.length === 1 ? 'предложение' : 'предложения'} за баллы</p></div>
                </div>
                <div class="partner-offers-list">
                    ${rewards.map(reward => `
                        <article class="partner-offer">
                            <div class="partner-offer-icon" style="background: ${reward.color}18; color: ${reward.color};">${reward.emoji}</div>
                            <div class="partner-offer-info">
                                <h4>${reward.title}</h4>
                                <p>${reward.desc}</p>
                                <span class="partner-offer-value"><i class="fa-solid fa-tag"></i> ${reward.value}</span>
                            </div>
                            <button class="partner-offer-btn" type="button" data-reward="${reward.id}">
                                ${reward.price} <span>💎</span>
                            </button>
                        </article>
                    `).join('')}
                </div>
            </section>
        </div>
    `;

    modal.classList.add('open');
}

// ============================================
// АУКЦИОНЫ
// ============================================
function renderAuctions(user) {
    const container = document.getElementById('auction-grid');
    if (!container) return;

    container.innerHTML = AUCTIONS.map(a => `
        <div class="auction-card">
            <div class="auction-emoji" style="background: ${a.color}20; color: ${a.color};">${a.emoji}</div>
            <h3 class="auction-title">${a.title}</h3>
            <div class="auction-info">
                <div class="auction-bid">
                    <div class="auction-label">Текущая ставка</div>
                    <div class="auction-value">${a.currentBid} 💎</div>
                </div>
                <div class="auction-time">
                    <div class="auction-label">До конца</div>
                    <div class="auction-value">${a.endsIn}</div>
                </div>
            </div>
            <div class="auction-meta">
                <i class="fa-solid fa-users"></i> ${a.participants} участников
            </div>
            <button class="auction-btn" onclick="openAuction('${a.id}')">
                <i class="fa-solid fa-gavel"></i> Сделать ставку
            </button>
        </div>
    `).join('');
}

// ============================================
// КАТАЛОГ НАГРАД
// ============================================
function renderRewards(user, filter) {
    const container = document.getElementById('rewards-grid');
    if (!container) return;

    const userLevel = getUserLevel(user.points || 0);
    const filtered = filter === 'all' ? REWARDS : REWARDS.filter(r => r.category === filter);

    if (filtered.length === 0) {
        container.innerHTML = `<div class="empty-state" style="grid-column: 1/-1;">
            <i class="fa-solid fa-gift"></i>
            <p>Награды этой категории не найдены</p>
        </div>`;
        return;
    }

    container.innerHTML = filtered.map(r => {
        const canAfford = (user.points || 0) >= r.price;
        const hasLevel = userLevel.id >= r.minLevel;
        const levelNeeded = !hasLevel ? REWARD_LEVELS[r.minLevel] : null;

        return `
            <div class="reward-card ${r.popular ? 'popular' : ''}" style="--card-color: ${r.color};">
                ${r.popular ? '<div class="reward-badge popular">🔥 Популярное</div>' : ''}
                ${levelNeeded ? `<div class="reward-badge locked"><i class="fa-solid fa-lock"></i> ${levelNeeded.icon} ${levelNeeded.name}</div>` : ''}

                <div class="reward-icon">${r.emoji}</div>
                <h3 class="reward-title">${r.title}</h3>
                <div class="reward-partner">${r.partner}</div>
                <p class="reward-desc">${r.desc}</p>

                <div class="reward-value">
                    <i class="fa-solid fa-tag"></i> ${r.value}
                </div>

                <div class="reward-footer">
                    <div class="reward-price">${r.price} 💎</div>
                    ${hasLevel
                        ? (canAfford
                            ? `<button class="reward-btn" onclick="openExchange('${r.id}')">Обменять</button>`
                            : `<button class="reward-btn disabled" disabled>Не хватает</button>`)
                        : `<button class="reward-btn locked" disabled><i class="fa-solid fa-lock"></i> Заблокировано</button>`
                    }
                </div>
                <div class="reward-stock">Осталось: ${r.stock}</div>
            </div>
        `;
    }).join('');
}

// ============================================
// КУПОНЫ
// ============================================
function renderCoupons(user) {
    const container = document.getElementById('coupons-list');
    if (!container) return;

    const coupons = (user.coupons || []).filter(c => !c.used && new Date(c.expiresAt) > new Date());

    if (coupons.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fa-solid fa-ticket"></i>
                <p>У вас пока нет активных купонов</p>
                <span>Обменяйте баллы на награду, чтобы получить первый купон</span>
            </div>
        `;
        return;
    }

    container.innerHTML = coupons.map(c => {
        const reward = REWARDS.find(r => r.id === c.rewardId);
        if (!reward) return '';
        const expires = new Date(c.expiresAt);
        const expiresStr = expires.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });

        return `
            <div class="coupon-card">
                <div class="coupon-icon" style="background: ${reward.color}20; color: ${reward.color};">${reward.emoji}</div>
                <div class="coupon-info">
                    <div class="coupon-title">${reward.title}</div>
                    <div class="coupon-partner">${reward.partner}</div>
                    <div class="coupon-code">Код: ${c.code}</div>
                </div>
                <div class="coupon-actions">
                    <button class="coupon-show-btn" onclick="showCoupon('${c.code}')">
                        <i class="fa-solid fa-qrcode"></i> Показать QR
                    </button>
                    <div class="coupon-expires">до ${expiresStr}</div>
                </div>
            </div>
        `;
    }).join('');
}

// ============================================
// ИСТОРИЯ ОБМЕНОВ
// ============================================
function renderExchanges(user) {
    const container = document.getElementById('exchanges-list');
    if (!container) return;

    const exchanges = (user.exchanges || []).slice().reverse();

    if (exchanges.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fa-solid fa-clock-rotate-left"></i>
                <p>История пуста</p>
                <span>Здесь появятся ваши обмены баллов на награды</span>
            </div>
        `;
        return;
    }

    container.innerHTML = exchanges.map(e => {
        const date = new Date(e.date);
        const dateStr = date.toLocaleDateString('ru-RU', {
            day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
        });

        return `
            <div class="history-item">
                <div class="history-icon" style="background: ${e.color || '#e8f5e9'}20; color: ${e.color || '#2e7d32'};">${e.emoji || '🎁'}</div>
                <div class="history-info">
                    <div class="history-title">${e.title}</div>
                    <div class="history-meta">${e.partner} · ${dateStr}</div>
                </div>
                <div class="history-points">−${e.price} 💎</div>
            </div>
        `;
    }).join('');
}

// ============================================
// ОБМЕН НАГРАДЫ
// ============================================
window.openExchange = function(rewardId, customPrice) {
    const user = window.LocalOrder.getCurrentUser();
    if (!user) {
        alert('Войдите в аккаунт, чтобы обменять баллы');
        window.LocalOrder.openAuthModal('login');
        return;
    }

    const reward = REWARDS.find(r => r.id === rewardId);
    if (!reward) return;

    const price = customPrice || reward.price;
    const canAfford = (user.points || 0) >= price;

    const modal = document.getElementById('exchange-modal');
    const content = document.getElementById('exchange-content');

    content.innerHTML = `
        <div class="exchange-header">
            <div class="exchange-icon" style="background: ${reward.color}20; color: ${reward.color};">${reward.emoji}</div>
            <h2>${reward.title}</h2>
            <p class="modal-subtitle">${reward.partner}</p>
        </div>

        <div class="exchange-details">
            <div class="exchange-detail-row">
                <span>Описание</span>
                <span>${reward.desc}</span>
            </div>
            <div class="exchange-detail-row">
                <span>Что даёт</span>
                <span><b>${reward.value}</b></span>
            </div>
            <div class="exchange-detail-row">
                <span>Ваш баланс</span>
                <span><b>${user.points || 0} 💎</b></span>
            </div>
            <div class="exchange-detail-row">
                <span>Цена</span>
                <span><b style="color: ${canAfford ? '#2e7d32' : '#f44336'};">${price} 💎</b></span>
            </div>
            <div class="exchange-detail-row" style="border-top: 2px solid #eee; padding-top: 10px;">
                <span>Останется</span>
                <span><b>${(user.points || 0) - price} 💎</b></span>
            </div>
        </div>

        ${canAfford 
            ? `<button class="modal-btn" onclick="confirmExchange('${reward.id}', ${price})">
                <i class="fa-solid fa-check"></i> Подтвердить обмен
               </button>`
            : `<div class="form-error" style="margin-bottom: 10px;">Не хватает ${price - (user.points || 0)} баллов</div>
               <button class="modal-btn" disabled style="opacity:0.5;">Недостаточно баллов</button>`
        }
    `;

    modal.classList.add('open');
};

// ============================================
// ПОДТВЕРЖДЕНИЕ ОБМЕНА
// ============================================
window.confirmExchange = function(rewardId, price) {
    const user = window.LocalOrder.getCurrentUser();
    if (!user) return;

    const reward = REWARDS.find(r => r.id === rewardId);
    if (!reward) return;

    if ((user.points || 0) < price) {
        alert('Недостаточно баллов');
        return;
    }

    // Списываем баллы
    user.points = (user.points || 0) - price;

    // Создаём купон
    const coupon = {
        code: generateCouponCode(),
        rewardId: reward.id,
        acquiredAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        used: false
    };
    user.coupons = user.coupons || [];
    user.coupons.push(coupon);

    // Запись в историю
    user.exchanges = user.exchanges || [];
    user.exchanges.push({
        rewardId: reward.id,
        title: reward.title,
        partner: reward.partner,
        emoji: reward.emoji,
        color: reward.color,
        price: price,
        realValue: reward.realValue,
        date: new Date().toISOString()
    });

    // Сохраняем
    window.LocalOrder.updateUser(user);

    // Закрываем модалку
    document.getElementById('exchange-modal').classList.remove('open');

    // Обновляем шапку
    if (typeof renderAuthArea === 'function') renderAuthArea();

    // Показываем купон
    setTimeout(() => {
        showCoupon(coupon.code);
        location.reload();
    }, 300);
};

// ============================================
// ПОКАЗ КУПОНА С QR
// ============================================
window.showCoupon = function(couponCode) {
    const user = window.LocalOrder.getCurrentUser();
    if (!user) return;

    const coupon = (user.coupons || []).find(c => c.code === couponCode);
    if (!coupon) return;

    const reward = REWARDS.find(r => r.id === coupon.rewardId);
    if (!reward) return;

    const expires = new Date(coupon.expiresAt);
    const expiresStr = expires.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });

    const qrURL = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&margin=10&data=${encodeURIComponent(coupon.code)}`;

    const modal = document.getElementById('coupon-modal');
    const content = document.getElementById('coupon-content');

    content.innerHTML = `
        <div class="coupon-modal-header" style="background: ${reward.color};">
            <div class="coupon-modal-emoji">${reward.emoji}</div>
            <h2>${reward.title}</h2>
            <p>${reward.partner}</p>
        </div>

        <div class="coupon-modal-body">
            <div class="coupon-modal-code">${coupon.code}</div>
            <p class="coupon-modal-hint">Покажите этот QR-код на кассе</p>

            <div class="coupon-modal-qr">
                <img src="${qrURL}" alt="QR ${coupon.code}">
            </div>

            <div class="coupon-modal-expires">
                <i class="fa-solid fa-clock"></i>
                Действует до ${expiresStr}
            </div>

            <div class="coupon-modal-value">
                <i class="fa-solid fa-tag"></i> ${reward.value}
            </div>
        </div>
    `;

    modal.classList.add('open');
};

// ============================================
// АУКЦИОНЫ
// ============================================
window.openAuction = function(auctionId) {
    const user = window.LocalOrder.getCurrentUser();
    if (!user) {
        alert('Войдите в аккаунт, чтобы участвовать в аукционе');
        window.LocalOrder.openAuthModal('login');
        return;
    }

    const auction = AUCTIONS.find(a => a.id === auctionId);
    if (!auction) return;

    const modal = document.getElementById('auction-modal');
    const content = document.getElementById('auction-content');

    content.innerHTML = `
        <div class="auction-modal-header">
            <div class="auction-modal-emoji" style="background: ${auction.color}20; color: ${auction.color};">${auction.emoji}</div>
            <h2>${auction.title}</h2>
            <p class="modal-subtitle">Аукцион · ${auction.participants} участников</p>
        </div>

        <div class="auction-modal-info">
            <div class="auction-modal-row">
                <span>Текущая ставка</span>
                <b>${auction.currentBid} 💎</b>
            </div>
            <div class="auction-modal-row">
                <span>Минимальная ставка</span>
                <b>${auction.minBid} 💎</b>
            </div>
            <div class="auction-modal-row">
                <span>До конца</span>
                <b>${auction.endsIn}</b>
            </div>
            <div class="auction-modal-row">
                <span>Ваш баланс</span>
                <b>${user.points || 0} 💎</b>
            </div>
        </div>

        <label>Ваша ставка (мин. ${auction.minBid} 💎)
            <input type="number" id="auction-bid-input" min="${auction.minBid}" value="${auction.minBid}">
        </label>

        <div class="form-error" id="auction-error"></div>

        <button class="modal-btn" onclick="placeBid('${auction.id}')">
            <i class="fa-solid fa-gavel"></i> Сделать ставку
        </button>
    `;

    modal.classList.add('open');
};

window.placeBid = function(auctionId) {
    const user = window.LocalOrder.getCurrentUser();
    if (!user) return;

    const auction = AUCTIONS.find(a => a.id === auctionId);
    if (!auction) return;

    const input = document.getElementById('auction-bid-input');
    const bid = parseInt(input.value);
    const err = document.getElementById('auction-error');

    if (isNaN(bid) || bid < auction.minBid) {
        err.textContent = `Минимальная ставка — ${auction.minBid} 💎`;
        return;
    }
    if (bid > (user.points || 0)) {
        err.textContent = 'Недостаточно баллов';
        return;
    }

    alert(`🎉 Ставка ${bid} 💎 принята! Если вы победите — награда ваша.`);
    document.getElementById('auction-modal').classList.remove('open');
};

// ============================================
// МОДАЛКИ И ФОРМА ПАРТНЁРА
// ============================================
function setupModals() {
    // Универсальный помощник для закрытия
    const closeModal = (id) => {
        const m = document.getElementById(id);
        if (m) m.classList.remove('open');
    };

    // Все кнопки закрытия
    ['exchange-close', 'coupon-close', 'auction-close', 'partner-close', 'partner-info-close'].forEach(id => {
        const btn = document.getElementById(id);
        if (btn) btn.addEventListener('click', () => {
            const modal = btn.closest('.modal-overlay');
            if (modal) modal.classList.remove('open');
        });
    });

    // Закрытие по клику на фон
    ['exchange-modal', 'coupon-modal', 'auction-modal', 'partner-modal', 'partner-info-modal'].forEach(id => {
        const modal = document.getElementById(id);
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) modal.classList.remove('open');
            });
        }
    });

    document.getElementById('partner-info-content').addEventListener('click', (event) => {
        const offerButton = event.target.closest('[data-reward]');
        if (!offerButton) return;

        const rewardId = offerButton.dataset.reward;
        closeModal('partner-info-modal');
        window.openExchange(rewardId);
    });

    // Форма партнёра
    const partnerBtn = document.getElementById('become-partner-btn');
    if (partnerBtn) {
        partnerBtn.addEventListener('click', () => {
            document.getElementById('partner-modal').classList.add('open');
            document.getElementById('partner-error').textContent = '';
        });
    }

    const partnerSubmit = document.getElementById('partner-submit');
    if (partnerSubmit) {
        partnerSubmit.addEventListener('click', () => {
            const name = document.getElementById('p-name').value.trim();
            const contact = document.getElementById('p-contact').value.trim();
            const phone = document.getElementById('p-phone').value.trim();
            const email = document.getElementById('p-email').value.trim();
            const desc = document.getElementById('p-desc').value.trim();
            const err = document.getElementById('partner-error');

            if (!name || !contact || !phone || !email) {
                err.textContent = 'Заполните все обязательные поля';
                return;
            }

            // Сохраняем заявку в localStorage
            const requests = JSON.parse(localStorage.getItem('localorder_partner_requests') || '[]');
            requests.push({ name, contact, phone, email, desc, date: new Date().toISOString() });
            localStorage.setItem('localorder_partner_requests', JSON.stringify(requests));

            alert('✅ Заявка отправлена! Мы свяжемся с вами в течение 2 рабочих дней.');
            closeModal('partner-modal');

            // Очищаем форму
            document.getElementById('p-name').value = '';
            document.getElementById('p-contact').value = '';
            document.getElementById('p-phone').value = '';
            document.getElementById('p-email').value = '';
            document.getElementById('p-desc').value = '';
        });
    }

    // Escape закрывает все модалки
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-overlay.open').forEach(m => m.classList.remove('open'));
        }
    });
}