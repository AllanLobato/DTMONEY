import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}

interface TransactionsProviderProps {
  children: ReactNode;
}

// 3 formas de se fazer a chamada de interface//
//1º
interface TransactionInput {
  title: string;
  amount: number;
  type: string;
  category: string;
}

//2º
// type TransactionInput = Pick<Transaction, 'title' | 'amount' | 'type' | 'category'>;

//3º
// type TransactionInput = Omit<Transaction, "id" | "createdAt">;

interface TransactionsContextData {
  transactions: Transaction[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
}

// Forma usada para burlar o erro usando {} as TransactionsContextData
export const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api
      .get("transactions")
      .then(response => setTransactions(response.data.transactions));
  }, []);

  async function createTransaction(transactionInput: TransactionInput) {
    const response = await api.post("/transactions", {
      ...transactionInput,
      createdAt: new Date(),
    });

    console.log(response.data)
    const { transaction } = response.data;


    // Sempre que eu quero add uma nova inf em um vetor no estado do react, eu sempre copio todas as indormações que já estão lá dentro e add a minha nova informação no final
    // isso é o conceito de imutabilidade
    setTransactions([
      ...transactions, 
      transaction,
    ]);
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);

  return context;
}