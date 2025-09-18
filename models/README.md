# Trained Models - Surgical Equipment Recognizer

This directory contains the trained models for the Surgical Equipment Recognizer project.

## 📁 Available Models

- `surgical_equipment_recognizer_model_v1_1.pkl` - ResNet50 model
- `surgical_equipment_recognizer_model_v1_2.pkl` - EfficientNet-B0 model  
- `surgical_equipment_recognizer_model_v2.pkl` - ResNet34 model (85% accuracy)

## 🔗 Complete Model Collection

**All Models & Weights**: [Google Drive Folder](https://drive.google.com/drive/folders/1gXOQL519l_5PTRz9lBTs1ITcIgN3RFql)

The Google Drive contains additional model files including PyTorch `.pth` weights and experimental models.

## 🏆 Model Performance

### Version 2 (Production Model) - ResNet34
- **Architecture**: ResNet34 (fine-tuned)
- **Training**: 5 epochs
- **Accuracy**: 85%
- **Classes**: 20 surgical equipment types
- **Status**: ✅ Production ready (Best Performance)

### Version 1.2 - EfficientNet-B0
- **Architecture**: EfficientNet-B0
- **Status**: Experimental model with efficient architecture

### Version 1.1 - ResNet50
- **Architecture**: ResNet50
- **Status**: Initial model with deeper architecture

## 🛠️ Model Loading

### FastAI Model (.pkl)
```python
from fastai.vision.all import *

# Load the production model
learn = load_learner('models/surgical_equipment_recognizer_model_v2.pkl')

# Make predictions
pred, idx, probs = learn.predict('path/to/surgical_instrument.jpg')
print(f'Prediction: {pred} (Confidence: {probs[idx]:.2%})')
```

### PyTorch Weights (.pth)
```python
import torch
from fastai.vision.all import *

# Load model with custom weights (from Google Drive)
learn = vision_learner(dls, resnet34, metrics=accuracy)
learn.load('model_weights')  # .pth file from Google Drive
```


## 🚀 Deployment

The production model (`v2.pkl`) is deployed on:
- **Hugging Face Spaces**: [Live Application](https://huggingface.co/spaces/faysalalmahmud/surgical-equipment-recognizer)

## 🔗 Related Files

- **Training Notebook**: [`notebooks/training_&_data_cleaning.ipynb`](../notebooks/training_&_data_cleaning.ipynb)
- **Inference Notebook**: [`notebooks/inference.ipynb`](../notebooks/inference.ipynb)
- **Data Loaders**: [`dataloaders/`](../dataloaders/)

---

**Recommendation**: Use `surgical_equipment_recognizer_model_v2.pkl` for production applications. For research or custom implementations, additional model weights are available in the Google Drive folder.
