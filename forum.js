function loadChatData() {
    const chatMessagesDiv = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const sendButton = document.getElementById('sendButton');
    const filterButtons = document.querySelectorAll(".category-filter");

    if (!chatMessagesDiv || !chatInput || !sendButton) {
        console.error("Forum elementlari topilmadi!");
        return;
    }

    let messages = JSON.parse(localStorage.getItem('forumMessages')) || [];

    function saveMessages() {
        localStorage.setItem('forumMessages', JSON.stringify(messages));
    }

    // Function to add default messages only if they don't exist
    function addDefaultMessages() {
        const defaultMessages = [
            {
                username: "Izzatillo Ubaydullayev",
                time: "2025-01-01T00:00:00.000Z", // ISO format for midnight on Jan 1, 2025 (UTC)
                type: "discussion",
                text: "Assalomu alaykum :)"
            }
        ];

        defaultMessages.forEach(defaultMsg => {
            if (!messages.some(msg => msg.username === defaultMsg.username && msg.text === defaultMsg.text)) {
                messages.push(defaultMsg);
            }
        });
        saveMessages(); // Save to localStorage after adding default messages if needed
    }

    // Xabar yaratish funksiyasi
    function createMessageElement(message, index) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', 'p-4', 'bg-gray-100', 'rounded-lg', 'shadow-sm', 'border');
        messageElement.setAttribute('data-type', message.type);

        let typeColor = 'bg-blue-100 text-blue-800'; // Default - question
        if (message.type === 'discussion') typeColor = 'bg-purple-100 text-purple-800';
        else if (message.type === 'reply') typeColor = 'bg-green-100 text-green-800';

        messageElement.innerHTML = `
            <div class="flex items-center gap-2 mb-2">
                <span class="font-bold text-blue-600">@${message.username}</span>
                <span class="text-sm text-gray-500">${new Date(message.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                <span class="px-2 py-1 ${typeColor} text-xs rounded">${message.type}</span>
            </div>
            <p class="mb-2">${message.text}</p>
        `;

        // Edit and delete buttons only for the user who posted the message
        if (message.username === localStorage.getItem('loggedInUsername')) {
            messageElement.innerHTML += `
                <div class="flex gap-2 text-sm">
                    <button onclick="editMessage(${index})" class="text-blue-500" aria-label="Tahrirlash">✏️ Edit</button>
                    <button onclick="deleteMessage(${index})" class="text-red-500" aria-label="O'chirish">🗑 Delete</button>
                </div>
            `;
        }

        return messageElement;
    }

    // Xabarlarni yuklash va ko'rsatish
    function loadMessages() {
        chatMessagesDiv.innerHTML = '';
        messages.forEach((message, index) => {
            const messageElement = createMessageElement(message, index);
            chatMessagesDiv.appendChild(messageElement);
        });
    }

    // Xabar yuborish funksiyasi
    function sendMessage() {
        const message = chatInput.value.trim();
        const messageType = document.getElementById("messageType").value;

        if (message) {
            messages.push({
                username: localStorage.getItem('loggedInUsername') || 'Anonymous',
                text: message,
                type: messageType,
                time: new Date().toISOString()
            });
            loadMessages();
            chatInput.value = ''; // Inputni tozalash
            chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight;
            saveMessages(); // Save after adding new message
        }
    }

    // Enter bosilganda xabar yuborish
    chatInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }
    });

    // Tugmani bosganda xabar yuborish
    sendButton.addEventListener('click', sendMessage);

    // Xabarni tahrirlash
    window.editMessage = function (index) {
        const newMessage = prompt('Xabaringizni tahrirlang:', messages[index].text);
        if (newMessage && newMessage !== messages[index].text) {
            messages[index].text = newMessage;
            loadMessages();
            saveMessages();
        }
    };

    // Xabarni o‘chirish
    window.deleteMessage = function (index) {
        if (confirm("Rostdan ham ushbu xabarni o'chirmoqchimisiz?")) {
            messages.splice(index, 1);
            loadMessages();
            saveMessages();
        }
    };

    // FILTR FUNKSIYASI - Kategoriyalar bo‘yicha xabarlarni saralash
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

    // Filtr tugmalariga event qo‘shish
    filterButtons.forEach(button => {
        button.addEventListener("click", function () {
            const category = this.getAttribute("data-category");
            filterMessages(category);
        });
    });

    // Add default messages at the start, but only if not already present
    addDefaultMessages();

    // Load messages after adding or checking for default messages
    loadMessages();
}

// Forum sahifasi yuklanganidan keyin chatni ishga tushirish
document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('chatMessages')) {
        loadChatData();
    }
});

function loadForumData() {
    console.log('loadForumData is called');
    loadChatData();
}