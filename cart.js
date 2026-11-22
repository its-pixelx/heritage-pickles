// Venu's Kitchen — Universal Cart & Slide-in Drawer System
(function () {
  const STORAGE_KEY = 'venusKitchenCart';

  function loadCart() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  function saveCart(cart) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {}
  }

  window.VKCart = {
    getItems: loadCart,

    addItem(product) {
      const cart = loadCart();
      const idx = cart.findIndex(i => i.id === product.id);
      if (idx > -1) {
        cart[idx].qty += 1;
      } else {
        cart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          weight: product.weight || '',
          image: product.image || '',
          qty: 1
        });
      }
      saveCart(cart);
      if (window.VKCart.onUpdate) window.VKCart.onUpdate(cart);
      updateAllCartUI();
      showToast(product.name);
    },

    removeItem(id) {
      const cart = loadCart().filter(i => i.id !== id);
      saveCart(cart);
      if (window.VKCart.onUpdate) window.VKCart.onUpdate(cart);
      updateAllCartUI();
    },

    updateQty(id, qty) {
      let cart = loadCart();
      if (qty < 1) {
        cart = cart.filter(i => i.id !== id);
      } else {
        const idx = cart.findIndex(i => i.id === id);
        if (idx > -1) cart[idx].qty = qty;
      }
      saveCart(cart);
      if (window.VKCart.onUpdate) window.VKCart.onUpdate(cart);
      updateAllCartUI();
    },

    clear() {
      saveCart([]);
      if (window.VKCart.onUpdate) window.VKCart.onUpdate([]);
      updateAllCartUI();
    },

    total() {
      return loadCart().reduce((s, i) => s + (Number(i.price) || 0) * (Number(i.qty) || 1), 0);
    },

    count() {
      return loadCart().reduce((s, i) => s + (Number(i.qty) || 1), 0);
    }
  };

  // ===== CART DRAWER STYLES INJECTION =====
  function injectCartStyles() {
    if (document.getElementById('vkCartStyles')) return;
    const style = document.createElement('style');
    style.id = 'vkCartStyles';
    style.textContent = `
      /* Native Smooth Cross-Document Transitions (Zero White Flash) */
      @view-transition { navigation: auto; }

      .cart-overlay{
        position:fixed;
        inset:0;
        background:rgba(0,0,0,0.45);
        z-index:9990;
        opacity:0;
        pointer-events:none;
        transition:opacity .25s ease;
        backdrop-filter:blur(2px);
      }
      .cart-overlay.open{opacity:1;pointer-events:all}
      .cart-drawer{
        position:fixed;
        top:0;
        right:-440px;
        width:min(420px,100vw);
        height:100%;
        background:#FFF;
        z-index:9995;
        display:flex;
        flex-direction:column;
        transition:right .3s cubic-bezier(0.4,0,0.2,1);
        box-shadow:-8px 0 30px rgba(0,0,0,0.12);
      }
      .cart-drawer.open{right:0}
      .cart-top{
        display:flex;
        align-items:center;
        justify-content:space-between;
        padding:18px 22px;
        border-bottom:1px solid #EDE8E1;
        background:#FFF;
      }
      .cart-top h3{
        font-family:'Playfair Display',serif;
        font-size:1.2rem;
        color:#103D14;
        margin:0;
      }
      .cart-close-btn{
        width:34px;
        height:34px;
        border-radius:50%;
        background:#FAF8F5;
        border:1px solid #EDE8E1;
        display:flex;
        align-items:center;
        justify-content:center;
        font-size:1.15rem;
        color:#5A655B;
        cursor:pointer;
        transition:all .15s;
      }
      .cart-close-btn:hover{
        background:#E8F5E9;
        color:#1B5E20;
      }
      .cart-items-list{
        flex:1;
        overflow-y:auto;
        padding:20px;
        display:flex;
        flex-direction:column;
        gap:14px;
      }
      .empty-cart-state{
        text-align:center;
        padding:50px 20px;
        color:#8C968D;
      }
      .empty-cart-btn{
        display:inline-block;
        margin-top:16px;
        padding:10px 20px;
        background:#1B5E20;
        color:#FFF;
        border-radius:8px;
        font-weight:600;
        font-size:0.85rem;
        text-decoration:none;
        transition:background .15s;
      }
      .empty-cart-btn:hover{background:#103D14}
      .cart-item-row{
        display:flex;
        gap:12px;
        align-items:center;
        padding-bottom:14px;
        border-bottom:1px solid #F3EFEA;
      }
      .cart-item-thumb{
        width:58px;
        height:58px;
        border-radius:8px;
        overflow:hidden;
        flex-shrink:0;
        background:#F3EFEA;
      }
      .cart-item-thumb img{width:100%;height:100%;object-fit:cover;display:block}
      .cart-item-details{flex:1;min-width:0}
      .cart-item-title{
        font-weight:600;
        font-size:0.88rem;
        color:#182019;
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
      }
      .cart-item-meta{font-size:0.75rem;color:#8C968D;margin-top:2px}
      .cart-item-bottom{
        display:flex;
        align-items:center;
        justify-content:space-between;
        margin-top:6px;
      }
      .cart-item-price{font-weight:700;font-size:0.94rem;color:#103D14}
      .cart-bottom-actions{
        padding:18px 20px;
        border-top:1px solid #EDE8E1;
        background:#FAF8F5;
      }
      .cart-subtotal-row{
        display:flex;
        justify-content:space-between;
        align-items:center;
        margin-bottom:6px;
        font-size:0.9rem;
      }
      .cart-subtotal-val{font-size:1.25rem;font-weight:700;color:#103D14}
      .cart-free-ship-note{font-size:0.78rem;color:#5A655B;margin-bottom:12px}
      .btn-checkout-hold{
        width:100%;
        padding:12px;
        background:#E5E7EB;
        color:#6B7280;
        border-radius:8px;
        font-weight:600;
        font-size:0.84rem;
        margin-bottom:8px;
        border:none;
        text-align:center;
      }
      .cart-notice-box{
        background:#FFF;
        border:1px solid #EDE8E1;
        border-left:3px solid #C49A45;
        border-radius:8px;
        padding:10px 12px;
        font-size:0.76rem;
        color:#5A655B;
        line-height:1.45;
        margin-bottom:10px;
      }
      .btn-order-whatsapp{
        width:100%;
        padding:13px;
        background:#25D366;
        color:#FFF;
        border-radius:8px;
        font-weight:700;
        font-size:0.92rem;
        display:flex;
        align-items:center;
        justify-content:center;
        gap:8px;
        border:none;
        cursor:pointer;
        transition:opacity .15s;
        text-decoration:none;
      }
      .btn-order-whatsapp:hover{opacity:0.92}
      .cart-qty-counter{
        display:flex;
        align-items:center;
        border:1px solid #EDE8E1;
        border-radius:6px;
        overflow:hidden;
        background:#FFF;
      }
      .cart-qty-btn{
        background:#E8F5E9;
        color:#103D14;
        width:24px;
        height:24px;
        font-size:0.95rem;
        font-weight:700;
        display:flex;
        align-items:center;
        justify-content:center;
        border:none;
        cursor:pointer;
        padding:0;
      }
      .cart-qty-val{
        padding:0 7px;
        font-size:0.8rem;
        font-weight:700;
        color:#103D14;
      }
      .cart-del-btn{
        color:#8C968D;
        font-size:0.8rem;
        padding:2px 6px;
        background:none;
        border:none;
        cursor:pointer;
        transition:color .15s;
      }
      .cart-del-btn:hover{color:#DC2626}

      /* Dynamic Toast Notification */
      .vk-toast{
        position:fixed;
        bottom:28px;
        left:50%;
        transform:translateX(-50%) translateY(80px);
        background:#103D14;
        color:#FFF;
        padding:12px 20px;
        border-radius:50px;
        display:flex;
        align-items:center;
        gap:14px;
        box-shadow:0 8px 30px rgba(0,0,0,0.22);
        z-index:99999;
        font-size:0.86rem;
        opacity:0;
        transition:all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        pointer-events:none;
        border:1px solid rgba(255,255,255,0.12);
      }
      .vk-toast.visible{
        transform:translateX(-50%) translateY(0);
        opacity:1;
        pointer-events:all;
      }
      .vk-toast-btn{
        background:rgba(255,255,255,0.2);
        color:#FFF;
        border:none;
        padding:5px 12px;
        border-radius:50px;
        font-weight:600;
        font-size:0.78rem;
        cursor:pointer;
        transition:background .15s;
        white-space:nowrap;
      }
      .vk-toast-btn:hover{background:#FFF;color:#103D14}
      @media(max-width:680px){
        .vk-toast{
          bottom:82px;
          width:calc(100% - 32px);
          max-width:380px;
          justify-content:space-between;
          font-size:0.8rem;
          padding:10px 16px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // ===== CART DRAWER HTML INJECTION =====
  function injectCartDrawerHTML() {
    if (document.getElementById('cartDrawer')) return;

    const overlay = document.createElement('div');
    overlay.className = 'cart-overlay';
    overlay.id = 'cartOverlay';
    overlay.onclick = window.closeCart;

    const drawer = document.createElement('div');
    drawer.className = 'cart-drawer';
    drawer.id = 'cartDrawer';
    drawer.innerHTML = `
      <div class="cart-top">
        <h3>Your Basket (<span id="cartDrawerCount">0</span>)</h3>
        <button class="cart-close-btn" onclick="closeCart()" aria-label="Close basket">✕</button>
      </div>
      <div class="cart-items-list" id="cartItems">
        <div class="empty-cart-state">
          <div style="font-size:2.4rem">🛒</div>
          <p style="margin-top:10px;font-size:0.9rem">Your basket is empty.<br/>Browse our pickles to add items.</p>
          <a href="store.html" class="empty-cart-btn" onclick="closeCart()">Browse Pickles Store</a>
        </div>
      </div>
      <div class="cart-bottom-actions" id="cartFooter" style="display:none">
        <div class="cart-subtotal-row">
          <span style="color:#5A655B">Subtotal</span>
          <span class="cart-subtotal-val" id="cartTotal">₹0</span>
        </div>
        <div class="cart-free-ship-note" id="cartDeliveryNote">Free delivery for orders above ₹299</div>
        <button class="btn-checkout-hold" disabled>🔒 Online Checkout – Coming Soon</button>
        <div class="cart-notice-box">
          <strong>🔔 Pre-Launch WhatsApp Order:</strong>
          Place this basket directly via WhatsApp. Our cloud kitchen will confirm preparation and delivery within minutes.
        </div>
        <button class="btn-order-whatsapp" id="cartWaBtn">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
          Send Order via WhatsApp
        </button>
      </div>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(drawer);
  }

  // ===== GLOBAL DRAWER RENDER & ACTIONS =====
  window.renderCartDrawer = function () {
    const items = window.VKCart.getItems();
    const itemsDiv = document.getElementById('cartItems');
    const footerDiv = document.getElementById('cartFooter');
    const drawerCount = document.getElementById('cartDrawerCount');

    if (drawerCount) drawerCount.textContent = window.VKCart.count();
    if (!itemsDiv) return;

    if (items.length === 0) {
      itemsDiv.innerHTML = `
        <div class="empty-cart-state">
          <div style="font-size:2.4rem">🛒</div>
          <p style="margin-top:10px;font-size:0.9rem">Your basket is empty.<br/>Browse our pickles to add items.</p>
          <a href="store.html" class="empty-cart-btn" onclick="closeCart()">Browse Pickles Store</a>
        </div>
      `;
      if (footerDiv) footerDiv.style.display = 'none';
    } else {
      itemsDiv.innerHTML = items.map(it => `
        <div class="cart-item-row">
          <div class="cart-item-thumb"><img src="${it.image}" alt="${it.name}"/></div>
          <div class="cart-item-details">
            <div class="cart-item-title">${it.name}</div>
            <div class="cart-item-meta">${it.weight || ''}</div>
            <div class="cart-item-bottom">
              <span class="cart-item-price">₹${it.price * it.qty}</span>
              <div style="display:flex;align-items:center;gap:4px">
                <div class="cart-qty-counter">
                  <button class="cart-qty-btn" onclick="cartChangeQty('${it.id}',-1)">−</button>
                  <span class="cart-qty-val">${it.qty}</span>
                  <button class="cart-qty-btn" onclick="cartChangeQty('${it.id}',1)">+</button>
                </div>
                <button class="cart-del-btn" onclick="cartRemove('${it.id}')" title="Remove item">✕</button>
              </div>
            </div>
          </div>
        </div>
      `).join('');

      if (footerDiv) {
        footerDiv.style.display = '';
        const total = window.VKCart.total();
        const totalElem = document.getElementById('cartTotal');
        const noteElem = document.getElementById('cartDeliveryNote');
        const waBtn = document.getElementById('cartWaBtn');

        if (totalElem) totalElem.textContent = `₹${total}`;
        if (noteElem) {
          noteElem.textContent = total >= 299 ? '✅ Free local delivery unlocked!' : `Add ₹${299 - total} more for free delivery`;
        }
        if (waBtn) {
          const msg = encodeURIComponent(
            `Hi Venu! I'd like to place an order from Venu's Kitchen:\n` +
            items.map(i => `• ${i.name} (${i.weight || ''}) x${i.qty} = ₹${i.price * i.qty}`).join('\n') +
            `\n\nTotal: ₹${total}\n\nPlease confirm preparation and delivery.`
          );
          waBtn.onclick = () => window.open(`https://wa.me/919876543210?text=${msg}`, '_blank');
        }
      }
    }

    // Synchronize Store product cards if present on page
    if (typeof PRODUCTS !== 'undefined' && Array.isArray(PRODUCTS)) {
      PRODUCTS.forEach(p => {
        const addBtn = document.getElementById(`add-${p.id}`);
        const qtyCtrl = document.getElementById(`qty-${p.id}`);
        const qnum = document.getElementById(`qnum-${p.id}`);
        if (!addBtn) return;
        const inCart = items.find(c => c.id === p.id);
        if (inCart) {
          addBtn.style.display = 'none';
          if (qtyCtrl) qtyCtrl.classList.add('visible');
          if (qnum) qnum.textContent = inCart.qty;
        } else {
          addBtn.style.display = '';
          if (qtyCtrl) qtyCtrl.classList.remove('visible');
        }
      });
    }
  };

  function showToast(productName) {
    let toast = document.getElementById('vkToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'vkToast';
      toast.className = 'vk-toast';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `
      <span>🫙 <strong>${productName}</strong> added to basket</span>
      <button class="vk-toast-btn" onclick="openCart()">View Basket →</button>
    `;
    toast.classList.add('visible');
    clearTimeout(window._vkToastTimer);
    window._vkToastTimer = setTimeout(() => {
      toast.classList.remove('visible');
    }, 2800);
  }
  window.showToast = showToast;

  window.openCart = function () {
    injectCartStyles();
    injectCartDrawerHTML();
    const overlay = document.getElementById('cartOverlay');
    const drawer = document.getElementById('cartDrawer');
    if (overlay && drawer) {
      overlay.classList.add('open');
      drawer.classList.add('open');
      document.body.style.overflow = 'hidden';
      window.renderCartDrawer();
    }
  };

  window.closeCart = function () {
    const overlay = document.getElementById('cartOverlay');
    const drawer = document.getElementById('cartDrawer');
    if (overlay && drawer) {
      overlay.classList.remove('open');
      drawer.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  window.cartChangeQty = function (id, delta) {
    const item = window.VKCart.getItems().find(c => c.id === id);
    if (!item) return;
    window.VKCart.updateQty(id, item.qty + delta);
    window.renderCartDrawer();
    updateAllCartUI();
  };

  window.cartRemove = function (id) {
    window.VKCart.removeItem(id);
    window.renderCartDrawer();
    updateAllCartUI();
  };

  function updateAllCartUI() {
    const count = window.VKCart.count();
    document.querySelectorAll('#cartCount, .basket-badge').forEach(el => {
      el.textContent = count;
    });
    const drawerCount = document.getElementById('cartDrawerCount');
    if (drawerCount) drawerCount.textContent = count;
  }
  window.updateCartUI = updateAllCartUI;

  // ===== AUTO-INIT & EVENT INTERCEPTION =====
  function init() {
    injectCartStyles();
    injectCartDrawerHTML();
    updateAllCartUI();

    // Universal basket button click handler: intercept any .basket-btn click anywhere
    document.addEventListener('click', function (e) {
      const btn = e.target.closest('.basket-btn');
      if (btn) {
        e.preventDefault();
        e.stopPropagation();
        window.openCart();
      }
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        window.closeCart();
      }
    });

    // Graceful Image Fallback for any dropped network connections
    document.addEventListener('error', function (e) {
      if (e.target && e.target.tagName === 'IMG' && !e.target.dataset.fallbackApplied) {
        e.target.dataset.fallbackApplied = 'true';
        e.target.src = 'https://images.unsplash.com/photo-1632239108478-568f362ac3ac?auto=format&fit=crop&w=700&q=80';
      }
    }, true);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
