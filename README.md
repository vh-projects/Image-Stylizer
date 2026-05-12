# <img width="30" height="30" alt="image" src="https://github.com/user-attachments/assets/756da09e-0e4e-4f1c-ac2c-5e68c44edd13" /> Image Stylizer
 
Transform your photos into stunning artworks using AI-driven neural style transfer — no APIs, no shortcuts, trained from scratch.
 
![Python](https://img.shields.io/badge/Python-3.10+-blue?style=flat-square) ![PyTorch](https://img.shields.io/badge/PyTorch-2.0+-ee4c2c?style=flat-square) ![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?style=flat-square) ![React](https://img.shields.io/badge/React-18+-61dafb?style=flat-square)
 
---
 
## What It Does
 
Upload a photo, pick an artistic style, get a stylized image back — instantly. Image Stylizer applies the visual language of legendary painters like **Van Gogh** and **Claude Monet** to your photos, producing painterly, texture-rich outputs that feel genuinely artistic rather than filtered.
 
Every model is trained from scratch on domain-matched datasets, so a Van Gogh model trained on portraits handles faces differently than one trained on landscapes — the stylization is contextually aware, not one-size-fits-all.
 
---
 
## Styles & Domains
 
| Style | Inspiration | Best For |
|---|---|---|
| Van Gogh | Post-impressionist — swirling strokes, bold color | Landscapes, Cats, Cars |
| Claude Monet | Impressionist — soft light, loose brushwork | Landscapes, Cats, Dogs, Human |
 
Each style model is trained on the dataset that best represents its subject matter: CelebA for human faces, Stanford Cars for vehicles, and dedicated landscape/animal datasets for scenic and nature styles.
 
---
 
## How It Works
 
### Architecture
 
The core model is a custom **feed-forward CNN** called `TransformerNet` — not a Transformer in the GPT/ViT sense, but a fast image-to-image network built on:
 
- **Encoder** — convolutional layers that compress the image into a feature-rich representation
- **Residual Blocks** — preserve content structure while allowing style transformation
- **Decoder / Upsampling** — reconstruct the full-resolution stylized image
This architecture enables **real-time inference** — once trained, stylization happens in a single forward pass, no iterative optimization required.
 
### Training
 
Training uses **Fast Neural Style Transfer**, where a frozen **VGG16** acts purely as a feature extractor for loss computation — it is never updated. The trainable network (`TransformerNet`) learns to produce outputs that satisfy multiple perceptual objectives simultaneously:
 
| Loss Component | Purpose |
|---|---|
| Content Loss | Preserve the structure and layout of the original image |
| Style Loss (Gram Matrix) | Learn the texture and artistic patterns of the style image |
| Total Variation (TV) Loss | Reduce noise and smooth artifacts |
| Sobel Edge Loss | Preserve fine edges and sharp details |
| Color Moment Loss | Match the color distribution of the style image |
 
Style and edge preservation are weighted most heavily, giving outputs a strong artistic identity without losing the subject.
 
**Training configuration:**
 
```
Optimizer:    Adam
LR:           1e-3
Batch Size:   8
Image Size:   256 × 256
Epochs:       15
Precision:    Mixed (AMP)
```
 
**Stability measures:** gradient clipping, gradient accumulation, NaN/instability guards, and Gram matrix debug logging — making training robust across diverse datasets.
 
---
 
## Stack
 
**Backend** — FastAPI serves trained model weights and handles inference. Upload an image, receive a stylized result.
 
**Frontend** — React UI for uploading images, selecting a style, previewing and downloading the output.
 
**No third-party AI APIs.** Every model is self-trained.
 
---
 
## Project Structure
 
```
image-stylizer/
├── backend/
│   ├── app.py              # FastAPI app, inference endpoint
│   ├── models.json
│   ├── models              # TransformerNet architecture
│   ├── helpers             # VGG16 features, all loss functions
│   │   ├── transform_net.py
│   │   ├── vgg_loss.py
│   ├── outputs              
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   └── components/
│   └── public/
└── README.md
```
 
---
 
## Getting Started
 
### 1. Clone the repo
 
```bash
git clone https://github.com/your-username/image-stylizer.git
cd image-stylizer
```
 
### 2. Backend setup
 
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```
 
### 3. Frontend setup
 
```bash
cd frontend
npm install
npm run dev
```
 
 
---
 
