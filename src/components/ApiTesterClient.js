////////PERFECT TILL HERE////////PERFECT TILL HERE////////PERFECT TILL HERE////////PERFECT TILL HERE////////PERFECT TILL HERE////////PERFECT TILL HERE////////PERFECT TILL HERE////////PERFECT TILL HERE
// import React, { useState, useEffect } from 'react';
// import { 
//   Send, Menu, Code, Table, BarChart2, 
//   CloudLightning, Zap, Layers, 
//   ArrowUpRight, AlertTriangle, 
//   CheckCircle, XCircle 
// } from 'lucide-react';

// const ApiTesterClient = ({ onRunTest, onSendRequest }) => {
//   const [method, setMethod] = useState('GET');
//   const [url, setUrl] = useState('');
//   const [headers, setHeaders] = useState([{ key: '', value: '' }]);
//   const [body, setBody] = useState('');
//   const [response, setResponse] = useState(null);
//   const [testResults, setTestResults] = useState(null);
//   const [activeTab, setActiveTab] = useState('params');
//   const [numberOfRequests, setNumberOfRequests] = useState(100);
//   const [concurrentUsers, setConcurrentUsers] = useState(10);
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   const lightColors = {
//     bg: 'bg-[#F2F9FF]',
//     header: 'bg-[#FBF8EF]',
//     text: 'text-[#000957]',
//     accent: 'bg-[#344CB7]'
//   };

//   const darkColors = {
//     bg: 'bg-[#000957]',
//     header: 'bg-[#344CB7]',
//     text: 'text-white',
//     accent: 'bg-[#344CB7]'
//   };

//   const currentColors = isDarkMode ? darkColors : lightColors;

//   const toggleTheme = () => {
//     setIsDarkMode(!isDarkMode);
//     localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light');
//   };

//   useEffect(() => {
//     const savedTheme = localStorage.getItem('theme');
//     if (savedTheme) {
//       setIsDarkMode(savedTheme === 'dark');
//     }
//   }, []);

//   const handleSendRequest = async () => {
//     const response = await onSendRequest(url, method, headers, body);
//     setResponse(response);
//   };

//   const handleRunLoadTest = async () => {
//     const results = await onRunTest(url, method, headers, body, numberOfRequests, concurrentUsers);
//     setTestResults(results);
//   };

//   return (
//     <div className={`flex h-screen ${currentColors.bg} ${currentColors.text}`}>
//       {/* Sidebar */}
//       <div className={`w-16 ${isDarkMode ? 'bg-[#000957]' : 'bg-[#344CB7]'} flex flex-col items-center py-4`}>
//         <button className="mb-4 text-white hover:opacity-80">
//           <Code size={24} />
//         </button>
//         <button className="mb-4 text-white hover:opacity-80" onClick={toggleTheme}>
//           {isDarkMode ? '☀️' : '🌙'}
//         </button>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col">
//         {/* Request Builder */}
//         <div className={`${currentColors.header} border-b p-4`}>
//           <div className="flex items-center space-x-2">
//             <select 
//               value={method}
//               onChange={(e) => setMethod(e.target.value)}
//               className={`border rounded px-2 py-1 ${isDarkMode ? 'bg-[#344CB7] text-white' : 'bg-white'}`}
//             >
//               <option>GET</option>
//               <option>POST</option>
//               <option>PUT</option>
//               <option>DELETE</option>
//               <option>PATCH</option>
//             </select>
//             <input 
//               type="text"
//               value={url}
//               onChange={(e) => setUrl(e.target.value)}
//               placeholder="Enter request URL"
//               className={`flex-1 border rounded px-3 py-1 ${isDarkMode ? 'bg-[#344CB7] text-white' : 'bg-white'}`}
//             />
//             <div className="flex space-x-2">
//               <button 
//                 onClick={handleSendRequest}
//                 className={`${currentColors.accent} text-white px-4 py-1 rounded flex items-center hover:opacity-90`}
//               >
//                 <Send size={16} className="mr-2" /> Send
//               </button>
//               <button 
//                 onClick={handleRunLoadTest}
//                 className={`${currentColors.accent} text-white px-4 py-1 rounded flex items-center hover:opacity-90`}
//               >
//                 <Zap size={16} className="mr-2" /> Load Test
//               </button>
//             </div>
//           </div>

//           {/* Configuration */}
//           <div className="mt-4 flex space-x-4">
//             <div className="flex items-center space-x-2">
//               <label>Requests:</label>
//               <input 
//                 type="number"
//                 value={numberOfRequests}
//                 onChange={(e) => setNumberOfRequests(Number(e.target.value))}
//                 min="1"
//                 max="1000"
//                 className={`w-24 border rounded px-2 py-1 ${isDarkMode ? 'bg-[#344CB7] text-white' : 'bg-white'}`}
//               />
//             </div>
//             <div className="flex items-center space-x-2">
//               <label>Concurrent Users:</label>
//               <input 
//                 type="number"
//                 value={concurrentUsers}
//                 onChange={(e) => setConcurrentUsers(Number(e.target.value))}
//                 min="1"
//                 max="100"
//                 className={`w-24 border rounded px-2 py-1 ${isDarkMode ? 'bg-[#344CB7] text-white' : 'bg-white'}`}
//               />
//             </div>
//           </div>
//         </div>

//         {/* Content Area */}
//         <div className="flex flex-1">
//           {/* Response Section */}
//           <div className={`w-1/2 border-r p-4 overflow-auto ${isDarkMode ? 'bg-[#000957]' : 'bg-white'}`}>
//             <div className="mb-4">
//               <div className="flex space-x-4 border-b pb-2">
//                 {['Params', 'Headers', 'Body', 'Tests'].map(tab => (
//                   <button 
//                     key={tab} 
//                     onClick={() => setActiveTab(tab.toLowerCase())}
//                     className={`${activeTab === tab.toLowerCase() ? 'text-[#344CB7] border-b-2 border-[#344CB7]' : 'text-gray-500'}`}
//                   >
//                     {tab}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Response Display */}
//             <div className={`border rounded p-4 h-96 overflow-auto ${isDarkMode ? 'bg-[#344CB7] text-white' : 'bg-gray-50'}`}>
//               <pre className="text-sm">{JSON.stringify(response, null, 2) || 'No response yet'}</pre>
//             </div>
//           </div>

//           {/* Load Test Results */}
//           <div className={`w-1/2 p-4 ${isDarkMode ? 'bg-[#000957]' : 'bg-white'}`}>
//             {testResults ? (
//               <div>
//                 <div className="grid grid-cols-2 gap-4 mb-4">
//                   <div className={`p-3 rounded flex items-center ${isDarkMode ? 'bg-[#344CB7] text-white' : 'bg-blue-100'}`}>
//                     <BarChart2 className="mr-2" />
//                     <div>
//                       <div className="text-sm">Total Requests</div>
//                       <div className="font-bold">{testResults.totalRequests}</div>
//                     </div>
//                   </div>
//                   <div className={`p-3 rounded flex items-center ${isDarkMode ? 'bg-[#344CB7] text-white' : 'bg-green-100'}`}>
//                     <CheckCircle className="mr-2" />
//                     <div>
//                       <div className="text-sm">Success Rate</div>
//                       <div className="font-bold">
//                         {((testResults.successfulRequests / testResults.totalRequests) * 100).toFixed(1)}%
//                       </div>
//                     </div>
//                   </div>
//                   <div className={`p-3 rounded flex items-center ${isDarkMode ? 'bg-[#344CB7] text-white' : 'bg-yellow-100'}`}>
//                     <Layers className="mr-2" />
//                     <div>
//                       <div className="text-sm">Avg Response Time</div>
//                       <div className="font-bold">{testResults.averageResponseTime.toFixed(2)}ms</div>
//                     </div>
//                   </div>
//                   <div className={`p-3 rounded flex items-center ${isDarkMode ? 'bg-[#344CB7] text-white' : 'bg-red-100'}`}>
//                     <AlertTriangle className="mr-2" />
//                     <div>
//                       <div className="text-sm">Failed Requests</div>
//                       <div className="font-bold">{testResults.failedRequests}</div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Error Details */}
//                 {testResults.errors.length > 0 && (
//                   <div className={`border-l-4 border-red-500 p-3 mb-4 ${isDarkMode ? 'bg-[#344CB7] text-white' : 'bg-red-50'}`}>
//                     <div className="font-semibold mb-2">Error Details</div>
//                     <ul className="text-sm">
//                       {testResults.errors.slice(0, 5).map((error, index) => (
//                         <li key={index} className="mb-1">{error}</li>
//                       ))}
//                       {testResults.errors.length > 5 && (
//                         <li>...and {testResults.errors.length - 5} more</li>
//                       )}
//                     </ul>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <div className="text-center">
//                 Run a load test to see detailed metrics
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ApiTesterClient;


import React, { useState, useEffect } from 'react';
import { 
  Send, Menu, Code, Table, BarChart2, 
  CloudLightning, Zap, Layers, 
  ArrowUpRight, AlertTriangle, 
  CheckCircle, XCircle 
} from 'lucide-react';

const ApiTesterClient = ({ onRunTest, onSendRequest }) => {
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('');
  const [headers, setHeaders] = useState([{ key: '', value: '' }]);
  const [bodyType, setBodyType] = useState('none');
  const [jsonBody, setJsonBody] = useState('');
  const [formData, setFormData] = useState([{ key: '', value: '', type: 'text' }]);
  const [rawBody, setRawBody] = useState('');
  const [response, setResponse] = useState(null);
  const [testResults, setTestResults] = useState(null);
  const [activeTab, setActiveTab] = useState('params');
  const [numberOfRequests, setNumberOfRequests] = useState(100);
  const [concurrentUsers, setConcurrentUsers] = useState(10);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const lightColors = {
    bg: 'bg-[#F2F9FF]',
    header: 'bg-[#FBF8EF]',
    text: 'text-[#000957]',
    accent: 'bg-[#344CB7]'
  };

  const darkColors = {
    bg: 'bg-[#000957]',
    header: 'bg-[#344CB7]',
    text: 'text-white',
    accent: 'bg-[#344CB7]'
  };

  const currentColors = isDarkMode ? darkColors : lightColors;

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light');
  };

  const addHeader = () => {
    setHeaders([...headers, { key: '', value: '' }]);
  };

  const removeHeader = (index) => {
    const newHeaders = headers.filter((_, i) => i !== index);
    setHeaders(newHeaders);
  };

  const updateHeader = (index, field, value) => {
    const newHeaders = [...headers];
    newHeaders[index][field] = value;
    setHeaders(newHeaders);
  };

  const addFormDataField = () => {
    setFormData([...formData, { key: '', value: '', type: 'text' }]);
  };

  const removeFormDataField = (index) => {
    const newFormData = formData.filter((_, i) => i !== index);
    setFormData(newFormData);
  };

  const updateFormData = (index, field, value) => {
    const newFormData = [...formData];
    newFormData[index][field] = value;
    setFormData(newFormData);
  };

  const getRequestBody = () => {
    switch (bodyType) {
      case 'json':
        try {
          return JSON.parse(jsonBody);
        } catch (e) {
          return null;
        }
      case 'formData':
        const formDataObj = new FormData();
        formData.forEach(field => {
          if (field.key && field.value) {
            if (field.type === 'file' && field.value instanceof File) {
              formDataObj.append(field.key, field.value);
            } else {
              formDataObj.append(field.key, field.value);
            }
          }
        });
        return formDataObj;
      case 'raw':
        return rawBody;
      default:
        return null;
    }
  };

  const handleSendRequest = async () => {
    const requestBody = getRequestBody();
    const response = await onSendRequest(url, method, headers, requestBody);
    setResponse(response);
  };

  const handleRunLoadTest = async () => {
    const requestBody = getRequestBody();
    const results = await onRunTest(url, method, headers, requestBody, numberOfRequests, concurrentUsers);
    setTestResults(results);
  };
  

  const renderBodyInput = () => {
    switch (bodyType) {
      case 'json':
        return (
          <textarea
            value={jsonBody}
            onChange={(e) => setJsonBody(e.target.value)}
            placeholder="Enter JSON body"
            className={`w-full h-48 p-2 font-mono text-sm border rounded ${isDarkMode ? 'bg-[#344CB7] text-white' : 'bg-white'}`}
          />
        );
      case 'formData':
        return (
          <div className="space-y-2">
            {formData.map((field, index) => (
              <div key={index} className="flex space-x-2">
                <input
                  type="text"
                  value={field.key}
                  onChange={(e) => updateFormData(index, 'key', e.target.value)}
                  placeholder="Key"
                  className={`flex-1 border rounded px-2 py-1 ${isDarkMode ? 'bg-[#344CB7] text-white' : 'bg-white'}`}
                />
                {field.type === 'file' ? (
                  <input
                    type="file"
                    onChange={(e) => updateFormData(index, 'value', e.target.files[0])}
                    className={`flex-1 ${isDarkMode ? 'text-white' : ''}`}
                  />
                ) : (
                  <input
                    type="text"
                    value={field.value}
                    onChange={(e) => updateFormData(index, 'value', e.target.value)}
                    placeholder="Value"
                    className={`flex-1 border rounded px-2 py-1 ${isDarkMode ? 'bg-[#344CB7] text-white' : 'bg-white'}`}
                  />
                )}
                <select
                  value={field.type}
                  onChange={(e) => updateFormData(index, 'type', e.target.value)}
                  className={`border rounded px-2 py-1 ${isDarkMode ? 'bg-[#344CB7] text-white' : 'bg-white'}`}
                >
                  <option value="text">Text</option>
                  <option value="file">File</option>
                </select>
                <button
                  onClick={() => removeFormDataField(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              onClick={addFormDataField}
              className={`${currentColors.accent} text-white px-3 py-1 rounded text-sm`}
            >
              Add Field
            </button>
          </div>
        );
      case 'raw':
        return (
          <textarea
            value={rawBody}
            onChange={(e) => setRawBody(e.target.value)}
            placeholder="Enter raw body"
            className={`w-full h-48 p-2 font-mono text-sm border rounded ${isDarkMode ? 'bg-[#344CB7] text-white' : 'bg-white'}`}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={`flex h-screen ${currentColors.bg} ${currentColors.text}`}>
      <div className={`w-16 ${isDarkMode ? 'bg-[#000957]' : 'bg-[#344CB7]'} flex flex-col items-center py-4`}>
        <button className="mb-4 text-white hover:opacity-80">
          <Code size={24} />
        </button>
        <button className="mb-4 text-white hover:opacity-80" onClick={toggleTheme}>
          {isDarkMode ? '☀️' : '🌙'}
        </button>
      </div>

      <div className="flex-1 flex flex-col">
        <div className={`${currentColors.header} border-b p-4`}>
          <div className="flex items-center space-x-2">
            <select 
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className={`border rounded px-2 py-1 ${isDarkMode ? 'bg-[#344CB7] text-white' : 'bg-white'}`}
            >
              <option>GET</option>
              <option>POST</option>
              <option>PUT</option>
              <option>DELETE</option>
              <option>PATCH</option>
            </select>
            <input 
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter request URL"
              className={`flex-1 border rounded px-3 py-1 ${isDarkMode ? 'bg-[#344CB7] text-white' : 'bg-white'}`}
            />
            <div className="flex space-x-2">
              <button 
                onClick={handleSendRequest}
                className={`${currentColors.accent} text-white px-4 py-1 rounded flex items-center hover:opacity-90`}
              >
                <Send size={16} className="mr-2" /> Send
              </button>
              <button 
                onClick={handleRunLoadTest}
                className={`${currentColors.accent} text-white px-4 py-1 rounded flex items-center hover:opacity-90`}
              >
                <Zap size={16} className="mr-2" /> Load Test
              </button>
            </div>
          </div>

          <div className="mt-4 flex space-x-4">
            <div className="flex items-center space-x-2">
              <label>Requests:</label>
              <input 
                type="number"
                value={numberOfRequests}
                onChange={(e) => setNumberOfRequests(Number(e.target.value))}
                min="1"
                max="1000"
                className={`w-24 border rounded px-2 py-1 ${isDarkMode ? 'bg-[#344CB7] text-white' : 'bg-white'}`}
              />
            </div>
            <div className="flex items-center space-x-2">
              <label>Concurrent Users:</label>
              <input 
                type="number"
                value={concurrentUsers}
                onChange={(e) => setConcurrentUsers(Number(e.target.value))}
                min="1"
                max="100"
                className={`w-24 border rounded px-2 py-1 ${isDarkMode ? 'bg-[#344CB7] text-white' : 'bg-white'}`}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-1">
          <div className={`w-1/2 border-r p-4 overflow-auto ${isDarkMode ? 'bg-[#000957]' : 'bg-white'}`}>
            <div className="mb-4">
              <div className="flex space-x-4 border-b pb-2">
                {['Headers', 'Body', 'Tests'].map(tab => (
                  <button 
                    key={tab} 
                    onClick={() => setActiveTab(tab.toLowerCase())}
                    className={`${activeTab === tab.toLowerCase() ? 'text-[#344CB7] border-b-2 border-[#344CB7]' : 'text-gray-500'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {activeTab === 'headers' && (
                <div className="mt-4 space-y-2">
                  {headers.map((header, index) => (
                    <div key={index} className="flex space-x-2">
                      <input
                        type="text"
                        value={header.key}
                        onChange={(e) => updateHeader(index, 'key', e.target.value)}
                        placeholder="Header"
                        className={`flex-1 border rounded px-2 py-1 ${isDarkMode ? 'bg-[#344CB7] text-white' : 'bg-white'}`}
                      />
                      <input
                        type="text"
                        value={header.value}
                        onChange={(e) => updateHeader(index, 'value', e.target.value)}
                        placeholder="Value"
                        className={`flex-1 border rounded px-2 py-1 ${isDarkMode ? 'bg-[#344CB7] text-white' : 'bg-white'}`}
                      />
                      <button
                        onClick={() => removeHeader(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={addHeader}
                    className={`${currentColors.accent} text-white px-3 py-1 rounded text-sm`}
                  >
                    Add Header
                  </button>
                </div>
              )}

              {activeTab === 'body' && (
                <div className="mt-4">
                  <select
                    value={bodyType}
                    onChange={(e) => setBodyType(e.target.value)}
                    className={`w-full mb-2 border rounded px-2 py-1 ${isDarkMode ? 'bg-[#344CB7] text-white' : 'bg-white'}`}
                  >
                    <option value="none">None</option>
                    <option value="json">JSON</option>
                    <option value="formData">Form Data</option>
                    <option value="raw">Raw</option>
                  </select>
                  {renderBodyInput()}
                </div>
              )}
            </div>

            <div className={`border rounded p-4 h-96 overflow-auto ${isDarkMode ? 'bg-[#344CB7] text-white' : 'bg-gray-50'}`}>
              <pre className="text-sm">{JSON.stringify(response, null, 2) || 'No response yet'}</pre>
            </div>
          </div>

          <div className={`w-1/2 p-4 ${isDarkMode ? 'bg-[#000957]' : 'bg-white'}`}>
            {testResults ? (
              <div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className={`p-3 rounded flex items-center ${isDarkMode ? 'bg-[#344CB7] text-white' : 'bg-blue-100'}`}>
                    <BarChart2 className="mr-2" />
                    <div>
                      <div className="text-sm">Total Requests</div>
                      <div className="font-bold">{testResults.totalRequests}</div>
                    </div>
                  </div>
                  <div className={`p-3 rounded flex items-center ${isDarkMode ? 'bg-[#344CB7] text-white' : 'bg-green-100'}`}>
                    <CheckCircle className="mr-2" />
                    <div>
                      <div className="text-sm"></div>
                      <div className="text-sm">Success Rate</div>
                      <div className="font-bold">
                        {((testResults.successfulRequests / testResults.totalRequests) * 100).toFixed(1)}%
                      </div>
                    </div>
                  </div>
                  <div className={`p-3 rounded flex items-center ${isDarkMode ? 'bg-[#344CB7] text-white' : 'bg-yellow-100'}`}>
                    <Layers className="mr-2" />
                    <div>
                      <div className="text-sm">Avg Response Time</div>
                      <div className="font-bold">{testResults.averageResponseTime.toFixed(2)}ms</div>
                    </div>
                  </div>
                  <div className={`p-3 rounded flex items-center ${isDarkMode ? 'bg-[#344CB7] text-white' : 'bg-red-100'}`}>
                    <AlertTriangle className="mr-2" />
                    <div>
                      <div className="text-sm">Failed Requests</div>
                      <div className="font-bold">{testResults.failedRequests}</div>
                    </div>
                  </div>
                </div>

                {testResults.errors.length > 0 && (
                  <div className={`border-l-4 border-red-500 p-3 mb-4 ${isDarkMode ? 'bg-[#344CB7] text-white' : 'bg-red-50'}`}>
                    <div className="font-semibold mb-2">Error Details</div>
                    <ul className="text-sm">
                      {testResults.errors.slice(0, 5).map((error, index) => (
                        <li key={index} className="mb-1">{error}</li>
                      ))}
                      {testResults.errors.length > 5 && (
                        <li>...and {testResults.errors.length - 5} more</li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
<div className="flex justify-center items-center mt-10">
  <h3 className="text-2xl font-bold text-gray-800 font-sans">
    Scroll Down For Detailed Metrics
  </h3>
</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
  
};



export default ApiTesterClient;


////////PERFECT TILL HERE////////PERFECT TILL HERE////////PERFECT TILL HERE////////PERFECT TILL HERE////////PERFECT TILL HERE////////PERFECT TILL HERE////////PERFECT TILL HERE////////PERFECT TILL HERE////////PERFECT TILL HERE////////PERFECT TILL HERE









