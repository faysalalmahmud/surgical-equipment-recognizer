from fastai.vision.all import *
import gradio as gr

# Load the trained model
model_path = 'surgical_equipment_recognizer_model_v1.pkl'
learn = load_learner(model_path)

def recognize_image(image):
    """
    Takes an image, predicts its class using the loaded model, and returns
    the predicted label and confidence scores.
    """
    try:
        # Ensure we have a PIL Image
        if not isinstance(image, PILImage):
            # Convert gradio image to PIL if needed
            if hasattr(image, 'convert'):
                pil_img = image.convert('RGB')
            else:
                pil_img = PILImage.create(image)
        else:
            pil_img = image
        
        # Get predictions, index and probabilities
        pred, idx, probs = learn.predict(pil_img)
        
        # Create confidence dict
        confidence_dict = {learn.dls.vocab[i]: float(probs[i]) for i in range(len(learn.dls.vocab))}
        
        return confidence_dict
        
    except Exception as e:
        return {"error": str(e)}

# Create Gradio interface
iface = gr.Interface(
    fn=recognize_image,
    inputs=gr.Image(type="pil"),  # Explicitly specify PIL format
    outputs=gr.Label(),
    title="Surgical Equipment Recognizer",
    description="Upload an image of a surgical instrument to see what the model predicts."
)

if __name__ == "__main__":
    iface.launch()