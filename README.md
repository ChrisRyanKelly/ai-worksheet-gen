## 🎓 Generative AI for Education

An AI-powered application designed to generate subject-specific student worksheets dynamically using OpenAI’s API. Built with educators in mind, this tool helps teachers create scaffolded, editable worksheets on demand  tailored by year group, subject, topic, difficulty, and number of questions.

---

### 👥 Who Is This For?

- Subject teachers looking to reduce workload
- Curriculum planners exploring generative AI tools
- Developers interested in the practical application of AI in education 

#

### 🧱 Tech Stack

| Layer        | Stack / Tool                         |
|--------------|---------------------------------------|
| Frontend     | HTML, CSS, Bootstrap 5, JavaScript    |
| Backend      | Node.js + Express                     |
| AI           | OpenAI API (GPT-3.5 Turbo)            |
| Database     | MongoDB Atlas                         |
| Hosting      | (Railway planned)                     |
| Fonts        | Inter + Playfair Display via Google   |
| Optional     | Office.js for Microsoft 365 add-in    |

#

### ✨ Features

| Feature                    | Description                                                |
|----------------------------|------------------------------------------------------------|
| 🧠 AI Worksheet Generation | Curriculum-aligned, scaffolded questions via GPT-3.5 Turbo |
| 🎯 Customisable            | Choose subject, topic, year group, difficulty, question count |
| 📝 Editable                | Lock/unlock inline worksheet editing                       |
| 📋 Copy to Clipboard       | Copy output to Word, Docs or Teams                         |
| 🖨️ Print / Export to PDF   | Clean A4 printable layout                                  |
| 💬 Built-in Feedback       | Users can rate and comment on worksheet quality            |
| 🔍 Data Logging            | Logs sessions, tokens, cost, usage for research/reporting  |
| 📊 Atlas Dashboard Ready   | Live dashboard built with MongoDB Charts                   |  

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
├── frontend.html             # Main frontend UI
├── backend.js                   # Express backend server
├── .env                       # API key config & MongoDB URI
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

3. Install MongoDB

```shell
npm install mongodb
```

4. Create a `.env` file and paste in your OpenAI API key

```shell
echo "OPENAI_API_KEY=your-api-key-here" > .env
```

5. Add the MongoDB URI to the .env file

```shell
echo "MONGO_URI=your-mongodb-uri" >> .env
```   
6. Start the backend server

```shell
npm start 
```

This uses the `start` script defined in `package.json`, which runs `node index.js`.

#

### 🌐 How to Use

1. Open frontend.html in your browser
2. Fill in subject, year group, topic, difficulty, and number of questions (1–10)
3. Click Generate
4. Output appears in a printable, editable panel
5. Lock/unlock, copy to clipboard, print to PDF
6. Provide feedback — submitted directly to your Atlas database

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

### 📊 Data Collection

MongoDB Atlas is used to log each worksheet generation and feedback submission. This enables session tracking, token/cost estimation, and user sentiment analysis. Sessions collection logs metadata (e.g. subject, topic, token usage, and generation time). Feedback collection captures user ratings and optional comments tied to each worksheet. This data can be visualised in MongoDB Charts to track usage trends and support research reporting during trials.

<img src="https://via.placeholder.com/800x450.png?text=MongoDB+Dashboard+SetUp" width="600" alt="Dashboard interface preview" />

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

- [x]  Work with educators to improve subject-specific prompt logic
- [x]  Set up database for logging (MongoDB)
- [ ]  Cloud Deployment (Railway)
- [ ]  Write research proposal
- [ ]  Apply for the OpenAI Researcher Access Program
- [ ]  Conduct trial and analyse data collection
- [ ]  Compile findings into a report

#

### 🤝 Collaboration

This project was created by a TA at a UK (Welsh) secondary school. It’s open source and aims to improve efficiency, reduce workload, and introduce AI in a responsible way.
Contributions welcome from teachers, curriculum leaders, and EdTech devs

#

### 📜 License

MIT — open too modification, adaptation and deployment by other schools or education systems who think they may benefit from this technological solution.  

#

### 📣 Questions?

Open an issue, fork the repo, or reach out via GitHub Discussions.

---

### Powered by OpenAI · Approved by Teachers
