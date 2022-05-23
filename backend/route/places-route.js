const express = require("express");
const {check}=require("express-validator")
const router = express.Router();
const placeController = require("./controllers/place-controller");
const fileUpload = require("./middleware/file-upload");
const checkauth = require("./middleware/check-auth");
router.get("/:pid", placeController.getPlaceId);

router.get("/user/:uid", placeController.getPlacesbyUserId);


 router.use(checkauth);
router.post("/",fileUpload.single('image'),[check("title").not().isEmpty(),check("description").isLength({min:5}),check("address").not().isEmpty()], placeController.createPlace);
router.patch("/:pid",[check("title").not().isEmpty(),check("description").isLength({min:5})],placeController.updatePLace);
router.delete("/:pid",placeController.deletePlace)
module.exports = router;
