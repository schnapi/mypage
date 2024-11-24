from rest_framework.serializers import ModelSerializer, CharField

from .models import UserExperience

class UserExperienceSerializer(ModelSerializer):
    class Meta:
        model = UserExperience
        fields = "__all__"