
export const mocks = {
  wrongLodin: {
    email: 'izabayojonas@gmail.com',
    password: 'jonas1239',
  },
  emptyUser: {
    email: '',
    password: '',
  },
  logUser: {
    email: 'izabayojonas@gmail.com',
    password: 'jonas123',
  },
  newUser: {
    firstName: 'izabayo',
    lastName: 'jonas',
    email: 'izabayojonas@gmail.com',
    password: 'jonas123',
    username: 'izabayojonas',
    phoneNumber: '0785208449',
  },
  wrongUser: {
    firstName: '',
    lastName: 'jonas',
    email: 'izabayojonas@gmail.com',
    password: 'jonas123',
    username: 'izabayojonas',
    phoneNumber: '0785208449',
  },
  invalidUser: {
    firstName: 'izabayo',
    lastName: 'jonas',
    email: 'amakuru@gmail.com',
    password: 'jonas123',
    username: 'izabayojonas',
    phoneNumber: '0785208449',
  },
};

export const text = `INSERT INTO users (id, firstName, lastName, email, password, username, phoneNumber)
VALUES ($1, $2, $3, $4, $5, $6, $7)
RETURNING *`;
export const values = [
  20,
  'testtoken',
  'izabayotoken',
  'izabayotoken@gmail.com',
  'kigalitoken',
  'jonastoken',
  '0785675898',
];

export const entitytext = `INSERT INTO entity(id, createdon,  createdby,  title, type, location, status,productimage, videos, comment)
 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
 RETURNING *`;

export const entityValues = [
  1,
  '2019/12/05 23:08:33',
  'testtoken',
  'flood in kirehe',
  'red-flag',
  '-1.23345756, 2.5677888',
  'pending',
  'we want you to intervene',
  'upload572e2fd2fcd41d7f9bebc694d6831427',
  'uploadf2e33d1b41d847cf2be850cb17b6ffdb',
];
