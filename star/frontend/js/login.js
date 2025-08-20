const form = document.getElementById('loginForm');
const loading = document.getElementById('loading');
const error = document.getElementById('error');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // UI: yuklanmoqda ko'rsatish, xatoni tozalash
  loading.style.display = 'block';
  error.textContent = '';

  // Formadagi qiymatlarni olish
  const formData = new FormData(form);
  const fullName = formData.get('fullName').trim();
  const email = formData.get('email').trim();
  const password = formData.get('password').trim();
  const cardNumber = formData.get('cardNumber').trim();

  // Input tekshiruv (client side validation)
  if (!fullName || !email || !password || cardNumber.length !== 16) {
    error.textContent = "Iltimos, barcha maydonlarni to‘g‘ri to‘ldiring";
    loading.style.display = 'none';
    return;
  }

  const userData = { fullName, email, password, cardNumber };

  try {
    const res = await fetch('http://localhost:4001/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || 'Ro‘yxatdan o‘tishda xatolik');
    }

    // localStorage ga userni yozish
    localStorage.setItem('user', JSON.stringify(result.user));

    // Redirect qilishdan oldin loadingni ko‘rsatish uchun kechikish
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1000);

  } catch (err) {
    error.textContent = err.message;
  } finally {
    loading.style.display = 'none';
  }
});
