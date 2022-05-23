const HttpError = require("../../module/http-error");
const fs = require("fs");
const res = require("express/lib/response");
const { validationResult } = require("express-validator");
const getCoordinatesfromAddress = require("../util/location");
const Place = require("../../module/place");
const User = require("../../module/user");
const { default: mongoose, Mongoose } = require("mongoose");

// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const getPlaceId = async (req, res, next) => {
 
  const placeId = req.params.pid;
  // const place = DUMMY_PLACES.find((p) => {
  //   return p.id === placeId;
  // });
  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    return next(
      new HttpError("Something went wrong!,could not found the place", 500)
    );
  }
  if (!place) {
    // const error = new Error("could not find place for provided id.");
    // error.code= 404;
    // throw (error);   // not return it cuz function or other action will be stop excuted after it
    // after creating httperror module
    throw new HttpError("could not find place for provided id.", 404);
  }
  res.json({ place: place.toObject({ getters: true }) });
};
// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const getPlacesbyUserId = async (req, res, next) => {
  // it can also be done by populate method
  const userId = req.params.uid;

  // const places = DUMMY_PLACES.filter((p) => {
  //   return p.creator === userId;
  // });
  let places;
  try {
    places = await Place.find({ creator: userId });
  } catch (err) {
    return next(
      new HttpError("Fetching place faild ,please  try again letter!", 500)
    );
  }
  if (!places || places.length === 0) {
    // const error = new Error("could not find place for provided userid.");
    // error.code= 404;
    // return next (error);   // must return it cuz function or other action will be continue excuted after it
    return next(new HttpError("could not find places for provided id.", 404));
  }
  // console.log("this is Places : " + places);
  res.json({
    places: places.map((p) => {
      return p.toObject({ getters: true });
    }),
  }); //  getters for removing '_' in front from id.
};

// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors); // its an object
    return next(new HttpError("Invalid inputs passed!", 422));
  }
  const { title, description, address, creator } = req.body;

  const location = { lat: 23.0338, lng: 72.546584 };
  // try {
  //   location = await getCoordinatesfromAddress(address);
  // } catch (error) {
  //   return next(error);
  // }

  const createdPlace = new Place({
    // id: uuidv4(),
    title,
    description,
    address,
    location,
    image: req.file.path,
    creator,
  });
  // DUMMY_PLACES.push(createdPlace);
  let user;
  try {
  
    user = await User.findById(creator);
  } catch (err) {
    return next(new HttpError("creating place faild ,please try again!", 500));
  }

  if (!user) {
    return next(new HttpError("could not find uder for provided id", 404));
  }


  try {
    await createdPlace.save();
    // const sess = await mongoose.startSession();
    // sess.startTransaction();
    // await createdPlace.save({ session: sess });
    // user.places.push(createdPlace);

    // await user.save({ session: sess });

    // console.log(108);

    // await sess.commitTransaction();
  } catch (err) {
    return next(new HttpError("Creating Place failed!,please try again", 500));
  }

  res.status(201).json({ place: createdPlace });
};

// update place
// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const updatePLace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors); // its an object
    return next(new HttpError("Invalid inputs passed!", 422));
  }
  const { title, description } = req.body;
  const placeId = req.params.pid;

 
  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    return next(
      new HttpError("Something went wrong!,could not found the place", 500)
    );
  }
  place.title = title;
  place.description = description;
  if(place.creator.toString()!==req.userData.userId) {
    return next(
      new HttpError("your not able to edit this place.", 401)
    );
  }


  try {
    await place.save();
  } catch (err) {
    return next(
      new HttpError("Something went wrong!,could not update the place", 500)
    );
  }

  res.status(200).json({ place: place.toObject({ getters: true }) });
};
// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const deletePlace = async (req, res, next) => {
  const placeId = req.params.pid;

 
  let place;
  try {
    place = await Place.findById(placeId).populate("creator");
  } catch (err) {
    return next(
      new HttpError("Something went wrong!,could not found the place", 500)
    );
  }
  if (!place) {
    return next(new HttpError("could not find place for this id", 404));
  }
  
  if(place.creator.id!==req.userData.userId) {
    return next(
      new HttpError("your not able to edit this place.", 401)
    );
  }
  const imagePath = place.image;
  try {
    await place.remove();
    // const sess = await mongoose.startSession();
    // sess.startTransaction();
    // await place.remove({ session: sess });
    // place.creator.places.pull(place);
    // await place.creator.save({ session: sess });
    // await sess.commitTransaction();
  } catch (err) {
    return next(
      new HttpError("Something went wrong!,could not delete the place", 500)
    );
  }
  fs.unlink(imagePath, (err) => {
    console.log(err);
  });

  res.status(200).json({ message: "delete place" });
};
exports.getPlacesbyUserId = getPlacesbyUserId;
exports.getPlaceId = getPlaceId;
exports.createPlace = createPlace;
exports.updatePLace = updatePLace;
exports.deletePlace = deletePlace;
