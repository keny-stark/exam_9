from django.urls import path, include
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.routers import DefaultRouter
from api_v1.views import CommitViewSet

app_name = 'api_v1'

router = DefaultRouter()
router.register(r'commit', CommitViewSet)

urlpatterns = [
    path('', include(router.urls))
]