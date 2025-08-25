export default function PlayerNamesView(player1, player2, botIsThinking) {
    const botIsThinkingClass = botIsThinking ? "thinking" : "";
    return `
        <p class="player-emoji">👨‍✈️</p>
        <p class="player-emoji bot-emoji ${botIsThinkingClass}">🤖</p>
        <p>${player1.name}</p>
        <p>${player2.name}</p>
    `;
}