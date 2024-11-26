from rest_framework.serializers import ModelSerializer, CharField
from django.contrib.auth import get_user_model

from .models import UserExperience, Company, Project


class CompanySerializer(ModelSerializer):
    class Meta:
        model = Company
        fields = "__all__"
class ProjectSerializer(ModelSerializer):
    class Meta:
        model = Project
        fields = "__all__"

class UserSerializer(ModelSerializer):
    # groups = GroupsSerializer(read_only=True, many=True)
    class Meta(object):
        model = get_user_model()
        fields = ("username",)

class UserExperienceSerializer(ModelSerializer):
    company = CompanySerializer(read_only=True)
    project = ProjectSerializer(read_only=True)
    user = UserSerializer(read_only=True)

    class Meta:
        model = UserExperience
        fields = "__all__"