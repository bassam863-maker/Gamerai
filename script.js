
async function sendMessage() {
  const game = document.getElementById("game").value;
  const question = document.getElementById("question").value;
  const chatBox = document.getElementById("chatBox");

  chatBox.innerHTML += `<div class='msg'><b>You:</b> ${question}</div>`;

  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ game, question })
  });

  const data = await res.json();

  chatBox.innerHTML += `<div class='msg'><b>AI:</b> ${data.answer}</div>`;
  chatBox.scrollTop = chatBox.scrollHeight;
}
