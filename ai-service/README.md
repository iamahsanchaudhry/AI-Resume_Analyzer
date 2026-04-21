# 🚀 How to Start AI Service (Local Setup)

This guide explains how to run the AI service (FastAPI + Groq/Ollama) locally inside your project.

---

## 📁 1. Go to AI Service Folder

```bash
cd <Your Path>\AI-Resume-Analyzer\backend\src\ai-service
```

---

## 🐍 2. Create Virtual Environment

```bash
python -m venv venv
```

---

## ▶️ 3. Activate Virtual Environment

### CMD

```bash
venv\Scripts\activate
```

### PowerShell

```bash
venv\Scripts\Activate.ps1
```

---

## 📦 4. Install Dependencies

If requirements file exists:

```bash
pip install -r requirements.txt
```

If not, install manually:

```bash
pip install fastapi uvicorn python-dotenv groq
```

---

## 🔐 5. Configure Environment Variables

Create or update:

```
ai-service/.env
```

Example:

```env
GROQ_API_KEY=your_api_key_here
```

⚠️ Make sure:

* No quotes
* No spaces
* Correct API key

---

## 🚀 6. Start the AI Service

Run FastAPI server:

```bash
uvicorn main:app --reload
```

If file is inside deeper folder structure:

```bash
uvicorn src.ai-service.main:app --reload
```

---

## 🌐 7. Test API

Open in browser:

```
http://127.0.0.1:8000/docs
```

You should see Swagger UI.

---

## ❗ Common Issues

### ❌ Missing API Key

Add this in `main.py`:

```python
from dotenv import load_dotenv
load_dotenv()
```

---

### ❌ Module Not Found

```bash
pip install <missing-package>
```

---

### ❌ Port Already in Use

```bash
uvicorn main:app --reload --port 8001
```