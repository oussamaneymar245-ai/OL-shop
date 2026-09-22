const SUPABASE_URL = 'https://ybiwtloollzvuppwfwso.supabase.co';
const SUPABASE_KEY = 'sb_publishable_G5-hLrph-TuEYG753vTCqA_44qRgyk_';

const RATE = 3.5;

const products = [
  { id: 1, name: 'PlayStation Store $5', price: 5, icon: '🎮' },
  { id: 2, name: 'PlayStation Store $10', price: 10, icon: '🎮' },
  { id: 3, name: 'PlayStation Store $20', price: 20, icon: '🎮' },
  { id: 4, name: 'PlayStation Store $50', price: 50, icon: '🎮' },

  { id: 5, name: 'Apple Gift Card $5', price: 5, icon: '🍎' },
  { id: 6, name: 'Apple Gift Card $10', price: 10, icon: '🍎' },
  { id: 7, name: 'Apple Gift Card $25', price: 25, icon: '🍎' },
  { id: 8, name: 'Apple Gift Card $50', price: 50, icon: '🍎' },

  { id: 9, name: 'Google Play $5', price: 5, icon: '▶️' },
  { id: 10, name: 'Google Play $10', price: 10, icon: '▶️' },
  { id: 11, name: 'Google Play $25', price: 25, icon: '▶️' },
  { id: 12, name: 'Google Play $50', price: 50, icon: '▶️' },

  { id: 13, name: 'Roblox $5', price: 5, icon: '🟥' },
  { id: 14, name: 'Roblox $10', price: 10, icon: '🟥' },
  { id: 15, name: 'Roblox $20', price: 20, icon: '🟥' },
  { id: 16, name: 'Roblox $50', price: 50, icon: '🟥' },

  { id: 17, name: 'VALORANT $5', price: 5, icon: '🎯' },
  { id: 18, name: 'VALORANT $10', price: 10, icon: '🎯' },
  { id: 19, name: 'VALORANT $20', price: 20, icon: '🎯' },
  { id: 20, name: 'VALORANT $50', price: 50, icon: '🎯' },

  { id: 21, name: 'Mobile Legends $5', price: 5, icon: '⚔️' },
  { id: 22, name: 'Mobile Legends $10', price: 10, icon: '⚔️' },
  { id: 23, name: 'Mobile Legends $20', price: 20, icon: '⚔️' },
  { id: 24, name: 'Mobile Legends $50', price: 50, icon: '⚔️' },

  { id: 25, name: 'Steam $5', price: 5, icon: '🎮' },
  { id: 26, name: 'Steam $10', price: 10, icon: '🎮' },
  { id: 27, name: 'Steam $20', price: 20, icon: '🎮' },
  { id: 28, name: 'Steam $50', price: 50, icon: '🎮' },

  { id: 29, name: 'Xbox $10', price: 10, icon: '🟩' },
  { id: 30, name: 'Xbox $25', price: 25, icon: '🟩' },
  { id: 31, name: 'Xbox $50', price: 50, icon: '🟩' },

  { id: 32, name: 'Nintendo eShop $10', price: 10, icon: '🔴' },
  { id: 33, name: 'Nintendo eShop $20', price: 20, icon: '🔴' },
  { id: 34, name: 'Nintendo eShop $50', price: 50, icon: '🔴' },

  { id: 35, name: 'EA Gift Card $10', price: 10, icon: '🟣' },
  { id: 36, name: 'EA Gift Card $20', price: 20, icon: '🟣' },
  { id: 37, name: 'EA Gift Card $50', price: 50, icon: '🟣' }
];

const grid = document.getElementById('products');

grid.innerHTML = products.map(product => {
  const tndPrice = product.price * RATE;

  return `
    <article class="card">
      <div class="icon">${product.icon}</div>
      <h3>${product.name}</h3>
      <div class="price">${tndPrice.toFixed(2)} TND</div>
      <button class="btn" onclick="buy(${product.id})">
        Commander
      </button>
    </article>
  `;
}).join('');

function buy(id) {
  const product = products.find(item => item.id === id);

  if (!product) return;

  const tndPrice = product.price * RATE;

  document.getElementById('checkout').classList.remove('hidden');

  document.getElementById('product').value = product.name;

  document.getElementById('price').value =
    tndPrice.toFixed(2) + ' TND';

  document.getElementById('checkout').scrollIntoView({
    behavior: 'smooth'
  });
}

document.getElementById('orderForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  const result = document.getElementById('result');

  result.textContent = '⏳ جاري تسجيل الطلب...';

  const order = {
    product: document.getElementById('product').value,
    price: Number(
      document.getElementById('price').value.replace(' TND', '')
    ),
    customer_name: document.getElementById('name').value.trim(),
    phone: document.getElementById('phone').value.trim(),
    note: document.getElementById('note').value.trim(),
    status: 'قيد المعالجة'
  };

  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/orders`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify(order)
      }
    );

    if (!response.ok) {
      throw new Error(await response.text());
    }

    result.textContent =
      '✅ تم تسجيل طلبك بنجاح. سيتم تجهيز طلبك.';

    document.getElementById('orderForm').reset();

  } catch (error) {
    console.error(error);

    result.textContent =
      '❌ حدث خطأ في تسجيل الطلب. حاول مرة أخرى.';
  }
});
