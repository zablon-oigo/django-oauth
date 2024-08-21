from django.urls import path
from .views import RegisterUserView,VerifyUserEmail,LoginUser,PasswordResetConfirm,SetNewPassword,PasswordResetRequestView,LogoutUserView
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView
urlpatterns=[
    path("register/",RegisterUserView.as_view(),name="register"),
    path("verify/",VerifyUserEmail.as_view(),name="verify"),
    path("token/", TokenObtainPairView.as_view(),name="token"),
    path("refresh/",TokenRefreshView.as_view(),name="refresh"),
    path("login/",LoginUser.as_view(),name="login"),
    path("password-reset/",PasswordResetRequestView.as_view(),name="password-reset"),
    path("password-reset-confirm/<uidb64>/<token>/",PasswordResetConfirm.as_view(), name="password-reset-confirm"),
    path("set-new-password/",SetNewPassword.as_view(),name="set-password"),
    path("logout/",LogoutUserView.as_view(),name="logout")

]