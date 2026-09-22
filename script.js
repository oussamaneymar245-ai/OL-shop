const SUPABASE_URL = 'https://ybiwtloollzvuppwfwso.supabase.co';
const SUPABASE_KEY = 'sb_publishable_G5-hLrph-TuEYG753vTCqA_44qRgyk_';
const { createClient } = supabase;
const db = createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);
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
// PRODUCTS
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
// BUY PRODUCT
window.buy = function(id) {
  const product =
    products.find(item => item.id === id);
  if (!product) return;
  const checkout =
    document.getElementById('checkout');
  const productName =
    document.getElementById('product');
  const productPrice =
    document.getElementById('price');
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
// DELIVERY METHOD
const deliveryMethods =
  document.querySelectorAll(
    'input[name="delivery_method"]'
  );
const emailField =
  document.getElementById('emailField');
const phoneField =
  document.getElementById('phoneField');
const emailInput =
  document.getElementById('email');
const phoneInput =
  document.getElementById('phone');
deliveryMethods.forEach(method => {
  method.addEventListener('change', function() {
    if (emailField) {
      emailField.classList.add('hidden');
    }
    if (phoneField) {
      phoneField.classList.add('hidden');
    }
    if (emailInput) {
      emailInput.required = false;
      emailInput.value = '';
    }
    if (phoneInput) {
      phoneInput.required = false;
      phoneInput.value = '';
    }
    if (this.value === 'email') {
      if (emailField) {
        emailField.classList.remove('hidden');
      }
      if (emailInput) {
        emailInput.required = true;
      }
    }
    if (this.value === 'phone') {
      if (phoneField) {
        phoneField.classList.remove('hidden');
      }
      if (phoneInput) {
        phoneInput.required = true;
      }
    }
  });
});
// PAYMENT METHOD
const paymentCards =
  document.querySelectorAll(
    'input[name="payment_method"]'
  );
const paymentInstructions =
  document.getElementById(
    'paymentInstructions'
  );
const proofSection =
  document.getElementById(
    'proofSection'
  );
const paymentProof =
  document.getElementById(
    'paymentProof'
  );
paymentCards.forEach(card => {
  card.addEventListener('change', function() {
    const method = this.value;
    if (!paymentInstructions || !proofSection) {
      return;
    }
    paymentInstructions.classList.remove('hidden');
    if (
      method === 'D17' ||
      method === 'Flouci'
    ) {
      const methodName =
        method === 'D17'
          ? '📱 D17'
          : '💸 Flouci';
      paymentInstructions.innerHTML = `
        <strong>
          ${methodName}
        </strong>
        <p>
          Envoyez le montant indiqué au numéro :
        </p>
        <strong>
          +216 20 324 515
        </strong>
        <p>
          Après le paiement, envoyez une capture
          d'écran comme preuve de paiement.
        </p>
      `;
      proofSection.classList.remove('hidden');
      if (paymentProof) {
        paymentProof.required = true;
      }
    }
    else if (method === 'Main à main') {
      paymentInstructions.innerHTML = `
        <strong>
          🤝 Main à main
        </strong>
        <p>
          Contactez-nous sur WhatsApp pour organiser
          la remise en main propre.
        </p>
        <strong>
          +216 54 402 619
        </strong>
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
        document
          .getElementById('name')
          .value
          .trim();
      const product =
        document
          .getElementById('product')
          .value
          .trim();
      const price =
        Number(
          document
            .getElementById('price')
            .value
        );
      const noteElement =
        document.getElementById('note');
      const note =
        noteElement
          ? noteElement.value.trim()
          : '';
      const selectedDelivery =
        document.querySelector(
          'input[name="delivery_method"]:checked'
        );
      const selectedPayment =
        document.querySelector(
          'input[name="payment_method"]:checked'
        );
      // CHECK CUSTOMER INFO
      if (!name || !product || !price) {
        result.textContent =
          '❌ يرجى ملء المعلومات المطلوبة.';
        return;
      }
      if (!selectedDelivery) {
        result.textContent =
          '❌ اختر طريقة استلام الطلب.';
        return;
      }
      const deliveryMethod =
        selectedDelivery.value;
      let email = null;
      let phone = null;
      // EMAIL DELIVERY
      if (deliveryMethod === 'email') {
        email =
          emailInput
            ? emailInput.value.trim()
            : '';
        if (!email) {
          result.textContent =
            '❌ أدخل البريد الإلكتروني.';
          return;
        }
      }
      // PHONE DELIVERY
      if (deliveryMethod === 'phone') {
        phone =
          phoneInput
            ? phoneInput.value.trim()
            : '';
        if (!phone) {
          result.textContent =
            '❌ أدخل رقم الهاتف.';
          return;
        }
      }
      // PAYMENT CHECK
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
        if (
          file.size >
          10 * 1024 * 1024
        ) {
          result.textContent =
            '❌ حجم الصورة يجب ألا يتجاوز 10 MB.';
          return;
        }
        result.textContent =
          '⏳ جاري رفع إثبات الدفع...';
        const safeName =
          file.name.replace(
            /[^a-zA-Z0-9._-]/g,
            '_'
          );
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
  '❌ ' + uploadError.message;
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
                email: email,
                phone: phone,
                delivery_method:
                  deliveryMethod,
                product: product,
                price: price,
                note: note,
                payment_method:
                  paymentMethod,
                payment_proof:
                  proofPath,
                status:
                  'قيد المعالجة'
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
        if (emailField) {
          emailField.classList.add('hidden');
        }
        if (phoneField) {
          phoneField.classList.add('hidden');
        }
        if (proofSection) {
          proofSection.classList.add('hidden');
        }
        if (paymentInstructions) {
          paymentInstructions.classList.add(
            'hidden'
          );
          paymentInstructions.innerHTML = '';
        }
        if (paymentProof) {
          paymentProof.required = false;
        }
        if (emailInput) {
          emailInput.required = false;
        }
        if (phoneInput) {
          phoneInput.required = false;
        }
      }
      catch (error) {
        console.error(error);
        result.textContent =
          '❌ حدث خطأ غير متوقع.';
      }
    }
  );
}
