from django.urls import path
from .views import RegisterUserView,VerifyUserEmail,LoginUser
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView
urlpatterns=[
    path("register/",RegisterUserView.as_view(),name="register"),
    path("verify/",VerifyUserEmail.as_view(),name="verify"),
    path("token/", TokenObtainPairView.as_view(),name="token"),
    path("refresh/",TokenRefreshView.as_view(),name="refresh"),
    path("login/",LoginUser.as_view(),name="login"),
]