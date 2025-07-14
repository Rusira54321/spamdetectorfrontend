import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [emailText, setEmailText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const response = await axios.post('https://spamdetectorbackend-1.onrender.com', {
        text: emailText,
      });
      setResult(response.data);
    } catch (err) {
      setError('Error contacting backend');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-blue-400 via-purple-300 to-pink-200">
      <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl p-10 max-w-xl w-full border border-white/40 transition-all duration-300">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-700 drop-shadow">
          📧 Email Spam Detector
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <textarea
            placeholder="Paste your email text here..."
            value={emailText}
            onChange={(e) => setEmailText(e.target.value)}
            rows="8"
            className="w-full border border-gray-300 rounded-xl p-4 text-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-400/50 transition resize-none bg-white/70 shadow"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold transition-all duration-200
              ${loading
                ? 'bg-blue-300 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-purple-500 hover:from-blue-700 hover:to-purple-600 text-white shadow-lg'
              }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                Analyzing...
              </span>
            ) : 'Check Spam'}
          </button>
        </form>

        {result && (
          <div className="mt-8 p-5 border rounded-xl bg-blue-50/80 shadow text-center animate-fade-in">
            <p className="text-xl font-bold mb-2">
              Result:{' '}
              <span className={result.prediction === 'spam' ? 'text-red-600' : 'text-green-600'}>
                {result.prediction.toUpperCase()}
              </span>
            </p>
            <p className="text-gray-700 text-base">Confidence: {Math.round(result.confidence * 100)}%</p>
          </div>
        )}

        {error && (
          <p className="text-red-500 mt-6 text-sm text-center animate-shake">{error}</p>
        )}
      </div>
    </div>
  );
};

export default App;