const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");
const { ObjectID, ObjectId } = require("mongodb");

const app = express();
//Middlewares
app.use(express.json());
app.use(cors());
let dbo; // database object

//Connecting to database
const mongoClient = MongoClient.connect("mongodb://localhost:27017", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}, async (err, client) => {
    if (err) console.log("Error connecting to mongoDB ", err);
    console.log("Successfully connected to mongodb");
    dbo = await client.db("merntodo");
});

//Requests
app.get("/todos", (req, res) => {
    let todos = dbo.collection("todos").find({}).toArray((err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.post("/todos", (req, res) => {
    console.log(req.body);
    let todo = req.body;
    if (todo.name == "") res.status(400).json({ err: "Name should not be empty" });
    todo.date = new Date();

    dbo.collection("todos").insertOne(todo);
    res.json(todo);
});

app.delete("/todos", (req, res) => {
    dbo.collection("todos").deleteOne({ _id: ObjectId(req.body.todo_id) }, (error, result) => {
        if (error) throw error;
    });
    res.json("Successfully deleted");
});

app.put("/todos", (req, res) => {
    dbo.collection("todos").updateOne({ _id: ObjectId(req.body.todo_id) }, { $set: { finished: req.body.newFinished } });
    res.json("Successfully updated")
});

//Just for clearing database
app.delete("/todos/deleteAll", (req, res) => {
    dbo.collection("todos").deleteMany({}, () => console.log("Successfully cleared the databse"));
    res.json("Successfully cleared the databse");
});

app.listen(5000);