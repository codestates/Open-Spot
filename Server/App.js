const { swaggerUi, swaggerSpec } = require('./SwaggerDoc');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const markersRouter = require('./Routes/Markers');
const authRouter = require('./Routes/Auth');
const usersRouter = require('./Routes/Users');
const imageRouter = require('./Routes/Images');

const app = express();
const port = 80;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']
  })
);

app.get('/', (_, res) => res.send('Hello world'));
app.use('/markers', markersRouter);
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/image', imageRouter);
app.use(express.static('uploads'));

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
