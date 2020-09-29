const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Amazon Fake API',
      description: 'This application contains fake apis.',
      contact: {
        name: 'Juan Carlos',
        url: 'https://github.com/jcarlosverase',
        email: 'jcarlosverase@gmail.com'
      },
    },
    host: 'amazon-fake-api.herokuapp.com',
    basePath: '/v1',
    servers: [ 
      {
        url: "http://localhost:5000",
        description: "Local server"
      },
      {
        url: "https://amazon-fake-api.herokuapp.com",
        description: "Heroku server"
      }
    ]
  },
  apis: ['routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB connection OK");
})

const productsRouter = require('./routes/products');

app.use('/v1/products', productsRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
