// ////////PERFECT TILL HERE////////PERFECT TILL HERE////////PERFECT TILL HERE////////PERFECT TILL HERE////////PERFECT TILL HERE////////PERFECT TILL HERE
// // src/utils/loadTester.js
// import axios from 'axios';

// class LoadTester {
//   constructor() {
//     this.results = {
    
//       totalRequests: 0,
//       successfulRequests: 0,
//       failedRequests: 0,
//       totalTime: 0,
//       averageResponseTime: 0,
//       minResponseTime: Infinity,
//       maxResponseTime: 0,
//       statusCodes: {},
//       timeSeriesData: [],
//       errors: [],
//       percentiles: {
//         p50: 0,
//         p75: 0,
//         p90: 0,
//         p99: 0
//       },
//       requestsPerSecond: 0
//     };
//   }

//   calculatePercentiles(responseTimes) {
//     const sorted = responseTimes.sort((a, b) => a - b);
//     const len = sorted.length;
    
//     return {
//       p50: sorted[Math.floor(len * 0.5)],
//       p75: sorted[Math.floor(len * 0.75)],
//       p90: sorted[Math.floor(len * 0.90)],
//       p99: sorted[Math.floor(len * 0.99)]
//     };
//   }

//   async runLoadTest({
//     url,
//     method = 'GET',
//     headers = {},
//     body = null,
//     numberOfRequests = 100,
//     concurrentUsers = 10,
//     requestDelay = 100,
//   }) {
//     this.resetResults();
//     const startTime = Date.now();
//     const requests = [];
//     const responseTimes = [];
//     let completedRequests = 0;

//     for (let i = 0; i < numberOfRequests; i += concurrentUsers) {
//       const batchSize = Math.min(concurrentUsers, numberOfRequests - i);
//       const batchRequests = Array(batchSize).fill().map(async () => {
//         const requestStartTime = Date.now();
        
//         try {
//           const response = await axios({
//             method,
//             url,
//             headers,
//             data: body,
//             timeout: 30000,
//           });

//           const responseTime = Date.now() - requestStartTime;
//           responseTimes.push(responseTime);
          
//           this.updateResults({
//             success: true,
//             statusCode: response.status,
//             responseTime,
//             timestamp: Date.now(),
//           });
//         } catch (error) {
//           const responseTime = Date.now() - requestStartTime;
//           responseTimes.push(responseTime);
          
//           this.updateResults({
//             success: false,
//             statusCode: error.response?.status || 0,
//             responseTime,
//             timestamp: Date.now(),
//             error: error.message,
//           });
//         }

//         completedRequests++;
//       });

//       requests.push(...batchRequests);
//       await new Promise(resolve => setTimeout(resolve, requestDelay));
//     }

//     await Promise.all(requests);
    
//     const totalTime = Date.now() - startTime;
//     this.results.totalTime = totalTime;
//     this.results.averageResponseTime = responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length;
//     this.results.requestsPerSecond = (numberOfRequests / (totalTime / 1000));
//     this.results.percentiles = this.calculatePercentiles(responseTimes);

//     return this.results;
//   }

//   async runStressTest({
//     url,
//     method = 'GET',
//     headers = {},
//     body = null,
//     initialUsers = 10,
//     maxUsers = 100,
//     stepSize = 10,
//     requestsPerUser = 10,
//     timeBetweenSteps = 5000, // 5 seconds between increasing users
//   }) {
//     this.resetResults();
//     const stressTestResults = [];

//     for (let users = initialUsers; users <= maxUsers; users += stepSize) {
//       const stepResult = await this.runLoadTest({
//         url,
//         method,
//         headers,
//         body,
//         numberOfRequests: users * requestsPerUser,
//         concurrentUsers: users,
//       });

//       stressTestResults.push({
//         users,
//         ...stepResult,
//       });

//       await new Promise(resolve => setTimeout(resolve, timeBetweenSteps));
//     }

//     return stressTestResults;
//   }

//   resetResults() {
//     this.results = {
//       totalRequests: 0,
//       successfulRequests: 0,
//       failedRequests: 0,
//       totalTime: 0,
//       averageResponseTime: 0,
//       minResponseTime: Infinity,
//       maxResponseTime: 0,
//       statusCodes: {},
//       timeSeriesData: [],
//       errors: [],
//       progress: 0,
//     };
//   }

//   updateResults({ success, statusCode, responseTime, timestamp, error = null }) {
//     this.results.totalRequests++;
    
//     if (success) {
//       this.results.successfulRequests++;
//     } else {
//       this.results.failedRequests++;
//       this.results.errors.push(error);
//     }

//     this.results.statusCodes[statusCode] = (this.results.statusCodes[statusCode] || 0) + 1;
//     this.results.minResponseTime = Math.min(this.results.minResponseTime, responseTime);
//     this.results.maxResponseTime = Math.max(this.results.maxResponseTime, responseTime);

//     this.results.timeSeriesData.push({
//       timestamp,
//       responseTime,
//       success,
//     });
//   }
// }

// export default LoadTester;


