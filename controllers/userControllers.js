// userControllers.js

import User from '../models/userModel';

export const updateUserSubscription = async (req, res) => {
  try {
    const { subscription } = req.body;

    // Перевірка чи валідне значення підписки
    if (!['starter', 'pro', 'business'].includes(subscription)) {
      return res.status(400).json({ message: 'Invalid subscription type' });
    }

    // Оновлення підписки користувача
    req.user.subscription = subscription;
    await req.user.save();

    res.status(200).json({ message: 'Subscription updated successfully', subscription: req.user.subscription });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Помилка сервера' });
  }
};
