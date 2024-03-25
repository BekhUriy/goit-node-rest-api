// middleware/uploadAvatar.js
import multer from "multer";
import path from "path";
import Jimp from "jimp";
import { v4 as uuidv4 } from "uuid";

// Налаштування завантаження аватарки
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "tmp");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// Фільтр для зображень
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Тільки зображення дозволено!"), false);
  }
};

// Завантаження файлу
export const uploadAvatar = multer({
  storage: storage,
  fileFilter: fileFilter,
});

// Обробка та збереження аватарки
export const processAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new Error("Файл не знайдено");
    }

    // Обробка аватарки за допомогою пакету Jimp
    const avatar = await Jimp.read(req.file.path);
    await avatar.resize(250, 250).writeAsync(req.file.path);

    // Унікальне ім'я для файлу
    const uniqueFilename = uuidv4() + path.extname(req.file.originalname);

    // Перенесення файлу в папку public/avatars
    await fs.rename(
      path.join("tmp", req.file.filename),
      path.join("public", "avatars", uniqueFilename)
    );

    // Оновлення шляху до аватарки в базі даних користувача
    req.user.avatarURL = `/avatars/${uniqueFilename}`;
    await req.user.save();

    // Передача управління наступному middleware
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Помилка обробки аватарки" });
  }
};
