export function getCart(){
    let cart = localStorage.getItem("cart");
    cart = JSON.parse(cart);
    if(cart == null){
        cart = [];
        localStorage.setItem("cart", JSON.stringify(cart));
    }
    return cart;
}

export function removeFromCart(productID){
    let cart = getCart();

    const newCart = cart.filter(
        (item)=>{
            return item.productID != productID;
        }
    );
    localStorage.setItem("cart", JSON.stringify(newCart));
    return newCart; // Return the new cart state so components can use it
}

export function addToCart(product, qty){
    let cart = getCart();

    let index = cart.findIndex((item)=>{
        return item.productID === product.productID;
    });

    if(index == -1){
        cart[cart.length] = {
            productID : product.productID,
            name : product.name,
            image : product.images[0],
            price : product.price,
            labelledPrice : product.labelledPrice,
            qty : qty
        };
    } else {
        const newQty = cart[index].qty + qty;
        if(newQty <= 0){
            // Instead of returning early and fracturing code execution, 
            // update our local variable directly with the filtered array
            cart = removeFromCart(product.productID);
            return;
        } else {
            cart[index].qty = newQty;
        }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
}

export function getTotal(){
    let cart = getCart();
    let total = 0;
    for(let i=0; i<cart.length; i++){
        total += cart[i].price * cart[i].qty;
    }
    return total;
}

// 🟩 ADD THIS NEW UTILITY FUNCTION
export function clearCart() {
    localStorage.removeItem("cart");
}