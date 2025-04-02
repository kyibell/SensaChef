from fastapi import APIRouter, File, UploadFile # For Route
import io # For opening image bytes
import torchvision.transforms as transforms # transforms for image detection
from torchvision import models # model import
from torchvision.models import resnet50, ResNet50_Weights
from PIL import Image # for image handling
import json # for class names and json file
import os # for paths
import torch

base_directory = os.path.dirname(os.path.abspath(__file__)) # Get the Base Directory
json_path = os.path.join(base_directory, "static", "imagenet_class_index.json") # Get the JSON path from the base_directory
# model_path = os.path.join(base_directory, "static", "resnet50.pth")



# model 
model = resnet50(weights=ResNet50_Weights.IMAGENET1K_V1)
model.eval()

#imagenet classes for model
with open(json_path, "r") as json_file: # open the json file
    imagenet_class_index = json.load(json_file) # assign imagenet_class_index to json_file

def transform_image(image_bytes): # Transform the image so it can be correctly detected by the model
    my_transforms = transforms.Compose([transforms.Resize(255),  
                                        transforms.CenterCrop(224), 
                                        transforms.ToTensor(), 
                                        transforms.Normalize(
                                            [0.485, 0.456, 0.406],
                                            [0.229, 0.224, 0.225])])
    image = Image.open(io.BytesIO(image_bytes)) # open the image in byte format
    return my_transforms(image).unsqueeze(0)

def get_prediction(image_bytes):
    tensor = transform_image(image_bytes=image_bytes) # transform the image for predicitons
    outputs = model.forward(tensor)
    _, y_hat = outputs.max(1)
    predicted_index = str(y_hat.item())
    return imagenet_class_index[predicted_index] # return the index of the prediction

def get_result(image_file):
    image_bytes = image_file.file.read()
    class_id, class_name = get_prediction(image_bytes) # pull the class id and name from predictions
    return { # return the prediction
        "predictions":{
           "class_id": class_id,
            "class_name": class_name
        }
   }
   
# Import the Router to Create the Routes
router = APIRouter()


# POST Router Method to Detect Food for Users
@router.post('/api/detect-food')
async def detect_food(file: UploadFile = File(...)): # pass a file through the fuction for image upload
    try: # Error Handling for food
        return get_result(image_file=file)
    except Exception as error:
        return {
            "message": "Internal Server Error, could not detect food."
        }