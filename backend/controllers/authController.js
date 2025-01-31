import bcrypt from "bcrypt";
import express from "express";
import db from "../configs/db.config.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
// import nodemailer from "nodemailer";
// import crypto from "crypto";
import roles from "../middlewares/roles.js";

const app = express();
app.use(cookieParser());
const saltRounds = 10; // Used for bcrypt hashing

const verifyAdmin = async (req, res) => {
  const checkSuperAdminQuery = "SELECT id FROM admins LIMIT 1";

  db.query(checkSuperAdminQuery, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (result.length > 0) {
      return res.json({ error: "Superadmin is already registered." });
    }
    

    res.json({ message: "No superadmin registered yet." });
  });
};

const signupAdmin = async (req, res) => {
  const { name,  email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Check if a superadmin already exists
  const checkSuperAdminQuery = "SELECT id FROM admins LIMIT 1";
  db.query(checkSuperAdminQuery, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (result.length > 0) {
      return res
        .status(403)
        .json({ error: "Superadmin registration is already completed." });
    }

    // Register the first superadmin
    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({ error: "Error hashing password" });
      }

      const query =
        "INSERT INTO admins (name, email, password) VALUES (?, ?, ?)";
      const values = [
        name,
        email,
        hashedPassword,
      ];
      db.query(query, values, (err, result) => {
        if (err) {
          console.error("Error creating superadmin:", err);
          return res.status(500).json({ error: "Error creating superadmin" });
        }
        return res
          .status(201)
          .json({ message: "Superadmin registered successfully!" });
      });
    });
  });
};

const signupUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    await db.query(
      `INSERT INTO users (name, email, password) 
       VALUES (?, ?, ?)`,
      [name, email, hashedPassword]
    );
    res.status(201).send({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Error registering lecturer:", error);
    res.status(500).send({ error: "Failed to register lecturer." });
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  // Check if the user is a superadmin
  const superAdminQuery = "SELECT id, password FROM admins WHERE email = ?";
  db.query(superAdminQuery, [email], (err, superAdminResult) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (superAdminResult.length > 0) {
      // Superadmin found, verify password
      const hashedPassword = superAdminResult[0].password;
      bcrypt.compare(password, hashedPassword, (err, isMatch) => {
        if (err) {
          return res.status(500).json({ error: "Error verifying password" });
        }
        if (!isMatch) {
          return res.status(401).json({ error: "Invalid email or password" });
        }

        // Generate JWT for superadmin
        const token = jwt.sign({ email, role: roles.ADMIN }, "jwt-secret-key", {
          expiresIn: "1d",
        });

        return res
          .cookie("token", token, { httpOnly: true, secure: false })
          .status(200)
          .json({
            message: "Successfully logged in!",
            role: roles.ADMIN,
          });
      });
    } else {
      // Check if  user
      const userQuery = "SELECT id, password FROM users WHERE email = ?";
      db.query(userQuery, [email], (err, userResult) => {
        if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ error: "Database error" });
        }

        if (userResult.length > 0) {
          // Student found, verify password
          const hashedPassword = userResult[0].password;
          bcrypt.compare(password, hashedPassword, (err, isMatch) => {
            if (err) {
              return res
                .status(500)
                .json({ error: "Error verifying password" });
            }
            if (!isMatch) {
              return res
                .status(401)
                .json({ error: "Invalid email or password" });
            }

            // Generate JWT for student
            const token = jwt.sign(
              { email, role: roles.USER },
              "jwt-secret-key",
              {
                expiresIn: "1d",
              }
            );

            return res
              .cookie("token", token, { httpOnly: true, secure: false })
              .status(200)
              .json({
                message: "Successfully logged in!",
                role: roles.USER,
              });
          });
        } else {
          // No user found
          return res.status(404).json({ error: "User not found" });
        }
      });
    }
  });
};

const logout = async (req, res) => {
  try {
    // Clear the authentication cookie
    res.clearCookie("token", { httpOnly: true, secure: false });
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("Logout error:", err);
    return res
      .status(500)
      .json({ error: "Failed to log out. Try again later." });
  }
};

export { verifyAdmin, signupAdmin, signupUser, login, logout };
