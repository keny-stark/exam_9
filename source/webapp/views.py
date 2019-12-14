from django.http import HttpResponseRedirect
from django.urls.base import reverse_lazy, reverse
from django.views.generic import ListView, DetailView, DeleteView, UpdateView, CreateView
from webapp.models import Image
from webapp.forms import ImageForm
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.core.exceptions import PermissionDenied


class IndexImageView(ListView):
    context_object_name = 'image'
    model = Image
    template_name = 'index.html'
    ordering = ['created_at']


class ImageDetailView(DetailView):
    model = Image
    template_name = 'image_detail.html'
    context_object_name = 'image'


class ImageCreateView(LoginRequiredMixin, CreateView):
    template_name = 'create.html'
    model = Image
    form_class = ImageForm
    raise_exception = PermissionDenied
    success_url = reverse_lazy('webapp:index')

    def form_valid(self, form):
        self.object = form.save(commit=False)
        self.object.created_by = self.request.user
        self.object.save()
        return HttpResponseRedirect(self.get_success_url())

    def get_success_url(self):
        return reverse('webapp:image', kwargs={'pk': self.object.pk})


class ImageUpdate(UserPassesTestMixin, UpdateView):
    model = Image
    form_class = ImageForm
    template_name = 'update.html'
    success_url = reverse_lazy('webapp:index')

    def test_func(self):
        image = Image.objects.filter(created_by__username=self.request.user, pk=self.kwargs['pk'])
        if image:
            return True


class ImageDelete(UserPassesTestMixin, DeleteView):
    template_name = 'delete.html'
    model = Image
    context_object_name = 'image'
    success_url = reverse_lazy('webapp:index')

    def test_func(self):
        image = Image.objects.filter(created_by__username=self.request.user, pk=self.kwargs['pk'])
        if image:
            return True
