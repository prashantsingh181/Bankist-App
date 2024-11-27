'use strict';
import { accounts } from './accounts.js';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');
const btnLogout = document.querySelector('.btn--logout');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const formLogin = document.querySelector('form.login');
const formTransfer = document.querySelector('.form--transfer');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
const currentUser = sessionStorage.getItem('account');
let currentAccount = accounts.find(
  account =>
    account.username === currentUser.username && account.pin === currentUser.pin
);

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
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

function handleTransfer(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
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
    account => account.username === formObject.username
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
}

function handleLogout() {
  sessionStorage.removeItem('account');
  window.location.href = 'login.html';
}

formTransfer.addEventListener('submit', handleTransfer);
btnLogout.addEventListener('click', handleLogout);

function updateUserUI(account) {
  displayMovements(account.movements);
  displayCalcBalance(account);
  displayCalcSummary(account);
  containerApp.style.opacity = 1;
}

function displayMovements(movements) {
  containerMovements.innerHTML = '';
  movements.forEach((movement, index) => {
    const type = movement < 0 ? 'withdrawal' : 'deposit';
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      index + 1
    } ${type}</div>
        <div class="movements__date">3 days ago</div>
        <div class="movements__value">${movement}</div>
      </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}

function displayCalcBalance(account) {
  account.balance = movements.reduce(
    (accumulator, movement) => accumulator + movement
  );
  labelBalance.textContent = `${account.balance}€`;
}

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
    { deposit: 0, withdrawal: 0, interest: 0 }
  );
  labelSumIn.textContent = `${deposit}€`;
  labelSumOut.textContent = `${withdrawal}€`;
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
}
