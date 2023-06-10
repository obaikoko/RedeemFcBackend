const mongoose = require('mongoose');
mongoose.set('strictQuery', true); 

const userSchema = mongoose.Schema(
  {
    club: {
      type: String,
    },
    desc: {
      type: String,
    },
    userName: {
      type: String,
      // required: [true, 'Please add your user name'],
    },
    fullName: {
      type: String,
      required: [true, 'please add your name '],
    },
    age: {
      type: String,
      // required: [true, 'Please add a last name'],
    },
    image: {
      publicId: {
        type: String,
      },
      url: {
        type: String,
      },
      name: {
        type: String,
      },
     
    },
    phoneNumber: {
      type: String,
      // required: [true, 'Please add a phone number'],
    },
    state: {
      type: String,
      // required: [true, 'Please add your state'],
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Please add an email'],
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
