// Define constants
const timeout = 3000; // timeout of error in ms
const decimals = 2; // number of decimals to display in results
const amount = document.getElementById('amount');
const interest = document.getElementById('interest');
const years = document.getElementById('years');

document.getElementById('loan-form').addEventListener('submit', function (e) {
    if (amount.value == '' || interest.value == '' || years.value == '') {
        showError('Please check your numbers.');
    } else {
        // Hide results
        document.getElementById('results').style.display = 'none';
        document.querySelector('h5').style.display = 'none';

        // Show loader
        document.getElementById('loading').style.display = 'block';
        setTimeout(calculatePayments, timeout);
    }

    e.preventDefault();
});

function calculatePayments() {
    // Get UI constants
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    // Define formula constants
    const principal = parseFloat(amount.value);
    const calcInterest = parseFloat(interest.value) / 1200; // 100 percent * 12 months
    const calcPayments = parseFloat(years.value) * 12; // 12 months

    // Calculate monthly payment
    const x = Math.pow(1 + calcInterest, calcPayments);
    const monthly = (principal * x * calcInterest) / (x - 1);

    // Validate
    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(decimals);
        totalPayment.value = (monthly * calcPayments).toFixed(decimals);
        totalInterest.value = ((monthly * calcPayments) - principal).toFixed(decimals);
        document.getElementById('results').style.display = 'block';
        document.querySelector('h5').style.display = 'block';
    } else {
        showError('Please check your numbers.');
    }
    console.log(isFinite(monthly));

    document.getElementById('loading').style.display = 'none';
}

function showError(message) {
    console.log('hello');
    // Create div
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger';

    // Add error text
    errorDiv.appendChild(document.createTextNode(message));

    // Insert above 'Loan Calculator'
    // Define constants to get where we want it to go
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    // Insert
    card.insertBefore(errorDiv, heading);

    // Add timeout after timeout seconds
    setTimeout(clearError, timeout);
}

function clearError() {
    document.querySelector('.alert').remove();
}