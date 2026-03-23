require('dotenv').config();

const axios = require('axios');
const Redis = require('ioredis');

const redis = new Redis();
const COINS = {
    'bitcoin': 'BTCUSDT',
    'ethereum': 'ETHUSDT'
};

async function fetchPrices() {
    try {
        for (let [coin, symbol] of Object.entries(COINS)) {
            const url = `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`;
            const { data } = await axios.get(url);
            const price = parseFloat(data.price).toFixed(2);
            await redis.set(coin, price);
            console.log(`${coin}: ${price}`);
        }
    } catch (err) {
        console.error("Error fetching the price:", err.message);
    }
}

// polling every 10 seconds
setInterval(fetchPrices, 5000);
fetchPrices();
console.log("Data service running");