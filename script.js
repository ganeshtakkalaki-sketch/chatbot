document.addEventListener('DOMContentLoaded', () => {
    const chatbotMessages = document.getElementById('chatbotMessages');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');

    // Function to add a message to the chat
    function addMessage(text, sender, isButtonOptions = false) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${sender}-message`);
        if (isButtonOptions) {
            messageDiv.classList.remove(`${sender}-message`); // Remove sender class if it's just buttons
            messageDiv.classList.add('button-options');
        }
        messageDiv.innerHTML = text;
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight; // Scroll to bottom
    }

    // Function to handle bot responses
    function getBotResponse(userMessage) {
        userMessage = userMessage.toLowerCase();

        // Check for specific button actions first
        if (userMessage === "explore-plans") {
            const planDetails = `
                <h4>Investment Plans:</h4>
                <ul>
                    <li>Term Insurance</li>
                    <li>Health Insurance</li>
                    <li>Retirement Plans</li>
                    <li>Child Plans</li>
                </ul>
                <div class="image-card">
                    <img src="https://via.placeholder.com/150x100?text=SUD+Life+Plans" alt="SUD Life Plans">
                    <div class="image-card-text">Learn more about our various plans.</div>
                </div>
            `;
            addMessage(planDetails, 'bot');
            addMessage(`<button class="option-button" data-action="contact-support">Contact Support</button>
                         <button class="option-button" data-action="main-menu">Main Menu</button>`, 'bot', true);
            return;
        } else if (userMessage === "pay-premium") {
            addMessage("You can pay your premium online by visiting our payment portal. Do you want the link?", 'bot');
            addMessage(`<button class="option-button" data-action="yes-link">Yes, link please</button>
                         <button class="option-button" data-action="no-thanks">No, thanks</button>`, 'bot', true);
            return;
        } else if (userMessage === "file-claim") {
            addMessage("To file a claim, please visit our claims section on the website or call our helpline.", 'bot');
            addMessage(`<button class="option-button" data-action="visit-claims">Visit Claims</button>
                         <button class="option-button" data-action="helpline">Helpline Number</button>`, 'bot', true);
            return;
        } else if (userMessage === "contact-support") {
            addMessage("You can reach our support team at 1800-123-4567 or email support@sudlife.com", 'bot');
            addMessage(`<button class="option-button" data-action="main-menu">Main Menu</button>`, 'bot', true);
            return;
        } else if (userMessage === "yes-link") {
            addMessage("Here's the link: <a href='https://www.sudlife.in/pay-premium' target='_blank'>SUD Life Payment Portal</a>", 'bot');
            addMessage(`<button class="option-button" data-action="main-menu">Main Menu</button>`, 'bot', true);
            return;
        } else if (userMessage === "no-thanks") {
            addMessage("No problem! Is there anything else I can help with?", 'bot');
            addMessage(`<button class="option-button" data-action="main-menu">Main Menu</button>`, 'bot', true);
            return;
        } else if (userMessage === "visit-claims") {
            addMessage("Here's the claims portal: <a href='https://www.sudlife.in/claims' target='_blank'>SUD Life Claims</a>", 'bot');
            addMessage(`<button class="option-button" data-action="main-menu">Main Menu</button>`, 'bot', true);
            return;
        } else if (userMessage === "helpline") {
            addMessage("Our helpline number is 1800-123-4567. Available 24/7.", 'bot');
            addMessage(`<button class="option-button" data-action="main-menu">Main Menu</button>`, 'bot', true);
            return;
        } else if (userMessage === "main-menu") {
             addMessage(`Hello! I'm Dai-ichi Buddy. How may I assist you today?`, 'bot');
             addMessage(`<button class="option-button" data-action="explore-plans">Explore Plans</button>
                          <button class="option-button" data-action="pay-premium">Pay Premium</button>
                          <button class="option-button" data-action="file-claim">File Claim</button>`, 'bot', true);
             return;
        }


        // Basic text-based responses (if no button action matches)
        if (userMessage.includes("hello") || userMessage.includes("hi")) {
            addMessage("Hello there! How can I help you today?", 'bot');
        } else if (userMessage.includes("plan") || userMessage.includes("insurance")) {
            addMessage("Are you looking to explore our plans?", 'bot');
            addMessage(`<button class="option-button" data-action="explore-plans">Explore Plans</button>`, 'bot', true);
        } else if (userMessage.includes("premium")) {
            addMessage("Do you want to pay your premium?", 'bot');
            addMessage(`<button class="option-button" data-action="pay-premium">Pay Premium</button>`, 'bot', true);
        } else if (userMessage.includes("claim")) {
            addMessage("Are you looking to file a claim?", 'bot');
            addMessage(`<button class="option-button" data-action="file-claim">File Claim</button>`, 'bot', true);
        } else if (userMessage.includes("thank")) {
            addMessage("You're welcome! Is there anything else?", 'bot');
        }
        else {
            // Default response if no keyword or button action is matched
            addMessage("I'm sorry, I don't understand that. Can you please choose from the options or try rephrasing?", 'bot');
            addMessage(`<button class="option-button" data-action="main-menu">Main Menu</button>`, 'bot', true);
        }
    }

    // Event listener for sending messages
    sendButton.addEventListener('click', () => {
        const messageText = userInput.value.trim();
        if (messageText) {
            addMessage(messageText, 'user');
            userInput.value = ''; // Clear input
            setTimeout(() => getBotResponse(messageText), 500); // Simulate bot typing
        }
    });

    // Event listener for Enter key
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendButton.click();
        }
    });

    // Event listener for option buttons
    chatbotMessages.addEventListener('click', (e) => {
        if (e.target.classList.contains('option-button')) {
            const action = e.target.dataset.action;
            // You can optionally display the button text as a user message
            addMessage(e.target.textContent, 'user');
            setTimeout(() => getBotResponse(action), 500);
        }
    });
});