// Data
const account1 = {
  id: 1,
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2,
  username: 'js',
  pin: 1111,
};

const account2 = {
  id: 2,
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  username: 'jd',
  pin: 2222,
};

const account3 = {
  id: 3,
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  username: 'stw',
  pin: 3333,
};

const account4 = {
  id: 4,
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  username: 'ss',
  pin: 4444,
};

export const accounts = [account1, account2, account3, account4];

export function removeAccount(accountId) {
  const index = accounts.findIndex(account => account.id === accountId);
  if (index !== -1) {
    accounts.splice(index, 1);
  }
}
