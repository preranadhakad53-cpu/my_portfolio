Prerana Dhaked — Personal Portfolio
A personal portfolio website showcasing my background, technical skills, projects, and interests in Artificial Intelligence and Machine Learning. It also includes an AI chatbot and a weather section to explore interactive web features.

About Me
I'm Prerana Dhaked, a second-year BTech Computer Science and Engineering student specializing in Artificial Intelligence and Machine Learning at JECRC University, Jaipur.

I'm passionate about programming, artificial intelligence, robotics, cybersecurity, and exploring emerging technologies. I'm currently strengthening my skills in Python, C++, Data Structures and Algorithms, and web development while building practical projects.

Features
Personal Introduction: Information about my academic background, interests, and career goals.
Skills Section: Highlights my programming, AI/ML, data analysis, and web development skills.
Projects Showcase: Displays selected projects with descriptions and links to their GitHub repositories.
AI Chatbot: An interactive assistant designed to answer questions about my portfolio, projects, and technologies.
Weather Section: Allows users to enter a city and retrieve weather information.
Theme Toggle: Provides a dark mode option for a more comfortable browsing experience.
Responsive Layout: Includes viewport configuration to support different screen sizes.
Technologies Used
Technology	Purpose
HTML5	Structures the portfolio content
CSS3	Styles the website and its layout
JavaScript	Adds interactivity and dynamic functionality
Groq API	Powers the AI chatbot, if configured
Weather API	Retrieves weather information, depending on the implementation
Git and GitHub	Version control and project hosting
Projects Featured
1. Student Marks Processor
A Python program that processes student marks, assigns grades, checks pass/fail status, and calculates class statistics such as averages and totals.

2. Student Reading List App
A reading-list application that helps students organize books they plan to read, are currently reading, or have finished.

3. Python Program Collection
A collection of beginner-friendly Python programs covering loops, factorial calculation, the Fibonacci series, and dictionaries.

4. Fixing a Buggy Python Script Using AI
A debugging project focused on identifying and correcting errors in a student-utilities script, including average calculation, pass/fail checks, and grade assignment.

5. Code With AI Quiz App
An interactive multiple-choice quiz built with HTML, CSS, and JavaScript. It covers topics such as large language models, coding practices, unit testing, and algorithmic complexity.

Project Structure
portfolio/
├── index.html
├── style.css
├── chatbot.css
├── script.js
├── config.js
├── Chatbot.js
├── .env
├── .env.example
├── .gitignore
└── README.md
Note: The structure above is illustrative. Keep only the files that actually exist in your project.

Getting Started
Prerequisites
A modern web browser.
A code editor such as Visual Studio Code.
Git, if you want to clone or contribute to the project.
Node.js and a backend server if your chatbot requires server-side API integration.
Installation
1. Clone the repository

git clone https://github.com/preranadhakad53-cpu/my_portfolio.git
2. Navigate to the project directory

cd my_portfolio
3. Open the website

For a basic static website, open index.html in your browser or use the Live Server extension in Visual Studio Code.

4. Configure the chatbot and weather functionality

Follow the configuration requirements for the APIs used by your implementation. API keys must remain on the server and must not be exposed in frontend JavaScript.

Environment Variables
If the AI chatbot uses the Groq API through a Node.js backend, create a .env file in the backend project directory:

GROQ_API_KEY=your_groq_api_key_here
Install and configure dotenv on the backend if required.

Keep .env out of version control. A .env.example file may be committed with placeholder values to document the required environment variables.

Security: Never include real API keys in config.js, frontend JavaScript, or a public repository. If a real key has already been committed, revoke it and generate a replacement.

Usage
Open the portfolio in your browser
