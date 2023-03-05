import "bootstrap/dist/css/bootstrap.min.css";
import Votes from "./Votes";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import { connect, getContract } from "./contract";
import { Modal, Button } from "react-bootstrap";
import WelcomeComponent from "./Welcome";

function App() {
  const [contract, setContract] = useState(null);
  const [connected, setConnected] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (window.ethereum !== undefined) {
      window.ethereum.request({ method: "eth_accounts" }).then((accounts) => {
        if (accounts.length > 0) {
          handleInit();
        } else setConnected(false);
      });
    }
  }, []);


  const handleInit = () => {
    setConnected(true);
    getContract().then(({ contract, signer }) => {
      setContract(contract);
      if (contract) {
        signer.getAddress().then((address) => {
          setAddress(address)
          contract.members(address).then((result) => setIsMember(result));
        });
      }
    });
  };

  const connectCallback = async () => {
    const { contract } = await connect();
    setContract(contract);
    if (contract) {
      setConnected(true);
    }
  };

  const becomeMember = async () => {
    if (!contract) {
      setModalText("Por favor, conecte sua carteira MetaMask.");
      setShowModal(true);
      return;
    }
    const isMember = await contract.isMember()
    if (isMember) {
      setModalText("Vi aqui que você é membro da comunidade! Você foi autenticado.");
      setIsMember(true);
      setShowModal(true);
    } else {
      setModalText("Que pena :/ Vc não é membro da comunidade");
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Navbar
        connect={connectCallback}
        connected={connected}
        becomeMember={becomeMember}
        isMember={isMember}
      />
      <div className="container">
        {isMember ? <Votes address={address} /> : <WelcomeComponent />}
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Olá, </Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalText}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </div >
  );
}

export default App;
