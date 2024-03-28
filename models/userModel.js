// models/userModel.js

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  // інші поля моделі користувача
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: {
    type: String,
    default: null,
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, "Verify token is required"],
  },
});

const User = mongoose.model("User", userSchema);

export default User;

// // models/userModel.js
// import mongoose from "mongoose";
// import bcrypt from "bcryptjs";
// import gravatar from "gravatar";

// const userSchema = new mongoose.Schema({
//   password: {
//     type: String,
//     required: [true, "Password is required"],
//   },
//   email: {
//     type: String,
//     required: [true, "Email is required"],
//     unique: true,
//   },
//   subscription: {
//     type: String,
//     enum: ["starter", "pro", "business"],
//     default: "starter",
//   },
//   token: {
//     type: String,
//     default: null,
//   },
//   verify: {
//     type: Boolean,
//     default: false,
//   },
//   verificationToken: {
//     type: String,
//     required: [true, "Verify token is required"],
//   },
//   avatarURL: {
//     type: String,
//   },
// });

// userSchema.pre("save", async function (next) {
//   if (!this.avatarURL) {
//     const avatar = gravatar.url(this.email, {
//       s: "200",
//       r: "pg",
//       d: "mm",
//     });
//     this.avatarURL = avatar;
//   }
//   next();
// });

// userSchema.pre("save", async function (next) {
//   if (this.isModified("password")) {
//     this.password = await bcrypt.hash(this.password, 12);
//   }
//   next();
// });

// const User = mongoose.model("User", userSchema);

// export default User;

// // models/userModel.js
// import mongoose from "mongoose";
// import bcrypt from "bcryptjs";
// import gravatar from "gravatar";

// const userSchema = new mongoose.Schema({
//   password: {
//     type: String,
//     required: [true, "Password is required"],
//   },
//   email: {
//     type: String,
//     required: [true, "Email is required"],
//     unique: true,
//   },
//   subscription: {
//     type: String,
//     enum: ["starter", "pro", "business"],
//     default: "starter",
//   },
//   token: {
//     type: String,
//     default: null,
//   },
//   avatarURL: {
//     type: String,
//   },
// });

// // Генерація аватара за email користувача
// userSchema.pre("save", async function (next) {
//   if (!this.avatarURL) {
//     const avatar = gravatar.url(this.email, {
//       s: "200", // Розмір аватара
//       r: "pg", // Рівень доступу (дозволені для всіх)
//       d: "mm", // Зображення за замовчуванням, якщо граватар не знайдено
//     });
//     this.avatarURL = avatar;
//   }
//   next();
// });

// // Хешування паролю перед збереженням в базі даних
// userSchema.pre("save", async function (next) {
//   if (this.isModified("password")) {
//     this.password = await bcrypt.hash(this.password, 12);
//   }
//   next();
// });

// const User = mongoose.model("User", userSchema);

// export default User;
