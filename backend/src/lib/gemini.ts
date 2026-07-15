import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);

export async function improveBulletPoint(
  text: string, 
  tone: 'professional' | 'creative' | 'technical' = 'professional'
): Promise<string> {
  // Try models in order of availability
  const modelsToTry = ['gemini-flash-lite-latest', 'gemini-flash-latest', 'gemini-2.0-flash-lite'];
  
  for (const modelName of modelsToTry) {
    try {
      console.log(`Trying model: ${modelName}...`);
      const model = genAI.getGenerativeModel({ model: modelName });
      
      const prompt = `Improve this resume bullet: "${text}". Return only the improved version.`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      console.log(`Success with model: ${modelName}`);
      return response.text().trim();
    } catch (error: any) {
      console.log(`Model ${modelName} failed: ${error.message}`);
      continue;
    }
  }
  
  throw new Error('All models exhausted. Please wait a minute and try again.');
}

export async function generateBulletPoints(
  jobTitle: string,
  company: string,
  keyAchievements: string
): Promise<string[]> {
  const modelsToTry = ['gemini-flash-lite-latest', 'gemini-flash-latest', 'gemini-2.0-flash-lite'];
  
  for (const modelName of modelsToTry) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      
      const prompt = `Generate 3 resume bullet points. Return only bullets, one per line.
      Job: ${jobTitle} at ${company}
      Context: ${keyAchievements}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text().split('\n').filter(b => b.trim());
    } catch (error: any) {
      console.log(`Model ${modelName} failed for bullets: ${error.message}`);
      continue;
    }
  }
  
  throw new Error('All models exhausted. Please try again later.');
}
