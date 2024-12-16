from django.db import models
from document_viewer.settings import AUTH_USER_MODEL


class Document(models.Model):
    user = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.CASCADE)
    file = models.FileField(upload_to='documents/')
    description = models.TextField(blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.file.name
    


class SharedDocument(models.Model):
    document = models.ForeignKey(Document, on_delete=models.CASCADE)
    shared_with = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.CASCADE)
    shared_by = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='shared_by')
    shared_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.shared_by.username} shared with {self.shared_with.username}"
