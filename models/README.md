# Trained Models

All the trained models for the Surgical Equipment Recognizer, organized by architecture are [here](https://drive.google.com/drive/folders/1gXOQL519l_5PTRz9lBTs1ITcIgN3RFql?usp=sharing).

## Versions & Files

Two versions of each model are provided:

- **v0**: Trained on the original dataset (5,961 images).
- **v1**: Trained on the cleaned dataset (5,022 images).

Each version includes:

- **`.pkl`**: The full FastAI `Learner` object for easy inference.
- **`.pth`**: The PyTorch model weights (state dictionary) for portability.

## Model Access

All the models are hosted on Google Drive.

| Model Architecture  | Google Drive Link                                                                                      |
| :------------------ | :----------------------------------------------------------------------------------------------------- |
| **ResNet50**        | [Link to Folder](https://drive.google.com/drive/folders/18REx9dCgOHOXykMJfuErKlyLFp0ue63I?usp=sharing) |
| **EfficientNet-b1** | [Link to Folder](https://drive.google.com/drive/folders/1KuhgZnqJMDHx1T_vNdjYSooZDPQ0Prs5?usp=sharing) |
| **DenseNet121**     | [Link to Folder](https://drive.google.com/drive/folders/1BwU8Njr8DyP3peIGXWCgKvVED9Jdp9Qj?usp=sharing) |

**Recommendation**: Use **DenseNet121**'s `surgical_equipment_recognizer_model_v1.pkl` for production applications.
