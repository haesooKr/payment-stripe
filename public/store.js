const stripeHandler = StripeCheckout.configure({
  key: stripePublicKey,
  locale: 'auto',
  token: function(token) {
    console.log(token);
  }
})

const purchases = document.querySelectorAll('.shop-item button');

purchases.forEach(item => item.addEventListener('click', purchaseClicked))

function purchaseClicked(){
  let price = parseFloat(this.value) * 100;
  stripeHandler.open({
    amount: price
  })
}