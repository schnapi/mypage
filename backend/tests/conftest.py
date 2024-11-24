import pytest
from pathlib import Path
from django.conf import settings


@pytest.fixture(scope="session")
def django_db_setup():  # we have to over
    db_path = Path("db.sqlite3").absolute()
    assert db_path.is_file()
    settings.DATABASES["default"] = {"ENGINE": "django.db.backends.sqlite3", "NAME": str(db_path), "ATOMIC_REQUESTS": True}

# @pytest.mark.django_db
# def create_users():
#     from django.contrib.auth.models import User
#     from rest_framework.authtoken.models import Token

#     user, _ = User.objects.get_or_create(username="test", email="test", password="test")
#     token, _ = Token.objects.get_or_create(user=user)
#     return token.key