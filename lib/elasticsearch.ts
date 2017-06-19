import * as elasticsearch from "elasticsearch";

export const elasticClient = new elasticsearch.Client({  
    host: 'localhost:9200',
    log: 'debug',
    requestTimeout: 30000
});

// const creationRequest = {   
//     body: {
//         counter: 0
//     },
//     index: "counter",
//     type: "1.0.0",
//     id:"grrr"
// }

// async function runProgram() {
//     try {
//         const result = await elasticClient.create(creationRequest)
//         console.log(result);
//     }
//     catch(e) {
//         console.log(e)
//     }
// }

//runProgram();

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

//updateCounter(0,0);
// getCounterValue().then(x=>{
//     if (x === 55) console.log("asdfasdfasdf");
//     else console.log(x);
// })

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









// import * as request from "request-promise"

// async function runProgram() {
//     try {
//         const result = await request.get("http://localhost:9200");
//         console.log(result);

//         const result2 = await request.put("http://localhost:9200/counter/1.0.0/1",{json:
//         {
//             "counter" : 0
//         }})
//         console.log(result2);
//     }
//     catch(e) {
//         console.log(e)
//     }
// }

// runProgram();
