import styled from 'styled-components';

export const Container = styled.div`
  width: 450px;
  height: 130px;
  padding: 40px;
  background-color: ${(props) => (props.alive ? "#ccc" : "#caa")};
  border: ${(props) => (props.current ? "5px solid blue" : "none")};
  color: #38433f;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Votation = styled.div`
  display: flex;
  align-items: center;
`;

export const Button = styled.button`
  width: 50px;
  height: 50px;
  background-color: ${(props) => (props.variant === "yes" ? "green" : "red")};
  color: white;
  font-weight: 600;
  border: none;
  outline: none;
  border-radius: 10px;
  :hover {
    cursor: pointer;
    opacity: 0.5;
  }
`;

export const Name = styled.h2`
  font-size: 25px;
  font-weight: 600;
  text-align: center;
`;

export const Color = styled.h4`
  font-size: 18px;
  font-weight: 300;
  text-transform: uppercase;
  color: ${(props) => props.color};
`;