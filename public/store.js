const stripeHandler = StripeCheckout.configure({
  key: stripePublicKey,
  locale: 'auto',
  token: function(token) {
    let selected = document.querySelector('.selected');
    let itemId = selected.parentElement.dataset.itemId;

    fetch('/purchase', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        stripeTokenId: token.id,
        item: itemId
      })
    }).then(function(res){
      return res.json()
    }).then(function(data){
      alert(data.message)
    }).catch(function(error){
      console.error(error);
    })
  }
})

const purchases = document.querySelectorAll('.shop-item button');

purchases.forEach(item => item.addEventListener('click', purchaseClicked))

function purchaseClicked(){
  item = this.dataset.itemId;
  this.classList.add('selected');

  let price = parseFloat(this.value) * 100;
  stripeHandler.open({
    amount: price
  })
}