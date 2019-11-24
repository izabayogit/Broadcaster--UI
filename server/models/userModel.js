class User {
  constructor( id, firstName, lastName, email, password, username, phoneNumber, isAdmin ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.username = username;
    this.phoneNumber = phoneNumber;
    this.isAdmin = isAdmin;
  }
}
export default User;
