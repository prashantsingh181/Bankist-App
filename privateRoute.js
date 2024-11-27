import { accounts } from './accounts.js';

let currentAccount = sessionStorage.getItem('account');
if (currentAccount) {
  try {
    currentAccount = JSON.parse(currentAccount);
  } catch (error) {
    console.error(error);
    currentAccount = null;
  }
}

if (
  !currentAccount ||
  accounts.findIndex(
    account =>
      account.username === currentAccount.username &&
      account.pin === Number(currentAccount.pin)
  ) === -1
) {
  window.location.href = 'login.html';
}
