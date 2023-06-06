const express = require('express');
const Brute = require('express-brute');
const RedisStore = require('express-brute-redis');
const redis = require('ioredis');

const redisClient = redis.createClient({
    host: 'localhost',
    port: 6379,
  });

  const store = new RedisStore({
    client: redisClient,
    prefix: 'brute:',
  });
  
  // Configure the `express-brute` middleware
  const loginBrute = new Brute(store, {
    freeRetries: 5, // Number of free retries allowed
    minWait: 5 * 60 * 1000, // Minimum waiting time after failed attempts (5 minute)
    maxWait: 5 * 60 * 1000, // Maximum waiting time after failed attempts (5 minute)
    lifetime: 60 * 60, // Block duration in seconds (1 hour)
  });

  const getUserLimit = new Brute(store, {
    freeRetries: 100, // Number of free retries allowed
    minWait: 1 * 60 * 1000, // Minimum waiting time after failed attempts (1 minute)
    maxWait: 1 * 60 * 1000, // Maximum waiting time after failed attempts (1 minute)
    lifetime: 60 * 60, // Block duration in seconds (1 hour)
  });


  module.exports = {loginBrute, getUserLimit, redisClient}