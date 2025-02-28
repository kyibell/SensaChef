from fastapi import APIRouter, File, UploadFile
import io
import torchvision.transforms as transforms
from torchvision import models
from PIL import Image
import json



# model 
model = models.densenet121(pretrained=True)
model.eval()

 #imagenet classes for model
imagenet_class_index = json.load(open('./static/imagenet_class_index.json'))

def transform_image(image_bytes):
    my_transforms = transforms.Compose([transforms.Resize(255), 
                                        transforms.CenterCrop(224), 
                                        transforms.ToTensor(), 
                                        transforms.Normalize(
                                            [0.485, 0.456, 0.406],
                                            [0.229, 0.224, 0.225])])
    image = Image.open(io.BytesIO(image_bytes))
    return my_transforms(image).unsqueeze(0)

def get_prediction(image_bytes):
    tensor = transform_image(image_bytes=image_bytes)
    outputs = model.forward(tensor)
    _, y_hat = outputs.max(1)
    predicted_index = str(y_hat.item())
    return imagenet_class_index[predicted_index]

def get_result(image_file):
    image_bytes = image_file.file.read()
    class_id, class_name = get_prediction(image_bytes)
    print(class_id, class_name)
    return {"message": "Hello from detect food"}
   # return {
      #  "message": "Hello from detect food",
     #   "predictions":{
     #       "class_id": class_id,
      #      "class_name": class_name
      #  }
   # }
# Import the Router to Create the Routes
router = APIRouter()



@router.post('/api/detect-food')
async def detect_food(file: UploadFile = File(...)):
    # print(image_file) # Print the image to display
    return get_result(image_file=file)