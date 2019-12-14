from django.urls import path
from webapp.views import *

urlpatterns = [
    path('', IndexImageView.as_view(), name='index'),
    path('image/<int:pk>/', ImageDetailView.as_view(), name='image'),
    path('image/add/', ImageCreateView.as_view(), name='image_add'),
    path('image/<int:pk>/edit/', ImageUpdate.as_view(), name='update_image'),
    path('image/<int:pk>/delete/', ImageDelete.as_view(), name='delete_image'),

]

app_name = 'webapp'
