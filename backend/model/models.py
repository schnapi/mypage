from django.conf import settings
from django.db import models  #, transaction
from django.utils import timezone
from django.contrib.auth.models import User

class Company(models.Model):
    name = models.CharField(max_length=100, null=True)

class Project(models.Model):
    name = models.CharField(max_length=100)
    position = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    url = models.TextField(blank=True, null=True)
    datetime_start = models.DateTimeField(null=True)
    datetime_end = models.DateTimeField(null=True)
    
class UserExperience(models.Model):
    company = models.ForeignKey(Company, on_delete=models.PROTECT)
    project = models.ForeignKey(Project, on_delete=models.PROTECT)

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT)

    

class TimeStampedModel(models.Model):
    creation_date = models.DateTimeField(editable=False, default=timezone.now)
    last_modified = models.DateTimeField(editable=False, default=timezone.now)

    def save(self, *args, **kwargs):
        if not self.creation_date:
            self.creation_date = timezone.now()

        self.last_modified = timezone.now()
        return super(TimeStampedModel, self).save(*args, **kwargs)

    class Meta:
        abstract = True