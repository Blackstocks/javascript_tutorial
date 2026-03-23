require('dotenv').config();
const express = require('express');

const Redis = require('ioredis');

const app = express();
const redis = new Redis();

app.get('/price/:coin',async(req,res)=>{
    const {coin} = req.params;
    try{
        const price = await redis.get(coin);
        if(!price){
            return res.status(404).json({error:"Coin not found!!"});
        }
        res.json({
            coin,
            price: Number(price)
        });
    }catch(err){
        res.status(500).json({error:err.message});
    }
});

app.get('/price',async(req,res) => {
    const coins = ['bitcoin','ethereum'];
    const result = {};
    for(let coin of coins){
        const price = await redis.get(coin);
        result[coin]= Number(price);
    }
    res.json(result);
});

app.listen(3000,()=>{
    console.log("API service running on PORT 3000.....");
})