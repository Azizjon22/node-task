const langs = {
    uz: {
      title: "💱 Valyuta Konvertor",
      btn: "Konvertatsiya",
      err: "Iltimos, miqdorni to'g'ri kiriting.",
      fail: "Xatolik yuz berdi. Internet aloqangizni tekshiring.",
    },
    en: {
      title: "💱 Currency Converter",
      btn: "Convert",
      err: "Please enter a valid amount.",
      fail: "An error occurred. Check your internet connection.",
    },
    ru: {
      title: "💱 Конвертер Валют",
      btn: "Конвертировать",
      err: "Пожалуйста, введите допустимую сумму.",
      fail: "Произошла ошибка. Проверьте подключение к интернету.",
    },
    ar: {
      title: "💱 محول العملات",
      btn: "تحويل",
      err: "يرجى إدخال مبلغ صالح.",
      fail: "حدث خطأ. تحقق من اتصالك بالإنترنت.",
    }
  };
  
  function setLanguage(lang) {
    document.getElementById("title").textContent = langs[lang].title;
    document.getElementById("btn").textContent = langs[lang].btn;
    document.body.dir = lang === "ar" ? "rtl" : "ltr";
    localStorage.setItem("lang", lang);
  }
  
  async function convert() {
    const amount = document.getElementById("amount").value;
    const from = document.getElementById("from").value;
    const to = document.getElementById("to").value;
    const resultDiv = document.getElementById("result");
    const lang = localStorage.getItem("lang") || "uz";
  
    if (!amount || isNaN(amount)) {
      resultDiv.innerHTML = langs[lang].err;
      return;
    }
  
    try {
      const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
      const data = await res.json();
      const rate = data.rates[to];
      const result = (amount * rate).toFixed(2);
      resultDiv.innerHTML = `${amount} ${from} = ${result} ${to}`;
    } catch (err) {
      resultDiv.innerHTML = langs[lang].fail;
    }
  }
  
  window.onload = () => {
    const savedLang = localStorage.getItem("lang") || "uz";
    document.getElementById("lang").value = savedLang;
    setLanguage(savedLang);
  };
  