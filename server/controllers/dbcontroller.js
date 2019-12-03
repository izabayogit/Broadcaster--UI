import db from '../models/db';
import generateToken from '../helpers/token';

import Helper from '../helpers/hash';


class Register {
   create = async (req, res) => {
    const hashPassword = Helper.hashPassword(req.body.password);
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

  
}

export default new Register();
