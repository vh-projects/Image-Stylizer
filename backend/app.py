
# import os, io, uuid, sys, json
# from pathlib import Path
# from fastapi import FastAPI, UploadFile, File, Form, HTTPException
# from fastapi.responses import FileResponse
# from fastapi.middleware.cors import CORSMiddleware
# from PIL import Image
# import torch
# from torchvision import transforms

# # Local helpers
# BASE_DIR = Path(__file__).resolve().parent
# sys.path.append(str(BASE_DIR / "helpers"))
# from transform_net import TransformerNet

# base_url = "http://localhost:8000"


# app = FastAPI()

# # -------------------- CORS --------------------
# FRONTEND_URL = os.environ.get("FRONTEND_URL", "http://localhost:5173")
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=[FRONTEND_URL],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # -------------------- Device --------------------
# device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# # -------------------- Output dir --------------------
# OUTPUT_DIR = BASE_DIR / "outputs"
# OUTPUT_DIR.mkdir(parents=True, exist_ok=True)



# # -------------------- Load models.json --------------------
# models_json_path = BASE_DIR / "models.json"
# if not models_json_path.exists():
#     raise RuntimeError(f"models.json not found at {models_json_path}")

# with open(models_json_path, "r") as f:
#     MODEL_PATHS = json.load(f)

# # Convert paths to absolute
# for cat, styles in MODEL_PATHS.items():
#     for style_name, rel_path in styles.items():
#         p = Path(rel_path)
#         if not p.is_absolute():
#             MODEL_PATHS[cat][style_name] = str((BASE_DIR / rel_path).resolve())

# # -------------------- Models cache --------------------
# models = {}
# def load_model(category: str, style: str):
#     key = (category, style)
#     if key in models:
#         return models[key]

#     if category not in MODEL_PATHS or style not in MODEL_PATHS[category]:
#         raise HTTPException(status_code=400, detail="Invalid category/style")

#     path = MODEL_PATHS[category][style]
#     if not os.path.exists(path):
#         raise HTTPException(status_code=404, detail=f"Model file not found: {path}")

#     model = TransformerNet().to(device)
#     model.load_state_dict(torch.load(path, map_location=device))
#     model.eval()
#     models[key] = model
#     return model

# def save_image_tensor(tensor, path):
#     img = tensor.detach().float().cpu()[0].clamp(0,1).permute(1,2,0).numpy() * 255
#     Image.fromarray(img.astype("uint8")).save(path)

# def stylize_image(img: Image.Image, model, img_size: int = 512):
#     transform = transforms.Compose([transforms.Resize(img_size), transforms.ToTensor()])
#     x = transform(img).unsqueeze(0).to(device)
#     with torch.no_grad(), torch.cuda.amp.autocast(enabled=True):
#         y = model(x)
#     return y





# # -------------------- Cleanup helper --------------------
# async def delete_file_after_delay(path: Path, delay: int = 180):
#     """Delete a file after <delay> seconds."""
#     await asyncio.sleep(delay)
#     if path.exists():
#         try:
#             path.unlink()
#             print(f"🧹 Deleted {path.name} after {delay} sec")
#         except Exception as e:
#             print(f"⚠️ Error deleting {path.name}: {e}")
# # -------------------- API Routes --------------------

# @app.get("/")
# async def root():
#     return {"message": "Backend is running!"}


# # -------------------- API Routes --------------------
# @app.get("/api/styles")
# async def get_styles():
#     return MODEL_PATHS

# @app.post("/api/stylize")
# async def stylize(file: UploadFile = File(...), category: str = Form(...), style: str = Form(...)):
#     model = load_model(category, style)
#     contents = await file.read()
#     input_img = Image.open(io.BytesIO(contents)).convert("RGB")
#     output_tensor = stylize_image(input_img, model)
#     filename = f"{uuid.uuid4().hex}.jpg"
#     out_path = OUTPUT_DIR / filename
#     save_image_tensor(output_tensor, out_path)
#     return {"image_url": f"{base_url}/api/download/{filename}"}

# @app.get("/api/download/{filename}")
# async def download(filename: str):
#     path = OUTPUT_DIR / filename
#     return FileResponse(path, media_type="image/jpeg", filename=filename)
























