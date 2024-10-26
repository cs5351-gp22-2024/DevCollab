<template>
    <div class="chatbot" v-if="isOpen">
        <div class="header" @click="toggleChat">
            <h4>DevCollab Chatbot</h4>
            <hr>
        </div>
        <div class="messages">
            <div v-for="(msg, index) in messages" :key="index" class="message">
                <p><strong>You:</strong> {{ msg.question }}</p>
                <p><strong>Bot:</strong> {{ msg.answer }}</p>
            </div>
        </div>
        <div class="input-container">
            <textarea class="form-control" v-model="question" @keyup.enter="sendQuestion" placeholder="Ask me something..."/>
            <button class="send-button bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" @click="sendQuestion">Send</button>
        </div>
    </div>
    <div class="chatbot-icon" v-if="!isOpen" @click="toggleChat">
        <span>💬</span>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isOpen: false,
            question: '',
            messages: []
        };
    },
    methods: {
        toggleChat() {
            this.isOpen = !this.isOpen;
        },
        sendQuestion() {
            if (this.question.trim()) {
                this.messages.push({ question: this.question, answer: '' });
                this.socket.send(this.question);
                this.question = '';
            }
        }
    },
    created() {
        this.socket = new WebSocket('ws://localhost:3000');
        this.socket.onmessage = (event) => {
            this.messages[this.messages.length - 1].answer = event.data;
        };
    },
    beforeDestroy() {
        this.socket.close();
    }
}
</script>

<style scoped>

.header h4:hover {
    cursor: pointer; /* Change cursor style on hover */
}

.messages {
    padding: 0px 10px;
    margin-bottom: 10px;
    line-height: 20px;
    overflow-y: auto; /* Enable vertical scrolling */
    max-height: 200px; /* Set a maximum height for scrollable area */
}

.message {
    margin-bottom: 10px; /* Add spacing between messages */
}

.message p {
    word-break: break-all;
}

.chatbot {
    position: fixed;
    bottom: 30px; 
    right: 30px; 
    width: 300px;
    min-height: 350px; 
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 20px; 
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    overflow: hidden; 
    padding:20px;
}

.chatbot-icon {
    position: fixed;
    bottom: 30px;
    right: 30px;
    cursor: pointer;
    z-index: 1000; 
    background-color: #ef5350; 
    color: white; 
    border-radius: 50%; 
    width: 55px; 
    height: 55px; 
    text-align: center;
    line-height: 50px; 
}

.chatbot-icon span {
    vertical-align: middle;
}

.input-container {
    position: relative;
    display: flex;
    flex-direction: column;
    height: calc(100% - 40px); /* Adjust the height to accommodate the textarea and button */
}

textarea {
    flex: 1; /* Allow the textarea to grow with the container */
    resize: none; /* Disable resizing of the textarea */
}

.send-button {
    align-self: flex-end; /* Align the button to the end of the flex container (bottom) */
    margin-top: 10px; /* Adjust the top margin as needed */
    width: auto; /* Allow the button to adjust its width based on content */
} 
</style>
