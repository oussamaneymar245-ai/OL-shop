const SUPABASE_URL = 'https://ybiwtloollzvuppwfwso.supabase.co';

const SUPABASE_KEY = 'sb_publishable_G5-hLrph-TuEYG753vTCqA_44qRgyk_ ';

const { createClient } = supabase;

const db = createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);


/* PRODUCTS */

const products = [
  {
    id: 1,
    name: 'PlayStation Store 10€',
    price: 35,
    icon: '🎮'
  },
  {
    id: 2,
    name: 'PlayStation Store 20€',
    price: 68,
    icon: '🎮'
  },
  {
    id: 3,
    name: 'Apple Gift Card 10€',
    price: 36,
    icon: '🍎'
  },
  {
    id: 4,
    name: 'Apple Gift Card 25€',
    price: 88,
    icon: '🍎'
  },
  {
    id: 5,
    name: 'Google Play 10€',
    price: 36,
    icon: '▶️'
  },
  {
    id: 6,
    name: 'Google Play 25€',
    price: 88,
    icon: '▶️'
  },
  {
    id: 7,
    name: 'Roblox Gift Card 10€',
    price: 35,
    icon: '🟥'
  },
  {
    id: 8,
    name: 'Roblox Gift Card 20€',
    price: 68,
    icon: '🟥'
  },
  {
    id: 9,
    name: 'VALORANT Points 10€',
    price: 35,
    icon: '🔫'
  },
  {
    id: 10,
    name: 'VALORANT Points 20€',
    price: 68,
    icon: '🔫'
  },
  {
    id: 11,
    name: 'Steam Gift Card 10€',
    price: 35,
    icon: '🎮'
  },
  {
    id: 12,
    name: 'Steam Gift Card 20€',
    price: 68,
    icon: '🎮'
  },
  {
    id: 13,
    name: 'Xbox Gift Card 10€',
    price: 35,
    icon: '🟢'
  },
  {
    id: 14,
    name: 'Xbox Gift Card 20€',
    price: 68,
    icon: '🟢'
  },
  {
    id: 15,
    name: 'Nintendo eShop 10€',
    price: 35,
    icon: '🔴'
  },
  {
    id: 16,
    name: 'Mobile Legends Diamonds',
    price: 35,
    icon: '⚔️'
  }
];


/* DISPLAY PRODUCTS */

const grid = document.getElementById('products');

if (grid) {

  grid.innerHTML = products.map(product => `

    <article class="card">

      <div class="icon">
        ${product.icon}
      </div>

      <h3>
        ${product.name}
      </h3>

      <div class="price">
        ${product.price} TND
      </div>

      <button
        class="btn"
        onclick="buy(${product.id})"
      >
        Commander
      </button>

    </article>

  `).join('');

}


/* BUY PRODUCT */

window.buy = function(id) {

  const product = products.find(
    item => item.id === id
  );

  if (!product) return;

  const checkout =
    document.getElementById('checkout');

  const productName =
    document.getElementById('selectedProductName');

  const productPrice =
    document.getElementById('selectedProductPrice');

  const productInput =
    document.getElementById('product');

  const priceInput =
    document.getElementById('price');

  if (productName)
    productName.textContent = product.name;

  if (productPrice)
    productPrice.textContent =
      product.price + ' TND';

  if (productInput)
    productInput.value = product.name;

  if (priceInput)
    priceInput.value = product.price;

  if (checkout) {

    checkout.classList.remove('hidden');

    checkout.scrollIntoView({
      behavior: 'smooth'
    });

  }

};


/* ORDER FORM */

const orderForm =
  document.getElementById('orderForm');


if (orderForm) {

  orderForm.addEventListener(
    'submit',
    async function(event) {

      event.preventDefault();


      const result =
        document.getElementById('result');

      const name =
        document.getElementById('name').value.trim();

      const phone =
        document.getElementById('phone').value.trim();

      const product =
        document.getElementById('product').value.trim();

      const price =
        Number(
          document.getElementById('price').value
        );

      const noteElement =
        document.getElementById('note');

      const note =
        noteElement
          ? noteElement.value.trim()
          : '';


      if (!name || !phone || !product || !price) {

        result.textContent =
          '❌ يرجى ملء جميع المعلومات المطلوبة.';

        return;
      }


      result.textContent =
        '⏳ جاري تسجيل الطلب...';


      try {

        const { data, error } =
          await db
            .from('orders')
            .insert([
              {
                customer_name: name,
                phone: phone,
                product: product,
                price: price,
                note: note,
                status: 'قيد المعالجة'
              }
            ])
            .select();


        if (error) {

          console.error(
            'Supabase error:',
            error
          );

          result.textContent =
            '❌ ' + error.message;

          return;
        }


        console.log(
          'Order created:',
          data
        );


        result.textContent =
          '✅ تم تسجيل طلبك بنجاح!';


        orderForm.reset();


        setTimeout(() => {

          const checkout =
            document.getElementById('checkout');

          if (checkout) {
            checkout.classList.add('hidden');
          }

        }, 2500);


      } catch (error) {

        console.error(
          'Unexpected error:',
          error
        );

        result.textContent =
          '❌ ' + error.message;

      }

    }
  );

}
