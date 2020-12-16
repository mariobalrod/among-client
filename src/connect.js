import { useEffect, useState, useCallback } from 'react';
import io from 'socket.io-client';

const ENDPOINT = 'http://localhost:5000/';
const socket = io.connect(ENDPOINT);

const useConnect = () => {
  const [currentPlayer, setCurrentPlayer] = useState();
  const [hideVotation, setHideVotation] = useState(false);
  const [players, setPlayers] = useState([]);
  const [hideForm, setHideForm] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleHideVotation = useCallback(() => {
    setHideVotation(!hideVotation);
  }, [hideVotation, setHideVotation]);

  const handleClear = useCallback(() => {
    socket.emit("clear");
  }, []);

  const handleEnd = useCallback(() => {
    socket.emit("end");
  }, []);

  useEffect(() => {
    socket.on("players", (data) => {
      if (data.length > 0) {
        setPlayers(data);
      } else {
        setCurrentPlayer();
        setPlayers([]);
      }
    });

    socket.on("start", (data) => {
      handleHideVotation();
      setIsPlaying(data.playing);
      setPlayers(data.players)
    });

    socket.on("finish", (data) => {
      setPlayers(data);
      handleEnd();
    });

    socket.on("kill", (data) => {
      setPlayers(data);
      handleHideVotation(); 
    });

    socket.on("impostor", (data) => {
      console.log(data)
      handleClear();
    });

    players.map((player) => {
      if (player.id === socket.id) {
        setCurrentPlayer(player);
      }
      return null;
    });
  }, [players, setPlayers, setCurrentPlayer, handleHideVotation, handleClear, handleEnd]);

  const handleVote = useCallback(
    (id) => {
      socket.emit("vote", id);
      handleHideVotation();
    },
    [handleHideVotation]
  );

  const handleLogin = useCallback(
    (nombre) => {
      if (players.length === 6) {
        alert("Sala Llena! Vuelve luego.");
      } else {
        socket.emit("join", nombre, socket.id);
        setHideForm(false);
      }
    },
    [players, setHideForm]
  );

  const handleStart = useCallback(() => {
    socket.emit("start");
  }, []);

  return {
    players,
    isPlaying,
    handleStart,
    currentPlayer,
    hideForm,
    handleLogin,
    handleVote,
    hideVotation,
    handleClear,
  };
};

export default useConnect;
