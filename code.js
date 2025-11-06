// === AUTO SINAL DE CUPOM (v22 — ícone real + emoji por esporte + verificação competição + auto-reset) ===
(function autoSinalCupomV22() {
  console.log("🏁 Painel de Sinais (v22 — ícone real + emoji por esporte + verificação competição + auto-reset) iniciado...");

  const token = "8389689778:AAFxqYCPj-w2M5hWhRxuXvRjhvc8zLw7Djw";
  const chatId = "-5042873536";
  let dadosCupom = null;
  let modo = "AO_VIVO";

  // ===== Painel visual =====
  const painel = document.createElement("div");
  Object.assign(painel.style, {
    position: "fixed",
    top: "20px",
    left: "20px",
    width: "390px",
    height: "460px",
    background: "rgba(11,19,36,0.95)",
    color: "#fff",
    fontFamily: "monospace",
    border: "2px solid gold",
    borderRadius: "10px",
    padding: "10px",
    zIndex: 999999,
    boxShadow: "0 0 10px rgba(255,215,0,0.5)",
    display: "flex",
    flexDirection: "column",
    cursor: "move"
  });

  const header = document.createElement("div");
  header.textContent = "🤖 Painel do Robô (Arraste Aqui)";
  Object.assign(header.style, {
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: "6px",
    color: "#facc15",
    cursor: "move",
    userSelect: "none"
  });

  // === Botões de modo ===
  const modoContainer = document.createElement("div");
  Object.assign(modoContainer.style, {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "6px",
    gap: "6px",
  });

  const btnAoVivo = document.createElement("button");
  btnAoVivo.textContent = "🎯 AO VIVO";
  const btnPreJogo = document.createElement("button");
  btnPreJogo.textContent = "📅 PRÉ-JOGO";
  [btnAoVivo, btnPreJogo].forEach(btn => {
    Object.assign(btn.style, {
      flex: "1",
      padding: "6px",
      borderRadius: "6px",
      border: "1px solid #334155",
      background: "#1e293b",
      color: "#fff",
      fontWeight: "bold",
      cursor: "pointer"
    });
  });

  btnAoVivo.onclick = () => {
    modo = "AO_VIVO";
    dataContainer.style.display = "none";
    btnAoVivo.style.background = "#22c55e";
    btnPreJogo.style.background = "#1e293b";
  };
  btnPreJogo.onclick = () => {
    modo = "PRE_JOGO";
    dataContainer.style.display = "flex";
    btnPreJogo.style.background = "#facc15";
    btnAoVivo.style.background = "#1e293b";
  };

  modoContainer.append(btnAoVivo, btnPreJogo);

  // === Campos principais ===
  const inputEsporte = document.createElement("select");
  const esportes = [
    "Selecione o Esporte",
    "Futebol",
    "Basquetebol",
    "Tênis",
    "Vôlei",
    "Handebol",
    "Beisebol",
    "Futebol Americano",
    "Hóquei no Gelo",
    "Boxe",
    "MMA",
    "Fórmula 1",
    "Esports",
    "Críquete",
    "Rúgbi",
    "Snooker",
    "Dardos",
    "Golfe",
    "Política",
    "Entretenimento"
  ];
  esportes.forEach(e => {
    const opt = document.createElement("option");
    opt.textContent = e;
    opt.value = e;
    inputEsporte.appendChild(opt);
  });
  Object.assign(inputEsporte.style, {
    marginBottom: "6px",
    padding: "6px",
    borderRadius: "6px",
    border: "1px solid #334155",
    background: "#1e293b",
    color: "#fff",
    fontSize: "13px"
  });

  const inputCompeticao = criarInput("Competição (ex: Brasileirão, Champions...)");

  // === Seletor de data e hora ===
  const dataContainer = document.createElement("div");
  Object.assign(dataContainer.style, {
    display: "none",
    justifyContent: "space-between",
    marginBottom: "6px",
    gap: "4px",
  });

  const selectDia = criarSelect([...Array(31)].map((_, i) => i + 1), "Dia");
  const selectMes = criarSelect(
    ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"],
    "Mês"
  );
  const selectHora = criarSelect([...Array(24)].map((_, i) => i.toString().padStart(2, "0")), "Hora");
  const selectMin = criarSelect([...Array(60)].map((_, i) => i.toString().padStart(2, "0")), "Min");
  dataContainer.append(selectDia, selectMes, selectHora, selectMin);

  // === Ícone dinâmico ===
  const iconeEsporte = document.createElement("div");
  Object.assign(iconeEsporte.style, {
    textAlign: "center",
    marginBottom: "6px",
    height: "28px"
  });

  // === Área de logs ===
  const info = document.createElement("div");
  Object.assign(info.style, {
    flex: "1",
    overflowY: "auto",
    background: "#111827",
    border: "1px solid #334155",
    borderRadius: "6px",
    padding: "6px",
    fontSize: "12px",
    lineHeight: "1.3em",
    whiteSpace: "pre-line"
  });

  // === Botões principais ===
  const botoesContainer = document.createElement("div");
  Object.assign(botoesContainer.style, {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "8px",
    gap: "8px"
  });

  const botaoEnviar = criarBotao("🚀 Enviar para Robô", "#22c55e");
  const botaoReset = criarBotao("♻️ Resetar", "#ef4444");
  botoesContainer.append(botaoEnviar, botaoReset);

  painel.append(header, modoContainer, inputEsporte, inputCompeticao, dataContainer, iconeEsporte, info, botoesContainer);
  document.body.appendChild(painel);

  // ===== Helpers =====
  function criarInput(placeholder) {
    const el = document.createElement("input");
    el.type = "text";
    el.placeholder = placeholder;
    Object.assign(el.style, {
      marginBottom: "6px",
      padding: "6px",
      borderRadius: "6px",
      border: "1px solid #334155",
      background: "#1e293b",
      color: "#fff",
      fontSize: "13px"
    });
    return el;
  }

  function criarSelect(opcoes, label) {
    const select = document.createElement("select");
    const optPadrao = document.createElement("option");
    optPadrao.textContent = label;
    optPadrao.disabled = true;
    optPadrao.selected = true;
    select.appendChild(optPadrao);
    for (const op of opcoes) {
      const opt = document.createElement("option");
      opt.value = op;
      opt.textContent = op;
      select.appendChild(opt);
    }
    Object.assign(select.style, {
      flex: "1",
      padding: "5px",
      background: "#1e293b",
      color: "#fff",
      borderRadius: "6px",
      border: "1px solid #334155",
      fontSize: "12px"
    });
    return select;
  }

  function criarBotao(texto, cor) {
    const btn = document.createElement("button");
    btn.textContent = texto;
    Object.assign(btn.style, {
      flex: "1",
      padding: "10px",
      background: cor,
      border: "none",
      borderRadius: "8px",
      color: "#fff",
      fontWeight: "bold",
      fontSize: "13px",
      cursor: "pointer",
      boxShadow: "0 0 10px rgba(0,0,0,0.3)"
    });
    return btn;
  }

  // ===== Painel móvel =====
  (function tornarPainelMovel() {
    let isDragging = false;
    let offsetX, offsetY;
    header.addEventListener("mousedown", e => {
      isDragging = true;
      offsetX = e.clientX - painel.offsetLeft;
      offsetY = e.clientY - painel.offsetTop;
      document.body.style.userSelect = "none";
    });
    document.addEventListener("mousemove", e => {
      if (!isDragging) return;
      painel.style.left = `${e.clientX - offsetX}px`;
      painel.style.top = `${e.clientY - offsetY}px`;
    });
    document.addEventListener("mouseup", () => {
      isDragging = false;
      document.body.style.userSelect = "";
    });
  })();

  // ===== Utilitários =====
  const esc = (t = "") => t.replace(/([_*\[\]()~`>#+\-=|{}.!\\])/g, "\\$1");
  const norm = (t = "") => t.replace(/\s+/g, " ").trim();

  function getEmoji(esporte) {
    const mapa = {
      Futebol: "⚽",
      Basquetebol: "🏀",
      Tênis: "🎾",
      Vôlei: "🏐",
      Handebol: "🤾",
      Beisebol: "⚾",
      "Futebol Americano": "🏈",
      "Hóquei no Gelo": "🏒",
      Boxe: "🥊",
      MMA: "🥋",
      "Fórmula 1": "🏎️",
      Críquete: "🏏",
      Rúgbi: "🏉",
      Snooker: "🎱",
      Dardos: "🎯",
      Golfe: "🏌️",
    };
    return mapa[esporte] || "";
  }

  function getTime(card) {
    return norm(card.querySelector('[data-qa="time-info"] span')?.textContent || "");
  }
  function getMercado(card) {
    return norm(card.querySelector('[data-qa="market-label"]')?.textContent || "");
  }
  function getOdd(card) {
    return norm(card.querySelector('[data-qa="bet-odds-value"]')?.textContent || "");
  }
  function getTimeApostado(card) {
    return norm(card.querySelector('[data-qa="selection-label"]')?.textContent || "");
  }

  function getTimes(card) {
    let times = [...card.querySelectorAll(".participants__participant-name")].map(e => norm(e.textContent));
    if (times.length < 2) {
      const eventName = card.querySelector(".event-name, [data-qa='event-info'] .event-name");
      if (eventName) {
        const partes = eventName.textContent.split(" - ").map(t => norm(t));
        if (partes.length >= 2) times = partes;
        else times = [eventName.textContent.trim(), "Adversário"];
      }
    }
    return times.length >= 2 ? times : ["Time A", "Time B"];
  }

  function getJogo(times) {
    return `${times[0]} x ${times[1]}`;
  }

  // ===== Atualiza leitura =====
  function atualizarLeitura() {
    try {
      const card = document.querySelector('.leg-info[data-qa="leg-info"]');
      if (!card) {
        info.textContent = "⏳ Nenhum cupom detectado...";
        iconeEsporte.innerHTML = "";
        dadosCupom = null;
        return;
      }

      const mercado = getMercado(card) || "Mercado não detectado";
      const odd = getOdd(card) || "N/D";
      const times = getTimes(card);
      const timeApostado = getTimeApostado(card) || "N/D";
      const tempo = getTime(card);
      const jogo = getJogo(times);

      dadosCupom = { jogo, mercado, odd, timeApostado, tempo };

      info.textContent =
        `📋 *CUPOM DETECTADO*\n────────────────\n⚡ Jogo: ${jogo}\n👤 Apostado em: ${timeApostado}\n🎯 Mercado: ${mercado}\n💸 Odd: ${odd}\n` +
        (tempo ? `⏱️ Minuto: ${tempo}\n` : "") +
        `────────────────\n🟡 Clique em "Enviar para Robô" para disparar o envio`;
    } catch (err) {
      info.textContent = "❌ Erro ao ler cupom: " + err.message;
    }
  }

  setInterval(atualizarLeitura, 5000);
  atualizarLeitura();

  // ===== Envio manual =====
  botaoEnviar.addEventListener("click", async () => {
    if (!dadosCupom) {
      info.textContent = "⚠️ Nenhum cupom para enviar.";
      return;
    }

    const esporte = inputEsporte.value;
    if (esporte === "Selecione o Esporte") {
      alert("Escolha o esporte!");
      return;
    }
    const emoji = getEmoji(esporte);
    const competicao = inputCompeticao.value.trim();
    if (!competicao) {
      alert("Digite o nome da competição antes de enviar!");
      return;
    }

    const dia = selectDia.value !== "Dia" ? selectDia.value.padStart(2, "0") : "--";
    const mes = selectMes.value !== "Mês" ? selectMes.value : "--";
    const hora = selectHora.value !== "Hora" ? selectHora.value.padStart(2, "0") : "--";
    const min = selectMin.value !== "Min" ? selectMin.value.padStart(2, "0") : "--";

    const dataHora = modo === "PRE_JOGO" ? `${dia}/${mes} - ${hora}:${min}` : "Ao Vivo";
    const { jogo, mercado, odd, timeApostado, tempo } = dadosCupom;
    const horaEnvio = new Date().toLocaleTimeString("pt-BR");

    const ICON_TROPHY = "\u{1F3C6}\uFE0F"; // 🏆 fixo
    const ICON_CALENDAR = "🗓️";            // calendário mantido

    const mensagem = [
      "🔥 *Sinal de Apostas Esportivas*",
      "────────────────",
      `${emoji ? emoji + " " : ""}*Esporte:* ${esc(esporte)}`,
      `${ICON_TROPHY} *Competição:* ${esc(competicao)}`,
      `${ICON_CALENDAR} *Data/Horário:* ${esc(dataHora)}`,
      `🕒 *Enviado às:* ${esc(horaEnvio)}`,
      `⚡ *Jogo:* ${esc(jogo)}`,
      `🎯 *Mercado:* ${esc(mercado)}`,
      `👤 *Apostado em:* ${esc(timeApostado)}`,
      `💸 *Odd:* ${esc(odd)}`,
      tempo ? `⏱️ *Minuto Atual:* ${esc(tempo)}` : "",
      "────────────────"
    ].join("\n");

    info.textContent += `\n📤 Enviando sinal (${esporte} - ${competicao})...`;

    try {
      const resp = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: mensagem,
          parse_mode: "MarkdownV2"
        })
      });

      const result = await resp.json();
      if (result.ok) {
        info.textContent += `\n✅ Sinal enviado com sucesso (${esporte} - ${competicao})!`;
        botaoReset.click(); // <<< ADICIONADO: aciona o reset automático após envio
      } else {
        info.textContent += `\n⚠️ Erro ao enviar: ${JSON.stringify(result)}`;
      }
    } catch (err) {
      info.textContent += `\n❌ Erro no envio: ${err.message}`;
    }
  });

  // ===== Resetar =====
  botaoReset.addEventListener("click", () => {
    inputEsporte.selectedIndex = 0;
    inputCompeticao.value = "";
    selectDia.selectedIndex = 0;
    selectMes.selectedIndex = 0;
    selectHora.selectedIndex = 0;
    selectMin.selectedIndex = 0;
    info.textContent = "♻️ Painel limpo com sucesso!";
    iconeEsporte.innerHTML = "";
    const btnFechar = document.querySelector('[data-qa="clear-all-betslip-button"] button, [data-qa="trash-button"]');
    if (btnFechar) {
      btnFechar.click();
      info.textContent += "\n🧹 Cupom fechado automaticamente.";
    }
  });
})();
