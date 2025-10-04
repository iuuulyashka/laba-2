document.getElementById("deliveryForm").addEventListener("submit", function(e) {
    e.preventDefault(); // Предотвращаем перезагрузку страницы
    
    // Собираем данные формы
    const formData = new FormData(this);
    
    // Получаем значения
    const name = formData.get('name');
    const dishCount = parseInt(formData.get('dishCount'));
    const restaurant = formData.get('restaurant');
    const onlinePayment = formData.get('onlinePayment') === 'yes';
    const packaging = formData.get('packaging');
    
    // Рассчитываем стоимость
    const basePrice = dishCount * 450; // 450₽ за блюдо
    let packagingPrice = 0;
    let totalPrice = basePrice;
    
    // Добавляем стоимость упаковки
    if (packaging === 'eco') {
        packagingPrice = 50;
        totalPrice += packagingPrice;
    } else if (packaging === 'premium') {
        packagingPrice = 100;
        totalPrice += packagingPrice;
    }
    
    // Применяем скидку за онлайн оплату
    let discount = 0;
    if (onlinePayment) {
        discount = totalPrice * 0.05;
        totalPrice -= discount;
    }
    
    // Формируем красивый вывод
    let output = '';
    
    // Имя
    output += `
        <div class="result-item">
            <span class="result-label">👤 Имя:</span>
            <span class="result-value">${name}</span>
        </div>
    `;
    
    // Количество блюд
    output += `
        <div class="result-item">
            <span class="result-label">🍽️ Количество блюд:</span>
            <span class="result-value">${dishCount} шт.</span>
        </div>
    `;
    
    // Ресторан
    const restaurantNames = {
        'pizza': '🍕 Пицца "Итальянская"',
        'sushi': '🍣 Суши-бар "Сакура"',
        'burger': '🍔 Бургер-хаус "Американский"',
        'asia': '🥡 Азиатская кухня "Восток"',
        'healthy': '🥗 Здоровая еда "Фитнес"'
    };
    output += `
        <div class="result-item">
            <span class="result-label">🏪 Ресторан:</span>
            <span class="result-value">${restaurantNames[restaurant]}</span>
        </div>
    `;
    
    // Тип упаковки
    const packagingNames = {
        'standard': '📦 Стандартная',
        'eco': '🌿 Эко-упаковка',
        'premium': '🎁 Премиум'
    };
    output += `
        <div class="result-item">
            <span class="result-label">📦 Упаковка:</span>
            <span class="result-value">${packagingNames[packaging]} ${packagingPrice > 0 ? `(+${packagingPrice}₽)` : ''}</span>
        </div>
    `;
    
    // Оплата онлайн
    output += `
        <div class="result-item">
            <span class="result-label">💳 Оплата онлайн:</span>
            <span class="result-value">${onlinePayment ? '✅ Да (скидка 5%)' : '❌ Нет'}</span>
        </div>
    `;
    
    // Стоимость
    output += `
        <div class="result-item" style="border-top: 2px solid rgba(255,255,255,0.5); margin-top: 15px; padding-top: 15px;">
            <span class="result-label">💰 Базовая стоимость:</span>
            <span class="result-value">${basePrice}₽</span>
        </div>
    `;
    
    if (packagingPrice > 0) {
        output += `
            <div class="result-item">
                <span class="result-label">📦 Упаковка:</span>
                <span class="result-value">+${packagingPrice}₽</span>
            </div>
        `;
    }
    
    if (discount > 0) {
        output += `
            <div class="result-item">
                <span class="result-label">🎁 Скидка 5%:</span>
                <span class="result-value">-${discount.toFixed(0)}₽</span>
            </div>
        `;
    }
    
    output += `
        <div class="result-item" style="font-weight: bold; border-top: 2px solid rgba(255,255,255,0.8);">
            <span class="result-label">💵 ИТОГО:</span>
            <span class="result-value">${totalPrice.toFixed(0)}₽</span>
        </div>
    `;
    
    // Время доставки
    const deliveryTime = "30-45 минут";
    output += `
        <div class="result-item">
            <span class="result-label">⏰ Время доставки:</span>
            <span class="result-value">${deliveryTime}</span>
        </div>
    `;
    
    // Выводим результат
    document.getElementById("resultContent").innerHTML = output;
    document.getElementById("result").style.display = 'block';
    
    // Прокручиваем к результату
    document.getElementById("result").scrollIntoView({ 
        behavior: 'smooth' 
    });
    
    // Показываем alert с подтверждением
    let alertMessage = `Спасибо, ${name}!\n\n`;
    alertMessage += `Ваш заказ из ${restaurantNames[restaurant]} оформлен!\n`;
    alertMessage += `Количество блюд: ${dishCount}\n`;
    alertMessage += `Тип упаковки: ${packagingNames[packaging]}\n`;
    alertMessage += `Оплата онлайн: ${onlinePayment ? 'Да' : 'Нет'}\n`;
    alertMessage += `Сумма: ${totalPrice.toFixed(0)}₽\n\n`;
    alertMessage += `Ожидайте доставку через ${deliveryTime}`;
    
    alert(alertMessage);
});

// Добавляем валидацию количества блюд
document.getElementById('dishCount').addEventListener('blur', function() {
    const count = parseInt(this.value);
    
    if (count && (count < 1 || count > 10)) {
        alert('Пожалуйста, введите количество блюд от 1 до 10');
        this.focus();
    }
});

// Динамическое обновление информации о ресторане
document.getElementById('restaurant').addEventListener('change', function() {
    const restaurant = this.value;
    const deliveryInfo = document.querySelector('.delivery-time');
    
    if (deliveryInfo) {
        if (restaurant === 'sushi') {
            deliveryInfo.textContent = '* Время доставки: 25-40 минут';
        } else if (restaurant === 'pizza') {
            deliveryInfo.textContent = '* Время доставки: 30-45 минут';
        } else {
            deliveryInfo.textContent = '* Время доставки: 35-50 минут';
        }
    }
});