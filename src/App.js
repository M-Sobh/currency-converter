import React, { useEffect, useState } from "react";
import "./App.css";
import CurrencyRow from "./CurrencyRow";
import { Container, Row, Col } from "react-bootstrap";

const BASE_URL = "https://api.exchangeratesapi.io/latest";

function App() {
  const [currencyOptions, setCureencyOptions] = useState([]);
  const [fromCurrecy, setFromCurrency] = useState();
  const [toCurrecy, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => {
        const firstCurrency = Object.keys(data.rates)[0];
        setCureencyOptions([data.base, ...Object.keys(data.rates)]);
        setFromCurrency(data.base);
        setToCurrency(firstCurrency);
        setExchangeRate(data.rates[firstCurrency]);
      });
  }, []);

  useEffect(() => {
    if (fromCurrecy != null && toCurrecy != null) {
      fetch(`${BASE_URL}?base=${fromCurrecy}&symbols=${toCurrecy}`)
        .then(res => res.json())
        .then(data => setExchangeRate(data.rates[toCurrecy]));
    }
  }, [fromCurrecy, toCurrecy]);

  function handleFromAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }

  return (
    <Container>
      <div className="card">
        <div className="container">
          <Row>
            <Col>
              <h1>From</h1>
            </Col>
            <Col>
              <CurrencyRow
                currencyOptions={currencyOptions}
                selectedCurrency={fromCurrecy}
                onChangeCurrency={e => setFromCurrency(e.target.value)}
                onChangeAmount={handleFromAmountChange}
                amount={fromAmount}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="equals">To</div>
            </Col>
            <Col>
              <CurrencyRow
                currencyOptions={currencyOptions}
                selectedCurrency={toCurrecy}
                onChangeCurrency={e => setToCurrency(e.target.value)}
                onChangeAmount={handleToAmountChange}
                amount={toAmount}
              />
            </Col>
          </Row>
        </div>
      </div>
    </Container>
  );
}

export default App;
