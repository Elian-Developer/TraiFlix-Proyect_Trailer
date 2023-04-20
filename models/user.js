const { Schema, model} = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    name:{
        type: String,
        require: true,
        trim: true
    },

    email: {
        type: String,
        unique: true,
        require:true,
        trim: true
    },

    password: {
        type: String,
        require: true,
        trim: true
    }
}, {
    timestamps: true
});

// Method to Encrypting password
userSchema.methods.encryptPassword = async (password) => {
     const salt = await bcrypt.genSalt(10);
     return await bcrypt.hash(password, salt)
};

//Method to compare password introduced with password hashed in DB
userSchema.methods.matchPassword = async function (password) {
   return await bcrypt.compare(password, this.password)
}



module.exports = model('User', userSchema);

