import bcrypt from "bcryptjs";

const Helper= {
    hashPassword(password) {
        return bcrypt.hashSync(password,10 )
      },
    }

    export default Helper;