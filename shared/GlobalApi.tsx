// Global API functions
declare const process: {
  env: {
    EXPO_PUBLIC_KRAVIX_STUDIO_API_KEY: string;
  };
};

export const GetAIChatResponse = async (messages: Array<{ role: string; content: string }>) => {
  try {
    const apiKey = process.env.EXPO_PUBLIC_KRAVIX_STUDIO_API_KEY;
    
    if (!apiKey) {
      throw new Error("API key is missing. Please set EXPO_PUBLIC_KRAVIX_STUDIO_API_KEY in your environment variables.");
    }
    
    console.log("Making API request to:", "https://kravixstudio.com/api/v1/chat");
    console.log("Messages:", messages);
    
    // Create headers as per API documentation
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}` // API expects Bearer token with API key
    };
    
    // Prepare request body as per API documentation
    const requestBody = {
      message: messages, // Array of messages with role and content
      aiModel: "gpt-5-nano",
      outputType: "text"
    };
    
    const res = await fetch("https://kravixstudio.com/api/v1/chat", {
      method: "POST",
      headers,
      body: JSON.stringify(requestBody)
    });
    
    console.log("Response status:", res.status);
    
    if (!res.ok) {
      const errorText = await res.text();
      console.error("API Error Response:", errorText);
      throw new Error(`HTTP ${res.status}: ${errorText}`);
    }
    
    const data = await res.json();
    console.log("API Response data:", data);
    
    // Extract the AI response from the API response structure
    // Response format: { aiResponse: "Hello! How can I assist you...", tokensUsed, creditsDeducted, remainingCredits }
    if (data.aiResponse) {
      // aiResponse can be a string or an object with content property
      if (typeof data.aiResponse === 'string') {
        return data.aiResponse; // Return plain text string
      } else if (data.aiResponse.content) {
        return data.aiResponse.content; // Return content if it's an object
      }
    }
    
    // Fallback: return as string
    return typeof data === 'string' ? data : JSON.stringify(data);
  } catch (error) {
    console.error("Error in GetAIChatResponse:", error);
    throw error; // Re-throw to let the caller handle it
  }
}
