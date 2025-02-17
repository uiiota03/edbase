function loadChatData() {
    const chatMessagesDiv = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const sendButton = document.getElementById('sendButton');
    const usernameInput = document.getElementById('username');
    const filterButtons = document.querySelectorAll(".category-filter");

    if (!chatMessagesDiv || !chatInput || !sendButton || !usernameInput) {
        console.error("Forum elementlari topilmadi!");
        return;
    }

    let currentUsername = 'Anonymous';

    // Username saqlangan bo'lsa, uni olish
    if (localStorage.getItem('username')) {
        currentUsername = localStorage.getItem('username');
        usernameInput.value = currentUsername;
    }

    // Username input o'zgarishini kuzatish
    usernameInput.addEventListener('input', function () {
        currentUsername = usernameInput.value.trim();
        localStorage.setItem('username', currentUsername);
    });

    // 🟢 Xabar yaratish funksiyasi
    function createMessageElement(messageText, username, messageType, time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', 'p-4', 'bg-gray-100', 'rounded-lg', 'shadow-sm', 'border');
        messageElement.setAttribute('data-type', messageType);

        let typeColor = 'bg-blue-100 text-blue-800'; // Default - question
        if (messageType === 'discussion') typeColor = 'bg-purple-100 text-purple-800';
        else if (messageType === 'reply') typeColor = 'bg-green-100 text-green-800';

        messageElement.innerHTML = `
            <div class="flex items-center gap-2 mb-2">
                <span class="font-bold text-blue-600">@${username}</span>
                <span class="text-sm text-gray-500">${time}</span>
                <span class="px-2 py-1 ${typeColor} text-xs rounded">${messageType}</span>
            </div>
            <p class="mb-2">${messageText}</p>
            <div class="flex gap-2 text-sm">
                <button onclick="editMessage(this)" class="text-blue-500">✏️ Edit</button>
                <button onclick="deleteMessage(this)" class="text-red-500">🗑 Delete</button>
            </div>
        `;

        return messageElement;
    }

    // 🟢 Default xabarlarni qo‘shish funksiyasi
    function addDefaultMessages() {
        const defaultMessages = [
            { username: "student1", time: "18:56", type: "question", text: "Salom, savol bor edi" },
            { username: "student1", time: "18:57", type: "discussion", text: "Salom, munozaraga nima deysizlar:)" },
            { username: "student1", time: "18:57", type: "reply", text: "Menda siz uchun javoblar bor))" },
            { username: "Izzatillo", time: "18:58", type: "discussion", text: "Judayam hursand bo'ldim, rahmat javob uchun))" }
        ];

        defaultMessages.forEach(msg => {
            const messageElement = createMessageElement(msg.text, msg.username, msg.type, msg.time);
            chatMessagesDiv.appendChild(messageElement);
        });
    }

    // 🟢 Xabar yuborish funksiyasi
    function sendMessage() {
        const message = chatInput.value.trim();
        const messageType = document.getElementById("messageType").value;

        if (message && currentUsername !== '') {
            const messageElement = createMessageElement(message, currentUsername, messageType);
            chatMessagesDiv.appendChild(messageElement);
            chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight;

            chatInput.value = ''; // Inputni tozalash
        }
    }

    // 🟢 Enter bosilganda xabar yuborish
    chatInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }
    });

    // 🟢 Tugmani bosganda xabar yuborish
    sendButton.addEventListener('click', function () {
        sendMessage();
    });

    // 🟢 Xabarni tahrirlash
    window.editMessage = function (button) {
        const messageDiv = button.closest('.message');
        const messageTextElement = messageDiv.querySelector('p');
        const messageText = messageTextElement.textContent;
        const newMessage = prompt('Xabaringizni tahrirlang:', messageText);

        if (newMessage && newMessage !== messageText) {
            messageTextElement.textContent = newMessage;
        }
    };

    // 🟢 Xabarni o‘chirish
    window.deleteMessage = function (button) {
        const messageDiv = button.closest('.message');
        messageDiv.remove();
    };

    // 🟢 FILTR FUNKSIYASI - Kategoriyalar bo‘yicha xabarlarni saralash
    function filterMessages(category) {
        const messages = document.querySelectorAll('.message');

        messages.forEach((message) => {
            const messageType = message.getAttribute('data-type');

            if (category === "all" || messageType === category) {
                message.style.display = "block";
            } else {
                message.style.display = "none";
            }
        });
    }

    // 🟢 Filtr tugmalariga event qo‘shish
    filterButtons.forEach(button => {
        button.addEventListener("click", function () {
            const category = button.getAttribute("data-category");
            filterMessages(category);
        });
    });

    // 🟢 Default xabarlarni chat yuklanganda qo‘shish
    addDefaultMessages();
}

// 🟢 Forum sahifasi yuklanganidan keyin chatni ishga tushirish
document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('chatMessages')) {
        loadChatData();
    }
});
