import React, { memo, useCallback, useState } from 'react';
import { Container, Input } from './styles';
import { Button } from 'react-bootstrap';

const Form = ({ handleLogin}) => {
  const [nombre, setNombre] = useState('');

  const handleName = useCallback((e) => {
    e.preventDefault();
    setNombre(e.target.value);
  }, [setNombre]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    handleLogin(nombre);
  }, [handleLogin, nombre]);

  return (
    <Container onSubmit={handleSubmit}>
      <Input placeholder="Escribe un nombre..." type="text" value={nombre} name="nombre" onChange={handleName} />
      <Button variant="dark" type="submit">Entrar</Button>
    </Container>
  );
}

export default memo(Form);
