const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// @desc Register User
// @privacy public
// @route POST /api/users
const registerUser = asyncHandler(async (req, res) => {
  const { userName, club, fullName, age, phoneNumber, state, email, password } =
    req.body;
  if (!fullName || !email || !password) {
    res.status(400);
    throw new Error('Please add all filed');
  }
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error('User already Exist');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({
    userName,
    club,
    fullName,
    age,
    phoneNumber,
    state,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201);
    res.json({
      user,
      token: generateToken(user._id),
    });
  } else {
    res.status(200);
    throw new Error('Something went wrong');
  }
});

// @desc Login User
// @privacy public
// @route POST /api/users/login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!email || !password) {
    res.status(400);
    throw new Error('Invalid email or password ');
  }

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200);
    res.json({
      user,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  if (!users) {
    res.status(400);
    throw new Error('No User Found!');
  }
  res.json(users);
});

const getUserInfo = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.status(200);
    res.json(user);
  } else {
    res.status(400);
    throw new Error('User not Found!');
  }
});


const updateUser = asyncHandler( async(req, res) => {

  
  const user = await User.findById(req.params.id)
  if (!user) {
    res.status(400)
    throw new Error('User not found!')
  }

  const {
    userName,
    club,
    fullName,
    age,
    phoneNumber,
    state,
    password,
   
  } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const updatedUser = await User.findByIdAndUpdate(req.params.id, {userName, club, fullName, age, phoneNumber, state, password: hashedPassword}, {new: true})
   res.status(200).json(updatedUser)
   

})

// @desc Get  Userdate
// @privacy public
// @route POST /api/users
const getMe = asyncHandler(async (req, res) => {
  const { name, email, _id } = await User.findById(req.user.id);
  res.status(200);
  res.json({
    id: _id,
    name,
    email,
  });
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = {
  registerUser,
  loginUser,
  getUsers,
  getUserInfo,
  getMe,
  updateUser
};
