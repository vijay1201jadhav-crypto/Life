let currentCategory = '';
let previousStep = 'step-home';

function navigateTo(stepId) {
  document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
  document.getElementById(stepId).classList.add('active');
}

function openForm(title, placeholder) {
  currentCategory = title;
  previousStep = (title === 'Party & Clubbing' || title === 'Travelling & Explore') ? 'step-enjoy' : 'step-express';
  
  document.getElementById('form-title').innerText = title;
  document.getElementById('form-desc').innerText = placeholder;
  document.getElementById('user-thought').value = '';
  document.getElementById('success-msg').style.display = 'none';

  document.getElementById('form-back-btn').onclick = function() {
    navigateTo(previousStep);
  };

  navigateTo('step-form');
}

async function saveThought() {
  const text = document.getElementById('user-thought').value.trim();
  const submitBtn = document.querySelector('.submit-btn');

  if (!text) {
    alert('कृपया तुमचे काही विचार टाइप करा!');
    return;
  }

  submitBtn.innerText = 'पाठवत आहे...';
  submitBtn.disabled = true;

  // तुमची Access Key इथे यशस्वीरीत्या ॲड केली आहे
  const ACCESS_KEY = '91eae4fa-55a2-4e53-a17a-a9beeecb1845'; 

  const formData = {
    access_key: ACCESS_KEY,
    subject: `नवीन मेसेज आला: ${currentCategory}`,
    category: currentCategory,
    thought: text,
    date: new Date().toLocaleString()
  };

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const result = await response.json();

    if (result.success) {
      document.getElementById('success-msg').style.display = 'block';
      setTimeout(() => {
        navigateTo('step-home');
        submitBtn.innerText = 'शेअर करा ✨';
        submitBtn.disabled = false;
      }, 2000);
    } else {
      alert('काहीतरी चूक झाली, पुन्हा प्रयत्न करा.');
      submitBtn.innerText = 'शेअर करा ✨';
      submitBtn.disabled = false;
    }
  } catch (error) {
    alert('इंटरनेट कनेक्शन तपासा.');
    submitBtn.innerText = 'शेअर करा ✨';
    submitBtn.disabled = false;
  }
}
