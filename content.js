// Дожидаемся полной загрузки DOM
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM загружен, запускаем скрипт...");


    // Настроим MutationObserver для отслеживания изменений в `flag-icons`
    function observeFlagIcons() {
        const flagIcon = document.querySelector('.flag-icons');
        console.log("🔍 Проверяем наличие .flag-icons...", flagIcon);

        if (flagIcon) {
            console.log("✅ Элемент .flag-icons найден!", flagIcon.textContent);

            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    console.log("🔄 MutationObserver сработал! Тип:", mutation.type);
                    console.log("📝 Старое значение:", mutation.oldValue);
                    console.log("🆕 Новое значение:", flagIcon.textContent);
                    checkForNewOrders();
                });
            });

            observer.observe(flagIcon, {
                childList: true, // Следим за изменением детей
                subtree: true, // Следим за изменениями внутри
                characterData: true, // Следим за изменением текста
                characterDataOldValue: true // Сохраняем старые значения
            });
        } else {
            console.warn("⏳ Элемент .flag-icons не найден! Ожидаем...");
            setTimeout(observeFlagIcons, 1000);
        }
    }


    function checkForNewOrders() {
        console.log("🔎 Проверяем флаг...");

        const flagIcon = document.querySelector('.flag-icons');
        if (flagIcon) {
            const orderCount = parseInt(flagIcon.textContent.trim(), 10);
            console.log("📊 Найдено ордеров:", orderCount);

            if (!isNaN(orderCount) && orderCount > 0) {
                console.log("🚀 Новый ордер! Отправляем сообщение...");
                chrome.runtime.sendMessage({ action: 'newOrder' });
            } else {
                console.log("🔹 Ордеров нет (orderCount = 0)");
            }
        } else {
            console.warn("⚠️ Элемент .flag-icons не найден!");
        }
    }

    // Запускаем наблюдение и проверку
    observeFlagIcons();
    checkForNewOrders();
});

// Получение сообщения для воспроизведения звука
chrome.runtime.onMessage.addListener((request) => {
    if (request.action === "playSound") {
        const audioUrl = chrome.runtime.getURL("notification.mp3");
        console.log("Попытка воспроизвести звук:", audioUrl);

        const audio = new Audio(audioUrl);

        audio.play().then(() => {
            console.log("Звук успешно воспроизведён!");
        }).catch((error) => {
            console.error("Ошибка воспроизведения звука:", error);
        });
    }
});
