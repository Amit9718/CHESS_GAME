# ♟️ Chess Game with Real-Time Backend

A fully functional online chess game built with Node.js, Express.js, and Socket.IO for real-time multiplayer gameplay.

## 🎮 Features

- **Real-time multiplayer chess gameplay**
- **Automatic player role assignment** (White/Black/Spectator)
- **Move validation** using chess.js library
- **Drag and drop interface** for piece movement
- **Live game state synchronization** across all connected clients
- **Turn-based gameplay** with proper validation
- **Responsive chessboard** with Unicode chess pieces
- **Board flip** for black player perspective

## 🛠️ Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** (v5.1.0) - Web framework
- **Socket.IO** (v4.8.1) - Real-time communication
- **chess.js** (v1.4.0) - Chess game logic and validation
- **EJS** (v3.1.10) - Template engine

### Frontend
- **HTML5/CSS3** - Structure and styling
- **JavaScript (Vanilla)** - Client-side logic
- **Socket.IO Client** - Real-time communication
- **Custom CSS** - Chess board styling (production-ready)

## 📋 Prerequisites

- **Node.js** (v18+ recommended)
- **npm** (Node Package Manager)
- Modern web browser with WebSocket support

## 🚀 Installation & Setup

1. **Clone the project:**
   ```bash
   git clone <repository-url>
   cd CHESS
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the server:**
   ```bash
   npm start
   ```

4. **Open your browser:**
   ```
   http://localhost:3000
   ```

## 🎯 How to Play

### Getting Started
1. **First player** to connect gets **White pieces** (moves first)
2. **Second player** to connect gets **Black pieces**
3. **Additional players** become **Spectators** (can watch the game)

### Game Controls
- **Drag & Drop:** Click and drag pieces to move them
- **Turn-based:** Only move when it's your turn
- **Real-time Updates:** See opponent moves instantly
- **Move Validation:** Invalid moves are automatically rejected

### Chess Rules Implemented
- ✅ All standard chess piece movements
- ✅ Turn-based gameplay (White starts first)
- ✅ Move validation and illegal move prevention
- ✅ Check detection
- ✅ Game state persistence during session
- ✅ Automatic board orientation (Black player board flips)

## 📁 Project Structure

```
CHESS/
├── app.js                  # Main server file
├── package.json            # Dependencies and scripts
├── views/
│   └── index.ejs          # Main HTML template
├── public/
│   └── js/
│       └── chessgame.js   # Frontend chess logic
├── backendSetup.yaml       # Backend documentation
├── frontendSetup.yaml      # Frontend documentation
├── note.txt               # Development notes
└── README.md              # Project documentation
```

## 🔧 Key Components

### Backend (app.js)
- **Express server** setup with EJS templating
- **Socket.IO** server for real-time communication
- **Player management** (White/Black/Spectator assignment)
- **Move validation** using chess.js library
- **Game state broadcasting** to all connected clients

### Frontend (chessgame.js)
- **Socket.IO client** connection
- **Chess board rendering** with drag & drop functionality
- **Real-time move handling** and validation
- **Player role management** (White/Black/Spectator)
- **Unicode chess pieces** display

### Template (index.ejs)
- **Responsive HTML structure**
- **Custom CSS styling** for chessboard
- **Production-ready** (no CDN dependencies)
- **Socket.IO and chess.js** library integration

## 🌐 API Events (Socket.IO)

### Server to Client
- `playerRole` - Assigns player role ("w" for White, "b" for Black)
- `spectatorRole` - Assigns spectator role
- `boardState` - Sends current board state (FEN notation)
- `move` - Broadcasts valid moves to all clients
- `InvalidMove` - Notifies client of invalid move attempt

### Client to Server
- `move` - Sends move attempt from client
- `disconnect` - Handles player disconnection

## 🎨 Visual Features

- **Unicode Chess Pieces:** ♔♕♖♗♘♙ (White) / ♚♛♜♝♞♟ (Black)
- **Classic Colors:** Light (#f0d9b5) and Dark (#b58863) squares
- **Drag & Drop:** Intuitive piece movement
- **Board Flip:** Automatic orientation for Black player
- **Visual Feedback:** Hover effects and drag cursors

## 🔒 Security Notes

- **Development Mode:** No authentication implemented
- **Local Network:** Runs on localhost:3000
- **Production:** Consider adding user authentication for public deployment

## 🐛 Known Limitations

- No game persistence (games reset on server restart)
- No user authentication system
- No game history or replay functionality
- Limited to 2 active players per server instance

## 🚀 Future Enhancements

- [ ] User authentication and profiles
- [ ] Game persistence with database
- [ ] Multiple concurrent games support
- [ ] Game history and replay system
- [ ] Chat functionality during games
- [ ] Spectator count display
- [ ] Game timer implementation

## 📝 Scripts

```bash
npm start     # Start the development server
npm test      # Run tests (placeholder)
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

ISC License

## 👨‍💻 Author

Created with ❤️ for chess enthusiasts and developers

---

**Ready to play? Run `npm start` and challenge a friend!** ♟️🎮