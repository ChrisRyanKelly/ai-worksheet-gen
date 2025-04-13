## 🎓 Generative AI for Education

An AI-powered application designed to generate subject-specific student worksheets dynamically using OpenAI’s API. Built with educators in mind, this tool helps teachers create scaffolded, editable worksheets on demand  tailored by year group, subject, topic, difficulty, and number of questions.

---

### 👥 Who Is This For?

- Teachers at UK secondary schools (Years 7–11)
- Curriculum planners exploring AI in education
- IT teams and EdTech developers building GPT-powered tools

#

### 🧱 Tech Stack

- **Frontend**: HTML, CSS, Bootstrap 5, JavaScript
- **Fonts**: Inter, Playfair Display via Google Fonts
- **Backend**: Node.js + Express, OpenAI API (GPT-3.5 Turbo)
- **Other**: Office.js (for potential Microsoft 365 integration)

#

### ✨ Features

| Feature                    | Description                                     |
|----------------------------|-------------------------------------------------|
| 🧠 AI Worksheet Generation | Powered by OpenAI’s GPT-3.5 Turbo              |
| 📝 Editable in-browser     | Inline editing directly in the interface       |
| 🔐 Lock/Unlock Mode        | Toggle between read-only and editable output   |
| 📋 Copy to Clipboard       | Paste into Word, Docs, or Teams instantly      |
| 🖨️ Print / Export to PDF   | Clean layout for physical distribution         |
| 🎯 Custom Difficulty/Count | Choose difficulty level & number of questions  |
| 📚 Subject-Specific Prompts| WJEC-based curriculum context logic            

#

### 🖼️ UI Preview

<img src="https://via.placeholder.com/800x450.png?text=Worksheet+Generator+UI" width="600" alt="App interface preview" />

#

### 🚀 Getting Started

#### 🔧 Requirements

- Node.js (v18 or higher)
- OpenAI API Key from [platform.openai.com](https://platform.openai.com/account/api-keys)

#

### 📁 Folder Structure

This is the recommended set up for local deployment.

```shell
worksheet-generator/
├── config/
│   └── subjectContexts.js     # WJEC-aligned subject prompt context
├── public/
│   └── assets/
│       ├── blossom.png
│       └── collab-logo.png
├── taskpane3.html             # Main frontend UI
├── index.js                   # Express backend server
├── .env                       # API key config
└── package.json
```

#

### Local Setup

1. Clone the repository

```shell
git clone https://github.com/ChrisRyanKelly/ai-worksheet-gen.git
cd worksheet-generator
```

2. Install dependencies

```shell
npm install
```

3. Create a `.env` file and paste in your OpenAI API key

```shell
  echo "OPENAI_API_KEY=your-api-key-here" > .env
```

4. Start the backend server

```shell
   npm start 
```

This uses the `start` script defined in `package.json`, which runs `node index.js`.

#

### 🌐 How to Use

1. Open `taskpane3.html` in your browser
2. Select the **Subject**, **Year Group**, **Difficulty**, and enter a **Topic**
3. Choose the **Number of Questions** (1–10)
4. Click **Generate**
5. Edit inline, **copy** to clipboard, or **print** to PDF

#

### 🧠 Prompt Customisation

Open `config/subjectContexts.js`. This file maps each subject to WJEC-aligned context:

```js
export const subjectContexts = {
  Maths: "Focus on problem solving and step-by-step methods aligned with WJEC Maths curriculum.",
  English: "Include comprehension, literary analysis, or grammar exercises aligned to WJEC English standards.",
  Biology: "Ensure terminology and focus areas are relevant to WJEC Biology GCSE.",
  Chemistry: "Cover chemical reactions, bonding, and periodic trends suitable for KS3/KS4 Chemistry.",
  Physics: "Include formulas, concepts, and units in line with WJEC Physics curriculum."
};
```

This context is dynamically injected into the prompt, like so:

```
Instructions:
- Subject: Maths
- Year: Year 10
- Topic: Algebra
- Difficulty: Medium
- Question Count: 7
- Context: Focus on problem solving and step-by-step methods aligned with WJEC Maths curriculum.
```

#
### 🧪 Test the API Endpoint (optional)

You can also test if API calls are being made directly via the terminal using `Curl`. This could be useful when troubleshooting or debugging any issues that may arise during generation.

```shell
curl http://localhost:3000/generate \
  -H "Content-Type: application/json" \
  -d '{"subject":"Maths", "year":"Year 10", "topic":"Algebra", "difficulty":"Medium", "questionCount":7}'
```

#

### 🚧 Roadmap

- [ ]  Work with educators to improve subject-specific prompt logic
- [ ]  Set up database for logging (MongoDB)
- [ ]  Cloud Deployment (Railway)
- [ ]  Apply for the OpenAI Researcher Access Program
- [ ]  Test in live environment and collect feedback from users

#

### 🤝 Collaboration

This project was built by a TA in a UK (Welsh) secondary school with a vision to reduce workload, improve efficiency, and empower teaching staff to engage with, and explore AI responsibly.

Contributions are welcome, especially from teachers, curriculum leaders, and devs in education.

#

### 📜 License

MIT — open too modification, adaptation and deployment by other schools or education systems who think they may benefit from this technological solution.  

#

### 📣 Questions?

Open an issue, fork the repo, or get in touch.

---

### Powered by OpenAI · Approved by Teachers
