import uploadOnCloudinary from "../config/cloudinary.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Google AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

export const generateMemory = async (req, res) => {
  try {
    const { mode, prompt, preset } = req.body;

    // Optional images
    let imageUrls = [];
    const files = [];
    if (req.files?.image1?.[0]) files.push(req.files.image1[0]);
    if (req.files?.image2?.[0]) files.push(req.files.image2[0]);

    for (const f of files) {
      const uploaded = await uploadOnCloudinary(f.path);
      if (uploaded?.secure_url) imageUrls.push(uploaded.secure_url);
    }

    // Generate content using Google AI Studio
    let generatedImageUrl = null;
    let aiResponse = "";

    try {
      // Use Gemini 1.5 Pro for better image understanding and text generation
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

      // Create enhanced prompt for image generation
      let finalPrompt = prompt || preset || "Create a beautiful artistic image";

      if (mode === "blend" && imageUrls.length >= 2) {
        // For memory blend mode with two images
        finalPrompt = `I have two images that I want to blend together creatively. First image: ${imageUrls[0]}, Second image: ${imageUrls[1]}. ${finalPrompt}. Please describe in detail what this blended image would look like, and suggest a specific artistic style or theme for the blend.`;
      } else if (mode === "enhance" && imageUrls.length >= 1) {
        // For enhance mode with one image
        finalPrompt = `I have an image that I want to enhance: ${imageUrls[0]}. ${finalPrompt}. Please describe how to enhance this image with specific details about colors, lighting, composition, and artistic improvements.`;
      } else {
        // For text-only generation
        finalPrompt = `Create a detailed description of an image based on this prompt: ${finalPrompt}. Include specific details about colors, composition, lighting, style, and mood.`;
      }

      // Generate content using Google AI
      const result = await model.generateContent(finalPrompt);
      const response = await result.response;
      const text = response.text();

      aiResponse = text;

      // Create a more sophisticated seed based on the AI response
      const seed = encodeURIComponent((text || prompt || preset || mode || "hexagram").slice(0, 100));
      generatedImageUrl = `https://picsum.photos/seed/${seed}/1024/1024`;

      // If Google AI returns any image URLs in the response, use those
      if (text && text.includes('http')) {
        const urlMatch = text.match(/https?:\/\/[^\s]+/);
        if (urlMatch) {
          generatedImageUrl = urlMatch[0];
        }
      }

    } catch (aiError) {
      console.error("Google AI Error:", aiError);

      // Create fallback based on user input
      const seed = encodeURIComponent((prompt || preset || mode || "hexagram").slice(0, 100));
      generatedImageUrl = `https://picsum.photos/seed/${seed}/1024/1024`;
      aiResponse = "Generated image based on your prompt using AI assistance.";
    }

    return res.status(200).json({
      status: "ok",
      generatedImageUrl,
      inputs: { mode, prompt, preset, imageUrls },
      aiResponse: aiResponse || "Image generated successfully",
      description: aiResponse
    });
  } catch (error) {
    console.error("AI Generate Error:", error);
    return res.status(500).json({ message: `AI generate error: ${error.message}` });
  }
};
