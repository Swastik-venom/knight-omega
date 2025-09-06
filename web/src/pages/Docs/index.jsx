import React from 'react';
import { AlertCircle, Code, Book, Zap, Shield } from 'lucide-react';

const Docs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
              <Book className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
            Knight Omega API
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Complete documentation and examples to integrate with the Knight Omega API. 
            Build powerful applications with our robust authentication system.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Authentication Card */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Shield className="w-6 h-6 text-white" />
                  <h3 className="text-xl font-semibold text-white">API Authentication</h3>
                </div>
                <p className="text-blue-100">Secure your API calls with proper authentication</p>
              </div>
              
              <div className="p-6">
                <p className="mb-6 text-gray-600 dark:text-gray-300">
                  All authenticated endpoints require both headers below. You can generate access tokens 
                  in your user settings and find your User ID on your profile page.
                </p>

                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mb-4">
                  <p className="font-semibold mb-3 text-gray-700 dark:text-gray-300">Required Headers:</p>
                  <div className="bg-gray-900 dark:bg-black rounded-md p-4 font-mono text-sm overflow-x-auto">
                    <div className="text-green-400">Authorization: your_access_token</div>
                    <div className="text-blue-400">New-Api-User: your_user_id</div>
                  </div>
                </div>

                <div className="flex items-start gap-2 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                  <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-amber-700 dark:text-amber-300">
                    Keep your access tokens secure and never expose them in client-side code.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6">
              <div className="flex items-center gap-3 mb-2">
                <Zap className="w-6 h-6 text-white" />
                <h3 className="text-xl font-semibold text-white">Quick Start</h3>
              </div>
              <p className="text-green-100">Jump right into common endpoints</p>
            </div>
            
            <div className="p-6">
              <div className="space-y-3">
                {[
                  { endpoint: 'GET /v1/user/self', desc: 'Get current user info', color: 'blue' },
                  { endpoint: 'GET /v1/token/', desc: 'List all API tokens', color: 'purple' },
                  { endpoint: 'POST /v1/token/', desc: 'Create new API token', color: 'green' },
                  { endpoint: 'GET /v1/models', desc: 'Get available models', color: 'orange' },
                  { endpoint: 'GET /v1/log/self', desc: 'Get usage logs', color: 'pink' }
                ].map((item, index) => (
                  <div key={index} className="group p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer">
                    <div className="flex flex-col gap-1">
                      <code className="text-sm font-mono font-semibold text-gray-800 dark:text-gray-200">
                        {item.endpoint}
                      </code>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Code Examples Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden mb-12">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6">
            <div className="flex items-center gap-3 mb-2">
              <Code className="w-6 h-6 text-white" />
              <h3 className="text-2xl font-semibold text-white">Code Examples</h3>
            </div>
            <p className="text-purple-100">Ready-to-use examples in multiple languages</p>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* cURL Example */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  cURL
                </h4>
                <div className="bg-gray-900 rounded-lg overflow-hidden">
                  <div className="bg-gray-800 px-4 py-2 text-sm text-gray-300 border-b border-gray-700">
                    Terminal
                  </div>
                  <pre className="p-4 text-sm text-green-400 overflow-x-auto">
{`curl -X GET \\
  -H "Authorization: your_access_token" \\
  -H "New-Api-User: 123" \\
  http://KnightOmega.com/v1/user/self`}
                  </pre>
                </div>
              </div>

              {/* JavaScript Example */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  JavaScript
                </h4>
                <div className="bg-gray-900 rounded-lg overflow-hidden">
                  <div className="bg-gray-800 px-4 py-2 text-sm text-gray-300 border-b border-gray-700">
                    fetch-api.js
                  </div>
                  <pre className="p-4 text-sm text-yellow-400 overflow-x-auto">
{`const response = await fetch('http://KnightOmega.com/v1/user/self', {
  method: 'GET',
  headers: {
    'Authorization': 'your_access_token',
    'New-Api-User': '123'
  }
});

const data = await response.json();
console.log(data);`}
                  </pre>
                </div>
              </div>

              {/* Python Example */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  Python
                </h4>
                <div className="bg-gray-900 rounded-lg overflow-hidden">
                  <div className="bg-gray-800 px-4 py-2 text-sm text-gray-300 border-b border-gray-700">
                    api_client.py
                  </div>
                  <pre className="p-4 text-sm text-blue-400 overflow-x-auto">
{`import requests

headers = {
    'Authorization': 'your_access_token',
    'New-Api-User': '123'
}

response = requests.get(
    'http://KnightOmega.com/v1/user/self',
    headers=headers
)

data = response.json()
print(data)`}
                  </pre>
                </div>
              </div>

              {/* Error Handling */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  Error Handling
                </h4>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                  <div className="space-y-3">
                    {[
                      { code: '401', status: 'Unauthorized', desc: 'Invalid or expired token', color: 'red' },
                      { code: '403', status: 'Forbidden', desc: 'Permission denied', color: 'orange' },
                      { code: '404', status: 'Not Found', desc: 'Resource does not exist', color: 'gray' },
                      { code: '429', status: 'Rate Limited', desc: 'Too many requests', color: 'yellow' },
                      { code: '500', status: 'Server Error', desc: 'Internal server error', color: 'purple' }
                    ].map((error, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-3">
                          <span className={`px-2 py-1 text-xs font-mono font-bold rounded bg-${error.color}-100 text-${error.color}-800 dark:bg-${error.color}-900 dark:text-${error.color}-200`}>
                            {error.code}
                          </span>
                          <span className="font-medium text-gray-700 dark:text-gray-300">{error.status}</span>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{error.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Topics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Rate Limiting</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              API calls are rate-limited to ensure fair usage. If you encounter 429 errors, 
              please reduce your request frequency and implement exponential backoff.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                <strong>Tip:</strong> Implement retry logic with exponential backoff for production applications.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Base URL Configuration</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              All API endpoints are relative to your instance URL. Make sure to configure 
              your base URL correctly in your application.
            </p>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
              <code className="text-sm font-mono text-gray-800 dark:text-gray-200">
                http://KnightOmega.com/v1/
              </code>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Explore our complete API reference documentation or get in touch with our support team 
              for personalized assistance with your integration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Full API Reference
              </button>
              <button className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Docs;