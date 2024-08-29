import { USER } from "../Model/userModal.js";
export const getUsers = async (req, res, next) => {
  try {
    let keywords = {};
    let users = await USER.find(keywords);
    res.send(users);
  } catch (error) {
    next(error);
  }
};
