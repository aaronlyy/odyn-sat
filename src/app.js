import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';

import routerRecords from './router/records.router.js';

// create app
const app = express();

// express middlware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// third party middleware
app.use(morgan('tiny'));
app.use(helmet());

// router
app.use('/records', routerRecords);

// run app
app.listen(process.env.PORT || 3000, () => {
  console.log(`App listening on port ${process.env.PORT || 3000}`);
}) 