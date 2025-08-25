# AI-Battleship

A modern, interactive Battleship game built with vanilla JavaScript, featuring an AI opponent and a beautiful nautical-themed UI.

## Learning Project

This project was built as a comprehensive learning exercise to master modern JavaScript development concepts. Through building this Battleship game, I explored:

- **Object-Oriented Programming**: Implementing classes for GameBoard, Player, Ship, and various controllers
- **Event-Driven Architecture**: Using the PubSub pattern for loose coupling between components
- **Model-View-Controller (MVC)**: Separating game logic, data, and presentation layers
- **Modern JavaScript Features**: ES6+ syntax, modules, classes, and async programming
- **Build Tools & Bundling**: Webpack configuration for development and production
- **Testing**: Unit testing with Jest to ensure game logic reliability
- **CSS Architecture**: Custom properties, responsive design, and modern layout techniques
- **Game Development Logic**: State management, turn-based systems, and AI opponent implementation

The project demonstrates clean code organization, separation of concerns, and practical application of software engineering principles in a fun, interactive game format.

## How to Play

1. **Enter Your Name**: Start by providing your player name
2. **Place Your Ships**: 
   - Drag ships onto your game board
   - Use the rotate button to change ship orientation
   - Ships cannot overlap or extend beyond the grid
   - Use "Place Randomly" for quick setup
3. **Start the Battle**: Click "Start Game" when ready
4. **Take Turns**: 
   - Click on the opponent's grid to attack
   - AI will automatically take its turn
   - Sink all enemy ships to win!

## 🛠️ Technology Stack

- **Frontend**: Vanilla JavaScript (ES6+)
- **Build Tool**: Webpack 5 with development and production configurations
- **Styling**: CSS3 with CSS Custom Properties (variables)
- **Testing**: Jest testing framework
- **Code Quality**: ESLint + Prettier
- **Dependencies**: 
  - `pubsub-js` for event handling
  - `typed.js` for text animations

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Proxtron/ai-javascript-battleship-game.git
cd ai-javascript-battleship-game
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```
