const POINTS = [
    {
        id: 1,
        name: 'Фандомат (Чиланзар)',
        address: 'ул. Бунёдкор, 7А',
        lat: 41.2794, lng: 69.2032,
        categories: ['plastic', 'glass'],
        rating: 4.8,
        reviews: 42,
        phone: '+998 71 200 00 01',
        hours: '09:00 – 20:00',
        verified: true
    },
    {
        id: 2,
        name: 'Hashar Week (Сергели)',
        address: 'ул. Янги Сергели, 127',
        lat: 41.2215, lng: 69.2226,
        categories: ['plastic', 'paper'],
        rating: 4.5,
        reviews: 28,
        phone: '+998 71 200 00 02',
        hours: '08:00 – 19:00',
        verified: true
    },
    {
        id: 3,
        name: 'Узвторцветмет (Яшнабад)',
        address: 'Махаллинский сход Файзли',
        lat: 41.1913, lng: 69.2373,
        categories: ['paper'],
        rating: 4.2,
        reviews: 15,
        phone: '+998 71 200 00 03',
        hours: '09:00 – 18:00',
        verified: true
    },
    {
        id: 4,
        name: 'Пункт приёма (Юнусабад)',
        address: 'ул. Амира Темура, 107',
        lat: 41.3560, lng: 69.2880,
        categories: ['paper', 'plastic'],
        rating: 4.7,
        reviews: 56,
        phone: '+998 71 200 00 04',
        hours: '10:00 – 21:00',
        verified: true
    },
    {
        id: 5,
        name: 'Пункт приёма (Мирабад)',
        address: 'Eski Otchopar passage 1, 2',
        lat: 41.2680, lng: 69.3121,
        categories: ['glass', 'paper'],
        rating: 4.3,
        reviews: 22,
        phone: '+998 71 200 00 05',
        hours: '09:00 – 18:00',
        verified: true
    },
    {
        id: 6,
        name: 'Korzinka (центр)',
        address: 'ул. Шота Руставели, 5',
        lat: 41.3110, lng: 69.2401,
        categories: ['batteries'],
        rating: 4.9,
        reviews: 88,
        phone: '+998 71 200 00 06',
        hours: '08:00 – 23:00',
        verified: true
    },
    {
        id: 7,
        name: 'Пункт приёма одежды',
        address: 'ул. Бабура, 10',
        lat: 41.2930, lng: 69.2600,
        categories: ['clothes'],
        rating: 4.6,
        reviews: 31,
        phone: '+998 71 200 00 07',
        hours: '10:00 – 20:00',
        verified: true
    }
];

const CATEGORY_COLORS = {
    plastic: { color: '#4caf50', emoji: '🧴', name: 'Пластик' },
    paper: { color: '#2196f3', emoji: '📄', name: 'Бумага' },
    glass: { color: '#00bcd4', emoji: '🍾', name: 'Стекло' },
    batteries: { color: '#f44336', emoji: '🔋', name: 'Батарейки' },
    clothes: { color: '#9c27b0', emoji: '👕', name: 'Одежда' }
};

const map = L.map('map', {
    zoomControl: false
}).setView([41.311151, 69.279737], 12);

L.control.zoom({ position: 'bottomright' }).addTo(map);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

function createIcon(color, emoji) {
    return L.divIcon({
        className: '',
        html: `
            <div style="position: relative; width: 36px; height: 48px; filter: drop-shadow(0 6px 6px rgba(0,0,0,0.35));">
                <div style="
                    position: absolute; top: 0; left: 0;
                    width: 36px; height: 36px;
                    background: radial-gradient(circle at 30% 25%, ${color}dd 0%, ${color} 45%, ${color} 100%);
                    border-radius: 50%;
                    display: flex; align-items: center; justify-content: center;
                    font-size: 17px; color: white;
                    box-shadow: inset 0 -3px 6px rgba(0,0,0,0.15);
                    border: 2px solid white;
                ">
                    <div style="
                        position: absolute; top: 5px; left: 7px;
                        width: 13px; height: 9px;
                        background: rgba(255,255,255,0.55);
                        border-radius: 50%; filter: blur(1.5px);
                    "></div>
                    ${emoji}
                </div>
                <div style="
                    position: absolute; top: 30px; left: 50%;
                    transform: translateX(-50%);
                    width: 0; height: 0;
                    border-left: 10px solid transparent;
                    border-right: 10px solid transparent;
                    border-top: 18px solid ${color};
                "></div>
            </div>
        `,
        iconSize: [36, 48],
        iconAnchor: [18, 48],
        popupAnchor: [0, -48]
    });
}

