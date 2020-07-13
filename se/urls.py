from django.urls import path
from se import views

app_name = 'se'
urlpatterns = [
    path('search/', views.korona),
    # 可遵循rf将views改为api文件
]
