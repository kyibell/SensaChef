from fastapi import APIRouter, File, UploadFile # For Route
import io # For opening image bytes
import torchvision.transforms as transforms # transforms for image detection
from torchvision import models # model import
from PIL import Image # for image handling
import json # for class names and json file
import os # for paths
import timm
import torch
import torch.nn as nn

base_directory = os.path.dirname(os.path.abspath(__file__)) # Get the Base Directory
class_path = os.path.join(base_directory, "static", "classes.json") # Get the JSON path from the base_directory



# model
model = timm.create_model("efficientnet_b0", pretrained=True) # Load the Model
model.classifier = nn.Linear(model.classifier.in_features, 101) # Set the classifier to only the dataset we have
model.eval()

#imagenet classes for model
with open(class_path, "r") as json_file: # open the json file
    food101_classes = json.load(json_file) # assign imagenet_class_index to json_file

def transform_image(image_bytes): # Transform the image so it can be correctly detected by the model
    my_transforms = transforms.Compose([transforms.Resize((224, 224)),
                                        transforms.CenterCrop(224), 
                                        transforms.ToTensor(), 
                                        transforms.Normalize(mean=
                                            [0.485, 0.456, 0.406],
                                            std=[0.229, 0.224, 0.225])])
    image = Image.open(io.BytesIO(image_bytes)) # open the image in byte format
    return my_transforms(image).unsqueeze(0)

def get_prediction(image_bytes, class_labels):
   tensor = transform_image(image_bytes=image_bytes) # transform the image for predicitons
   # outputs = model.forward(tensor)
   # _, y_hat = outputs.max(1)
   # predicted_index = str(y_hat.item())
   # return food101_classes[predicted_index] # return the index of the prediction
   with torch.no_grad():
       output = model(tensor) # run the tensor through the model
       predicted_index = output.argmax(dim=1).item() # get the predicted index from classes.json
       predicted_label = food101_classes[predicted_index] # get the label from the array
       return predicted_label

def get_result(image_file):
    image_bytes = image_file.file.read()
    predicted_label = get_prediction(image_bytes, food101_classes) # pull the label from predictions
    print(predicted_label)
    return { # return the prediction
        "predictions":{
           "food": predicted_label
        }
   }
   
# Import the Router to Create the Routes
router = APIRouter()


# POST Router Method to Detect Food for Users
@router.post('/api/detect-food')
async def detect_food(file: UploadFile = File(...)): # pass a file through the fuction for image upload
  #  try: # Error Handling for food
        return get_result(image_file=file)
   # except Exception as error:
       # return {
            # "message": "Internal Server Error, could not detect food."
      #  }