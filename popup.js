document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("testNotification").addEventListener("click", () => {
        chrome.runtime.sendMessage({ action: "newOrder" });
    });
});

document.getElementById("testNotification").addEventListener("click", () => {
    const audioUrl = chrome.runtime.getURL("notification.mp3");
    console.log("Попытка воспроизвести звук из URL:", audioUrl); // Проверка URL

    const audio = new Audio(audioUrl);
    audio.play().then(() => {
        console.log("Звук успешно воспроизведён!");
    }).catch((error) => {
        console.error("Ошибка воспроизведения звука:", error);
    });
});
