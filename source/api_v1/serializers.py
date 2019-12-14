from rest_framework import serializers
from webapp.models import Commit


class CommitSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(read_only=True)

    class Meta:
        model = Commit
        fields = ['id', 'description', 'created_by', 'image_for_comment',
                  'created_at']
