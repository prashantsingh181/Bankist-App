// Data
const account1 = {
  id: 1,
  owner: 'Prashant Singh',
  movements: [
    { value: 2000, date: '04/17/2025' },
    { value: 110, date: '04/25/2025' },
    { value: -298, date: '05/02/2025' },
    { value: -200, date: '05/07/2025' },
    { value: -650, date: '05/10/2025' },
    { value: 492, date: '05/15/2025' },
    { value: 70, date: '05/19/2025' },
    { value: 1300, date: '05/22/2025' },
  ],
  interestRate: 1.2,
  username: 'ps',
  pin: 1111,
};

const account2 = {
  id: 2,
  owner: 'Nishita Bisht',
  movements: [
    { value: 5000, date: '04/11/2025' },
    { value: 3400, date: '04/21/2025' },
    { value: -150, date: '04/29/2025' },
    { value: -790, date: '05/05/2025' },
    { value: -3210, date: '05/10/2025' },
    { value: -1000, date: '05/14/2025' },
    { value: 8500, date: '05/19/2025' },
    { value: -30, date: '05/22/2025' },
  ],
  interestRate: 1.5,
  username: 'ns',
  pin: 2222,
};

const account3 = {
  id: 3,
  owner: 'Himanshu Pandey',
  movements: [
    { value: 200, date: '04/17/2025' },
    { value: -200, date: '04/25/2025' },
    { value: 340, date: '05/01/2025' },
    { value: -300, date: '05/06/2025' },
    { value: -20, date: '05/10/2025' },
    { value: 50, date: '05/13/2025' },
    { value: 400, date: '05/18/2025' },
    { value: -460, date: '05/22/2025' },
  ],
  interestRate: 0.7,
  username: 'hp',
  pin: 3333,
};

const account4 = {
  id: 4,
  owner: 'Amit Kumar',
  movements: [
    { value: 430, date: '04/29/2025' },
    { value: 1000, date: '05/08/2025' },
    { value: 700, date: '05/15/2025' },
    { value: 50, date: '05/19/2025' },
    { value: 90, date: '05/22/2025' },
  ],
  interestRate: 1,
  username: 'ak',
  pin: 4444,
};

export const accounts = [account1, account2, account3, account4];

export function removeAccount(accountId) {
  const index = accounts.findIndex(account => account.id === accountId);
  if (index !== -1) {
    accounts.splice(index, 1);
  }
}
