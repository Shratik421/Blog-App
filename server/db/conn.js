const mongoose = require('mongoose');

const DB = process.env.DATABASE;

// mongoose.set('useFindAndModify', false);

// mongoose.connect(DB,{ useNewUrlParser: true, useUnifiedTopology: true ,useCreateIndex: true }).then(() => {
//   console.log("connection succesfull");
// }).catch((err) => console.log("no connection"));


mongoose.connect(DB).then(() => {
  console.log("Connection successful");
}).catch((err) => console.error("Connection failed", err));