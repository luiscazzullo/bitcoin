import React from 'react';
import styled from '@emotion/styled';
const ResultDiv = styled.div`
    color: #FFF;
    font-family: Arial, Helvetica, sans-serif;
`
const Info = styled.p`
    font-size: 18px;
    span {
        font-weight: bold;
    }
`

const Price = styled.p`
    font-size: 30px;
    span {
        font-weight: bold;
    }
`
const Result = ({ result }) => {
    if(Object.keys(result).length === 0) return null;
    return ( 
        <ResultDiv>
            <Price>El precio es: <span>{result.PRICE}</span></Price>
            <Info>El precio más alto del día: <span>{result.HIGHDAY}</span></Info>
            <Info>El precio más bajo del día: <span>{result.LOWDAY}</span></Info>
            <Info>La variación de las últimas 24 horas: <span>{result.CHANGEPCT24HOUR}</span></Info>
            <Info>Última actualización: <span>{result.LASTUPDATE}</span></Info>
        </ResultDiv>
     );
}
 
export default Result;