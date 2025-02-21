// background.js

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "new_order") {
      chrome.notifications.create({
        type: "basic",
        iconUrl: chrome.runtime.getURL("icon.png"),
        title: "Новый ордер!",
        message: message.message
      });
    }
  });

// chrome.runtime.onMessage.addListener((request, sender) => {
//     console.log("📩 Получено сообщение в background.js:", request);

//     if (request.action === 'newOrder') {
//         console.log("🔔 Создаём уведомление...");
//         sendNotification();
//     }
// });

// // Обработчик сообщений от content.js
// chrome.runtime.onMessage.addListener((request, sender) => {
//     console.log("📩 Получено сообщение в background.js:", request);

//     if (request.action === 'newOrder') {
//         console.log("🔔 Создаём уведомление...");

//         chrome.notifications.create({
//             type: 'basic',
//             iconUrl: 'icon.png',
//             title: 'Новый ордер!',
//             message: 'Обнаружен новый ордер. Проверьте детали.'
//         }, (notificationId) => {
//             if (chrome.runtime.lastError) {
//                 console.error("❌ Ошибка создания уведомления:", chrome.runtime.lastError);
//             } else {
//                 console.log("✅ Уведомление создано с ID:", notificationId);
//             }
//         });

//         if (sender.tab) {
//             chrome.tabs.sendMessage(sender.tab.id, { action: 'playSound' });
//         }
//     }
// });

// // Функция для отправки уведомления
// function sendNotification() {
//     console.log("Создаём уведомление...");
//     chrome.notifications.create({
//         type: 'basic',
//         iconUrl: 'icon.png',
//         title: 'Новый ордер!',
//         message: 'Обнаружен новый ордер. Проверьте детали.'
//     });

//     // Отправляем команду на воспроизведение звука в content.js
//     chrome.runtime.sendMessage({ action: 'playSound' });
// }
