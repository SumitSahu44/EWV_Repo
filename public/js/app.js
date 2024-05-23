var cartBtns = document.getElementsByClassName('add-to-cart-btn')
let productId = null;
for (var i = 0; i < cartBtns.length; i++) {
    cartBtns[i].addEventListener("click", function(event) {
         // Access the button that was clicked
         var button = event.target;
        //  console.log(button)
       
        // Get the data attribute value
         var productId = button.getAttribute('data-product-id');
         
         // Log the product ID
        //  console.log("Product ID:", productId);
          // window.location.href="addToCart";
        let URL = "product/"+productId;
        window.location.href= URL;
    })}