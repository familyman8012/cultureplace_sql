import User from "../models/user";
import { hashPassword, comparePassword } from "../utils/auth";
const mysql = require("../server");

export const register = async (req, res) => {
  let con = null;
  try {
    con = await mysql.getConnection();
    const { agegroup, email, gender, name, nickname, phone, userpwd } =
      req.body;
    // validation
    if (!name) return res.status(400).send("Name is required");
    if (!userpwd || userpwd.length < 6) {
      return res
        .status(400)
        .send("Password is required and should be min 6 characters long");
    }

    // 사용자 있는지 체크
    const [userExist] = await con.query(
      `SELECT COUNT(email) as emailCount FROM user WHERE email="${email}"`
    );
    if (userExist[0].emailCount > 0) {
      return res.status(400).send("Email is taken");
    }
    const hashedPassword = await hashPassword(userpwd);

    const result = await con.query("INSERT INTO user SET ?", {
      ...req.body,
      userpwd: hashedPassword,
    });
    console.log("result result result", result);
    con.release();
    return res.json({ ok: true });
  } catch (err) {
    console.log(err);
    con.release();
    return res.status(400).send("Error. Try again.");
  }
};
