// Venu's Kitchen - Shared Cart & E-Commerce State Management

const VENU_PRODUCTS = [
  {
    id: 1,
    title: "Traditional Raw Mango Pickle",
    hindi: "दादी का पारंपरिक आम का अचार",
    category: "mango",
    weight: "500g Glass Jar",
    price: 240,
    mrp: 290,
    spice: "Medium Spicy 🌶️🌶️",
    badge: "Bestseller",
    badgeBg: "bg-amber-100 text-amber-900 border-amber-300",
    oil: "Cold-Pressed Mustard Oil (Kacchi Ghani)",
    ingredients: "Selected Ramkela Green Mangoes, Pure Mustard Oil, Fenugreek (Methi), Fennel (Saunf), Kalonji, Turmeric, Rock Salt.",
    desc: "Sun-cured raw mango slices infused with freshly roasted heirloom spices and pure cold-pressed mustard oil. Matured naturally for 21 days in ceramic barnis.",
    image: "https://images.unsplash.com/photo-1632239108478-568f362ac3ac?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Banarasi Stuffed Red Chilli Pickle",
    hindi: "बनारसी भरवा लाल मिर्च",
    category: "chilli",
    weight: "400g Glass Jar",
    price: 280,
    mrp: 340,
    spice: "Fiery Hot 🌶️🌶️🌶️",
    badge: "Chef's Special",
    badgeBg: "bg-red-100 text-red-900 border-red-300",
    oil: "Pure Mustard Oil",
    ingredients: "Whole Sun-Dried Banarasi Red Chilies, Amchur (Dry Mango), Ground Yellow Mustard, Roasted Saunf, Mustard Oil, Salt.",
    desc: "Whole large red chilies packed by hand with a rich tangy masala of dry mango powder and roasted mustard kernels. A royal heritage recipe.",
    image: "https://images.unsplash.com/photo-1645679059045-65ff3a440554?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Spicy Green Chilli Pickle",
    hindi: "तीखी हरी मिर्च का अचार",
    category: "chilli",
    weight: "350g Glass Jar",
    price: 190,
    mrp: 230,
    spice: "Extra Pungent 🌶️🌶️🌶️",
    badge: "Locally Loved",
    badgeBg: "bg-emerald-100 text-emerald-900 border-emerald-300",
    oil: "Mustard Oil & Fresh Lemon Dressing",
    ingredients: "Fresh Crisp Green Chilies, Crushed Yellow Mustard, Fresh Lemon Juice, Turmeric, Asafoetida (Hing), Mustard Oil, Salt.",
    desc: "Hand-sliced fresh green chilies tempered with yellow mustard and freshly squeezed lemon juice. Crisp, spicy, and perfectly pungent.",
    image: "https://images.unsplash.com/photo-1643594697730-bb034a399a4b?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    title: "Sun-Cured Lemon Pickle",
    hindi: "नींबू का खट्टा-मीठा अचार (बिना तेल)",
    category: "lemon",
    weight: "400g Glass Jar",
    price: 210,
    mrp: 250,
    spice: "Mild & Tangy 🌶️",
    badge: "Zero-Oil Recipe",
    badgeBg: "bg-yellow-100 text-yellow-900 border-yellow-300",
    oil: "100% Zero Oil (Sun-Cured)",
    ingredients: "Thin-Skin Kagzi Lemons, Rock Salt, Himalayan Black Salt, Roasted Ajwain, Black Pepper, Pure Organic Jaggery.",
    desc: "Prepared with zero added oil. Slow-aged in glass jars under natural sunlight with ajwain and Himalayan rock salt. Excellent for digestion.",
    image: "https://images.unsplash.com/photo-1525027684690-6de2d445842b?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    title: "Mixed Vegetable Pachranga",
    hindi: "पंचरंगा मिक्स वेज अचार",
    category: "mixed",
    weight: "500g Glass Jar",
    price: 230,
    mrp: 280,
    spice: "Medium Spicy 🌶️🌶️",
    badge: "Traditional Medley",
    badgeBg: "bg-orange-100 text-orange-900 border-orange-300",
    oil: "Cold-Pressed Mustard Oil",
    ingredients: "Farm-Fresh Cauliflower, Carrots, Turnips, Green Peas, Ginger, Mustard Oil, Spices, Salt.",
    desc: "Traditional winter medley of crisp seasonal vegetables cured with aromatic pickling spices and pure mustard oil.",
    image: "https://images.unsplash.com/photo-1519147683487-66e0c2d0b5a0?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    title: "Slow-Tempered Garlic Pickle",
    hindi: "देसी लहसुन का तड़का अचार",
    category: "chilli",
    weight: "350g Glass Jar",
    price: 260,
    mrp: 310,
    spice: "Bold & Savory 🌶️🌶️🌶️",
    badge: "Immunity Rich",
    badgeBg: "bg-stone-200 text-stone-900 border-stone-400",
    oil: "Sesame & Mustard Oil",
    ingredients: "Peeled Mountain Garlic, Whole Cumin, Crushed Red Chilli, Asafoetida (Hing), Wood-Pressed Sesame & Mustard Oil, Rock Salt.",
    desc: "Whole garlic cloves lightly roasted in iron pans and preserved in sesame-mustard oil. Intense, pungent flavor that elevates any meal.",
    image: "https://images.unsplash.com/photo-1706167754852-128daa40126a?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 7,
    title: "Sweet Mango Chhunda",
    hindi: "गुजराती आम का छुंदा (केसर युक्त)",
    category: "mango",
    weight: "400g Glass Jar",
    price: 220,
    mrp: 260,
    spice: "Sweet & Mild 🌶️",
    badge: "Sweet Preserve",
    badgeBg: "bg-amber-100 text-amber-900 border-amber-300",
    oil: "Zero Oil (Sugar Cured)",
    ingredients: "Grated Raw Mango, Pure Cane Sugar, Kashmiri Red Chilli, Roasted Cumin Seeds, Green Cardamom, Kashmiri Saffron.",
    desc: "Grated green mango slow-cooked in natural sunlight with pure cane sugar and roasted cumin. Delicious accompaniment to parathas, theplas, and rice.",
    image: "https://images.unsplash.com/photo-1576920803950-3f066b308938?auto=format&fit=crop&w=800&q=80"
  }
];