let markers = {}; // { id: L.marker }
let currentFilters = { plastic: true, paper: true, glass: true, batteries: true, clothes: true };
let searchQuery = '';
let userLocation = null;
let currentRadius = 1;

function createMarker(point) {
    const mainCat = point.categories[0];
    const catInfo = CATEGORY_COLORS[mainCat];
    
    const marker = L.marker([point.lat, point.lng], {
        icon: createIcon(catInfo.color, catInfo.emoji)
    });

    const categoriesHTML = point.categories.map(c => {
        const info = CATEGORY_COLORS[c];
        return `<span class="popup-cat" style="background:${info.color}20; color:${info.color}; border:1px solid ${info.color}40;">${info.emoji} ${info.name}</span>`;
    }).join(' ');

    marker.bindPopup(`
        <div class="point-popup">
            <div class="popup-header">
                <h3>${point.name}</h3>
                ${point.verified ? '<span class="verified-badge" title="Проверено"><i class="fa-solid fa-circle-check"></i></span>' : ''}
            </div>
            <div class="popup-rating">
                <i class="fa-solid fa-star"></i>
                <b>${point.rating}</b>
                <span>(${point.reviews} отзывов)</span>
            </div>
            <div class="popup-address">
                <i class="fa-solid fa-location-dot"></i> ${point.address}
            </div>
            <div class="popup-hours">
                <i class="fa-solid fa-clock"></i> ${point.hours}
            </div>
            <div class="popup-cats">${categoriesHTML}</div>
            <div class="popup-actions">
                <button onclick="window.routeTo(${point.lat}, ${point.lng})" class="popup-btn primary">
                    <i class="fa-solid fa-route"></i> Маршрут
                </button>
                <button onclick="window.callPhone('${point.phone}')" class="popup-btn">
                    <i class="fa-solid fa-phone"></i>
                </button>
            </div>
        </div>
    `);

    return marker;
}

window.routeTo = function(lat, lng) {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
};

window.callPhone = function(phone) {
    window.location.href = `tel:${phone.replace(/\s/g, '')}`;
};

window.focusPoint = function(id) {
    const point = POINTS.find(p => p.id === id);
    if (!point) return;
    map.flyTo([point.lat, point.lng], 15, { duration: 1 });
    setTimeout(() => markers[id].openPopup(), 800);
};

function updateDisplay() {
    Object.values(markers).forEach(m => map.removeLayer(m));
    markers = {};

    const filtered = POINTS.filter(p => {
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            const matches = p.name.toLowerCase().includes(q) || p.address.toLowerCase().includes(q);
            if (!matches) return false;
        }
        const hasActive = p.categories.some(c => currentFilters[c]);
        if (!hasActive) return false;
        if (userLocation && currentRadius < 10) {
            const dist = getDistance(userLocation.lat, userLocation.lng, p.lat, p.lng);
            if (dist > currentRadius) return false;
        }
        return true;
    });

    filtered.forEach(p => {
        const m = createMarker(p);
        m.addTo(map);
        markers[p.id] = m;
    });

    renderPointsList(filtered);
    document.getElementById('points-count').textContent = `Найдено: ${filtered.length}`;
}

function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2)**2 +
              Math.cos(lat1 * Math.PI/180) * Math.cos(lat2 * Math.PI/180) *
              Math.sin(dLon/2)**2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

function renderPointsList(points) {
    const container = document.getElementById('points-list-container');

    if (points.length === 0) {
        container.innerHTML = `
            <div class="empty-points">
                <i class="fa-solid fa-map-location-dot"></i>
                <p>Ничего не найдено</p>
                <span>Попробуйте изменить фильтры</span>
            </div>
        `;
        return;
    }

    const sorted = [...points].sort((a, b) => {
        if (!userLocation) return 0;
        const da = getDistance(userLocation.lat, userLocation.lng, a.lat, a.lng);
        const db = getDistance(userLocation.lat, userLocation.lng, b.lat, b.lng);
        return da - db;
    });

    container.innerHTML = sorted.map(p => {
        const mainCat = CATEGORY_COLORS[p.categories[0]];
        let distHTML = '';
        if (userLocation) {
            const d = getDistance(userLocation.lat, userLocation.lng, p.lat, p.lng);
            distHTML = `<span class="point-distance">${d < 1 ? Math.round(d*1000) + ' м' : d.toFixed(1) + ' км'}</span>`;
        }

        const catsHTML = p.categories.map(c => {
            const info = CATEGORY_COLORS[c];
            return `<span class="mini-cat" style="background:${info.color};" title="${info.name}"></span>`;
        }).join('');

        return `
            <div class="point-item" onclick="window.focusPoint(${p.id})">
                <div class="point-icon" style="background:${mainCat.color}20; color:${mainCat.color};">
                    ${mainCat.emoji}
                </div>
                <div class="point-info">
                    <div class="point-name">
                        ${p.name}
                        ${p.verified ? '<i class="fa-solid fa-circle-check verified-mini"></i>' : ''}
                    </div>
                    <div class="point-meta">
                        <span><i class="fa-solid fa-star" style="color:#ffc107;"></i> ${p.rating}</span>
                        <span>·</span>
                        <span>${p.hours}</span>
                        ${distHTML ? '<span>·</span>' + distHTML : ''}
                    </div>
                    <div class="point-cats">${catsHTML}</div>
                </div>
            </div>
        `;
    }).join('');
}

