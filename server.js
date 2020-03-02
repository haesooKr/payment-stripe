if (process.env.NODE_ENV !== 'production'){
  require('dotenv').config();
}

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;

const express = require('express');
const app = express();
const fs = require('fs');
const stripe = require('stripe')(stripeSecretKey);

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static('public'))

app.get('/', function(req, res){
  fs.readFile('items.json', function(error, data){
    if(error){
      res.status(500).end()
    } else {
      res.render('store.ejs', {
        stripePublicKey,
        items: JSON.parse(data)
      })
    }
  })
})

app.post('/purchase', function(req, res){
  fs.readFile('items.json', function(error, data){
    if(error){
      res.status(500).end()
    } else {
      let dataJson = JSON.parse(data);
      let price = dataJson.item.filter(i => i.id === Number(req.body.item));

      stripe.charges.create({
        amount: price[0].price,
        source: req.body.stripeTokenId,
        currency: 'usd'
      }).then(function() {
        console.log('Charge Successful');
        res.json({ message: "Successfully purchased items" })
      }).catch(function() {
        console.log('Charge Fail');
        res.status(500).end()
      })
    }
  })
})




app.listen(3000, function(){
  console.log("running on localhost:3000")
});