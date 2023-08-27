const { Configuration, OpenAIApi } = require('openai');
const botConfig = require("../config.json");

const gptResponse = async (prompt, messages, role) => {
    const config = new Configuration({
        apiKey: botConfig.gpt3.openai_key,
    });


    const openai = new OpenAIApi(config);

    let messageObjects = [
        {
            role: "system",
            content: role,
        },
    ];

    for (const message of messages) {
        messageObjects.push({
            role: message.role || "user",
            content: `${message.content}`,
        });
    }

    messageObjects.push({
        role: "assistant",
        content: "Riko: ",
      });

    // Create the completion request
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: messageObjects,
    });
    return completion.data.choices[0].message;
};

module.exports = gptResponse;
