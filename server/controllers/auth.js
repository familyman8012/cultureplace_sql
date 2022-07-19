import User from "../models/user";
import { hashPassword, comparePassword } from "../utils/auth";
import { con } from "../server";

export const register = async (req, res) => {
  try {
    // console.log(req.body);
    const { agegroup, email, gender, name, nickname, phone, userpwd } =
      req.body;
    // validation
    if (!name) return res.status(400).send("Name is required");
    // if (!userpwd || userpwd.length < 6) {
    //   return res
    //     .status(400)
    //     .send("Password is required and should be min 6 characters long");
    // }
    // let userExist = await User.findOne({ email }).exec();
    // let userExist = await con.query(
    //   "SELECT * FROM user WHERE email = ?",
    //   email,
    //   function (err, result, fields) {
    //     if (err) throw err;
    //     console.log(
    //       "result result result",
    //       result,
    //       "result.length",
    //       result.length
    //     );
    //     if (result.length !== 0) {
    //       console.log("왜 안돼지??");
    //       return res.status(400).send("Email is taken");
    //     }
    //     //return res.json({ ok: true });
    //   }
    // );

    // 해볼 것
    // const usernameCount = await db.query( `SELECT COUNT(*) as usernameCount FROM adminuser WHERE username="${username}"` );
    //const emailCount = await db.query( `SELECT COUNT(*) as emailCount FROM adminuser WHERE email="${email}"` );
    await con.query(
      "SELECT * FROM user WHERE email = ?",
      email,
      (err, result, fields) => {
        if (err) throw err;
        if (result.length !== 0) {
          console.log("왜 안돼지??");
          return res.status(400).send("Email is taken");
        }
        //return res.json({ ok: true });
      }
    );
    //console.log(userExist);
    // if (userExist) return res.status(400).send("Email is taken");

    // hash password
    const hashedPassword = await hashPassword(userpwd);

    // register
    // const user = new User({
    //   name,
    //   email,
    //   password: hashedPassword,
    // });
    // await user.save();
    // console.log("saved user", user);
    const sql = "INSERT INTO user SET ?";
    con.query(
      sql,
      { userpwd: hashedPassword, ...req.body },
      function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        return res.json({ ok: true });
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error. Try again.");
  }
};
