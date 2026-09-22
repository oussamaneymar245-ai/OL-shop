const SUPABASE_URL = 'https://ybiwtloollzvuppwfwso.supabase.co';
const SUPABASE_KEY = 'sb_publishable_G5-hLrph-TuEYG753vTCqA_44qRgyk_ ';

const { createClient } = supabase;

const db = createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

const RATE = 3.5;

const products = [
  { id: 1, name: 'PlayStation Store 10€', price: 35, icon: '🎮' },
  { id: 2, name: 'PlayStation Store 20€', price: 68, icon: '🎮' },
  { id: 3, name: 'Apple Gift Card 10€', price: 36, icon: '🍎' },
  { id: 4, name: 'Apple Gift Card 25€', price: 88, icon: '🍎' },
  { id: 5, name: 'Google Play 10€', price: 36, icon: '▶️' },
  { id: 6, name: 'Google Play 25€', price: 88, icon: '▶️' },
  { id: 7, name: 'Roblox Gift Card 10€', price: 35, icon: '🟥' },
  { id: 8, name: 'Roblox Gift Card 20€', price: 68, icon: '🟥' },
  { id: 9, name: 'VALORANT Points 10€', price: 35, icon: '🔫' },
  { id: 10, name: 'VALORANT Points 20€', price: 68, icon: '🔫' },
  { id: 11, name: 'Steam Gift Card 10€', price: 35, icon: '🎮' },
  { id: 12, name: 'Steam Gift Card 20€', price: 68, icon: '🎮' },
  { id: 13, name: 'Xbox Gift Card 10€', price: 35, icon: '🟢' },
  { id: 14, name: 'Xbox Gift Card 20€', price: 68, icon: '🟢' },
  { id: 15, name: 'Nintendo eShop 10€', price: 35, icon: '🔴' },
  { id: 16, name: 'Mobile Legends Diamonds', price: 35, icon: '⚔️' }
];

const grid = document.getElementById('products');

if (grid) {
  grid.innerHTML = products.map(product => `
    <article class="card">
      <div class="icon">${product.icon}</div>
      <h3>${product.name}</h3>
      <div class="price">${product.price} TND</div>
      <button class="btn" onclick="buy(${product.id})">
        Commander
      </button>
    </article>
  `).join('');
}


window.buy = function(id) {

  const product = products.find(item => item.id === id);

  if (!product) return;

  const checkout = document.getElementById('checkout');
  const productName = document.getElementById('product');
  const productPrice = document.getElementById('price');

  if (productName) {
    productName.value = product.name;
  }

  if (productPrice) {
    productPrice.value = product.price;
  }

  if (checkout) {
    checkout.classList.remove('hidden');

    checkout.scrollIntoView({
      behavior: 'smooth'
    });
  }
};


// PAYMENT METHOD

const paymentCards = document.querySelectorAll(
  'input[name="payment_method"]'
);

const paymentInstructions =
  document.getElementById('paymentInstructions');

const proofSection =
  document.getElementById('proofSection');

const paymentProof =
  document.getElementById('paymentProof');


paymentCards.forEach(card => {

  card.addEventListener('change', function() {

    const method = this.value;

    if (!paymentInstructions || !proofSection) {
      return;
    }

    paymentInstructions.classList.remove('hidden');

    if (method === 'D17') {

      paymentInstructions.innerHTML = `
        <strong>📱 D17</strong>
        <p>
          Envoyez le montant indiqué au numéro :
        </p>
        <strong>+216 20 324 515</strong>
        <p>
          Après le paiement, envoyez une capture d'écran
          comme preuve de paiement.
        </p>
      `;

      proofSection.classList.remove('hidden');

      if (paymentProof) {
        paymentProof.required = true;
      }

    }

    else if (method === 'Flouci') {

      paymentInstructions.innerHTML = `
        <strong>💸 Flouci</strong>
        <p>
          Envoyez le montant indiqué au numéro :
        </p>
        <strong>+216 20 324 515</strong>
        <p>
          Après le paiement, envoyez une capture d'écran
          comme preuve de paiement.
        </p>
      `;

      proofSection.classList.remove('hidden');

      if (paymentProof) {
        paymentProof.required = true;
      }

    }

    else if (method === 'Main à main') {

      paymentInstructions.innerHTML = `
        <strong>🤝 Main à main</strong>
        <p>
          Contactez-nous sur WhatsApp pour organiser
          la remise en main propre.
        </p>
        <strong>+216 54 402 619</strong>
      `;

      proofSection.classList.add('hidden');

      if (paymentProof) {
        paymentProof.required = false;
        paymentProof.value = '';
      }

    }

  });

});


// ORDER

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


      const selectedPayment =
        document.querySelector(
          'input[name="payment_method"]:checked'
        );


      if (!name || !phone || !product || !price) {

        result.textContent =
          '❌ يرجى ملء جميع المعلومات المطلوبة.';

        return;
      }


      if (!selectedPayment) {

        result.textContent =
          '❌ اختر طريقة الدفع.';

        return;
      }


      const paymentMethod =
        selectedPayment.value;


      let proofPath = null;


      // PAYMENT PROOF

      if (
        paymentMethod === 'D17' ||
        paymentMethod === 'Flouci'
      ) {

        const file =
          paymentProof
            ? paymentProof.files[0]
            : null;


        if (!file) {

          result.textContent =
            '❌ أرسل صورة إثبات الدفع.';

          return;
        }


        if (
          file.type !== 'image/jpeg' &&
          file.type !== 'image/png'
        ) {

          result.textContent =
            '❌ يسمح فقط بصور JPG أو PNG.';

          return;
        }


        if (file.size > 10 * 1024 * 1024) {

          result.textContent =
            '❌ حجم الصورة يجب ألا يتجاوز 10 MB.';

          return;
        }


        result.textContent =
          '⏳ جاري رفع إثبات الدفع...';


        const safeName =
          file.name
            .replace(/[^a-zA-Z0-9._-]/g, '_');


        proofPath =
          `proofs/${crypto.randomUUID()}-${safeName}`;


        const { error: uploadError } =
          await db.storage
            .from('payment-proofs')
            .upload(
              proofPath,
              file,
              {
                contentType: file.type,
                upsert: false
              }
            );


        if (uploadError) {

          console.error(uploadError);

          result.textContent =
            '❌ فشل رفع إثبات الدفع.';

          return;
        }

      }


      // CREATE ORDER

      result.textContent =
        '⏳ جاري تسجيل الطلب...';


      try {

        const { error } =
          await db
            .from('orders')
            .insert([
              {
                customer_name: name,
                phone: phone,
                product: product,
                price: price,
                note: note,
                payment_method: paymentMethod,
                payment_proof: proofPath,
                status: 'قيد المعالجة'
              }
            ]);


        if (error) {

          console.error(error);

          result.textContent =
            '❌ حدث خطأ في تسجيل الطلب.';

          return;
        }


        result.textContent =
          '✅ تم تسجيل طلبك بنجاح!';


        orderForm.reset();


        if (proofSection) {
          proofSection.classList.add('hidden');
        }


        if (paymentInstructions) {
          paymentInstructions.classList.add('hidden');
          paymentInstructions.innerHTML = '';
        }


        if (paymentProof) {
          paymentProof.required = false;
        }


      } catch (error) {

        console.error(error);

        result.textContent =
          '❌ حدث خطأ غير متوقع.';

      }

    }
  );

}
