import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
//Components
import Error from './Error';
//Hooks
import useMoney from '../hooks/useMoney';
import useCrypto from '../hooks/useCrypto';
const Button = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66A2FE;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;
    &:hover {
        background-color: #326AC0;
        cursor: pointer;
    }
`
const Form = ({ setMoney, setCrypto}) => {
    //State
    const [cryptolist, setCryptolist] = useState([]);
    const [error, setError] = useState(false);
    //Array Options
    const moneys = [
        {code: 'USD', name: 'Dolar estadounidense'},
        {code: 'MXN', name: 'Peso Mexicano'},
        {code: 'EUR', name: 'Euro'},
        {code: 'GBP', name: 'Libra esterlina'}
    ]
    //Hooks
    const [ money, SelectedMoney] = useMoney('Elige tu moneda', '', moneys);
    const [crypto, SelectedCrypto] = useCrypto('Elige tu cryptomoneda', '', cryptolist);
    useEffect(() => {
        const getCrypto = async() => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const crypto = await axios.get(url);
            setCryptolist(crypto.data.Data);
        }
        getCrypto();
    }, [])
    //Functions
    const handleOnSubmit = ev => {
        ev.preventDefault();
        if(money.trim() === '' || crypto.trim() === '') {
            setError(true);
            return;
        }
        setError(false);
        setMoney(money);
        setCrypto(crypto);
    }
    return ( 
        <form
            onSubmit={handleOnSubmit}
        >
            { error 
            ? <Error message='Sucedió un error' /> 
            : null 
            }
            <SelectedMoney />
            <SelectedCrypto />
            <Button type="submit" value="Calcular" />
        </form>
     );
}
 
export default Form;