
function addToCart (componentType, componentID) {

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const component = [ componentType , componentID ];
    cart.push(component);
    localStorage.setItem('cart', JSON.stringify(cart));
    
} 

function removeFromCart (componentType, componentID) {

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const result = cart.filter((component) => 
        (JSON.stringify(component) !== JSON.stringify([componentType, componentID]))
    );
    localStorage.setItem('cart', JSON.stringify(result));

} 

function isComponentInCart (componentType, componentID){

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const result = cart.filter((component) => 
        (JSON.stringify(component) === JSON.stringify([componentType, componentID]))
    );
    if (result.length){
        return true
    }
    return false

}

function emptyCart(){
        localStorage.setItem('cart', JSON.stringify([]));

}

export { addToCart, removeFromCart, isComponentInCart, emptyCart }