from rest_framework.request import Request
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User

from .serializers import UserExperienceSerializer
from .models import UserExperience, Project, Company
from table_utils import StandardResultsSetPagination, SortField
# # Suggested code may be subject to a license. Learn more: ~LicenseLog:179097349.
# from rest_framework.authentication import SessionAuthentication, TokenAuthentication
# from rest_framework.permissions import IsAuthenticated


class UserCVView(APIView):
    # authentication_classes = [SessionAuthentication, TokenAuthentication]
    # permission_classes = [IsAuthenticated]

    def get(self, request: "Request", user_name: str, format=None):
        
        data = dict(test=1)
        return Response(data)


class UserApiView(generics.ListCreateAPIView):
    queryset = UserExperience.objects.all()
    serializer_class = UserExperienceSerializer
    pagination_class = StandardResultsSetPagination
    default_sort_field = SortField("project__datetime_start", sort_dir=SortField.SORT_DIR_DESC)

    class Params:
        q_sort_by = "qSortBy"  # query string param name for the field
        q_sort_dir = "qSortDir"  # query string param name for sort direction (ascending/descending)

    def list(self, request, *args, **kwargs):
        res = super().list(request, *args, **kwargs)
        return res
        
    def create(self, request, *args, **kwargs):
        data = request.data
        company = Company.objects.get_or_create(name=data["company"]["name"])
        proj_dict = data["project"]
        project = Project.objects.get_or_create(name=proj_dict["name"], position=proj_dict["position"], description=proj_dict["description"], url=proj_dict["url"], datetime_start=proj_dict["datetime_start"], datetime_end=proj_dict["datetime_end"])
        user = User.objects.get(username="sandi")
        UserExperience.objects.get_or_create(user=user, company=company[0], project=project[0])
        return Response()
        
    def get_queryset(self):
        queryset = super().get_queryset()
        ordering = self.get_ordering()
        if ordering:
            return queryset.order_by(ordering)
        return queryset
    
    def get_ordering(self):
        sf = self.default_sort_field
        if sf:
            orderby = self.request.GET.get(self.Params.q_sort_by, sf.sort_by)
            sort_direction = self.request.GET.get(self.Params.q_sort_dir, sf.sort_dir)
            # The negative sign in front the value indicates descending order.
            if sort_direction == SortField.SORT_DIR_DESC:
                orderby = "-" + orderby
            return orderby
        return None