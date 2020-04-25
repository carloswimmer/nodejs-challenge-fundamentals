import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  private balance: Balance;

  constructor() {
    this.transactions = [];
    this.balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const totalIncome = this.transactions.reduce(
      (total: number, transaction) =>
        transaction.type === 'income' ? total + transaction.value : total,
      0,
    );
    const totalOutcome = this.transactions.reduce(
      (total: number, transaction) =>
        transaction.type === 'outcome' ? total + transaction.value : total,
      0,
    );

    this.balance.income = totalIncome;
    this.balance.outcome = totalOutcome;
    this.balance.total = totalIncome - totalOutcome;

    return this.balance;
  }

  public create({ title, type, value }: Omit<Transaction, 'id'>): Transaction {
    const transaction = new Transaction({
      title,
      type,
      value,
    });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
