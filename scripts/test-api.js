const axios = require('axios');

const baseURL = process.env.API_BASE_URL || 'http://201.77.115.146:11000/api/v1';
const endpoints = [
  '/cadastros/cartoes',
];

async function testEndpoint(ep) {
  const url = baseURL + ep;
  try {
    const t0 = Date.now();
    const res = await axios.get(url, { timeout: 8000 });
    const ms = Date.now() - t0;
    const summary = Array.isArray(res.data) ? `${res.data.length} items` : typeof res.data;
    console.log(`OK  ${ep} -> ${res.status} ${res.statusText} (${ms}ms) - ${summary}`);
    const body = JSON.stringify(res.data, null, 2);
    console.log(body.length > 1000 ? body.slice(0, 1000) + '\n... (truncated)' : body);
  } catch (err) {
    if (err.response) {
      console.error(`ERR ${ep} -> ${err.response.status} ${err.response.statusText}`);
      try { console.error('Body:', JSON.stringify(err.response.data, null, 2)); } catch (e) {}
    } else {
      console.error(`ERR ${ep} -> ${err.message}`);
    }
  }
}

(async () => {
  console.log('Testing API endpoints against', baseURL);
  for (const ep of endpoints) {
    await testEndpoint(ep);
    console.log('---');
  }
})();
