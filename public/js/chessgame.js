// basic socket.io setup
// its chessgame.js basically work at frontend part.... and use basically vanila js always remember vanila js frontend par hi use kar sakta hai 

const socket = io(); // socket ko require kara hai , this basically web browser(front-end) immidiately server ko request dega and jab request dega tab respond degi connected bolke because humara socket real time work karna start kar diya hai, means real time server se connected ho gaye ho

// socket.emit("Hey"); // iska matlab browser se hum  banckend par "hey" send kar rahe hai
// socket.on("Hey Amit", function(){ // backend se Hey Amit event jab frontend par receive hoga tab e event chala dena and show kar dena console pe....
//  console.log("Hey Amit Received");
// });

const chess = new Chess(); // Chess engine ko require kara hai
const boardElement = document.querySelector(".chessboard"); // isse basically chessboard ka class likha rakha hai

let draggedPiece = null;
let sourceSquare = null;
let playerRole = null;

const renderBoard = () => {
    const board = chess.board();
    boardElement.innerHTML = "";// incase jab kuch bhi ho boardElement ko  khali kar do initially
    board.forEach((row, rowindex) => {
        row.forEach((square, squareindex) => {
        const squareElement = document.createElement("div"); // ek dynamic div create kar diya hai 
        squareElement.classList.add("square", 
           (rowindex + squareindex) % 2 === 0 ? "light" : "dark" 
        );

        squareElement.dataset.row = rowindex;
        squareElement.dataset.col = squareindex;

        if(square) {
            const pieceElement = document.createElement("div");
            pieceElement.classList.add(
                "piece",
                square.color === "w" ? "white" : "black"
            );
            pieceElement.innerText = getPieceUnicode(square);
            pieceElement.draggable = playerRole === square.color;

            pieceElement.addEventListener("dragstart", (e) => {
               if(pieceElement.draggable) {
                draggedPiece = pieceElement;
                sourceSquare = { row: rowindex, col: squareindex };
                e.dataTransfer.setData("text/plain", "");
               }
            });

            pieceElement.addEventListener("dragend", (e) => {
                draggedPiece = null;
                sourceSquare = null;
            });

            squareElement.appendChild(pieceElement);
        }

        squareElement.addEventListener("dragover", function (e) {
            e.preventDefault();
        });

        squareElement.addEventListener("drop", function (e) {
            if(draggedPiece) {
                const targetSource = {
                  row: parseInt(squareElement.dataset.row),
                  col: parseInt(squareElement.dataset.col),  
                };
                handleMove(sourceSquare, targetSource);
            }
        });
         boardElement.appendChild(squareElement);

        });
    });

    if(playerRole === 'b'){
        boardElement.classList.add("flipped");
    }
    else{
        boardElement.classList.remove("flipped");
    }

};

const handleMove = (source, target) => {
    const move = {
        from: `${String.fromCharCode(97+source.col)}${8- source.row}`,
        to: `${String.fromCharCode(97+target.col)}${8- target.row}`,
        promotion: "q",
    };
    socket.emit("move", move);
};

const getPieceUnicode = (piece) => {
    const unicodePieces = {
        // White pieces (uppercase)
        P: "♙", // white pawn
        R: "♖", // white rook
        N: "♘", // white knight
        B: "♗", // white bishop
        Q: "♕", // white queen
        K: "♔", // white king
        // Black pieces (lowercase)
        p: "♟", // black pawn
        r: "♜", // black rook
        n: "♞", // black knight
        b: "♝", // black bishop
        q: "♛", // black queen
        k: "♚", // black king
    };
    return unicodePieces[piece.type] || "";
};

socket.on("playerRole", function (role){
    playerRole = role;
    console.log("Assigned player role:", role === "w" ? "White" : "Black");
    renderBoard();
});

socket.on("spectatorRole", function() {
     playerRole = null;
     console.log("You are a spectator");
     renderBoard();
});

socket.on("boardState", function (fen) {
  chess.load(fen);
  renderBoard();
});

socket.on("move", function (move) {
  chess.move(move);
  renderBoard();
});

socket.on("InvalidMove", function(move) {
    console.log("Invalid move attempted:", move);
    alert("Invalid move! Please try again.");
});

socket.on("connect", function() {
    console.log("Connected to server");
});

socket.on("disconnect", function() {
    console.log("Disconnected from server");
});

renderBoard();

