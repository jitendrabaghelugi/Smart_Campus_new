const OpenAI = require("openai");
const ChatMessage = require("../models/ChatMessage");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
});


exports.chat = async (req, res) => {
    try {
        const { messages } = req.body;
        const userId = req.user._id; // From auth middleware
        
        const lastUserMessage = messages[messages.length - 1];
        const userMessageContent = lastUserMessage?.content || '';

        
        const completion = await openai.chat.completions.create({
            model: "openrouter/auto:free",
            messages: messages,
        });

        const aiResponse = completion.choices[0].message.content;

        
        await ChatMessage.create({
            userId: userId,
            role: 'user',
            message: userMessageContent,
            response: aiResponse,
            timestamp: new Date()
        });

        res.json({
            success: true,
            reply: aiResponse,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "AI error",
        });
    }
};

exports.getChatHistory = async (req, res) => {
    try {
        const userId = req.user._id; 

        const conversations = await ChatMessage.find({ userId: userId })
            .sort({ timestamp: 1 })
            .select('message response timestamp -_id')
            .lean();

        const messages = [];
        conversations.forEach(conv => {
            
            messages.push({
                role: 'user',
                content: conv.message,
                timestamp: conv.timestamp
            });
            
            messages.push({
                role: 'assistant',
                content: conv.response,
                timestamp: conv.timestamp
            });
        });

        res.json({
            success: true,
            messages: messages
        });

    } catch (error) {
        console.error('Get chat history error:', error);
        res.status(500).json({
            success: false,
            message: "Failed to retrieve chat history"
        });
    }
};
