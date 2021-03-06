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
          return res.status(400).json(error.message);
        }
        const newUser = data.rows
        return res.status(201).json(

          {
            status: 201,
            message: 'red-flag created successfully',
            data: {
              
              newUser,

            },
          },
        );
      } catch (error) {
        return res.status(400).json(error.message);
      }
    }  
    update = async (req, res) => {
      const findOneQuery = 'SELECT * FROM entity WHERE id=$1 ';
      const updateOneQuery = `UPDATE entity
       SET createdon=$1, createdby=$2,title=$3,type=$4,location=$5, status= $6, productimage= $7, videos= $8, comment= $9
       WHERE id=$10  returning *`;
      const { files } = req;
      const productImage = files[0].path;
      const videos = files[1].path;
      const createdBy = req.currentuser;
      try {
        const { rows } = await db.execute(findOneQuery, [req.params.id]);
        if (!rows[0]) {
          return res.status(404).json({
            status: 404,
            error: 'red-flag with a given id was not found',
          });
        }

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
          req.params.id,
        ];
        const response = await db.execute(updateOneQuery, values);
        const data = response.rows[0];  
        return res.status(200).json({
          status: 200,
          message: 'red-flag updated succesfully',
          data:{
           data
          }
        });
      } catch (err) {
        return res.status(400).json(err.message);
      }
    }

    getAll = async (req, res) => {
      const findAllQuery = 'SELECT * FROM entity ';
      try {
        const { rows } = await db.execute(findAllQuery);
        return res.status(200).json({ rows });
      } catch (error) {
        return res.status(400).json(error.message);
      }
    }
    getOne = async (req, res) => {
      const text = 'SELECT * FROM entity WHERE id = $1 ';
      try {
        const { rows } = await db.execute(text, [req.params.id]);
        if (!rows[0]) {
          return res.status(404).json({
            status: 404,
            error: 'red-flag with a given ID was not found',
          });
        }
        return res.status(200).json(rows[0]);
      } catch (error) {
        return res.status(400).json(error.message);
      }
    }

    delete = async (req, res) => {
      const deleteQuery = 'DELETE FROM entity WHERE id=$1 returning *';
      try {
        const { rows } = await db.execute(deleteQuery, [req.params.id]);
        if (!rows[0]) {
          return res.status(404).json({
            status: 404,
            error: 'red-flag with a given ID was not found',
          });
        }
        return res.status(200).json({
          status: 200,
          message: 'red-flag has been deleted',
        });
      } catch (error) {
        return res.status(400).json(error.message);
      }
    }
    adminUpdate = async (req, res) => {
      const findOneQuery = 'SELECT * FROM entity WHERE id=$1 ';
      const updateOneQuery = `UPDATE entity
       SET  status= $1
       WHERE id=$2 returning *`;
      try {
        const { rows } = await db.execute(findOneQuery, [req.params.id]);
        if (!rows[0]) {
          return res.status(404).json({
            status: 404,
            error: 'red-flag with a given id was not found',
          });
        }

        const values = [
          req.body.status,
          req.params.id,
        ];
        const response = await db.execute(updateOneQuery, values);
        const data = response.rows[0];  
        return res.status(200).json({
          status: 200,
          message: 'status updated succesfully',
          data:{
           data
          }
        });
      } catch (err) {
        return res.status(400).json(err.message);
      }
    }


}
export default new Register();



