import React, { useState, useEffect } from 'react';
function App() {

  const [loading, setLoding] = useState(true);
  const [coin, setCoin] = useState([]);
  const [usd, setUsd] = useState("");
  const [coinCount, setCoinCount] = useState("");
  const [Selected, setSelected] = useState();

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((res => res.json()))
      .then(json => {
        setCoin(json);
        setLoding(false);
      });
  }, [])

  function howMuch(e) {
    setUsd(e.target.value);
  };

  function checkSelect(e) {
    setSelected(e.target.value);
  };

  function checkUSD(e) {
    e.preventDefault();
    let newSelet = parseInt(Selected);
    let newUSD = usd;
    let total = newSelet / newUSD;
    setCoinCount(total.toFixed(0));
  };

  return (
    <div >
      <h1>The Coins!</h1>
      {loading
        ? <strong>Loading...</strong>
        : null
      }
      <h3>
        How Much Do You Have Now?(비트코인 선택을 원하시는 경우 다른 코인 선택 후 비트코인을 다시 선택해주세요.)
      </h3>
      <input value={usd} type="number" placeholder='Write USD' onChange={howMuch}></input>
      <button onClick={checkUSD}>Click</button>
      <br />
      <select onChange={checkSelect} >
        {
          coin.map((a, i) => {
            if (a.quotes.USD.price > 100) {
              return <option value={a.quotes.USD.price} key={i}>{a.name}({a.symbol}):{a.quotes.USD.price}$</option>
            }
          })}
      </select>
      <br />
      <h2>You Can buy {coinCount}</h2>
    </div>
  );
}

export default App;
