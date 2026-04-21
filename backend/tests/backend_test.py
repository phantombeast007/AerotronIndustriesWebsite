"""Backend tests for Aerotron Industries marketing site API."""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://aerotron-toolroom.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------- Health ----------
class TestHealth:
    def test_root(self, client):
        r = client.get(f"{API}/")
        assert r.status_code == 200
        data = r.json()
        assert data.get("status") == "ok"
        assert "message" in data

    def test_health(self, client):
        r = client.get(f"{API}/health")
        assert r.status_code == 200
        data = r.json()
        assert data.get("status") == "healthy"
        assert "timestamp" in data


# ---------- Contact endpoint ----------
class TestContact:
    def test_contact_valid_payload_and_persistence(self, client):
        payload = {
            "name": "TEST_Aerotron QA",
            "email": "test.qa+aerotron@example.com",
            "phone": "+91 98765 43210",
            "company": "TEST_QA Co",
            "service": "Die-Casting Moulds",
            "message": "Automated backend test inquiry — please ignore.",
        }
        r = client.post(f"{API}/contact", json=payload)
        assert r.status_code == 200, r.text
        data = r.json()
        assert "id" in data and isinstance(data["id"], str) and len(data["id"]) > 0
        assert data["name"] == payload["name"]
        assert data["email"] == payload["email"]
        assert data["phone"] == payload["phone"]
        assert data["company"] == payload["company"]
        assert data["service"] == payload["service"]
        assert data["message"] == payload["message"]
        assert "email_sent" in data and isinstance(data["email_sent"], bool)
        assert data["email_sent"] is True, "Expected email_sent=True with Resend configured"
        assert "created_at" in data

        created_id = data["id"]

        # Verify persistence via GET /api/contact
        r2 = client.get(f"{API}/contact")
        assert r2.status_code == 200
        items = r2.json()
        assert isinstance(items, list)
        matched = [i for i in items if i.get("id") == created_id]
        assert len(matched) == 1, f"Created inquiry {created_id} not found in GET list"
        assert matched[0]["email"] == payload["email"]
        assert matched[0]["message"] == payload["message"]

    def test_contact_minimal_required_fields(self, client):
        payload = {
            "name": "TEST_Minimal",
            "email": "minimal+qa@example.com",
            "message": "Minimal required field test",
        }
        r = client.post(f"{API}/contact", json=payload)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["name"] == payload["name"]
        assert data["phone"] is None
        assert data["company"] is None
        assert data["service"] is None

    def test_contact_invalid_email_returns_422(self, client):
        payload = {"name": "X", "email": "not-an-email", "message": "msg"}
        r = client.post(f"{API}/contact", json=payload)
        assert r.status_code == 422

    def test_contact_missing_name_returns_422(self, client):
        payload = {"email": "ok@example.com", "message": "msg"}
        r = client.post(f"{API}/contact", json=payload)
        assert r.status_code == 422

    def test_contact_missing_message_returns_422(self, client):
        payload = {"name": "X", "email": "ok@example.com"}
        r = client.post(f"{API}/contact", json=payload)
        assert r.status_code == 422

    def test_contact_empty_name_returns_422(self, client):
        payload = {"name": "", "email": "ok@example.com", "message": "msg"}
        r = client.post(f"{API}/contact", json=payload)
        assert r.status_code == 422

    def test_contact_list_no_mongo_id_leak(self, client):
        r = client.get(f"{API}/contact")
        assert r.status_code == 200
        for item in r.json():
            assert "_id" not in item
