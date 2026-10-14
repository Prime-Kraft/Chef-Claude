
import OpenAI from "openai";


console.log("📦 api.js loaded");

const SYSTEM_PROMPT = ` You are an assistant that receives a list
   of ingredients that a user has and suggests a recipe they
   could make with some or all or those ingredient. You dont need to use every ingredient they
  mention in your receipe. The recipe can include additional ingredients they didnt mention, but try  not to include too many extra ingredients.
 Format your response in markdown to make it easier to render to a web page
 `

const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: import.meta.env.VITE_DEEPSEEK_API_KEY,
  dangerouslyAllowBrowser: true,
});

console.log("🔑 Key loaded:", import.meta.env.VITE_DEEPSEEK_API_KEY ? "yes" : "NO");


export  async function getReceipeFromDeepSeek(ingredientArr) {
  const ingredientString = ingredientArr.join('')

    console.log("🚀 getRecipeFromDeepSeek called with:", ingredientArr);   // 👈 add this
  const response = await openai.chat.completions.create({
    model: "deepseek-flash",
    messages: [
      {
        role: "system",
        content:
        `You are a professional chef writing detailed, easy-to-follow recipes.

        STRICT FORMAT RULES:
        - Start with a bold recipe title (## Title)
        - Add a short 1–2 sentence description of the dish
        - Include prep time, cook time, and servings
        - List ingredients with EXACT measurements (e.g. "2 tbsp olive oil", not "some oil")
        - For each ingredient, add a short note in parentheses if helpful
          (e.g. "1 lb chicken breast (boneless, skinless)")
        - Write numbered steps that are detailed and specific:
          - Include cooking temperatures
          - Include approximate times (e.g. "sauté for 3–4 minutes")
          - Include visual cues (e.g. "until golden brown")
          - Explain WHY when helpful
        - End with 1–2 serving suggestions and one pro tip

        TONE:
        - Clear, confident, encouraging — like a chef teaching a friend
        - No fluff, no filler, no apologies
        - Never mention that you're an AI
          `.trim(),},
      {
        role: "user",
        content: `Create a detailed  recipe using  these ingredients: ${ingredientString}`,
      },
    ],
    temperatureL: 0.3,
  });

   console.log("✅ API response:", response);
  return response.choices[0].message.content;
}