# backend/main.py
import os, io, uuid, sys, json, asyncio
from pathlib import Path
from fastapi import FastAPI, UploadFile, File, Form, HTTPException, Request, BackgroundTasks
from fastapi.responses import FileResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from PIL import Image
import torch
from torchvision import transforms


base = "http://localhost:8000"

BASE_DIR = Path(__file__).resolve().parent
sys.path.append(str(BASE_DIR / "helpers"))
from transform_net import TransformerNet

app = FastAPI()

# -------- CORS: add your frontend origin (dev: http://localhost:5173) ----------
FRONTEND_URL = os.environ.get("FRONTEND_URL", "http://localhost:5173")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# ---------- outputs dir ------------
OUTPUT_DIR = BASE_DIR / "outputs"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# mount static so /download/<file> serves images directly
app.mount("/download", StaticFiles(directory=str(OUTPUT_DIR)), name="download")

# ---------- load models.json + your model cache (keep your existing logic) ----------
models_json_path = BASE_DIR / "models.json"
if not models_json_path.exists():
    raise RuntimeError(f"models.json not found at {models_json_path}")

with open(models_json_path, "r") as f:
    MODEL_PATHS = json.load(f)

# convert to absolute paths (your existing code)
for cat, styles in MODEL_PATHS.items():
    for style_name, rel_path in styles.items():
        p = Path(rel_path)
        if not p.is_absolute():
            MODEL_PATHS[cat][style_name] = str((BASE_DIR / rel_path).resolve())

models = {}
def load_model(category: str, style: str):
    key = (category, style)
    if key in models:
        return models[key]
    if category not in MODEL_PATHS or style not in MODEL_PATHS[category]:
        raise HTTPException(status_code=400, detail="Invalid category/style")
    path = MODEL_PATHS[category][style]
    if not os.path.exists(path):
        raise HTTPException(status_code=404, detail=f"Model file not found: {path}")
    model = TransformerNet().to(device)
    model.load_state_dict(torch.load(path, map_location=device))
    model.eval()
    models[key] = model
    return model

def save_image_tensor(tensor, path: Path):
    img = tensor.detach().float().cpu()[0].clamp(0,1).permute(1,2,0).numpy() * 255
    Image.fromarray(img.astype("uint8")).save(path)

def stylize_image(img: Image.Image, model, img_size: int = 512):
    transform = transforms.Compose([transforms.Resize(img_size), transforms.ToTensor()])
    x = transform(img).unsqueeze(0).to(device)
    with torch.no_grad(), torch.cuda.amp.autocast(enabled=True):
        y = model(x)
    return y

# cleanup helper
async def delete_file_after_delay(path: Path, delay: int = 180):
    await asyncio.sleep(delay)
    try:
        if path.exists():
            path.unlink()
            print(f"🧹 Deleted {path} after {delay} sec")
    except Exception as e:
        print("⚠️ error deleting file:", e)

# --------- routes ----------


@app.get("/")
async def root():
    return {"message": "Backend is running!"}


# # -------------------- API Routes --------------------
@app.get("/api/styles")
async def get_styles():
    return MODEL_PATHS



@app.post("/api/stylize")
async def stylize(
    request: Request,
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...),
    category: str = Form(...),
    style: str = Form(...),
):
    model = load_model(category, style)
    contents = await file.read()
    input_img = Image.open(io.BytesIO(contents)).convert("RGB")
    output_tensor = stylize_image(input_img, model)
    filename = f"{uuid.uuid4().hex}.jpg"
    out_path = OUTPUT_DIR / filename
    save_image_tensor(output_tensor, out_path)

    # schedule deletion
    background_tasks.add_task(delete_file_after_delay, out_path, 180)

    # build absolute URL using the request base URL (works in dev and production)
    base = str(request.base_url).rstrip('/')
    image_url = f"{base}/download/{filename}"   # -> e.g. http://localhost:8000/download/<file>.jpg
    return {"image_url": image_url}

# (OPTIONAL) keep a file endpoint if you want; not necessary because StaticFiles serves it:
# @app.get("/api/download/{filename}")
# async def download(filename: str):
#     path = OUTPUT_DIR / filename
#     return FileResponse(path, media_type="image/jpeg", filename=filename)
