const express = require("express");
const socket = require("socket.io");
const http = require("http");
const { Chess } = require("chess.js"); // {chess} yaha se hum chess class nikal sakta hu
const path = require("path");

const app = express();

const server = http.createServer(app); // iska matlab express js ek http ka server banaya hai and dono connected ho ek dusre se....
const io = socket(server); // socket means real time connected ho b/w each other matlab users and server. and socket connected ho http server se 

const chess  = new Chess();
let players = {}; // variable set kar raha hu
let currentPlayer = "w";

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req,res) => {
   res.render("index", {title: "Chess Game"});
});

io.on("connection", function(uniquesocket) { // jab bhi kohi banda humara website ki url or  backend se join ho usko connected message de dena 
    console.log("New player connected:", uniquesocket.id);
    
    if(!players.white){ // jab pehla banda connect ho jaye tab check karna hai ki playerrole white hai ki nhi
        players.white = uniquesocket.id; // jab white nehi hai tab bande ka uniquesocket ke barabar uniquesocket id bana do
        uniquesocket.emit("playerRole", "w");// jab ban gaya tab usko bata do ki playerRole tumhara white hai
        console.log("Assigned WHITE to:", uniquesocket.id);
    }
    else if(!players.black){ // same rule
        players.black = uniquesocket.id;
        uniquesocket.emit("playerRole", "b"); //usko tab bata do ki uska playerRole black hai
        console.log("Assigned BLACK to:", uniquesocket.id);
    }
    else{
        uniquesocket.emit("spectatorRole"); // fir bata do up spectator ho batke khel dekhoge....
        console.log("Player is SPECTATOR:", uniquesocket.id);
    }
    
    console.log("Current players:", players);

    uniquesocket.on("disconnect", function() { // jab white and black dono bande se kohi bhi disconnect ho jaye usko hata do
       console.log("Player disconnected:", uniquesocket.id);
       if(uniquesocket.id === players.white) {
         console.log("White player disconnected");
         delete players.white;
       }
       else if(uniquesocket.id === players.black){
         console.log("Black player disconnected");
         delete players.black;
       }
       console.log("Remaining players:", players);
    });

    uniquesocket.on("move", (move)=> { // it is basically kohi bhi banda kohi bhi piece move kar raha wo move valid ha ki nehi wo check karne ke liye line ....
        try{
            if(chess.turn() === "w" && uniquesocket.id !== players.white) return;// is line ka matlab jab white ka turn hai but uniquesocket.id nehi match kaha raha hai white ke sath tab return kar denge means wrong move....
            if(chess.turn() === "b" && uniquesocket.id !== players.black) return;// is line ka matlab jab black ka turn hai but uniquesocket.id nehi match kaha raha hai black ke sath tab return kar denge means wrong move....

            // jab valid move karnge....
            const result = chess.move(move); // valid move result mein store ho jaynge
            if(result) { // valid move jab sehi hai tab ....
               currentPlayer = chess.turn(); // currentPlayer mein save kar diya jiska bhi move sehi hai....
               io.emit("move", move); // hum emit means bhej diya hai move event ko backend se frontend ke liye
               io.emit("boardState", chess.fen()); // jab bande valid move chal gaya hai tab uska jo state hai wo backend ne sabhi matlab jobhi connected hai server mein uska sabhi ko dekhne ke liya available ho jayega ... or FEN basically batata hai chessboard ka position .... kis kis element kis kis position mein hone chaiye ye sehi apse apse ap kar denge   
            }
            else{ // jab move or kuch problem hota hai error de dega 
                console.log("Invalid move : ", move);
                uniquesocket.emit("InvalidMove", move); // jo bhi banda galat move chalaya hai usko message de do ki ye move sehi nehi hai and wrong move dikha do .... jo bhi galat chalaya hai sirf usko ki hi dekhao....
            }
        }
        catch(err){ // jab koibhi bande aisa move chala diya ki try engine bhi fail ho gaya tab catch me aa ke error show kar do and us bande bhej do tum ye move sehi nehi hai ....
            console.log(err);
            uniquesocket.emit("Invalid move : ", move);
        }
    })
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, function() {
    console.log("listening on port " + PORT);
});