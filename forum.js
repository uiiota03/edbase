// Chat Section
function loadChatData() {
    const chatMessagesDiv = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const sendButton = document.getElementById('sendButton');
    const usernameInput = document.getElementById('username');

    // Make sure the username input exists
    if (!usernameInput) {
        console.error("Username input not found!");
        return;
    }

    let currentUsername = 'Anonymous';

    // Get stored username from localStorage, if any
    if (localStorage.getItem('username')) {
        currentUsername = localStorage.getItem('username');
        usernameInput.value = currentUsername;
    }

    // Function to create message elements
    function createMessageElement(messageText, username) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('p-3', 'bg-gray-100', 'rounded-lg', 'shadow-sm', 'max-w-xs', 'mx-auto');
        messageElement.innerHTML = `
                    <p><strong>${username}:</strong> ${messageText}</p>
                    <div class="flex justify-between items-center mt-2">
                        <button onclick="editMessage(this)" class="text-blue-500 text-sm">Edit</button>
                        <button onclick="deleteMessage(this)" class="text-red-500 text-sm">Delete</button>
                    </div>
                    <div class="text-xs text-gray-500 mt-1">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                `;
        return messageElement;
    }

    // Send message functionality
    function sendMessage() {
        const message = chatInput.value.trim();

        if (message && currentUsername !== '') {
            // Create and display new message
            const messageElement = createMessageElement(message, currentUsername);
            chatMessagesDiv.appendChild(messageElement);

            // Scroll to the bottom of the chat window
            chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight;

            // Clear the input field after message is sent
            chatInput.value = '';
        }
    }

    // Send message on Enter key press
    chatInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault(); // Prevent new line on Enter
            sendMessage();
        }
    });

    // Send message on button click
    sendButton.addEventListener('click', function () {
        sendMessage(); // Ensure this correctly calls the sendMessage function
    });

    // Edit message functionality
    window.editMessage = function (button) {
        const messageDiv = button.closest('div');
        const messageText = messageDiv.querySelector('p').textContent.replace(/^.*?: /, ''); // Remove the username part
        const newMessage = prompt('Edit your message:', messageText);

        if (newMessage && newMessage !== messageText) {
            messageDiv.querySelector('p').textContent = `${currentUsername}: ${newMessage}`;
        }
    };

    // Delete message functionality
    window.deleteMessage = function (button) {
        const messageDiv = button.closest('div');
        messageDiv.remove();
    };

    // Notification system for new messages
    let notificationTimeout;
    function notifyNewMessage() {
        clearTimeout(notificationTimeout);
        document.title = "New message in forum!";
        notificationTimeout = setTimeout(() => {
            document.title = "Forum"; // Reset title after a while
        }, 5000);
    }

    // Listen for new messages and show notifications
    chatMessagesDiv.addEventListener('DOMNodeInserted', function () {
        notifyNewMessage();
    });

    // Load stored username
    usernameInput.addEventListener('input', function () {
        currentUsername = usernameInput.value.trim();
        if (currentUsername) {
            localStorage.setItem('username', currentUsername); // Save username to localStorage
        }
    });
}

// Initialize the chat when the DOM is loaded
document.addEventListener('DOMContentLoaded', loadChatData);