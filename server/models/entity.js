class UserEntity {
  constructor( id, createdOn, createdBy, title, type, location, status, productImage, videos, comment ) {
    this.id = id;
    this.createdOn = createdOn;
    this.createdBy = createdBy;
    this.title = title;
    this.type = type;
    this.location = location;
    this.status = status;
    this.productImage = productImage;
    this.videos = videos;
    this.comment = comment;
  }
}

export default UserEntity;
