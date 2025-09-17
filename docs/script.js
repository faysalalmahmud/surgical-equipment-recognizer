// Import the Gradio client library from a CDN
import { Client } from "https://cdn.jsdelivr.net/npm/@gradio/client/dist/index.min.js";

// Get all the necessary DOM elements
const imageInput = document.getElementById('imageInput');
const predictButton = document.getElementById('predictButton');
const imagePreview = document.getElementById('imagePreview');
const imagePreviewContainer = document.getElementById('imagePreviewContainer');
const resultsDiv = document.getElementById('results');
const loadingSpinner = document.getElementById('loading');

const toggleAboutButton = document.getElementById('toggleAboutButton');
const aboutContent = document.getElementById('aboutContent');

// Hugging Face model details
const HUGGINGFACE_SPACE_NAME = "faysalalmahmud/surgical-equipment-recognizer";

// Connect to the Gradio Space once
let client = null;
try {
    client = await Client.connect(HUGGINGFACE_SPACE_NAME);
} catch (error) {
    showResults(`Failed to connect to the Hugging Face Space: ${error.message}`, 'text-red-600');
    console.error(error);
}

// Event listener for image selection to show a preview
imageInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            imagePreview.src = e.target.result;
            imagePreviewContainer.classList.remove('hidden');
            resultsDiv.classList.add('hidden');
            resultsDiv.textContent = '';
        };
        reader.readAsDataURL(file);
    } else {
        imagePreviewContainer.classList.add('hidden');
    }
});

// Event listener for the predict button
predictButton.addEventListener('click', async () => {
    if (imageInput.files.length === 0) {
        showResults('Please select an image first.', 'text-red-600');
        return;
    }
    if (!client) {
        showResults('Client not connected. Please refresh the page.', 'text-red-600');
        return;
    }

    loadingSpinner.classList.remove('hidden');
    resultsDiv.classList.add('hidden');

    const imageFile = imageInput.files[0];

    try {
        const result = await client.predict("/predict", [imageFile]);

        console.log('API response:', result);

        if (result && result.data && result.data.length > 0) {
            const predictionData = result.data[0];
            let predictionText = '';

            if (predictionData && predictionData.label && predictionData.confidences) {
                const topPrediction = predictionData.confidences[0];
                const predictedToolName = topPrediction.label;
                predictionText = `Predicted Class: <span class="font-bold">${predictedToolName}</span> (Confidence: ${(topPrediction.confidence * 100).toFixed(2)}%)`;
            } else if (typeof predictionData === 'string') {
                const predictedToolName = predictionData;
                predictionText = `Prediction: <span class="font-bold">${predictedToolName}</span>`;
            } else {
                predictionText = 'Prediction format is unexpected. See console for details.';
            }

            showResults(predictionText, 'bg-green-50');

        } else {
            showResults('No prediction data received.', 'text-red-600');
        }

    } catch (error) {
        showResults(`Failed to get a prediction. Error: ${error.message}`, 'text-red-600');
        console.error('Prediction error:', error);
    } finally {
        loadingSpinner.classList.add('hidden');
    }
});

// Function to display results and handle styling
function showResults(message, colorClass = 'text-gray-700') {
    resultsDiv.innerHTML = message;
    resultsDiv.classList.remove('hidden');
    resultsDiv.className = `mt-6 p-4 rounded-lg border border-gray-200 text-gray-800 text-center font-medium`;
    resultsDiv.classList.add(colorClass);

    if (colorClass.includes('red')) {
         resultsDiv.classList.add('bg-red-50');
    } else if (colorClass.includes('green')) {
        resultsDiv.classList.add('bg-green-50');
    } else {
         resultsDiv.classList.add('bg-gray-100');
    }
}

// Toggle about content
toggleAboutButton.addEventListener('click', () => {
    aboutContent.classList.toggle('hidden');
});
