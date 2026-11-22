const products = [
 {id:1,name:'F-16 Pixel Jet',category:'vehicles',price:4.75,icon:'✈️',tag:'AIRCRAFT',desc:'Minecraft-style display / rideable concept'},
 {id:2,name:'F-35 Pixel Jet',category:'vehicles',price:5.00,icon:'🛩️',tag:'PREMIUM',desc:'Fantasy stealth-inspired vehicle skin'},
 {id:3,name:'Phantom Stealth Craft',category:'vehicles',price:4.60,icon:'🌑',tag:'RARE',desc:'Dark fantasy aircraft build concept'},
 {id:4,name:'Battle Tank Mk. I',category:'vehicles',price:3.50,icon:'🚜',tag:'GROUND',desc:'Block-built armored vehicle concept'},
 {id:5,name:'Heavy Tank Mk. II',category:'vehicles',price:4.80,icon:'🛡️',tag:'HEAVY',desc:'Large Minecraft vehicle build'},
 {id:6,name:'Recon Rover',category:'vehicles',price:2.25,icon:'🛞',tag:'SCOUT',desc:'Compact exploration vehicle'},
 {id:7,name:'Diamond Armor Set',category:'armor',price:3.25,icon:'💎',tag:'ARMOR',desc:'Full fantasy armor set'},
 {id:8,name:'Netherite Armor Set',category:'armor',price:5.00,icon:'🔥',tag:'TOP TIER',desc:'Premium in-game armor bundle'},
 {id:9,name:'Shield Pack',category:'armor',price:1.25,icon:'🛡️',tag:'DEFENSE',desc:'Decorative and gameplay shields'},
 {id:10,name:'Enchanted Sword',category:'weapons',price:2.75,icon:'⚔️',tag:'FANTASY',desc:'In-game enchanted sword item'},
 {id:11,name:'Bow & Arrow Bundle',category:'weapons',price:1.80,icon:'🏹',tag:'RANGED',desc:'Minecraft ranged-gameplay bundle'},
 {id:12,name:'Magic Staff',category:'weapons',price:3.00,icon:'✨',tag:'MAGIC',desc:'Fantasy spell prop for roleplay'},
 {id:13,name:'Healing Supply Crate',category:'supplies',price:1.50,icon:'🧪',tag:'SUPPLIES',desc:'Potion and food-themed supply bundle'},
 {id:14,name:'Survival Starter Pack',category:'supplies',price:2.00,icon:'🎒',tag:'STARTER',desc:'Useful basic adventure supplies'},
 {id:15,name:'Redstone Kit',category:'supplies',price:2.40,icon:'🔴',tag:'ENGINEERING',desc:'Redstone building starter bundle'},
 {id:16,name:'Fortress Block Bundle',category:'blocks',price:1.75,icon:'🧱',tag:'BUILD',desc:'Decorative castle and base blocks'},
 {id:17,name:'Rare Ore Crate',category:'blocks',price:3.50,icon:'⛏️',tag:'MINING',desc:'Fantasy ore and mining materials'},
 {id:18,name:'Builder Mega Pack',category:'blocks',price:4.25,icon:'🏰',tag:'MEGA PACK',desc:'Large themed construction bundle'}
];
const cart = new Map(); const grid=document.getElementById('productGrid'); let active='all', search='';
function money(n){return '$'+n.toFixed(2)}
function renderProducts(){const list=products.filter(p=>(active==='all'||p.category===active)&&(`${p.name} ${p.desc} ${p.tag}`.toLowerCase().includes(search)));grid.innerHTML=list.map(p=>`<article class="product"><div class="product-art"><span class="tag">${p.tag}</span><div class="item-icon">${p.icon}</div><span class="art-code">WCS / ${String(p.id).padStart(3,'0')}</span></div><div class="product-info"><h3>${p.name}</h3><p>${p.desc}</p><div class="buy-row"><strong>${money(p.price)}</strong><div class="qty"><button data-minus="${p.id}" aria-label="Decrease quantity">−</button><input type="number" min="1" max="99" value="1" id="qty-${p.id}" aria-label="Quantity"><button data-plus="${p.id}" aria-label="Increase quantity">+</button></div></div><button class="add-btn" data-add="${p.id}">ADD TO CART <span>＋</span></button></div></article>`).join('')||'<p class="empty">No products match that search.</p>'}
function renderCart(){const items=[...cart.values()];document.getElementById('cartCount').textContent=items.reduce((a,i)=>a+i.qty,0);document.getElementById('cartItems').innerHTML=items.length?items.map(i=>`<div class="cart-item"><span class="cart-emoji">${i.icon}</span><div class="cart-item-details"><strong>${i.name}</strong><small>${money(i.price)} each · Qty ${i.qty}</small></div><button data-remove="${i.id}" aria-label="Remove item">×</button></div>`).join(''):'<p class="empty">Your cart is empty. Browse the market to add items.</p>';const total=items.reduce((a,i)=>a+i.price*i.qty,0);document.getElementById('subtotal').textContent=money(total)}
function toast(msg){const el=document.getElementById('toast');el.textContent=msg;el.classList.add('show');setTimeout(()=>el.classList.remove('show'),1900)}
grid.addEventListener('click',e=>{const plus=e.target.closest('[data-plus]'),minus=e.target.closest('[data-minus]'),add=e.target.closest('[data-add]');if(plus||minus){const id=(plus||minus).dataset.plus||(plus||minus).dataset.minus;const inp=document.getElementById('qty-'+id);inp.value=Math.min(99,Math.max(1,(Number(inp.value)||1)+(plus?1:-1)));}if(add){const id=Number(add.dataset.add),p=products.find(x=>x.id===id),qty=Math.min(99,Math.max(1,Number(document.getElementById('qty-'+id).value)||1));const existing=cart.get(id);cart.set(id,{...p,qty:Math.min(99,(existing?.qty||0)+qty)});renderCart();toast(`${p.name} added to cart`);}});
grid.addEventListener('change',e=>{if(e.target.matches('input[type=number]'))e.target.value=Math.min(99,Math.max(1,Number(e.target.value)||1))});
document.getElementById('filters').addEventListener('click',e=>{const b=e.target.closest('.filter');if(!b)return;document.querySelectorAll('.filter').forEach(x=>x.classList.remove('active'));b.classList.add('active');active=b.dataset.category;renderProducts()});
document.getElementById('cartItems').addEventListener('click',e=>{const b=e.target.closest('[data-remove]');if(b){cart.delete(Number(b.dataset.remove));renderCart()}});
const drawer=document.getElementById('cartDrawer'),overlay=document.getElementById('overlay');function openCart(){drawer.classList.add('open');overlay.classList.add('show')}function closeCart(){drawer.classList.remove('open');overlay.classList.remove('show')}
document.getElementById('cartOpen').onclick=openCart;document.getElementById('cartClose').onclick=closeCart;overlay.onclick=closeCart;
document.getElementById('checkout').onclick=()=>toast('Demo store — checkout is not enabled');
const panel=document.getElementById('searchPanel');document.getElementById('searchToggle').onclick=()=>panel.classList.add('open');document.getElementById('searchClose').onclick=()=>{panel.classList.remove('open');search='';document.getElementById('searchInput').value='';renderProducts()};document.getElementById('searchInput').addEventListener('input',e=>{search=e.target.value.trim().toLowerCase();renderProducts()});
renderProducts();renderCart();
