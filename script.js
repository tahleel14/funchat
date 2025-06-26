// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_WRmbWPOh_RONYIdGztRP8i0FYqlebLw",
  authDomain: "fun-chat-b734d.firebaseapp.com",
  projectId: "fun-chat-b734d",
  storageBucket: "fun-chat-b734d.firebasestorage.app",
  messagingSenderId: "429302317263",
  appId: "1:429302317263:web:cb9b47d21b34e4df2ef7ba"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const chatBox = document.getElementById("chatBox");
const msgInput = document.getElementById("msgInput");
const usernameInput = document.getElementById("username");

function sendMessage() {
  const text = msgInput.value.trim();
  const name = usernameInput.value.trim() || "Anonymous";
  if (text === "") return;

  const messageData = {
    name: name,
    text: text,
    timestamp: Date.now()
  };

  db.ref("messages").push(messageData);
  msgInput.value = "";
}

function displayMessage(data) {
  const { name, text } = data;
  const isYou = name === usernameInput.value.trim();
  const msgDiv = document.createElement("div");
  msgDiv.className = "message" + (isYou ? " you" : "");
  msgDiv.innerHTML = `<strong>${name}:</strong> ${text}`;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

db.ref("messages").on("child_added", snapshot => {
  displayMessage(snapshot.val());
});

msgInput.addEventListener("keypress", function(e) {
  if (e.key === "Enter") sendMessage();
});

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}
