////////PERFECT TILL HERE////////PERFECT TILL HERE////////PERFECT TILL HERE////////PERFECT TILL HERE////////PERFECT TILL HERE////////PERFECT TILL HERE////////PERFECT TILL HERE////////PERFECT TILL HERE
// "use client";
// import { useState } from 'react';
// import axios from 'axios';
// import LoadTester from '@/utils/loadTester';
// import LoadTestResults from '@/components/LoadTestResults';
// import ApiTesterClient from '@/components/ApiTesterClient';
// export default function Home() {
// const [testResults, setTestResults] = useState(null);
// const [loading, setLoading] = useState(false);
// const handleSendRequest = async (url, method, headers, body) => {
// try {
// const processedHeaders = headers.reduce((acc, curr) => {
// if (curr.key && curr.value) {
// acc[curr.key] = curr.value;
//  }
// return acc;
//  }, {});
// const response = await axios({
// method,
// url,
// headers: processedHeaders,
// data: body ? JSON.parse(body) : null
//  });
// return response.data;
//  } catch (error) {
// return error.response ? error.response.data : error.message;
//  }
//  };
// const handleRunTest = async (url, method, headers, body, numberOfRequests, concurrentUsers) => {
// setLoading(true);
// const loadTester = new LoadTester();
// try {
// const results = await loadTester.runLoadTest({
// url,
// method,
// headers: headers.reduce((acc, curr) => {
// if (curr.key && curr.value) {
// acc[curr.key] = curr.value;
//  }
// return acc;
//  }, {}),
// body: body ? JSON.parse(body) : null,
// numberOfRequests,
// concurrentUsers
//  });
// setTestResults(results);
//  } catch (error) {
// console.error('Test failed:', error);
//  }
// setLoading(false);
//  };
// return (
// <main className="min-h-screen">
// <ApiTesterClient
// onRunTest={handleRunTest}
// onSendRequest={handleSendRequest}
// />
// {loading && (
// <div className="p-4 text-center text-gray-600">
// <div className="animate-pulse">Running load tests...</div>
// </div>
//  )}
// {testResults && (
// <div className="p-4">
// <LoadTestResults results={testResults} />
// </div>
//  )}
// </main>
//  );
// }


"use client";
import { useState } from 'react';
import axios from 'axios';
import LoadTester from '@/utils/loadTester';
import LoadTestResults from '@/components/LoadTestResults';
import ApiTesterClient from '@/components/ApiTesterClient';

export default function Home() {
  const [testResults, setTestResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSendRequest = async (url, method, headers, body) => {
    try {
      const processedHeaders = headers.reduce((acc, curr) => {
        if (curr.key && curr.value) {
          acc[curr.key] = curr.value;
        }
        return acc;
      }, {});

      const response = await axios({
        method,
        url,
        headers: processedHeaders,
        data: body,
        // Handle FormData properly
        ...(body instanceof FormData ? { 
          headers: { 
            ...processedHeaders,
            'Content-Type': 'multipart/form-data' 
          }
        } : {})
      });

      return response.data;
    } catch (error) {
      return error.response ? error.response.data : error.message;
    }
  };

  const handleRunTest = async (url, method, headers, body, numberOfRequests, concurrentUsers) => {
    setLoading(true);
    const loadTester = new LoadTester();
    try {
      const results = await loadTester.runLoadTest({
        url,
        method,
        headers: headers.reduce((acc, curr) => {
          if (curr.key && curr.value) {
            acc[curr.key] = curr.value;
          }
          return acc;
        }, {}),
        body,
        numberOfRequests,
        concurrentUsers
      });
      setTestResults(results);
    } catch (error) {
      console.error('Test failed:', error);
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen">
      <ApiTesterClient
        onRunTest={handleRunTest}
        onSendRequest={handleSendRequest}
      />
      {loading && (
        <div className="p-4 text-center text-gray-600">
          <div className="animate-pulse">Running load tests...</div>
        </div>
      )}
      {testResults && (
        <div className="p-4">
          <LoadTestResults results={testResults} />
        </div>
      )}
    </main>
  );
}

////////PERFECT TILL HERE ////////PERFECT TILL HERE ////////PERFECT TILL HERE ////////PERFECT TILL HERE ////////PERFECT TILL HERE ////////PERFECT TILL HERE