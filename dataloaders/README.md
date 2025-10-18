# Data Loaders - Surgical Equipment Dataset

This directory contains the preprocessed FastAI data loaders for the Surgical Equipment Recognizer project.

## 📁 Available Data Loaders

- `surgical_equipment_dataloader_v0.pkl` - Initial data loader with raw collected images
- `surgical_equipment_dataloader_v1.pkl` - After data cleaning and filtering

## 🛠️ Usage

Load the data loaders in your FastAI training scripts:

```python
from fastai.vision.all import *
import pickle

# Load the final cleaned version
with open('dataloaders/surgical_equipment_dataloader_v1.pkl', 'rb') as f:
    dls = pickle.load(f)

# Ready for training
model = vision_learner(dls, densenet121, metrics=[error_rate, accuracy])
```

## 🔗 Related Files

- **Raw Dataset**: [Google Drive](https://drive.google.com/drive/folders/1TBRfeRpCSm4zdzhiSdvRLiXHUQVF_o75)
- **Data Preparation**: [`notebooks/data_prep.ipynb`](../notebooks/data_prep.ipynb)
- **Training Process**: [`notebooks/training_&_data_cleaning.ipynb`](../notebooks/training_&_data_cleaning.ipynb)

---

**Recommendation**: Use `surgical_equipment_dataloader_v1.pkl` for training and inference as it contains the highest quality, manually cleaned dataset.
