// controllers/userControllers.js
export const updateAvatar = async (req, res) => {
  try {
    // Отримання файлу аватарки з запиту
    const avatar = req.file;

    // Перевірка, чи був завантажений файл
    if (!avatar) {
      return res.status(400).json({ message: "Avatar file is required" });
    }

    // Перенесення файлу аватарки в потрібну папку (наприклад, public/avatars)
    const avatarURL = `/${avatar.filename}`;

    // Оновлення URL аватарки користувача в базі даних
    req.user.avatarURL = avatarURL;
    await req.user.save();

    // Відправлення відповіді з URL оновленої аватарки
    res.status(200).json({ avatarURL });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Помилка сервера" });
  }
};
