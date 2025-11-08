// === Painel de Envio Betgram — Stake por Nível (v3 móvel + Ver Aposta) ===
(function painelStakeBetgram() {
  console.log("📤 Painel Betgram (móvel) iniciado...");

  if (document.getElementById("painelStakeBetgram")) {
    console.warn("⚠️ Painel já existe.");
    return;
  }

  // === Configurações do Telegram ===
  const token = "8389689778:AAFxqYCPj-w2M5hWhRxuXvRjhvc8zLw7Djw";
  const chatId = "-1003073897767"; // Grupo Betgram

  // === Painel visual ===
  const painel = document.createElement("div");
  painel.id = "painelStakeBetgram";
  Object.assign(painel.style, {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "260px",
    background: "rgba(11,19,36,0.97)",
    color: "#fff",
    fontFamily: "monospace",
    border: "2px solid gold",
    borderRadius: "12px",
    padding: "12px",
    textAlign: "center",
    zIndex: "999999",
    boxShadow: "0 0 12px rgba(255,215,0,0.4)",
    cursor: "move",
  });

  painel.innerHTML = `
    <h3 style="margin:0 0 8px;font-size:15px;">📤 Enviar Aposta</h3>
    <input type="file" id="uploadImg" accept="image/*"
      style="width:100%;margin-bottom:10px;background:#111827;border:1px solid #334155;color:white;padding:4px;border-radius:6px;">
    <button id="btn05" style="
      background:#facc15;border:none;border-radius:8px;color:#111;font-weight:bold;
      width:100%;padding:8px;margin-bottom:6px;cursor:pointer;
      box-shadow:0 0 6px rgba(250,204,21,0.6);
    ">⚠️ 0,5% Risco</button>
    <button id="btn1" style="
      background:#22c55e;border:none;border-radius:8px;color:white;font-weight:bold;
      width:100%;padding:8px;margin-bottom:6px;cursor:pointer;
      box-shadow:0 0 6px rgba(34,197,94,0.6);
    ">💡 1% Confiança</button>
    <button id="btn2" style="
      background:#3b82f6;border:none;border-radius:8px;color:white;font-weight:bold;
      width:100%;padding:8px;margin-bottom:6px;cursor:pointer;
      box-shadow:0 0 6px rgba(59,130,246,0.6);
    ">🔥 2% Alta</button>
    <button id="btnVerAposta" style="
      background:#ef4444;border:none;border-radius:8px;color:white;font-weight:bold;
      width:100%;padding:8px;margin-top:6px;cursor:pointer;
      box-shadow:0 0 6px rgba(239,68,68,0.6);
    ">🔎 Ver Aposta</button>
    <p id="statusEnvio" style="font-size:12px;margin-top:8px;color:#9ca3af;"></p>
  `;
  document.body.appendChild(painel);

  const input = document.getElementById("uploadImg");
  const btn05 = document.getElementById("btn05");
  const btn1 = document.getElementById("btn1");
  const btn2 = document.getElementById("btn2");
  const btnVer = document.getElementById("btnVerAposta");
  const status = document.getElementById("statusEnvio");

  // === Função de envio ===
  async function enviarImagem(caption) {
    const arquivo = input.files[0];
    if (!arquivo) {
      alert("📎 Selecione uma imagem antes de enviar!");
      return;
    }
    status.textContent = "⏳ Enviando imagem...";
    try {
      const form = new FormData();
      form.append("chat_id", chatId);
      form.append("photo", arquivo);
      form.append("caption", caption);
      form.append("parse_mode", "Markdown");

      const resp = await fetch(`https://api.telegram.org/bot${token}/sendPhoto`, {
        method: "POST",
        body: form,
      });
      const data = await resp.json();

      if (data.ok) {
        status.textContent = "✅ Enviado com sucesso!";
        status.style.color = "#22c55e";
      } else {
        status.textContent = "❌ Erro: " + data.description;
        status.style.color = "#ef4444";
      }
    } catch (e) {
      status.textContent = "⚠️ Falha ao enviar: " + e.message;
      status.style.color = "#ef4444";
    }
  }

  // === Botões ===
  btn05.onclick = () =>
    enviarImagem("⚠️ *Entrada leve — 0,5% da banca.*\nOdd de valor, mas com risco.");

  btn1.onclick = () =>
    enviarImagem("💡 *Entrada padrão — 1% da banca.*\nConfiança moderada.");

  btn2.onclick = () =>
    enviarImagem("🔥 *Entrada forte — 2% da banca.*\nAlta confiança!");

  // === Novo botão Ver Aposta ===
  btnVer.onclick = () => {
    window.open("https://www.betano.bet.br/myaccount/bethistory/open", "_blank");
  };

  // === Função Drag & Drop ===
  let isDragging = false;
  let offsetX, offsetY;

  painel.addEventListener("mousedown", (e) => {
    if (e.target.tagName === "BUTTON" || e.target.tagName === "INPUT") return;
    isDragging = true;
    offsetX = e.clientX - painel.getBoundingClientRect().left;
    offsetY = e.clientY - painel.getBoundingClientRect().top;
    painel.style.transition = "none";
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    painel.style.left = e.clientX - offsetX + "px";
    painel.style.top = e.clientY - offsetY + "px";
    painel.style.bottom = "auto";
    painel.style.right = "auto";
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    painel.style.transition = "all 0.2s ease";
  });
})();
