const Redis = require("ioredis");
// const redis = new Redis({
//     port:19853,
//     host:"redis-19853.c212.ap-south-1-1.ec2.cloud.redislabs.com",
//     username:"default",
//     password:"BXMig1g9nU7PnfcdYaiI2bFZwMrl0dl3",
//     db:0
// });

// module.exports={redis};


 const redis= require('redis');
const client=redis.createClient({url:process.env.redisURL});
client.on("error", (err) => console.log("Redis Client Error", err));






module.exports={client}