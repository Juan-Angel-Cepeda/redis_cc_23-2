const express = require('express');
const axios = require('axios');
const redis = require('redis');

async function list(req,res,next){
    const client = redis.createClient({
        host:'redis://localhost:6379',
    });
    
    try{
        await client.connect();
        const cachedCharacters = await client.get('characters');
        
        if(cachedCharacters){{
            console.log('Datos obtenidos de redis');
            console.log(cachedCharacters);
        }
        const response = await axios.get('https://rickandmortyapi.com/api/character');
        await client.set('characters',JSON.stringify(response.data));
        console.log('Datos guardados en redis');
        res.json(response.data);
    }}catch(err){
        console.log(err);
        res.status(500).send('Internal server error');
    }finally{
        await client.quit();
    };
}

module.exports ={
    list
}