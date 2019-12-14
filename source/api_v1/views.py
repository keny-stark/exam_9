from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from api_v1.serializers import CommitSerializer
from webapp.models import Commit


class CommitViewSet(ModelViewSet):
    queryset = Commit.objects.none()
    serializer_class = CommitSerializer

    def get_queryset(self):
        return Commit.objects.all()

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def get_permissions(self):
        if self.action not in ['update', 'partial_update', 'destroy']:
            return [AllowAny()]
        return [IsAuthenticated()]

    @action(methods=['post'], detail=True)
    def like_up(self, request, pk=None):
        print('yes')
        like = self.get_object()
        print(self.get_object())
        like.like += 1
        like.save()
        return Response({'id': like.pk, 'like_up': like.like})

    @action(methods=['post'], detail=True)
    def like_down(self, request, pk=None):
        like = self.get_object()
        like.like -= 1
        like.save()
        return Response({'id': like.pk, 'like_down': like.like})
