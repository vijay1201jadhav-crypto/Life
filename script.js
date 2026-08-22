async function saveThought() {
  const text = document.getElementById('user-thought').value.trim();
  if (!text) {
    alert('कृपया तुमचे काही विचार टाइप करा!');
    return;
  }

  const submitBtn = document.querySelector('.submit-btn');
  submitBtn.innerText = 'पाठवत आहे...';
  submitBtn.disabled = true;

  // Web3Forms API द्वारे थेट तुमच्या ईमेलवर डेटा पाठवणे
  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key: "YOUR_ACCESS_KEY_HERE", // <-- इथे तुझी Access Key टाक
      subject: `नवीन विचार: ${currentCategory}`,
      category: currentCategory,
      message: text
    }),
  });

  const result = await response.json();

  if (result.success) {
    document.getElementById('success-msg').style.display = 'block';
    setTimeout(() => {
      submitBtn.innerText = 'शेअर करा ✨';
      submitBtn.disabled = false;
      navigateTo('step-home');
    }, 2000);
  } else {
    alert('काहीतरी चूक झाली, पुन्हा प्रयत्न करा.');
    submitBtn.innerText = 'शेअर करा ✨';
    submitBtn.disabled = false;
  }
}
