const { GoogleGenerativeAI } = require('@google/generative-ai');

async function test() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
  
  try {
    const result = await model.generateContent('Say hello in one word');
    console.log('SUCCESS:', result.response.text());
  } catch (error) {
    console.error('ERROR:', error.message);
    console.error('Full error:', JSON.stringify(error, null, 2));
  }
}

test();
