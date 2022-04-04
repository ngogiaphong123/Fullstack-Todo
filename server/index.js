const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { urlencoded } = require("express");
const Task = require("./models/task");
const taskRoutes = require("./routes/task");
//DB connection
const localDb = 'mongodb://localhost:27017/todo-mern';
mongoose.connect(localDb, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Connected to MongoDB");
});
//Middleware
const app = express();
app.use(cors());
app.use(urlencoded({extended:true}));
app.use(express.json());
//Routes
app.use('/todos', taskRoutes);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})