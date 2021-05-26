require("dotenv/config");

const devConfig = {
  "name": "default",
  "type": "mongodb",
  "host": "localhost",
  "port": 27017,
  "database": "vaibem",
  "useUnifiedTopology": true,
  "entities": [
    "./src/schemas/*.ts"
  ],
  "logging": true
}

const config = {
  "name": "default",
  "type": "mongodb",
  "url": process.env.MONGODB_URL,
  "database": "vaibem",
  "useUnifiedTopology": true,
  "entities": [
    "./src/schemas/*.ts"
  ],
  // "useNewUrlParser": true,
  // "synchronize": true,
  "logging": false, // "all", true 
}

// process.env.NODE_ENV === 'development' ? console.log(devConfig) : console.log(config);

module.exports = process.env.NODE_ENV === 'development' ? devConfig : config;