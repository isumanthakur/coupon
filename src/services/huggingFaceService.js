import axios from 'axios';

// Ensure this environment variable is set
const HUGGING_FACE_API_KEY = import.meta.env.VITE_HUGGING_FACE_API_KEY;

const generateTerms = async (input) => {
    const { description, type, status, expiry } = input;
    const prompt = `Generate terms and conditions for a coupon offering:
    Description: ${description}
    Type: ${type}
    Status: ${status}
    Expiry Date: ${expiry}`;

    try {
        const response = await axios.post('https://api-inference.huggingface.co/models/gpt2', {
            inputs: prompt
        }, {
            headers: {
                'Authorization': `Bearer ${HUGGING_FACE_API_KEY}`
            }
        });

        return response.data[0].generated_text.trim();
    } catch (error) {
        console.error('Error generating terms:', error.response ? error.response.data : error.message);
        throw new Error('An error occurred while generating terms.');
    }
};

export default generateTerms; // Ensure default export
