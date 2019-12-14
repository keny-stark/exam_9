from django.contrib.auth.models import User
from django.db import models


class Image(models.Model):
    image = models.ImageField(null=False, blank=False, upload_to='image_from_user', verbose_name='image')
    text = models.TextField(null=False, blank=False, verbose_name='text', max_length=2000)
    created_by = models.ForeignKey(User, related_name='user', on_delete=models.CASCADE, verbose_name='user')
    like = models.IntegerField(default=0, verbose_name='like')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Time created')

    def __str__(self):
        return self.text


class Commit(models.Model):
    description = models.TextField(max_length=2000, null=False, blank=False, verbose_name='Description')
    created_by = models.ForeignKey(User, null=False, blank=False, verbose_name='created by',
                                   on_delete=models.PROTECT, related_name='created_by')
    image_for_comment = models.ForeignKey('webapp.Image', related_name='image_for_commit', on_delete=models.SET_NULL,
                                          verbose_name='image for commit', blank=False, null=True)
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Time of add')

    def __str__(self):
        return self.description
