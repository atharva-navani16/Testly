// // ////////PERFECT TILL HERE////////PERFECT TILL HERE////////PERFECT TILL HERE////////PERFECT TILL HERE////////PERFECT TILL HERE
// import React from 'react';
// import { 
//   LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
//   BarChart, Bar, PieChart, Pie, Cell, ComposedChart 
// } from 'recharts';

// const LoadTestResults = ({ results }) => {
//   const COLORS = ['#00C49F', '#FF8042', '#0088FE', '#FFBB28'];

//   // Prepare data for various charts
//   const percentileData = [
//     { name: 'Min', value: results.minResponseTime },
//     { name: 'P50', value: results.percentiles.p50 },
//     { name: 'P75', value: results.percentiles.p75 },
//     { name: 'P90', value: results.percentiles.p90 },
//     { name: 'P99', value: results.percentiles.p99 },
//     { name: 'Max', value: results.maxResponseTime }
//   ];

//   const statusCodeData = Object.entries(results.statusCodes).map(([code, count]) => ({
//     name: `Status ${code}`, value: count
//   }));

//   const performanceMetrics = [
//     { name: 'Avg Response', value: results.averageResponseTime.toFixed(2) },
//     { name: 'Min Response', value: results.minResponseTime.toFixed(2) },
//     { name: 'Max Response', value: results.maxResponseTime.toFixed(2) }
//   ];

//   return (
//     <div className="bg-white shadow-lg rounded-lg p-6 space-y-6">
//       <h2 className="text-2xl font-bold mb-4 text-gray-800">Load Test Insights</h2>

//       {/* Summary Metrics Grid */}
//       <div className="grid grid-cols-4 gap-4 mb-6">
//         <MetricCard 
//           title="Total Requests" 
//           value={results.totalRequests} 
//           color="bg-blue-100 text-blue-800" 
//         />
//         <MetricCard 
//           title="Success Rate" 
//           value={`${((results.successfulRequests / results.totalRequests) * 100).toFixed(1)}%`} 
//           color="bg-green-100 text-green-800" 
//         />
//         <MetricCard 
//           title="Requests/Second" 
//           value={results.requestsPerSecond.toFixed(1)} 
//           color="bg-purple-100 text-purple-800" 
//         />
//         <MetricCard 
//           title="Total Duration" 
//           value={`${(results.totalTime / 1000).toFixed(2)}s`} 
//           color="bg-red-100 text-red-800" 
//         />
//       </div>

//       {/* Charts Section */}
//       <div className="grid grid-cols-2 gap-6">
//         {/* Response Time Distribution */}
//         <div className="bg-gray-50 p-4 rounded-lg">
//           <h3 className="text-lg font-semibold mb-4 text-gray-700">Response Time Percentiles</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={percentileData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="value" fill="#8884d8" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Status Code Distribution */}
//         <div className="bg-gray-50 p-4 rounded-lg">
//           <h3 className="text-lg font-semibold mb-4 text-gray-700">Status Code Distribution</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//               <Pie
//                 data={statusCodeData}
//                 innerRadius={60}
//                 outerRadius={80}
//                 fill="#8884d8"
//                 dataKey="value"
//                 label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
//               >
//                 {statusCodeData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Response Time Series */}
//         <div className="bg-gray-50 p-4 rounded-lg col-span-2">
//           <h3 className="text-lg font-semibold mb-4 text-gray-700">Response Time Series</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <ComposedChart data={results.timeSeriesData}>
//               <XAxis dataKey="timestamp" />
//               <YAxis />
//               <Tooltip />
//               <CartesianGrid stroke="#f5f5f5" />
//               <Line type="monotone" dataKey="responseTime" stroke="#ff7300" />
//             </ComposedChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       {/* Errors Section */}
//       {results.errors.length > 0 && (
//         <div className="mt-6 bg-red-50 p-4 rounded-lg">
//           <h3 className="text-lg font-semibold mb-4 text-red-800">Error Summary</h3>
//           <ul className="list-disc pl-5 space-y-2">
//             {results.errors.slice(0, 5).map((error, index) => (
//               <li key={index} className="text-red-700">{error}</li>
//             ))}
//             {results.errors.length > 5 && (
//               <li className="text-red-700">
//                 ...and {results.errors.length - 5} more errors
//               </li>
//             )}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// // Helper component for metric cards
// const MetricCard = ({ title, value, color }) => (
//   <div className={`p-4 rounded-lg ${color}`}>
//     <div className="text-sm font-medium mb-1">{title}</div>
//     <div className="text-2xl font-bold">{value}</div>
//   </div>
// );

