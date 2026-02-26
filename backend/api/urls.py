from django.urls import path
from .views import ai_enhance_text

urlpatterns = [
    path('enhance/', ai_enhance_text, name='ai-enhance'),
]