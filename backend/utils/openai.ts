import axios from 'axios';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY ?? "";

export const getAIResponse = async (text: string): Promise<string> => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            "role": "user",
            "content": text
          }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error fetching AI response:', error);
    throw new Error('Failed to fetch AI response');
  }
};
