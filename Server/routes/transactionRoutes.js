import express from 'express';
import {
  createTransaction,
  getTransactions,
  deleteTransaction,
} from '../controllers/transactionController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createTransaction)
  .get(protect, getTransactions);

router.route('/:id')
  .delete(protect, deleteTransaction);

export default router;
