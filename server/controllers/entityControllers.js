import date from 'date-and-time';
import UserEntity from '../models/entity';


const entityArray = [{
  id: 1,
  createdOn: '2019/11/19 19:45:58',
  createdBy: 1,
  title: 'corruption problem in kigali',
  type: 'intervention',
  location: '-1.649520, 29.796789',
  status: 'under investigation',
  comment: 'we need help to solve the issue',
},
{
  id: 2,
  createdOn: '2019/11/19 19:45:58',
  createdBy: 1,
  title: 'corruption problem in kigali',
  type: 'red-flag',
  location: '-1.649520, 29.796789',
  status: 'under investigation',
  comment: 'we need help to solve the issue',
}];
class Entity {
 createEntity = ( req, res) => {
   try {
     
    const id = entityArray.length + 1;
    const now = new Date();
    const currentDate = date.format( now, 'YYYY/MM/DD HH:mm:ss' );
    const createdBy = req.currentuser;
    const {
      title, type, location, status, comment,
    } = req.body;
    const { files } = req;
    const productImage = files[0].path;
    const videos = files[1].path;
    const addedEntity = new UserEntity( id, currentDate, createdBy, title, type, location, status, productImage, videos, comment );
    entityArray.push( addedEntity );
    return res.status( 201 ).send( {
      status: 201,
      message: 'entity created succesfully',
      data: {
        id: addedEntity,
      },
 
    } );
   } catch (error) {
    return res.status( 500 ).send( {
      status: 500,
      error: `error ${error}`,
    } );
   }
   
 }

  getall = ( req, res ) => {
    if ( entityArray.length < 1 ) {
      return res.status( 201 ).send( {
        status: 201,
        error: 'you do not have any entry',
      } );
    }
    return res.status( 201 ).send( {
      status: 201,
      data: entityArray,
    } );
  }

  
  getOne = ( req, res ) => {
    const idnumber = req.params.id;
    const checkEntry = entityArray.find( ( entity ) => entity.id == idnumber );
    if ( checkEntry ) {
      return res.status( 302 ).send( {
        status: 302,
        data: checkEntry,
      } );
    }
    return res.status( 404 ).send( {
      status: 404,
      error: 'not found',
    } );
  }
  deleteEntry = (id) => {
    const index = entityArray.indexOf(id);
    entityArray.splice(index, 1);
    return {};
  }
 
  delete = (req, res) => {
    const Id = req.params.id;
    const checkEntry = entityArray.find( ( entity ) => entity.id == Id );
    if (checkEntry) {
      this.deleteEntry(Id);
      return res.status( 200 ).send( {
        status: 200,
        data: {
          Id,
          message: 'red-flag record has been deleted',
        },
      } );
    }
    return res.status(404).send({
      status: 404,
      error: 'entity not found',
    });
  }
  update = (id) => {
    const checkEntry = entityArray.find( ( entity ) => entity.id == id );
     const index = entityArray.indexOf(checkEntry);
     return entityArray[index];
   }
   editComment = (req, res) => {
    const idnumber = req.params.id;
    const updated = this.update(idnumber);
    if ( !updated) {
      return res.status( 404 ).send( {
        status: 404,
        error: 'not found',
      } );
    }
  
    updated.comment = req.body.comment;
    const { id } = updated;
    
    return res.status( 404 ).send( {
      status: 200,
      id,
      message:  updated,
    } );
  }
}
export default new Entity();
