const mongoose = require('mongoose');

async function connect() {
  try {
    await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern-ilearn.eff8o.mongodb.net/mern-ilearn?retryWrites=true&w=majority`);
    console.log('Connect successfully!');
  } catch (error) {
    console.log('Connect failure!');
    console.log(error.message);
    process.exit(1);
  }
}

module.exports = { connect };
