import express from 'express';
import middlelWare from './middleware';

const app = express();
const middlewarList = [
  middlelWare.validateMiddlewar,
  middlelWare.preparingMiddleware,
  middlelWare.ifCachedMiddlewar,
  middlelWare.isImageFoundMiddleware
];

app.use('/static', express.static('./front_end'));
app.get('/api/image', middlewarList);

app.listen(8000, () =>
  console.log(`started at http://localhost:8000/static/index.html`)
);
