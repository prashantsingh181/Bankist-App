'use strict';
import { accounts, removeAccount } from './accounts.js';

// BANKIST APP

const SESSION_TIME = 600;

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');
const containerMovements = document.querySelector('.movements');
const btnSort = document.querySelector('.btn--sort');
const btnLogout = document.querySelector('.btn--logout');
const formTransfer = document.querySelector('.form--transfer');
const formLoan = document.querySelector('.form--loan');
const formClose = document.querySelector('.form--close');

let currentUser;
let interval;
let totalTime = SESSION_TIME;
let sorted = false;

try {
  currentUser = JSON.parse(sessionStorage.getItem('account'));
} catch (error) {
  console.error(error);
  currentUser = null;
}

let currentAccount = accounts.find(
  account =>
    account.username === currentUser.username &&
    account.pin === Number(currentUser.pin),
);

if (!currentAccount) {
  window.location.href = 'login.html';
}

/////////////////////////////////////////////////

// function computeUsername(fullName) {
//   return fullName
//     .split(' ')
//     .map(name => name[0].toLowerCase())
//     .join('');
// }

// const accountsWithUsername = accounts.map(account => ({
//   ...account,
//   username: computeUsername(account.owner),
// }));

// handle submission of transfer form
function handleTransfer(e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const formObject = Object.fromEntries(formData.entries());

  if (!formObject.username || !formObject || formObject.amount <= 0) {
    return alert('Please enter valid information.');
  }
  if (!currentAccount) {
    return alert('Please Login First.');
  }

  if (currentAccount.balance < Number(formObject.amount)) {
    return alert('Insufficient funds.');
  }

  const transferAccount = accounts.find(
    account => account.username === formObject.username,
  );

  if (!transferAccount) {
    return alert('Invalid account.');
  }
  if (transferAccount.username === currentAccount.username) {
    return alert('You cannot transfer money to yourself.');
  }

  currentAccount.movements.push(-Number(formObject.amount));
  transferAccount.movements.push(Number(formObject.amount));
  updateUserUI(currentAccount);
  totalTime = SESSION_TIME;
  form.reset();
  alert(
    `Transfer of ${formObject.amount}€ to ${transferAccount.owner} successful.`,
  );
}

// handle submission of loan form
function handleLoan(e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const formObject = Object.fromEntries(formData.entries());
  const loanAmount = Number(formObject.amount);
  if (!loanAmount || loanAmount <= 0) {
    return alert('Please enter a valid amount.');
  }
  const isEligible = currentAccount.movements.some(
    movement => movement >= loanAmount * 0.1,
  );

  if (!isEligible) {
    alert('Loan amount should not exceed 10% of maximum transaction amount.');
  }
  currentAccount.movements.push(loanAmount);
  updateUserUI(currentAccount);
  totalTime = SESSION_TIME;
  form.reset();
  alert('Loan approved.');
}

// handle submission of close account form
function handleClose(e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const formObject = Object.fromEntries(formData.entries());
  const { username, pin } = formObject;

  // validation check
  if (!username || !pin) {
    return alert('Please enter all information.');
  }
  if (isNaN(Number(pin))) {
    return alert('Pin should be a number.');
  }

  // check if username and pin are valid, alert if not
  if (
    currentAccount.username !== username ||
    currentAccount.pin !== Number(pin)
  ) {
    return alert('Invalid username or pin.');
  }

  removeAccount(currentAccount.id);

  alert('Account closed successfully.');
  form.reset();
  handleLogout();
}

function handleLogout() {
  sessionStorage.removeItem('account');
  window.location.href = 'login.html';
}

// function to display movements in the UI
function displayMovements(movements, sorted = false) {
  containerMovements.innerHTML = '';

  const movs = sorted ? movements.slice().sort((a, b) => a - b) : movements;
  movs.forEach((movement, index) => {
    const type = movement < 0 ? 'withdrawal' : 'deposit';
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
          index + 1
        } ${type}</div>
        <div class="movements__date">${index + 3} days ago</div>
        <div class="movements__value">${movement}€</div>
      </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}

// function to calculate and display balance of account
function displayCalcBalance(account) {
  account.balance = currentAccount.movements.reduce(
    (accumulator, movement) => accumulator + movement,
  );
  labelBalance.textContent = `${account.balance}€`;
}

// function to calculate and display summary of deposits, withdrawals, and interest
function displayCalcSummary(account) {
  const { deposit, withdrawal, interest } = account.movements.reduce(
    (acc, movement) => {
      if (movement > 0) {
        const interestAmount = (movement * account.interestRate) / 100;
        return {
          ...acc,
          deposit: acc.deposit + movement,
          interest:
            interestAmount >= 1 ? acc.interest + interestAmount : acc.interest,
        };
      } else {
        return { ...acc, withdrawal: acc.withdrawal + Math.abs(movement) };
      }
    },
    { deposit: 0, withdrawal: 0, interest: 0 },
  );
  labelSumIn.textContent = `${deposit}€`;
  labelSumOut.textContent = `${withdrawal}€`;
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
}

function updateUserUI(account) {
  displayMovements(account.movements);
  displayCalcBalance(account);
  displayCalcSummary(account);
  labelWelcome.innerText = `Welcome, ${currentAccount.owner}`;
  labelDate.innerText = new Date().toLocaleString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  });
}

function init() {
  updateUserUI(currentAccount);
  interval = setInterval(() => {
    totalTime--;
    if (totalTime <= 0) {
      clearInterval(interval);
      alert('Session expired. Please login again.');
      handleLogout();
    }
    const minutes = String(Math.floor(totalTime / 60)).padStart(2, '0');
    const seconds = String(totalTime % 60).padStart(2, '0');
    labelTimer.textContent = `${minutes}:${seconds}`;
  }, 1000);
}
formTransfer.addEventListener('submit', handleTransfer);
formLoan.addEventListener('submit', handleLoan);
formClose.addEventListener('submit', handleClose);
btnLogout.addEventListener('click', handleLogout);
btnSort.addEventListener('click', () => {
  sorted = !sorted;
  displayMovements(currentAccount.movements, sorted);
});

init();