// export default LoadTestResults;


////////PERFECT TILL HERE////////PERFECT TILL HERE////////PERFECT TILL HERE////////PERFECT TILL HERE////////PERFECT TILL HERE////////PERFECT TILL HERE////////PERFECT TILL HERE////////PERFECT TILL HERE////////PERFECT TILL HERE////////PERFECT TILL HERE


import React, { useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  BarChart, Bar 
} from 'recharts';
import { AlertCircle, Clock, Activity, ArrowDown, ArrowUp } from 'lucide-react';

const LoadTestResults = ({ results }) => {
  const [activeTab, setActiveTab] = useState('statistics');
  const [showFullLogs, setShowFullLogs] = useState(false);

  const renderMetricsTable = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requests</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fails</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Median (ms)</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">95% (ms)</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg (ms)</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Min (ms)</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Max (ms)</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current RPS</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Failures</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{results.method}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{results.url}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{results.totalRequests}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{results.failedRequests}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{results.percentiles?.p50?.toFixed(1)}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{results.percentiles?.p95?.toFixed(1)}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{results.averageResponseTime.toFixed(1)}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{results.minResponseTime.toFixed(1)}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{results.maxResponseTime.toFixed(1)}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{results.requestsPerSecond.toFixed(2)}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{results.failedRequests}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const renderResponseTimeChart = () => (
    <div className="h-64 mt-6">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={results.timeSeriesData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="timestamp" 
            tickFormatter={(timestamp) => new Date(timestamp).toLocaleTimeString()} 
          />
          <YAxis />
          <Tooltip
            labelFormatter={(timestamp) => new Date(timestamp).toLocaleTimeString()}
            formatter={(value) => [`${value.toFixed(2)} ms`, 'Response Time']}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="responseTime" 
            stroke="#8884d8" 
            name="Response Time (ms)" 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );

  const renderErrorLogs = () => (
    <div className="mt-6">
      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-lg font-semibold">Error Logs</h3>
        <button
          onClick={() => setShowFullLogs(!showFullLogs)}
          className="text-blue-600 hover:text-blue-800"
        >
          {showFullLogs ? 'Show Less' : 'Show All'}
        </button>
      </div>
      <div className={`bg-gray-50 rounded-lg p-4 ${showFullLogs ? 'h-96' : 'h-48'} overflow-auto`}>
        {results.errors.length > 0 ? (
          results.errors.map((error, index) => (
            <div key={index} className="mb-2 p-2 bg-red-50 border-l-4 border-red-500 text-red-700">
              <div className="flex items-start">
                <AlertCircle className="mt-1 mr-2 h-4 w-4" />
                <div>
                  <span className="font-medium">Error {index + 1}:</span> {error}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-center">No errors recorded</div>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Load Test Results</h2>
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab('statistics')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'statistics' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Statistics
          </button>
          <button
            onClick={() => setActiveTab('charts')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'charts' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Charts
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'logs' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Logs
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center">
            <Activity className="h-6 w-6 text-blue-500 mr-2" />
            <div>
              <p className="text-sm text-gray-500">Total Requests</p>
              <p className="text-xl font-bold">{results.totalRequests}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center">
            <Clock className="h-6 w-6 text-green-500 mr-2" />
            <div>
              <p className="text-sm text-gray-500">Avg Response Time</p>
              <p className="text-xl font-bold">{results.averageResponseTime.toFixed(2)} ms</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center">
            <ArrowUp className="h-6 w-6 text-yellow-500 mr-2" />
            <div>
              <p className="text-sm text-gray-500">Max Response Time</p>
              <p className="text-xl font-bold">{results.maxResponseTime.toFixed(2)} ms</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center">
            <ArrowDown className="h-6 w-6 text-purple-500 mr-2" />
            <div>
              <p className="text-sm text-gray-500">Min Response Time</p>
              <p className="text-xl font-bold">{results.minResponseTime.toFixed(2)} ms</p>
            </div>
          </div>
        </div>
      </div>

      {activeTab === 'statistics' && renderMetricsTable()}
      {activeTab === 'charts' && renderResponseTimeChart()}
      {activeTab === 'logs' && renderErrorLogs()}
    </div>
  );
};

export default LoadTestResults;