const app = require('./servidor');
const mongoose = require('mongoose');
require('dotenv').config();

const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;

mongoose.connect(`// mongodb+srv://${DB_USER}:${DB_PASS}@api-cluster.prnmk.mongodb.net/bancodaapi?retryWrites=true&w=majority`)
    .then(() => {
        app.listen(3000);
        console.log('conectamos ao mongodb')

    })
    .catch(err => console.log(err));
