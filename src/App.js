import { Root, Container, Content } from './styles'
import { Button } from 'react-bootstrap';
import Form from './components/Form/index'; 
import Card from './components/Card/index'; 
import useConnect from './connect';

const App = () => {
  const {
    players,
    isPlaying,
    handleStart,
    currentPlayer,
    hideForm,
    handleLogin,
    handleVote,
    hideVotation,
  } = useConnect();

  return (
    <Root className="App">
      <h1 style={{ textAlign: "center" }}>Socketio, Flask and React Chat</h1>

      {players.length > 1 && !isPlaying && currentPlayer && <Button style={{ marginTop: "80px" }} onClick={handleStart}>Start game</Button>}

      {currentPlayer && isPlaying && (
        <h3 style={{ textAlign: "center", textTransform: "uppercase", marginTop: "80px" }}>You are {currentPlayer.role}</h3>
      )}

      {!(!hideForm && players.length > 0) ? (
        <Form handleLogin={handleLogin} />
      ) : (
        <Container>
          <Content>
            {players.map((player) => (
              <Card
                key={player.id}
                currentPlayer={currentPlayer}
                player={player}
                handleVote={handleVote}
                hideVotation={hideVotation}
              />
            ))}
          </Content>
        </Container>
      )}
    </Root>
  );
}

export default App;
