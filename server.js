require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const errorHandler = require('./middleware/errorHandler');
const mongoose = require('mongoose');


const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);

// Error Handling
app.use(errorHandler);

// MongoDB Connection
mongoose.connect(process.env.mongo_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 60000, // 60 seconds
}).then(() => { console.log('connected') }).catch(error=>console.log(error));

app.listen(5000, () => console.log('Server running on port 5000'));
