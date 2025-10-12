🖼️ AI Image Stylizer

Transform your photos into stunning artworks using AI-driven style transfer.
This project combines a FastAPI backend (for AI image processing) with a React frontend (for a smooth user experience).


## Project Overview

The AI Image Stylizer allows users to:
  - Upload an image.
  - Choose a style and category (e.g. abstract, painting, cartoon).
  - Generate a new stylized version of the uploaded image.
  - View and download the processed image directly.
Under the hood, the backend handles image stylization through AI/ML models, and the frontend provides a simple interface for interaction.


## Installation & Setup

Backend (FastAPI)
Located in: backend/
  1. Prerequisites
    * Python 3.9 or later
    * pip (Python package manager)
    * virtualenv (optional but recommended)

  2. Setup & Run
     * Move into backend directory
     * `cd backend`
     * Create virtual environment (optional)
     * `python -m venv venv`
     * `source venv/bin/activate`   # Mac/Linux
                 - OR
     * `venv\Scripts\activate`      # Windows
     * Install dependencies
     * `pip install -r requirements.txt`
    - Run FastAPI server
     * `uvicorn app:app --reload`


Frontend (React)
Located in: frontend/
  1. Prerequisites
    * Node.js (v18+ recommended)
    * npm (comes with Node)

  2. Setup & Run
     * Move into frontend directory
     * `cd frontend`
     * Install dependencies
     * `npm install`
     * Start development server
     * `npm run dev`
