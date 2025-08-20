const user = JSON.parse(localStorage.getItem('user'));

const welcome = document.getElementById('welcome');
const balance = document.getElementById('balance');
const stars = document.getElementById('stars');
const receiverName = document.getElementById('receiverName');

const toCard = document.getElementById("toCard");
const amount = document.getElementById("amount");
const transferResult = document.getElementById("transferResult");
const transferBtn = document.getElementById("transferBtn");

if (!user) {
  window.location.href = 'login.html';
}

// Dashboard ma'lumotlarini chiqarish
welcome.textContent = `Xush kelibsiz, ${user.fullName}`;
balance.textContent = user.balance.toLocaleString();
stars.textContent = user.stars;

// Karta raqamini tekshirish
toCard.addEventListener('input', async (e) => {
  const card = e.target.value.trim();
  receiverName.textContent = ''; // har safar tozalash

  if (card.length === 16) {
    try {
      const res = await fetch(`http://localhost:4001/api/users/card/${card}`);
      const data = await res.json();

      if (res.ok && data.user) {
        receiverName.textContent = `Qabul qiluvchi: ${data.user.fullName}`;
      } else {
        receiverName.textContent = 'Foydalanuvchi topilmadi';
      }
    } catch {
      receiverName.textContent = 'Server bilan bog‘lanishda muammo';
    }
  }
});

// Pul o‘tkazish funksiyasi
async function makeTransfer() {
  const to = toCard.value.trim();
  const transferAmount = parseInt(amount.value);

  // Kiritilgan ma'lumotlarni tekshirish
  if (!to || isNaN(transferAmount) || transferAmount < 1000) {
    alert('To‘g‘ri maʼlumot kiriting (min: 1000)');
    return;
  }

  // Balans tekshiruvi
  if (transferAmount > user.balance) {
    alert("Hisobingizda yetarli mablag‘ mavjud emas");
    return;
  }

  // Tugma bloklash (spam oldini olish)
  transferBtn.disabled = true;

  try {
    const res = await fetch('http://localhost:4001/api/transfer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fromCard: user.cardNumber,
        toCard: to,
        amount: transferAmount
      })
    });

    const data = await res.json();

    if (res.ok && data.success) {
      // Mahalliy ma'lumotlarni yangilash
      user.balance -= transferAmount;
      user.stars += 1000;

      localStorage.setItem('user', JSON.stringify(user));
      balance.textContent = user.balance.toLocaleString();
      stars.textContent = user.stars;

      // Animation chiqish
      transferResult.style.display = 'flex';
      setTimeout(() => {
        transferResult.style.display = 'none';
      }, 2000);

      // Formani tozalash
      amount.value = '';
      toCard.value = '';
      receiverName.textContent = '';
    } else {
      alert(data.message || 'Xatolik yuz berdi');
    }
  } catch {
    alert("Server bilan bog'lanishda muammo yuz berdi");
  } finally {
    transferBtn.disabled = false;
  }
}
