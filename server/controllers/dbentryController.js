import date from 'date-and-time';
import db from '../models/db';


const now = new Date();
const currentDate = date.format( now, 'YYYY/MM/DD HH:mm:ss' );

class Register {
    create = async (req, res) => {
      const text = `INSERT INTO entity( createdon,  createdby,  title, type, location, status,productimage, videos, comment)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8,$9 )
     RETURNING *`;
      const { files } = req;
      const productImage = files[0].path;
      const videos = files[1].path;
      const createdBy = req.currentuser;
      const values = [

        currentDate,
        createdBy,
        req.body.title,
        req.body.type,
        req.body.location,
        req.body.status,
        req.body.comment,

        productImage,
        videos,

      ];
      try {
        const data = await db.execute(text, values);

        if (!data) {
          return res.status(400).send( error.message );
        }
        const newUser = data.rows;


        return res.status(201).send(

          {
            status: 201,
            message: 'red-flag created successfully',
            data: {
              
              newUser,

            },
          },
        );
      } catch (error) {
        return res.status(400).send(error.message);
      }
    }

   
}
export default new Register();
