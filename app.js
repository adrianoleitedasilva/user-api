const express = require('express');
const userRoutes = require('./routes/userRoutes');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'User API',
      description: 'User API Information',
      version: '1.0.0'
    }
  },
  apis: ['./routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use('/', userRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
