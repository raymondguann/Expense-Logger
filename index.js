const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const date = document.getElementById('date');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const expense_el = document.querySelector('#btn-expense');
const income_el = document.querySelector('#btn-income');


const localStorageTransactions = JSON.parse(
  localStorage.getItem('transactions')
);

let transactions =
  localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

// either button is clicked, triggers respective event handler function: addExpenseTransaction for expenses and addIncomeTransaction for income

if (expense_el.addEventListener('click', addExpenseTransaction)) {
    alert('expense');
}
if (income_el.addEventListener('click', addIncomeTransaction)) {
    alert('income');
}

// Expense Transaction Handler

function addExpenseTransaction(e) {
  e.preventDefault();
  // checks if the input fields (date, text, amount) are not empty
  if (date.value.trim() == '' || text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please add transaction date, name and expense amount');
  } else {
    const expense_el = {
      id: generateID(),
      date: date.value,
      text: text.value,
      amount: -amount.value
    };

    // create expense object

    transactions.push(expense_el);

    addTransactionDOM(expense_el);

    updateValues();

    updateLocalStorage();

    // adds it to transactions array, updates the DOM, updates the balance and expense values, updates local storage 

    date.value = '';
    text.value = '';
    amount.value = '';

    // clear input field 
  }
}

// Income Transaction Handler

function addIncomeTransaction(e) {
    e.preventDefault();
    // checks if the input fields (date, text, amount) are not empty
    if (date.value.trim() == '' || text.value.trim() === '' || amount.value.trim() === '') {
      alert('Please add transaction date, name and income amount');
    } else {
      const income_el = {
        id: generateID(),
        date: date.value,
        text: text.value,
        amount: +amount.value
      };

      // create income object
  
      transactions.push(income_el);
  
      addTransactionDOM(income_el);
  
      updateValues();
  
      updateLocalStorage();

      // update transaction, DOM, balance and income values,local storage 
      // (amount: positive instead of negative, income)
  
      date.value = '';
      text.value = '';
      amount.value = '';

      // clear input field
    }
  }


// generate random ID
function generateID() {
    return Math.floor(Math.random() * 100000000);
}

// Add transactions to DOM list
function addTransactionDOM(transaction) {
    // Get sign 
    const sign = transaction.amount < 0 ? '-' : '+';
  
    const item = document.createElement('li');
  
    // Add class based on value / sign 
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    item.innerHTML = `
      <span style="margin-right: 5px;">${transaction.date}</span>
      <span style="margin-right: 100px;">${transaction.text}</span> <span>${sign}${Math.abs(
        transaction.amount
    )}</span> <button class="delete-btn" onclick="removeTransaction(${
      transaction.id
    })">x</button>
    `;
  
    list.appendChild(item);
}

// Update balance, income and expense
function updateValues() {
  const amounts = transactions.map(transaction => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = (
    amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  balance.innerText = `$${total}`;
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expense}`;
}

// Remove transaction by ID
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
  
    updateLocalStorage();
  
    init();
}

// Update local storage transactions
function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

function init() {
  list.innerHTML = '';

  transactions.forEach(addTransactionDOM);

  updateValues();
}

init();

form.addEventListener('submit', addTransaction);