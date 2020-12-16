import { Container, Section, Name, Color, Votation, Button } from "./styles";

const Card = ({ index, currentPlayer, player, handleVote, hideVotation }) => {
  const current = currentPlayer?.id === player.id;
 
  return (
    <Container alive={player.alive} current={current}>
      <Section>
        {current ? (
          <Name>TÚ</Name>
        ) : (
          <Name>{player.name}</Name>
        )}

        <Color color={player.color}>{player.color}</Color>
      </Section>

      {player.alive ? (
        <>
          <Name>{player.voting}</Name>

          {hideVotation && currentPlayer?.id !== player.id && (
            <Votation>
              <Button onClick={() => handleVote(player.id)} variant="yes">
                Vote
              </Button>
            </Votation>
          )}
        </>
      ) : (
        <Name>MUERTO</Name>
      )}
    </Container>
  );
};

export default Card;
