// === Script de Geração de Prompt - Futebol ===
function gerarPromptFutebol(confronto, mercado) {
  const preview = document.getElementById("preview");

  let texto = "";

  if (!mercado) {
    // Prompt completo (todos mercados)
    texto = `ChatGPT, analise todos os mercados de aposta disponíveis para o confronto ${confronto} no Futebol.

Considere os principais grupos de mercado:
- Resultado Final (1X2, Dupla Chance, Empate Anula, Handicap Asiático e Europeu);
- Gols (Mais/Menos, Ambas Marcam, Gol nos Tempos, Resultado Exato, Time para Marcar);
- Escanteios (Total, Handicap, por Equipe, por Tempo);
- Cartões (Total, por Time, Jogador Receber, Cartão Vermelho);
- Especiais e Intermediários (HT/FT, Primeiro Gol, Marcar 2+, Intervalo/Final).

Para cada categoria, indique:
1. Qual mercado tem maior probabilidade de acontecer;
2. Qual seria a odd mínima recomendada para representar valor esperado positivo;
3. Uma aposta principal com justificativa (baseada em desempenho recente, estilo de jogo, momento e estatísticas médias);
4. Um mercado alternativo de valor, se existir.

Finalize com um resumo destacando a aposta mais segura e a mais arriscada (alto potencial de retorno).`;
  } else {
    // Prompt específico
    texto = `ChatGPT, analise o mercado de ${mercado} para o confronto ${confronto} no Futebol.
Baseie-se em estatísticas históricas, estilo de jogo, tendência recente e contexto atual (mando, fase, competição).
Indique:
1. Qual o cenário mais provável dentro desse mercado;
2. A odd mínima justa para representar valor;
3. Uma recomendação de aposta e justificativa rápida;
4. E se possível, um cenário alternativo com bom valor esperado.`;
  }

  preview.innerText = texto;

  // Abre ChatGPT com o prompt
  const url = "https://chat.openai.com/?q=" + encodeURIComponent(texto);
  window.open(url, "_blank");
}
