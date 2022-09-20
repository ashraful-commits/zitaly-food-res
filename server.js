import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';

import expressLayout from 'express-ejs-layouts';
import { router } from './routes/pageRouter.js';

// dotenv config
dotenv.config();

// environment const
const port = process.env.PORT || 400;

// init express
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ejs
app.set('view engine', 'ejs');
// layout
app.use(expressLayout);
// layouts
app.set('layout', 'layouts/app');
// rotuer
app.use(router);
app.use(express.static('public'));

// sever creating
app.listen(port, () => {
  console.log(`server is running ${port}`.bgYellow);
});
