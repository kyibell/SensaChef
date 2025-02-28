from fastapi.testclient import TestClient

import app.main

client = TestClient(app.main.app)

def test_predict_food_route():
    file_name = 'static/images/banana2.jpeg'
    
    response = client.post(
        "/api/detect-food", files={"file":("banana_image",open(file_name, "rb"), "images/jpeg")}
        
    )
    assert response.status_code == 200