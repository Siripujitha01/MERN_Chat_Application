const express = require("express");
const chats = require("./data/data");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const userRoutes = require("./routers/userRoutes");
const { errorHandler, notFound } = require("./Middleware/errorMiddleware");
const chatRoutes = require("./routers/chatRoutes");
const messageRoutes = require("./routers/messageRoutes")
const path = require('path')

const app = express();
dotenv.config();
connectDB();

app.use(express.json())

// app.get("/", (req, res) => {
//   res.send("Home");
// });

// app.get("/api/chat", (req, res) => {
//   res.send(chats);
// });

app.use('/api/user', userRoutes)
app.use("/api/chat", chatRoutes)
app.use("/api/message", messageRoutes)


const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "develpoment") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));
  app.get("/", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}


app.use(errorHandler);
app.use(notFound)

const server = app.listen(5000, console.log("Running at port 5000"));

const io = require('socket.io')(server,{
  pingTimeout : 60000,
  cors : {
      origin : "http://localhost:3000"
  }
});

io.on("connection", (socket)=>{
  console.log("connetced to socket.io")

  socket.on("setup",(userdata)=>{
      socket.join(userdata._id);
      socket.emit("connected");
  })

  socket.on('join chat', (room) => {
    socket.join(room);
    //socket.emit("connected");
    console.log('user joined room')
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });

})