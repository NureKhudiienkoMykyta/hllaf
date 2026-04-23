from django.db import models


# Create your models here.

class Group(models.Model):
    name = models.CharField(max_length=200, unique=True)

    def __str__(self):
        return self.name


class Student(models.Model):
    first_name = models.CharField(max_length=50)
    middle_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    group = models.ForeignKey(Group, on_delete=models.SET_NULL, null=True)
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=20, blank=True)
    avatar = models.ImageField(blank=True, upload_to='avatars')

    def __str__(self):
        return f"{self.last_name} {self.first_name} {self.middle_name}"


class Subject(models.Model):
    name = models.CharField(max_length=200, unique=True)

    def __str__(self):
        return self.name


class Mark(models.Model):
    mark = models.IntegerField()
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.mark)