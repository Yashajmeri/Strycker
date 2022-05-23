const HttpError = require("../../module/http-error");
const { validationResult } = require("express-validator");
const User = require("../../module/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getUser = async (req, res, next) => {
  let users;

  try {
    users = await User.find({}, "-password");
  } catch (err) {
    return next(new HttpError("could not find the user", 500));
  }

  res.json({ users: users.map((u) => u.toObject({ getters: true })) });
};
// ///////////////////////////////////////////////////////
const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors); // its an object
    return next(new HttpError("Invalid inputs passed!", 422));
  }
  const { name, email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return next(
      new HttpError("signing up failed please try again letter!", 500)
    );
  }
  if (existingUser) {
    return next(new HttpError("user exist already ,login insted!", 422));
  }

  let hashPassword;
  try {
    hashPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return next(new HttpError("could not  create user please try again.", 500));
  }

  const createdUser = new User({
    name,
    email,
    image: req.file.path,
    password: hashPassword,
    places: [],
  });

  try {
    await createdUser.save();
  } catch (err) {
    return next(new HttpError("Signing up  failed!,please try again", 500));
  }

  let token;

  console.log(createdUser.id);
  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      "secrete-dont-share",
      { expiresIn: "1h" }
    );
  } catch (err) {
    return next(new HttpError("Signing up  failed!,please try again", 500));
  }

  res
    .status(201)
    .json({ userId: createdUser.id, email: createdUser.email, token: token });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return next(new HttpError("log in failed please try again letter!", 500));
  }
  console.log(existingUser);
  if (!existingUser) {
    return next(
      new HttpError(
        "could not identified user,credentials seems to be wrong.",
        401
      )
    );
  }
  let isValidpassword;
  try {
    isValidpassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    return next(
      new HttpError("could not  log in,credentials seems to be wrong.", 500)
    );
  }
  if (!isValidpassword) {
    return next(
      new HttpError(
        "could not identified user,credentials seems to be wrong.",
        401
      )
    );
  }
  let token;

 
  try {
   token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      "secrete-dont-share",
      { expiresIn: "1h" }
    );
  } catch (err) {
    return next(new HttpError("Login in  failed!,please try again", 500));
  }


  res.json({
    userId: existingUser.id, email: existingUser.email,token:token
  });
};
exports.getUser = getUser;
exports.signup = signup;
exports.login = login;
