let cart = [];

// Add product to cart
function addToCart(name, price){
    let found = cart.find(item => item.name === name);
    if(found){
        found.qty += 1;
    } else {
        cart.push({name:name, price:price, qty:1});
    }
    alert(name + " added to cart successfully!");
    updateCartButton();
    updateCartModal(); // important to show items in cart
    updateCheckoutSummary(); // update summary if modal open
}

// Toggle cart modal
function toggleCart(){
    const modal = document.getElementById("cart-modal");
    modal.style.display = (modal.style.display === "block") ? "none" : "block";
    updateCheckoutSummary(); // refresh summary whenever modal opens
}

// Update cart button count
function updateCartButton(){
    const btn = document.getElementById("cart-btn");
    let totalItems = cart.reduce((sum, item)=>sum+item.qty,0);
    btn.innerText = "Cart (" + totalItems + ")";
}

// Update cart modal content
function updateCartModal(){
    const container = document.getElementById("cart-items");
    const totalP = document.getElementById("cart-total");
    container.innerHTML = "";
    let total = 0;
    cart.forEach(item=>{
        const div = document.createElement("div");
        div.className = "cart-item";
        div.innerHTML = `${item.name} x ${item.qty} - ₹${item.price*item.qty}`;
        container.appendChild(div);
        total += item.price*item.qty;
    });
    totalP.innerText = "Total: ₹" + total;
}

// Show Pay Now button after selecting a payment method
function showPayButton(){
    const select = document.getElementById("payment-method");
    const payBtn = document.getElementById("pay-now-btn");
    const summaryDiv = document.getElementById("checkout-summary");

    if(select.value !== ""){
        payBtn.style.display = "block";  // show Pay Now
        summaryDiv.style.display = "block"; // show summary area
        updateCheckoutSummary(); // update summary content
    } else {
        payBtn.style.display = "none";   // hide Pay Now
        summaryDiv.style.display = "none"; // hide summary
    }
}

// Update checkout summary inside modal
function updateCheckoutSummary(){
    const summaryDiv = document.getElementById("checkout-summary");
    let paymentSelect = document.getElementById("payment-method");
    let method = paymentSelect.value;
    
    if(cart.length === 0){
        summaryDiv.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    let orderDetails = cart.map(item => `${item.name} x ${item.qty} = ₹${item.price*item.qty}`).join("<br>");
    let total = cart.reduce((sum,item)=>sum + item.price*item.qty, 0);

    summaryDiv.innerHTML = `
        <h4>Order Summary:</h4>
        ${orderDetails}<br>
        <strong>Total: ₹${total}</strong><br>
        <em>Payment Method: ${method || "Not selected"}</em>
    `;
}

// Checkout / Pay Now
function checkout(){
    if(cart.length === 0){
        alert("Cart is empty!");
        return;
    }

    let paymentSelect = document.getElementById("payment-method");
    let method = paymentSelect.value;
    if(method === ""){
        alert("Please select a payment method");
        return;
    }

    // Show final order alert (optional)
    let orderDetails = cart.map(item => `${item.name} x ${item.qty} = ₹${item.price*item.qty}`).join("\n");
    let total = cart.reduce((sum,item)=>sum + item.price*item.qty, 0);
    alert(
        "✅ Order Placed ✅\n\n" +
        orderDetails +
        "\n\nTotal: ₹" + total +
        "\nPayment Method: " + method +
        "\n\nThank you for shopping at Sanket Bazaar Shop!"
    );

    // Clear cart and reset modal
    cart = [];
    updateCartButton();
    updateCartModal();
    document.getElementById("pay-now-btn").style.display = "none"; 
    document.getElementById("payment-method").value = "";
    document.getElementById("checkout-summary").style.display = "none";
}

// Clear Cart
function clearCart(){
    if(cart.length===0){
        alert("Cart is already empty!");
        return;
    }
    cart = [];
    updateCartButton();
    updateCartModal();
    document.getElementById("pay-now-btn").style.display = "none"; // hide pay now
    document.getElementById("payment-method").value = ""; // reset dropdown
    document.getElementById("checkout-summary").style.display = "none"; // hide summary
    alert("Cart cleared!");
}