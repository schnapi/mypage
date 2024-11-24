import pytest
import requests
from rest_framework.test import APIClient

from model.models import UserExperience, Company, Project

pytestmark = pytest.mark.django_db

@pytest.fixture
def api_client():
    return APIClient()

def test_create_resume(api_client):
    url = "/api/resume/"
    company = dict(name="company1")
    project = dict(name="project", description="description", position="position", url="url", datetime_start=None, datetime_end=None)
    response = api_client.post(url, {"company": company, "project": project}, format="json")
    print(response.content)
    assert response.status_code