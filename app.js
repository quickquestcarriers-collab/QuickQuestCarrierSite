document.getElementById('feedbackForm').addEventListener('submit', function(e) {
  e.preventDefault();
  let name = document.getElementById('name').value.trim();
  let email = document.getElementById('email').value.trim();
  let message = document.getElementById('message').value.trim();
  if (!name || !email || !message) {
    alert('कृपया सर्व आवश्यक क्षेत्रे भरा.');
    return;
  }
  document.getElementById('formMessage').textContent = 'आपला अभिप्राय आम्हाला मिळाला आहे, धन्यवाद!';
  this.reset();
});