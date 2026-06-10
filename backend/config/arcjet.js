import arcjet, { shield, tokenBucket, detectBot } from "@arcjet/node";
import dotenv from 'dotenv';

dotenv.config();

const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
    shield({
      mode: process.env.NODE_ENV === 'production' ? 'LIVE' : 'DRY_RUN', 
    }),
    detectBot({
      mode: process.env.NODE_ENV === 'production' ? 'LIVE' : 'DRY_RUN', 
      allow: ['CATEGORY:SEARCH_ENGINE', 'CATEGORY:MONITOR', 'CATEGORY:PREVIEW']
    }),
    tokenBucket({
      mode: process.env.NODE_ENV === 'production' ? 'LIVE' : 'DRY_RUN', 
      interval: 5,
      refillRate: 30,
      capacity: 20
    })
  ]
});

export default aj;