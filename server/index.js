// import the required modules for running the server
const express = require('express');
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
var cors = require('cors');
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const costRoute = require("./routes/cost");
const path = require("path");
// defining a port
const port = 5000

// configuring the enviroment
dotenv.config();
app.use(express.json());
app.use(cors());

// connect to MongoDB-Atlas
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: true
    })
    .then(console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));
    
// linking an auth route    
app.use("/auth", authRoute);
// linking users route
app.use("/users", userRoute);
// linking costs route
app.use("/costs", costRoute);

// using the static react build files
app.use(express.static(path.resolve(__dirname, './build')));
app.get('*', function (req, res) {
  const index = path.join(__dirname,'build', 'index.html');
  res.sendFile(index);
});

// configure the application port (5000)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})