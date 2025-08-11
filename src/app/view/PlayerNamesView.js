export default function PlayerNamesView(player1, player2) {
    return `
        <p class="player-emoji">👨‍✈️</p>
        <p class="player-emoji">🤖</p>
        <p>${player1.name}</p>
        <p>${player2.name}</p>
    `;
}