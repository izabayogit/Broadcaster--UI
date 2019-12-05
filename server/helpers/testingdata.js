
export const mocks ={
    wrongLodin:{
        email: 'izabayojonas@gmail.com',
        password: 'jonas1239',
    },
    emptyUser:{
        email: '',
        password: '',
    },
    logUser:{
        email: 'izabayojonas@gmail.com',
        password: 'jonas123',   
    },
    newUser:{
        firstName: 'izabayo',
        lastName: 'jonas',
        email: 'izabayojonas@gmail.com',
        password: 'jonas123',
        username: 'izabayojonas',
        phoneNumber: '0785208449',
    },
    wrongUser:{
        firstName: '',
        lastName: 'jonas',
        email: 'izabayojonas@gmail.com',
        password: 'jonas123',
        username: 'izabayojonas',
        phoneNumber: '0785208449',   
    },
    invalidUser:{
        firstName: 'izabayo',
        lastName: 'jonas',
        email: 'amakuru@gmail.com',
        password: 'jonas123',
        username: 'izabayojonas',
        phoneNumber: '0785208449',
    }
}

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

