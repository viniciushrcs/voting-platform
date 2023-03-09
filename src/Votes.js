import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import ProgressBar from "react-bootstrap/ProgressBar";
import { getPool, updatePool } from "./firebase";

const Votes = ({ address }) => {
  const [pool, setPool] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [alreadyVoted, setAlreadyVoted] = useState(false);
  const [modalText, setModalText] = useState("");

  useEffect(() => {
    async function fetchData() {
      const fetchedPool = await getPool()
      setPool(fetchedPool)
    }
    fetchData()
  }, []);

  const hasVoted = () => {
    return pool.addressesVoted.includes(address);
  };


  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleVoteClick = async (optionIndex) => {
    if (hasVoted()) {
      setShowModal(true);
      setModalText('Você já votou nesta pesquisa, muito obrigado :)')
      return;
    }

    const updatedVotes = [...pool.votes];
    updatedVotes[optionIndex]++;

    const updatedAddressesVoted = [...pool.addressesVoted, address];

    try {
      await updatePool({
        totalVotes: pool.totalVotes + 1,
        addressesVoted: updatedAddressesVoted,
        votes: updatedVotes
      });
      setShowModal(true);
      setAlreadyVoted(true);
      setModalText('Seu voto foi computado :)')
    } catch (error) {
      console.error("Failed to update pool:", error);
    }
  };



  return (
    <div>
      <Card key={pool?.id} className="my-2">
        <Card.Header>{pool?.question}</Card.Header>
        <Card.Body>
          {pool?.options?.map((option, idx) => (
            <div className="mt-1" key={Math.random() + idx}>
              <p>
                {option}:{" "}
                {(pool.votes[idx] / Math.max(1, pool.totalVotes)) * 100}%
              </p>
              <div className="d-flex w-100 align-items-center">
                <ProgressBar
                  now={(pool.votes[idx] / Math.max(1, pool.totalVotes)) * 100}
                  label={`${pool.votes[idx]}`}
                  className="w-100 me-2"
                />
                <Button
                  size="sm"
                  onClick={() => {
                    handleVoteClick(idx);
                  }}
                  variant="dark"
                  disabled={alreadyVoted}
                >
                  Votar
                </Button>
              </div>
            </div>
          ))}
        </Card.Body>
      </Card>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Olá,</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalText}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Votes;
