const express = require("express");
const router = express.Router();
const {userRegistration,userLogin,userLogout,forgotPassword,resetPassword,getUserDetails,updatePassword,updateProfile,getAllUsers,getSingleUser,updateUserRole,deleteUser} = require("../controllers/userController");
const {isAuthenticatedUser,authorizeRoles} = require("../middleware/auth");

router.route("/register").post(userRegistration);
router.route("/login").post(userLogin);
router.route("/logout").get(userLogout);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/me").get(isAuthenticatedUser, getUserDetails);
router.route("/password/update").put(isAuthenticatedUser,updatePassword);
router.route("/me/update").put(isAuthenticatedUser,updateProfile);
router.route("/admin/users").get(getAllUsers);
router.route("/admin/user/:id").get(getSingleUser);
router.route("/admin/updateuser/:id").put(updateUserRole);
router.route("/admin/deleteuser/:id").delete(deleteUser);

module.exports = router;