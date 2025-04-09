from fastapi.testclient import TestClient

import app.main

client = TestClient(app.main.app)

def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello, world!"}



def test_read_all_users():
    response = client.get("/users")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
