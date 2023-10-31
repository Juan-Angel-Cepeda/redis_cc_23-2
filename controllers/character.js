const express = require('express');
const axios = require('axios');
const redis = require('redis');

async function list(req,res,next){
    const client = redis.createClient({
        host:process.env.REDIS_HOST,
        port:process.env.REDIS_PORT
    });

    client.on('error',(err)=>{
        console.log('Error connecting to Redis',err);
    });
    
    try{
        await client.connect();
        const cachedCharacters = await client.get('characters');
        
        if(cachedCharacters){
            console.log('Datos obtenidos de redis');
            return res.json(JSON.parse(cachedCharacters));    
        }
        else{
            const response = await axios.get('https://rickandmortyapi.com/api/character');
            await client.set('characters',JSON.stringify(response.data));
            console.log('Datos guardados en redis');
            res.json(response.data);
        }
    }catch(err){
        console.log(err);
        res.status(500).send('Internal server error');
    }finally{
        await client.quit();
    };
}

async function get(req,res,next){
    id = req.params.id;
    const client = redis.createClient({
        host:process.env.REDIS_HOST,
        port:process.env.REDIS_PORT
    });

    client.on('error',(err)=>{
        console.log('Error connecting to Redis',err);
    });
    
    try{
        await client.connect();
        const cachedCharacter = await client.get(`characters/${id}`);
        
        if(cachedCharacter){
            console.log('Datos obtenidos de redis');
            return res.json(JSON.parse(cachedCharacter));    
        }
        else{
            const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
            await client.set(`characters/${id}`,JSON.stringify(response.data));
            console.log('Datos guardados en redis');
            res.json(response.data);
        }
    }catch(err){
        console.log(err);
        res.status(500).send('Internal server error',err);
    
    }finally{
        await client.quit();
    };
}

module.exports ={
    list,
    get
}