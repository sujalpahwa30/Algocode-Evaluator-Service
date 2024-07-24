
import bodyParser from "body-parser";
import express, { Express } from "express";

import serverConfig from "./config/serverConfig";
import sampleQueueProducer from "./producers/sampleQueueProducer";
import apiRouter from "./routes";
import SampleWorker from "./workers/SampleWorker";

const app: Express = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(bodyParser.text());

app.use('/api' , apiRouter);

app.listen(serverConfig.PORT, () => {
  console.log(`Server started at *:${serverConfig.PORT}`);

  SampleWorker('SampleQueue');

  sampleQueueProducer('SampleJob' , {
    name : "Sujal",
    company : "Google",
    position : "SDE 1",
    location : "Remote | BLR | Noida"
  } , 2);

  sampleQueueProducer('SampleJob' , {
    name : "Sanket",
    company : "Microsoft",
    position : "SDE 2 L 61",
    location : "Remote | BLR | Noida"
  } , 1);
});

