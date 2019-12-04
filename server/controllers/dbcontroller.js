import db from '../models/db';
import generateToken from '../helpers/token';


class Register {
   create = async (req, res) => {
     const text = `INSERT INTO users ( firstName, lastName, email, password, username, phoneNumber)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *`;
     const values = [
       req.body.firstName,
       req.body.lastName,
       req.body.email,
       req.body.password,
       req.body.username,
       req.body.phoneNumber,
     ];

     try {
       const data = await db.execute(text, values);
       if (data.routine === '_bt_check_unique') {
         return res.status(409).send(
           {
             status: 409,
             error: data.detail,
           },
         );
       }
       const newUser = data.rows[0];
       const tokenData = generateToken( newUser.id, newUser.email );
       const { password, ...finalUser } = newUser;

       return res.status(201).send(
         {
           status: 201,
           message: 'user created successfully',
           data: {
             tokenData,
             ...finalUser,
           },
         },
       );
     } catch (error) {
       return res.status(400).send(error);
     }
   }

   // eslint-disable-next-line class-methods-use-this
   async login(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({ message: 'Some values are missing' });
    }

    const text = 'SELECT * FROM users WHERE email = $1 AND password= $2';
    try {
      const { rows } = await db.execute(text, [req.body.email, req.body.password]);

      const token = generateToken( rows[0].id, rows[0].email );
      if (!rows) {
        return res.status(400).send({ message: 'The credentials you provided is incorrect' });
      }
      return res.status(200).send({
        status: 200,
        message: 'user loged in successfully',
        data: {
          token,
        },
      });
    } catch (error) {
      return res.status(401).send({
        status: 401,
        error: 'incorrect email or password',
      });
    }
  }
}

export default new Register();