// // ////////PERFECT TILL HERE////////PERFECT TILL HERE////////PERFECT TILL HERE////////PERFECT TILL HERE////////PERFECT TILL HERE////////PERFECT TILL HERE////////PERFECT TILL HERE////////PERFECT TILL HERE////////PERFECT TILL HERE


// ////////PERFECT TILL HERE////////PERFECT TILL HERE////////PERFECT TILL HERE////////PERFECT TILL HERE////////PERFECT TILL HERE////////PERFECT TILL HERE
//src/utils/loadTester.js
import axios from 'axios';

class LoadTester {
  constructor() {
    this.results = {
    
      totalRequests: 0,
      successfulRequests: 0,
      failedRequests: 0,
      totalTime: 0,
      averageResponseTime: 0,
      minResponseTime: Infinity,
      maxResponseTime: 0,
      method: '',
      url: '',
      percentiles: {
        p50: 0,
        p75: 0,
        p90: 0,
        p95: 0,
        p99: 0
      },
      timeSeriesData: [],
      statusCodes: {},
      errors: [],
      requestsPerSecond: 0
    };
  }

  calculatePercentiles(responseTimes) {
    const sorted = responseTimes.sort((a, b) => a - b);
    const len = sorted.length;
    
    return {
      p50: sorted[Math.floor(len * 0.5)] || 0,
      p75: sorted[Math.floor(len * 0.75)] || 0,
      p90: sorted[Math.floor(len * 0.90)] || 0,
      p95: sorted[Math.floor(len * 0.95)] || 0,
      p99: sorted[Math.floor(len * 0.99)] || 0
    };
  }

  async runLoadTest({
    url,
    method = 'GET',
    headers = {},
    body = null,
    numberOfRequests = 100,
    concurrentUsers = 10,
    requestDelay = 100,
  }) {
    this.resetResults();
    const startTime = Date.now();
    const requests = [];
    const responseTimes = [];
    let completedRequests = 0;

    for (let i = 0; i < numberOfRequests; i += concurrentUsers) {
      const batchSize = Math.min(concurrentUsers, numberOfRequests - i);
      const batchRequests = Array(batchSize).fill().map(async () => {
        const requestStartTime = Date.now();
        
        try {
          const response = await axios({
            method,
            url,
            headers,
            data: body,
            timeout: 30000,
          });

          const responseTime = Date.now() - requestStartTime;
          responseTimes.push(responseTime);
          
          this.updateResults({
            success: true,
            statusCode: response.status,
            responseTime,
            timestamp: Date.now(),
          });
        } catch (error) {
          const responseTime = Date.now() - requestStartTime;
          responseTimes.push(responseTime);
          
          this.updateResults({
            success: false,
            statusCode: error.response?.status || 0,
            responseTime,
            timestamp: Date.now(),
            error: error.message,
          });
        }

        completedRequests++;
      });

      requests.push(...batchRequests);
      await new Promise(resolve => setTimeout(resolve, requestDelay));
    }

    await Promise.all(requests);
    
    const totalTime = Date.now() - startTime;
    this.results.totalTime = totalTime;
    this.results.averageResponseTime = responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length;
    this.results.requestsPerSecond = (numberOfRequests / (totalTime / 1000));
    this.results.percentiles = this.calculatePercentiles(responseTimes);

    return this.results;
  }

  async runStressTest({
    url,
    method = 'GET',
    headers = {},
    body = null,
    initialUsers = 10,
    maxUsers = 100,
    stepSize = 10,
    requestsPerUser = 10,
    timeBetweenSteps = 5000, // 5 seconds between increasing users
  }) {
    this.resetResults();
    const stressTestResults = [];

    for (let users = initialUsers; users <= maxUsers; users += stepSize) {
      const stepResult = await this.runLoadTest({
        url,
        method,
        headers,
        body,
        numberOfRequests: users * requestsPerUser,
        concurrentUsers: users,
      });

      stressTestResults.push({
        users,
        ...stepResult,
      });

      await new Promise(resolve => setTimeout(resolve, timeBetweenSteps));
    }

    return stressTestResults;
  }

  resetResults() {
    this.results = {
      totalRequests: 0,
      successfulRequests: 0,
      failedRequests: 0,
      totalTime: 0,
      averageResponseTime: 0,
      minResponseTime: Infinity,
      maxResponseTime: 0,
      statusCodes: {},
      timeSeriesData: [],
      errors: [],
      progress: 0,
    };
  }

  updateResults({ success, statusCode, responseTime, timestamp, error = null }) {
    this.results.totalRequests++;
    
    if (success) {
      this.results.successfulRequests++;
    } else {
      this.results.failedRequests++;
      this.results.errors.push(error);
    }

    this.results.statusCodes[statusCode] = (this.results.statusCodes[statusCode] || 0) + 1;
    this.results.minResponseTime = Math.min(this.results.minResponseTime, responseTime);
    this.results.maxResponseTime = Math.max(this.results.maxResponseTime, responseTime);

    this.results.timeSeriesData.push({
      timestamp,
      responseTime,
      success,
    });
  }
}

export default LoadTester;
