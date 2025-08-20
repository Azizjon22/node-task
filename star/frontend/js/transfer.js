// Elementlarni olish
const user = JSON.parse(localStorage.getItem('user'));
const welcome = document.getElementById('welcome');
const balance = document.getElementById('balance');
const stars = document.getElementById('stars');
const receiverName = document.getElementById('receiverName');
const toCard = document.getElementById("toCard");
const amount = document.getElementById("amount");
const transferResult = document.getElementById("transferResult");

// Foydalanuvchi yo‘q bo‘lsa — login sahifasiga
if (!user) {
  window.location.href = 'login.html';
}

// Sahifani foydalanuvchi bilan to‘ldirish
welcome.textContent = `Xush kelibsiz, ${user.fullName}`;
balance.textContent = user.balance.toLocaleString();
stars.textContent = user.stars;

// Karta raqami inputga yozilsa — qabul qiluvchini tekshirish
toCard.addEventListener('input', async (e) => {
  const card = e.target.value.trim();
  if (card.length === 16) {
    try {
      const res = await fetch(`http://localhost:4001/api/users/card/${card}`);
      const data = await res.json();
      if (res.ok && data.user) {
        receiverName.textContent = `Qabul qiluvchi: ${data.user.fullName}`;
      } else {
        receiverName.textContent = 'Foydalanuvchi topilmadi';
      }
    } catch (err) {
      receiverName.textContent = 'Xatolik yuz berdi';
    }
  } else {
    receiverName.textContent = '';
  }
});

// Pul o‘tkazmasini bajarish funksiyasi
async function makeTransfer() {
  const to = toCard.value.trim();
  const transferAmount = parseInt(amount.value);

  // Minimal va to‘g‘ri tekshiruv
  if (!to || to.length !== 16 || isNaN(transferAmount) || transferAmount < 1000) {
    alert('Iltimos, karta raqamini va to‘g‘ri miqdorni kiriting (min 1000)');
    return;
  }

  // Serverga so‘rov yuborish
  try {
    const res = await fetch('http://localhost:4001/api/transfer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fromCard: user.cardNumber,
        toCard: to,
        amount: transferAmount
      })
    });

    const data = await res.json();

    if (res.ok) {
      // Balans va yulduz yangilash
      user.balance -= transferAmount;
      user.stars += 1000;
      localStorage.setItem('user', JSON.stringify(user));
      balance.textContent = user.balance.toLocaleString();
      stars.textContent = user.stars;

      // Natijani ko‘rsatish
      transferResult.textContent = `✔ Pul muvaffaqiyatli yuborildi!`;
      transferResult.style.display = 'flex';
      transferResult.style.color = 'gold';

      setTimeout(() => {
        transferResult.style.display = 'none';
        toCard.value = '';
        amount.value = '';
        receiverName.textContent = '';
      }, 2000);
    } else {
      alert(data.message || "Pul o'tkazishda xatolik");
    }

  } catch (err) {
    alert("Server bilan bog'lanishda muammo yuz berdi");
  }
}
