from django import forms
from webapp.models import Image


class ImageForm(forms.ModelForm):

    class Meta:
        model = Image
        exclude = ['created_at', 'created_by', 'like']

