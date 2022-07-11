import { useState } from "react";
import Modal from 'react-modal';
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";

import { GlobalStyle } from "./styles/global";

Modal.setAppElement('#root');

export function App() {  // Utilizar export function define o nome do componente no export, dessa forma fica mais dificil acontecer erros
  const[isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);

  function handleOpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false);
  }
  
  return (
    <>
      <Header onOpenNewTransctionModal={handleOpenNewTransactionModal} />

      <Dashboard />

      <Modal 
          isOpen={isNewTransactionModalOpen} 
          onRequestClose={handleCloseNewTransactionModal} 
        >
          <h2>Cadastrar transação</h2>
      </Modal>
      <GlobalStyle />
    </>
  );
}


