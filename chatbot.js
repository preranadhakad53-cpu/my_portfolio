const chatInput = document.getElementById("userInput");
const chatButton = document.getElementById("sendButton");
const chatMessages = document.getElementById("chatMessages");
const chatStatus = document.getElementById("chatStatus");

let chatTemperature = 0.7;

// Helper to append a message bubble in chat window
function showChatMessage(role, text) {
  if (!chatMessages) return;

  const message = document.createElement("div");
  message.className =
    "chat-message " +
    (role === "user" ? "chat-user" : "chat-assistant");

  message.textContent = text;
  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Retrieve API key from config.js or sessionStorage
function getApiKey() {
  if (typeof CONFIG !== "undefined") {
    const key = CONFIG.apiKey || CONFIG.API_KEY;
    if (
      key &&
      key !== "YOUR_PRIVATE_GROQ_KEY" &&
      key !== "YOUR_GROQ_API_KEY_HERE" &&
      key !== "YOUR_GROQ_API_KEY"
    ) {
      return key.trim();
    }
  }
  return sessionStorage.getItem("groq_api_key") || "";
}

function getBaseUrl() {
  if (typeof CONFIG !== "undefined" && (CONFIG.baseUrl || CONFIG.BASE_URL)) {
    return (CONFIG.baseUrl || CONFIG.BASE_URL).replace(/\/$/, "");
  }
  return "https://api.groq.com/openai/v1";
}

function getModel() {
  if (typeof CONFIG !== "undefined" && (CONFIG.model || CONFIG.MODEL)) {
    const model = CONFIG.model || CONFIG.MODEL;
    if (model === "openai/gpt-oss-20b") return "llama-3.1-8b-instant";
    return model;
  }
  return "llama-3.1-8b-instant";
}

// Smart local responses for portfolio queries when no external API key is configured
function getLocalPortfolioResponse(question) {
  const q = question.toLowerCase().trim();

  if (/^(hi|hello|hey|hola|greetings)\b/i.test(q)) {
    return "Hello! I am Prerana's assistant. Ask me anything about her background, technical skills, projects, or how to contact her!";
  }

  if (q.includes("name") || q.includes("who are you") || q.includes("who is prerana")) {
    return "This portfolio belongs to Prerana Dhaked! She is a Computer Science and Engineering student specializing in Artificial Intelligence and Machine Learning.";
  }

  if (
    q.includes("skill") ||
    q.includes("tech") ||
    q.includes("stack") ||
    q.includes("language") ||
    q.includes("python") ||
    q.includes("c++")
  ) {
    return "Prerana's technical skills include: Python Programming, C++, Artificial Intelligence & Machine Learning, Data Analysis & Visualization, and Web Development.";
  }

  if (
    q.includes("project") ||
    q.includes("work") ||
    q.includes("app") ||
    q.includes("marks") ||
    q.includes("reading") ||
    q.includes("quiz")
  ) {
    return "Prerana's featured projects are:\n1. Student Marks Processor\n2. Student Reading List App\n3. Python Program Collection\n4. Fixing a Buggy Python Script Using AI\n5. Code With AI Quiz App\n\nScroll to the Projects section to see details and GitHub links!";
  }

  if (
    q.includes("about") ||
    q.includes("college") ||
    q.includes("university") ||
    q.includes("jecrc") ||
    q.includes("education") ||
    q.includes("study") ||
    q.includes("degree")
  ) {
    return "Prerana is a second-year BTech CSE (AIML) student at JECRC University, Jaipur. She is passionate about artificial intelligence, robotics, cybersecurity, and building practical software tools.";
  }

  if (
    q.includes("contact") ||
    q.includes("email") ||
    q.includes("reach") ||
    q.includes("linkedin") ||
    q.includes("github") ||
    q.includes("social")
  ) {
    return "You can get in touch with Prerana:\n• Email: preranadhaked2004@gmail.com\n• LinkedIn: linkedin.com/in/prerana-dhakad-16307b362\n• GitHub: github.com/preranadhakad53-cpu";
  }

  if (q.includes("weather")) {
    return "You can check the live weather right on this page! Just scroll down to the Weather section, type any city name, and click 'Get Weather'.";
  }

  if (q.includes("bye") || q.includes("thank")) {
    return "You're welcome! Feel free to explore Prerana's projects and reach out if you have any questions.";
  }

  return null;
}

async function sendChatMessage() {
  if (!chatInput || !chatButton) return;

  const question = chatInput.value.trim();
  if (!question) return;

  // Convenience: allow entering key directly in chat without committing it to GitHub
  if (question.startsWith("gsk_")) {
    sessionStorage.setItem("groq_api_key", question);
    showChatMessage("user", "•••••••••••••••• [API Key Submitted]");
    chatInput.value = "";
    showChatMessage(
      "assistant",
      "Groq API key activated for this session! You can now ask me any questions."
    );
    return;
  }

  const apiKey = getApiKey();

  // If no Groq API key is configured, check if we have an instant built-in answer
  if (!apiKey) {
    showChatMessage("user", question);
    chatInput.value = "";

    const localAnswer = getLocalPortfolioResponse(question);
    if (localAnswer) {
      showChatMessage("assistant", localAnswer);
    } else {
      showChatMessage(
        "assistant",
        "I can tell you all about Prerana's skills, projects, education, or contact details! (To ask arbitrary questions powered by live AI, add your Groq API key in config.js or paste it here)."
      );
    }
    return;
  }

  // If API key is provided, use live Groq LLM
  showChatMessage("user", question);
  chatInput.value = "";

  chatButton.disabled = true;
  if (chatStatus) chatStatus.textContent = "AI is thinking...";

  try {
    const response = await fetch(`${getBaseUrl()}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: getModel(),
        temperature: chatTemperature,
        messages: [
          {
            role: "system",
            content:
              "You are an AI assistant for Prerana Dhaked's portfolio website. " +
              "Prerana is a second-year BTech CSE (AIML) student at JECRC University, Jaipur. " +
              "Her projects include: " +
              "1. Student Marks Processor (Python script for grades and statistics). " +
              "2. Student Reading List App (reading organizer). " +
              "3. Python Program Collection (beginner Python exercises and data structures). " +
              "4. Fixing a Buggy Python Script Using AI (debugging student utilities). " +
              "5. Code With AI Quiz App (interactive quiz on ML and coding). " +
              "Her skills include Python, C++, Artificial Intelligence & Machine Learning, Data Analysis, and Web Development. " +
              "Answer questions politely, accurately, and concisely (under 80 words)."
          },
          {
            role: "user",
            content: question
          }
        ]
      })
    });

    if (response.status === 401) {
      throw new Error("INVALID_KEY");
    }

    if (response.status === 429) {
      throw new Error("RATE_LIMIT");
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("API response error:", response.status, errorData);
      throw new Error("API_ERROR");
    }

    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content;

    if (typeof answer !== "string" || !answer.trim()) {
      throw new Error("INVALID_RESPONSE");
    }

    showChatMessage("assistant", answer);
  } catch (error) {
    console.error("Chat error:", error);

    // Fall back to local portfolio knowledge if network/API fails
    const localAnswer = getLocalPortfolioResponse(question);
    if (localAnswer) {
      showChatMessage("assistant", localAnswer);
    } else if (error.message === "INVALID_KEY") {
      showChatMessage(
        "assistant",
        "The Groq API key appears invalid. Please check your key at https://console.groq.com/keys."
      );
    } else if (error.message === "RATE_LIMIT") {
      showChatMessage(
        "assistant",
        "Too many requests right now. Please wait a moment and try again."
      );
    } else {
      showChatMessage(
        "assistant",
        "Unable to reach the AI service right now. Feel free to ask about Prerana's skills, projects, or background!"
      );
    }
  } finally {
    chatButton.disabled = false;
    if (chatStatus) chatStatus.textContent = "";
  }
}

if (chatButton) {
  chatButton.addEventListener("click", sendChatMessage);
}

if (chatInput) {
  chatInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      sendChatMessage();
    }
  });
}
