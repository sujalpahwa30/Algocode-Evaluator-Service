import { Job , Worker } from "bullmq";

import redisConnection from "../config/redisConfig";
import SampleJob from "../jobs/SampleJob";

export default function SampleWorker(queueName : string) {
    new Worker(
        queueName,
        async(job : Job) => {
            if(job.name === "SampleJob") {
                console.log("Sample job worker kicking" , job);
                const sampleJobInstance = new SampleJob(job.data);

                sampleJobInstance.handle(job);

                return true;
            }
        },
        {
            connection : redisConnection
        }
    );
}