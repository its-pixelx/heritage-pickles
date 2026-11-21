// Venu's Kitchen — Shared Cart State
(function () {
  const STORAGE_KEY = 'venusKitchenCart';

  function loadCart() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
    catch { return []; }
  }

  function saveCart(cart) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }

  window.VKCart = {
    getItems: loadCart,

    addItem(product) {
      const cart = loadCart();
      const idx = cart.findIndex(i => i.id === product.id);
      if (idx > -1) {
        cart[idx].qty += 1;
      } else {
        cart.push({ ...product, qty: 1 });
      }
      saveCart(cart);
      window.VKCart.onUpdate && window.VKCart.onUpdate(cart);
    },

    removeItem(id) {
      const cart = loadCart().filter(i => i.id !== id);
      saveCart(cart);
      window.VKCart.onUpdate && window.VKCart.onUpdate(cart);
    },

    updateQty(id, qty) {
      let cart = loadCart();
      if (qty < 1) { cart = cart.filter(i => i.id !== id); }
      else {
        const idx = cart.findIndex(i => i.id === id);
        if (idx > -1) cart[idx].qty = qty;
      }
      saveCart(cart);
      window.VKCart.onUpdate && window.VKCart.onUpdate(cart);
    },

    clear() {
      saveCart([]);
      window.VKCart.onUpdate && window.VKCart.onUpdate([]);
    },

    total() {
      return loadCart().reduce((s, i) => s + i.price * i.qty, 0);
    },

    count() {
      return loadCart().reduce((s, i) => s + i.qty, 0);
    }
  };
})();
