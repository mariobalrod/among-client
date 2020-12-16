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
    handleClear,
  } = useConnect();

  return (
    <Root className="App">
      <h1 style={{ textAlign: "center" }}>AMONG US</h1>

      <Button style={{ marginTop: "80px" }} onClick={handleClear()}>Reset</Button>

      {players.length > 1 && !isPlaying && currentPlayer && <Button style={{ marginTop: "80px" }} onClick={handleStart}>Start game</Button>}

      {currentPlayer && isPlaying && (
        <h3 style={{ textAlign: "center", textTransform: "uppercase", marginTop: "80px" }}>You are {currentPlayer.role}</h3>
      )}

      {!(!hideForm && players.length > 0) ? (
        <Form handleLogin={handleLogin} />
      ) : (
        <Container>
          <Content>
            {players.map((player, index) => (
              <Card
                key={player.id}
                index={index}
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
