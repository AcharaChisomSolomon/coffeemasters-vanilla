const Store = {
    menu: null,
    cart: [],
}

const proxiedStore = new Proxy(Store, {
    set: function(target, prop, value) {
        target[prop] = value;
        if (prop === 'cart') {
            window.dispatchEvent(new Event('cart-updated'));
        }
        if (prop === 'menu') {
            window.dispatchEvent(new Event('menu-updated'));
        }
        return true;
    }
});

export default proxiedStore;