import { useEffect, useState, useCallback } from 'react';
import io from 'socket.io-client';

const ENDPOINT = 'https://among-us-voting-server.herokuapp.com/';
const socket = io.connect(ENDPOINT);

const useConnect = () => {
  const [currentPlayer, setCurrentPlayer] = useState();
  const [hideVotation, setHideVotation] = useState(false);
  const [players, setPlayers] = useState([]);
  const [hideForm, setHideForm] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [endMsg, setEndMsg] = useState('');

  const reset = () => {
    setPlayers([]);
    setCurrentPlayer();
    setHideVotation(false);
    setIsPlaying(false)
  };

  useEffect(() => {
    players.map((player) => {
      if (player.id === socket.id) {
        setCurrentPlayer(player);
      }
      return null;
    });
  }, [players])

  const loadSockets = useCallback(() => {
    socket.on("players", (data) => {
      setPlayers(data);
    });

    socket.on("full", (data) => {
      if (data === true) {
        console.log('Sala llena, vuelve luego!')
      }
    });

    socket.on("start", (data) => {
      setEndMsg('')
      setHideVotation(true);
      setIsPlaying(data.playing);
      setPlayers(data.players);
    });

    socket.on("kill", (data) => {
      setHideVotation(true);
      setPlayers(data);
    });

    socket.on("impostor", (data) => {
      socket.emit("clear");
      setEndMsg(data);
      reset();
      setHideForm(true);
    });

    socket.on("defeat", (data) => {
      socket.emit("clear");
      setEndMsg(data);
      reset();
      setHideForm(true);
    });
  }, [setPlayers, setHideVotation, setEndMsg]);

  const handleVote = useCallback(
    (id) => {
      socket.emit("vote", id);
      setHideVotation(false);
      socket.emit("end");
      loadSockets();
    },
    [setHideVotation, loadSockets]
  );

  const handleLogin = useCallback(
    (nombre) => {
      socket.emit("join", nombre, socket.id);
      loadSockets();
      setHideForm(false);
    },
    [setHideForm, loadSockets]
  );

  const handleStart = useCallback(() => {
    socket.emit("start");
    loadSockets();
  }, [loadSockets]);

  return {
    players,
    isPlaying,
    handleStart,
    currentPlayer,
    hideForm,
    handleLogin,
    handleVote,
    hideVotation,
    endMsg,
  };
};

export default useConnect;
