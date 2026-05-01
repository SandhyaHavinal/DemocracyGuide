// global.js
document.addEventListener('DOMContentLoaded', () => {
    // Setup Chat Bot
    const chatFab = document.getElementById('chatFab');
    const chatWindow = document.getElementById('chatWindow');
    const closeChatBtn = document.getElementById('closeChatBtn');
    const sendChatBtn = document.getElementById('sendChatBtn');
    const chatInput = document.getElementById('chatInput');
    const chatBody = document.getElementById('chatBody');

    if (chatFab && chatWindow) {
        chatFab.addEventListener('click', () => {
            chatWindow.classList.toggle('hidden');
        });

        closeChatBtn.addEventListener('click', () => {
            chatWindow.classList.add('hidden');
        });

        sendChatBtn.addEventListener('click', handleUserMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleUserMessage();
        });
    }

    function addBotMessage(text) {
        if (!chatBody) return;
        const msgDiv = document.createElement('div');
        msgDiv.className = 'chat-message bot';
        msgDiv.innerHTML = `<p>${text}</p>`;
        chatBody.appendChild(msgDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function handleUserMessage() {
        const text = chatInput.value.trim();
        if (!text) return;

        const userMsg = document.createElement('div');
        userMsg.className = 'chat-message user';
        userMsg.innerHTML = `<p>${text}</p>`;
        chatBody.appendChild(userMsg);
        
        chatInput.value = '';
        chatBody.scrollTop = chatBody.scrollHeight;

        setTimeout(() => {
            let botResponse = t('bot_default');

            const intents = [
                { key: 'bot_register', keywords: ["register", "registration", "how to register", "sign up", "पंजीकरण", "பதிவு", "నమోదు"] },
                { key: 'bot_deadline', keywords: ["when", "deadline", "date", "time", "समय", "கால", "తేదీ", "గడువు"] },
                { key: 'bot_location', keywords: ["where", "location", "poll", "booth", "स्थान", "இடம்", "ప్రదేశం", "స్థలం"] },
                { key: 'bot_mail', keywords: ["mail", "absentee", "post", "मेल", "அஞ்சல்", "మెయిల్"] },
                { key: 'bot_resource', keywords: ["resource", "help", "learn", "guide", "संसाधन", "வளம்", "వనరులు"] }
            ];

            if (typeof Fuse !== 'undefined') {
                const fuse = new Fuse(intents, {
                    keys: ['keywords'],
                    threshold: 0.4,
                    includeScore: true
                });
                
                const result = fuse.search(text);
                if (result.length > 0 && result[0].score <= 0.4) {
                    botResponse = t(result[0].item.key);
                }
            } else {
                // Fallback basic keyword matching
                const lowerText = text.toLowerCase();
                if (lowerText.includes("register") || lowerText.includes("registration") || lowerText.includes("पंजीकरण") || lowerText.includes("பதிவு") || lowerText.includes("నమోదు")) {
                    botResponse = t('bot_register');
                } else if (lowerText.includes("when") || lowerText.includes("deadline") || lowerText.includes("date") || lowerText.includes("समय") || lowerText.includes("கால")) {
                    botResponse = t('bot_deadline');
                } else if (lowerText.includes("where") || lowerText.includes("location") || lowerText.includes("poll") || lowerText.includes("स्थान") || lowerText.includes("இடம்")) {
                    botResponse = t('bot_location');
                } else if (lowerText.includes("mail") || lowerText.includes("absentee") || lowerText.includes("मेल") || lowerText.includes("அஞ்சல்")) {
                    botResponse = t('bot_mail');
                } else if (lowerText.includes("resource") || lowerText.includes("help") || lowerText.includes("learn") || lowerText.includes("संसाधन") || lowerText.includes("வளம்")) {
                    botResponse = t('bot_resource');
                }
            }

            addBotMessage(botResponse);
        }, 1000);
    }
});
