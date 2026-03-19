// Replace with fake API cuz we dont want security vulnerabilities LOL
const API_KEY = "YOUR_API_KEY";
const BASE_URL = "https://www.alphavantage.co/query";

async function getStock() {
  const ticker = document.getElementById("tickerInput").value.toUpperCase();
  const resultDiv = document.getElementById("result");

  if (!ticker) {
    resultDiv.innerHTML = "Please enter a stock ticker.";
    return;
  }

  resultDiv.innerHTML = "Loading...";

  try {
    const response = await fetch(
      `${BASE_URL}?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${API_KEY}`
    );

    const data = await response.json();
    const stock = data["Global Quote"];

    if (!stock || !stock["05. price"]) {
      resultDiv.innerHTML = "Stock not found.";
      return;
    }

    const price = stock["05. price"];
    const change = stock["10. change percent"];

    resultDiv.innerHTML = `
      <h2>${ticker}</h2>
      <p>Price: $${price}</p>
      <p>Change: ${change}</p>
    `;
  } catch (error) {
    resultDiv.innerHTML = "Error fetching data.";
    console.error(error);
  }
}