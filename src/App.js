import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import image from './cryptomonedas.png';

//Components
import Form from './components/Form';
import Result from './components/Result';

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`
const Image = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`

const MainTitle = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;
  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
  }
`

function App() {
  const [money, setMoney] = useState('');
  const [crypto, setCrypto] = useState('');
  const [result, setResult] = useState({});
  useEffect(() => {
    const getMoneyValues = async () => {
      if(money === '') return
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${crypto}&tsyms=${money}`;
      const moneyValues = await axios.get(url);
      setResult(moneyValues.data.DISPLAY[crypto][money])
    }
    getMoneyValues();
  }, [money, crypto])
  return (
    <Container>
      <div>
        <Image 
          src={image}
          alt="Imagen Crypto" 
        />
      </div>
      <div>
        <MainTitle>Cotiza cryptomonedas al instante</MainTitle>
        <Form 
          setMoney={setMoney}
          setCrypto={setCrypto}
        />
        <Result 
          result={result}
        />
      </div>
    </Container>
  );
}

export default App;