document.addEventListener('DOMContentLoaded', () => {

    updateDisplay();

    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim();
        updateDisplay();
    });

    document.querySelectorAll('.filter-chips input[type="checkbox"]').forEach(cb => {
        cb.addEventListener('change', () => {
            currentFilters[cb.value] = cb.checked;
            updateDisplay();
        });
    });

    document.querySelectorAll('input[name="radius"]').forEach(r => {
        r.addEventListener('change', () => {
            currentRadius = parseFloat(r.value);
            if (!userLocation && currentRadius < 10) {
                alert('Сначала определите ваше местоположение кнопкой выше');
                document.querySelector('input[name="radius"][value="10"]').checked = true;
                currentRadius = 10;
                return;
            }
            updateDisplay();
        });
    });

    document.getElementById('geo-btn').addEventListener('click', () => {
        if (!navigator.geolocation) {
            alert('Геолокация не поддерживается вашим браузером');
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                userLocation = { lat: pos.coords.latitude, lng: pos.coords.longitude };
                map.flyTo([userLocation.lat, userLocation.lng], 13, { duration: 1.5 });

                L.circleMarker([userLocation.lat, userLocation.lng], {
                    radius: 8,
                    fillColor: '#2196f3',
                    color: 'white',
                    weight: 3,
                    fillOpacity: 1
                }).addTo(map).bindPopup('📍 Вы здесь');

                updateDisplay();
            },
            (err) => {
                alert('Не удалось определить местоположение. Разрешите доступ в браузере.');
            }
        );
    });

    document.getElementById('reset-view').addEventListener('click', () => {
        map.flyTo([41.311151, 69.279737], 12, { duration: 1 });
    });

    const addModal = document.getElementById('add-modal');
    document.getElementById('open-add-modal').addEventListener('click', () => {
        const user = window.LocalOrder.getCurrentUser();
        if (!user) {
            alert('Войдите в аккаунт, чтобы добавить пункт');
            window.LocalOrder.openAuthModal('login');
            return;
        }
        addModal.classList.add('open');
    });

    document.getElementById('add-close').addEventListener('click', () => addModal.classList.remove('open'));
    addModal.addEventListener('click', (e) => {
        if (e.target === addModal) addModal.classList.remove('open');
    });

    document.getElementById('add-submit').addEventListener('click', () => {
        const name = document.getElementById('add-name').value.trim();
        const address = document.getElementById('add-address').value.trim();
        const phone = document.getElementById('add-phone').value.trim();
        const selectedCats = [...document.querySelectorAll('.category-checks input:checked')].map(c => c.value);
        const err = document.getElementById('add-error');

        if (!name) return err.textContent = 'Введите название';
        if (!address) return err.textContent = 'Введите адрес';
        if (selectedCats.length === 0) return err.textContent = 'Выберите хотя бы одну категорию';

        const pending = JSON.parse(localStorage.getItem('localorder_pending') || '[]');
        pending.push({
            name, address, phone,
            categories: selectedCats,
            submittedAt: new Date().toISOString(),
            status: 'pending'
        });
        localStorage.setItem('localorder_pending', JSON.stringify(pending));

        alert(`✅ Спасибо! Пункт "${name}" отправлен на проверку.`);
        addModal.classList.remove('open');
        document.getElementById('add-name').value = '';
        document.getElementById('add-address').value = '';
        document.getElementById('add-phone').value = '';
        document.querySelectorAll('.category-checks input').forEach(c => c.checked = false);
        err.textContent = '';
    });

});