import { Container, Section, Name, Color, Votation, Button } from "./styles";

const Card = ({ currentPlayer, player, handleVote, hideVotation }) => {
  return (
    <Container alive={player.alive}>
      <Section>
        <Name>{player.name}</Name>
        <Color color={player.color}>{player.color}</Color>
      </Section>

      {player.alive ? (
        <>
          <Name>{player.voting}</Name>

          {hideVotation && currentPlayer?.id !== player.id && (
            <Votation>
              <Button onClick={() => handleVote(player.id)} variant="yes">Vote</Button>
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
