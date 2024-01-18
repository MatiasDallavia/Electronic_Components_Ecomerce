
function addToCart (componentType, componentID) {

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const component = [ componentType , componentID ];
    cart.push(component);
    localStorage.setItem('cart', JSON.stringify(cart));
    
} 

function removeFromCart (componentType, componentID) {

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const result = cart.filter((component) => JSON.stringify(component) !== JSON.stringify([componentType, componentID]));
    localStorage.setItem('cart', JSON.stringify(result));

} 

function isComponentInCart (componentType, componentID){

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const result = cart.filter((component) => JSON.stringify(component) === JSON.stringify([componentType, componentID]));
    console.log(result.length)
    if (result.length){
        return true
    }
    return false

}

export { addToCart, removeFromCart, isComponentInCart }