from django import forms

from .models import Student


class EditForm(forms.ModelForm):
    class Meta:
        model = Student
        fields = ['avatar', 'phone', 'email']

        widgets = {
            'phone': forms.TextInput(),
            'email': forms.EmailInput()
        }

        labels = {
            'phone': "Телефон: ",
            'email': "Пошта: "
        }
