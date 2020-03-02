const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'))




app.listen(3000, function(){
  console.log("running on localhost:3000")
});