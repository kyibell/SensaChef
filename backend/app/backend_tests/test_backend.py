# backend/app/backend_tests/test_backend.py
import pytest
from fastapi.testclient import TestClient
from app.main import app

@pytest.fixture(autouse=True)
def override_supabase(monkeypatch):
    # Create a dummy object that mimics the supabase client.
    dummy_client = type("DummyClient", (), {})()
    
    # Set dummy implementations for methods you expect to use.
    # For example, if your routes call supabase.table("users").select("*").execute(),
    # you can set up dummy_client.table to return an object with a select method.
    dummy_object = type("DummySelect", (), {
        "select": lambda self, *args, **kwargs: self,
        "execute": lambda self: type("DummyResponse", (), {"data": []})()
    })()
    
    monkeypatch.setattr("app.database.supabase", dummy_client)
    monkeypatch.setattr(dummy_client, "table", lambda name: dummy_object)

client = TestClient(app)

def test_read_all_users():
    response = client.get("/users")
    assert response.status_code == 200
    # With the dummy client, you expect an empty list.
    assert response.json() == []

