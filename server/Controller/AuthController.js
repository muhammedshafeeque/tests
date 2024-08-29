import { USER } from "../Model/userModal.js";
import bcrypt from "bcrypt";
export const doSignup = async (req, res, next) => {
  try {
    let userExist = await USER.findOne({ email: req.body.email });
    if (userExist) {
      next({ message: "email already exist", code: 400 });
    } else {
      req.body.password = await bcrypt.hashSync(req.body.password, 10);
      await USER.create(req.body);
      res.send({ message: "User registered successfully", code: 201 });
    }
  } catch (error) {
    next(error);
  }
};
export const doLogin = async (req, res, next) => {
  try {
    let user = await USER.findOne({ email: req.body.email });
    if (!user) {
      next({ message: "Invalid userId Or Password", code: 401 });
    } else {
      let passwordVerification = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (passwordVerification) {
        res.send(user);
      } else {
        res.status(400).send({ message: "Invalid userId Or Password" });
      }
    }
  } catch (error) {
    next(error);
  }
};
