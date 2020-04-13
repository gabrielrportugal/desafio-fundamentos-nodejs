import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    /*
const incomeTransaction = this.transactions.filter(
  transaction => transaction.type === 'income',
);

const income = incomeTransaction.reduce(
  (transaction, total) => total + transaction.value,
);

const outcomeTransaction = this.transactions.filter(
  transaction => transaction.type === 'outcome',
);
  */
    const income = this.transactions.reduce((total, transaction) => {
      return transaction.type !== 'income' ? total : total + transaction.value;
    }, 0);

    const outcome = this.transactions.reduce((total, transaction) => {
      return transaction.type !== 'outcome' ? total : total + transaction.value;
    }, 0);

    const total = income - outcome;

    const balance = {
      income,
      outcome,
      total,
    };

    return balance;
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
