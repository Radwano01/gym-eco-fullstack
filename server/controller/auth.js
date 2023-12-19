const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const {db} = require("../database/mysql");

const register = async (req, res) => {
  try {
    const newUserQuery = "INSERT INTO `gymauth` (`name`, `email`, `password`) VALUES (?, ?, ?)";
    const existEmailQuery = "SELECT * FROM `gymauth` WHERE `email` = ?";
    
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const data = await new Promise((resolve, reject) => {
      db.query(existEmailQuery, [email], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    if (data.length > 0) {
      return res.status(400).json({ error: "Email already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await new Promise((resolve, reject) => {
      db.query(newUserQuery, [name, email, hashedPassword], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    const verification = jwt.sign({ email }, process.env.TOKEN, { expiresIn: "1d" });

    const transporter = nodemailer.createTransport({
      service: process.env.SERVICE,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Email Verification",
      html: `Click the following link to verify your email: <p><a href="https://gym-ecommerce.netlify.app/verify/${email}/${verification}">Click here to proceed</a></p>`,
    };

    const emailResult = await transporter.sendMail(mailOptions);

    return res.json({
      status: "Success",
      message: "Verification email sent",
      result: emailResult,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  const existUser = "SELECT * FROM `gymauth` WHERE `email` = ?";
  const email = req.body.email;
  const password = req.body.password;

  db.query(existUser, [email], async (err, data) => {
    if (err) {
      return res.status(400).json(err);
    } else {
      if (data.length === 0) {
        return res.status(400).json("no data length");
      } else {
        const storedisVerified = data[0].isVerified;
        const storedPassword = data[0].password;
        const email = data[0].email;
        const name = data[0].name;

        if (storedisVerified === 1) {
          const compare = await bcrypt.compare(password, storedPassword);
          if (compare) {
            const token = jwt.sign({ id: data[0].id }, process.env.TOKEN);
            res.json({ token, id: data[0].id, email, name });
          } else {
            res.status(400).json({ error: "password or email is wrong" });
          }
        } else {
          res.status(400).json({ error: "verify your email first" });
        }
      }
    }
  });
};

const verifyEmail = async (req, res) => {
  const { email, verification } = req.params;
  const updataUser = "UPDATE `gymauth` SET `isVerified` = 1 WHERE `email` = ?";
  try {
    const verify = jwt.verify(verification, process.env.TOKEN);

    if (verify.email === email) {
      db.query(updataUser, [email], (err, data) => {
        if (err) {
          res.json(err);
        } else {
          res.status(200).json({ success: "account verified" });
        }
      });
    } else {
      res.status(400).json({ error: "email or password wrong" });
    }
  } catch (err) {
    res.status(400).json({ err });
  }
};

const forgotPassword = (req, res) => {
  const getEmail = "SELECT * FROM `gymauth` WHERE `email` = ?";
  const email = req.body.email;
  const verification = jwt.sign({ email }, process.env.TOKEN, { expiresIn: "1d" });
  db.query(getEmail, [email], (err, data) => {
    if (err) {
      res.status(400).json({ err });
    } else {
      res.status(200).json({ success: "check your gmail" });
      const transporter = nodemailer.createTransport({
        service: process.env.SERVICE,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Reset Password Link",
        html: `Click the following link to reset your email password: <p><a href="https://gym-ecommerce.netlify.app/reset-password/${data[0].email}/${verification}">Click here to proceed</a></p>`,
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          return res.status(500).json({ err });
        } else {
          return res
            .status(200)
            .json({ success: "Success", Message: "Verification email sent" });
        }
      });
    }
  });
};

const resetPassword = async(req, res) => {
  const { email, verification } = req.params;
  
  const resetpPassword =
    "UPDATE `gymauth` SET `password` = ? WHERE `email` = ?";

  const newPassword = req.body.password;
  const Password = await bcrypt.hash(newPassword, 10);

  const verify =jwt.verify(verification, process.env.TOKEN);
  const values = [
    Password,
    email
  ]
  if((verify.email === email)) {
    db.query(resetpPassword, values, (err, data) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(200).json("password changed successfully");
      }
    });
  } else {
    res.status(400).json({ error: "someting went wrong" });
  }
};

module.exports = {
  register,
  login,
  verifyEmail,
  forgotPassword,
  resetPassword,
};
