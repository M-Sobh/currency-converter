import React from "react";
import { Container } from "react-bootstrap";

export default function CurrencyRow(props) {
  const {
    currencyOptions,
    selectedCurrency,
    onChangeCurrency,
    onChangeAmount,
    amount
  } = props;
  return (
    <Container fluid={true}>
      <div className="card sec">
        <div className="container">
          <input
            type="number"
            class="input"
            value={amount}
            onChange={onChangeAmount}
          />
          <select value={selectedCurrency} onChange={onChangeCurrency}>
            {currencyOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    </Container>
  );
}
