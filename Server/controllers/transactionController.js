import Transaction from '../models/transaction.js';

// @desc    Create a transaction
// @route   POST /api/transactions
export const createTransaction = async (req, res) => {
  const { amount, type, category, note, date } = req.body;

  if (!amount || !type || !category || !date) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const transaction = await Transaction.create({
    userId: req.user._id,
    amount,
    type,
    category,
    note,
    date,
  });

  res.status(201).json(transaction);
};

// @desc    Get all user transactions
// @route   GET /api/transactions
export const getTransactions = async (req, res) => {
  const transactions = await Transaction.find({ userId: req.user._id }).sort({ date: -1 });
  res.status(200).json(transactions);
};

// @desc    Delete transaction
// @route   DELETE /api/transactions/:id
export const deleteTransaction = async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);

  if (!transaction) {
    return res.status(404).json({ message: 'Transaction not found' });
  }

  if (transaction.userId.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  await transaction.deleteOne();
  res.status(200).json({ message: 'Transaction deleted' });
};