function getCart() {
  try {
    return JSON.parse(localStorage.getItem('venu_cart')) || [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem('venu_cart', JSON.stringify(cart));
  updateCartBadges();
}

function addToCart(productId) {
  const p = VENU_PRODUCTS.find(item => item.id === productId);
  if (!p) return;

  const cart = getCart();
  const existing = cart.find(item => item.id === productId);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...p, qty: 1 });
  }

  saveCart(cart);
  renderCartDrawer();
  showToastNotification(`Added 1x ${p.title} to your basket!`);
}

function updateQuantity(productId, delta) {
  let cart = getCart();
  const item = cart.find(x => x.id === productId);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(x => x.id !== productId);
  }

  saveCart(cart);
  renderCartDrawer();
}

function updateCartBadges() {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  document.querySelectorAll('.cart-counter-badge').forEach(el => {
    el.innerText = count;
  });

  const cartTotalEl = document.getElementById('drawer-subtotal');
  if (cartTotalEl) cartTotalEl.innerText = `₹${total}`;

  const cartGrandTotalEl = document.getElementById('drawer-grand-total');
  if (cartGrandTotalEl) cartGrandTotalEl.innerText = `₹${total}`;
}

function renderCartDrawer() {
  const container = document.getElementById('cart-drawer-items');
  if (!container) return;

  const cart = getCart();
  updateCartBadges();

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="py-20 text-center space-y-3">
        <div class="w-16 h-16 rounded-full bg-amber-50 text-amber-700 mx-auto flex items-center justify-center border border-amber-200">
          <i data-lucide="shopping-basket" class="w-8 h-8"></i>
        </div>
        <h4 class="font-serif font-bold text-base text-stone-900">Your Basket is Empty</h4>
        <p class="text-xs text-stone-500 max-w-xs mx-auto">Explore our fresh artisanal pickle jars and add natural home flavors to your dining table.</p>
        <a href="store.html" class="inline-block mt-3 px-5 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-semibold text-xs shadow-md">
          Browse Pickle Store
        </a>
      </div>
    `;
    if (window.lucide) lucide.createIcons();
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="flex items-center gap-3.5 p-3.5 rounded-2xl bg-stone-50/80 border border-stone-200">
      <img src="${item.image}" alt="${item.title}" class="w-16 h-16 rounded-xl object-cover border border-stone-200 flex-shrink-0">
      <div class="flex-grow min-w-0">
        <h4 class="font-serif font-bold text-xs text-stone-900 truncate">${item.title}</h4>
        <span class="text-[11px] text-amber-800 font-semibold block">${item.weight}</span>
        <span class="text-xs font-bold text-stone-900">₹${item.price}</span>
      </div>
      <div class="flex flex-col items-end gap-1.5 flex-shrink-0">
        <div class="flex items-center bg-white rounded-lg border border-stone-200 shadow-sm px-2 py-0.5">
          <button onclick="updateQuantity(${item.id}, -1)" class="text-stone-600 hover:text-stone-900 font-bold text-xs px-1.5 py-0.5">-</button>
          <span class="text-xs font-bold text-stone-900 px-1.5">${item.qty}</span>
          <button onclick="updateQuantity(${item.id}, 1)" class="text-stone-600 hover:text-stone-900 font-bold text-xs px-1.5 py-0.5">+</button>
        </div>
        <span class="text-xs font-black text-amber-900">₹${item.price * item.qty}</span>
      </div>
    </div>
  `).join('');

  if (window.lucide) lucide.createIcons();
}

function toggleCartDrawer(open) {
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-overlay');
  if (!drawer || !overlay) return;

  if (open) {
    renderCartDrawer();
    overlay.classList.remove('opacity-0', 'pointer-events-none');
    drawer.classList.remove('translate-x-full');
  } else {
    overlay.classList.add('opacity-0', 'pointer-events-none');
    drawer.classList.add('translate-x-full');
  }
}

function showToastNotification(message) {
  let toast = document.getElementById('site-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'site-toast';
    toast.className = 'fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-4 py-3 rounded-2xl shadow-2xl text-xs font-semibold flex items-center gap-2.5 opacity-0 pointer-events-none transition-all duration-300 transform translate-y-3';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<i data-lucide="check-circle" class="w-4 h-4 text-emerald-400"></i> <span>${message}</span>`;
  if (window.lucide) lucide.createIcons();

  toast.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-3');
  toast.classList.add('opacity-100', 'translate-y-0');

  setTimeout(() => {
    toast.classList.add('opacity-0', 'pointer-events-none', 'translate-y-3');
  }, 2800);
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartBadges();
  renderCartDrawer();
});
