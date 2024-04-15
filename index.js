document.getElementById('submitButton').addEventListener('click', function(e) {
  e.preventDefault();

  document.getElementById('errorMessages').innerHTML = '';

  let income = parseFloat(document.getElementById('income').value) || 0;
  let extraIncome = parseFloat(document.getElementById('extraIncome').value) || 0;
  let deductions = parseFloat(document.getElementById('deductions').value) || 0;
  let age = document.getElementById('age').value;

  let errors = [];
  if (isNaN(income)) {
    errors.push('Gross Annual Income must be a valid number.');
  }
  if (age === '') {
    errors.push('Age is required.');
  }

  if (errors.length > 0) {
    let errorHtml = '<ul>';
    errors.forEach(error => {
      errorHtml += `<li>${error}</li>`;
    });
    errorHtml += '</ul>';
    document.getElementById('errorMessages').innerHTML = errorHtml;
    return;
  }

  let tax = 0;
  let taxableIncome = income + extraIncome - deductions;
  if (taxableIncome > 800000) {
    if (age === '<40') {
      tax = 0.3 * (taxableIncome - 800000);
    } else if (age === '40-59') {
      tax = 0.4 * (taxableIncome - 800000);
    } else {
      tax = 0.1 * (taxableIncome - 800000);
    }
  }

  let overallIncome = taxableIncome - tax;

  document.getElementById('taxResult').textContent = `After tax deduction, your overall income will be ${overallIncome.toLocaleString()}.`;
  document.getElementById('modal').style.display = 'block';
});

document.getElementById('closeButton').addEventListener('click', function() {
  document.getElementById('modal').style.display = 'none';
});



