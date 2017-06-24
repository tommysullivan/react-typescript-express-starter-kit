import * as elasticsearch from "elasticsearch";

export const elasticClient = new elasticsearch.Client({  
    host: 'localhost:9200',
    log: 'debug',
    requestTimeout: 30000
});

export async function updateCounter(currentValue:number, increment:number) {
    await elasticClient.index({
        index: 'counter',
        type: '1.0.0',
        id: 'grrr',
        body: {
            counter: currentValue + increment
        }
    });
}

export async function getCounterValue() {
    const test = await elasticClient.get({
        index: 'counter',
        type: '1.0.0',
        id: 'grrr'
    });
    //console.log(test._source['counter']);
    return test._source['counter'];
}

// elasticClient.ping({
//   requestTimeout: 30000,
// }, function (error) {
//   if (error) {
//     console.error('elasticsearch cluster is down!');
//   } else {
//     console.log('All is well');
//   }
// });

// elasticClient.cluster.health({},function(err:any,resp:any) {  
//   console.log("-- Client Health --",resp);
// });