import random
from django.conf import settings
from django.core.mail import EmailMessage
from .models import CustomUser,OneTimePassword
from django.core.mail import send_mail
from google.auth.transport import requests
from google.oauth2 import id_token
from accounts.models import CustomUser
from django.contrib.auth import authenticate
from django.conf import settings
from rest_framework.exceptions import AuthenticationFailed


def generateOtp():
    otp=""
    for i in range(6):
        otp+=str(random.randint(1,9))
    return otp


def send_code_to_user(email):
    subject="Email Verification"
    otp_code=generateOtp()
    print(otp_code)
    user=CustomUser.objects.get (email=email)
    current_site="example.com"
    email_body = (
    f"Dear {user.first_name},\n\n"
    f"Thank you for registering on {current_site}!\n\n"
    f"To complete your registration and verify your email address, please use the following one-time passcode (OTP):\n\n"
    f"CODE: {otp_code}\n\n"
    f"This code is valid for a limited time, so please use it promptly. If you did not sign up for an account, please disregard this email.\n\n"
    f"If you have any questions or need further assistance, feel free to contact our support team.\n\n"
    f"Best regards,\n"
    f"The {current_site} Team\n"
)
    from_email=settings.EMAIL_HOST_USER

    OneTimePassword.objects.create(user=user,code=otp_code)
    send_email=EmailMessage(subject=subject,body=email_body,from_email=from_email,to=[email])
    send_email.send(fail_silently=True)


def send_reset_email(data):
    email=EmailMessage(
        subject=data['email_subject'],
        body=data['email_body'],
        from_email=settings.EMAIL_HOST_USER,
        to=[data['to_email']]
    )
    email.send()


class Google():
    @staticmethod
    def validate(access_token):
        try:
            id_info=id_token.verify_oauth2_token(access_token,requests.Request())
            if "accounts.google.com" in id_info["iss"]:
                return id_info
        except Exception as e :
            return "token is invalid or has expired"
        
def login_social_user(email,password):
    user=authenticate(email=email, password=password)
    user_tokens=user.tokens()
    return {
        'email':user.email,
        'full_name':user.get_full_name,
        'access_token':str(user_tokens.get('access')),
        'refresh_token':str(user_tokens.get('refresh'))
    }

def register_social_user(provider,email,first_name,last_name):
    user=CustomUser.objects.filter(email=email)
    if user.exists():
        if provider == user[0].auth_provider:
            login_social_user(email, settings.SOCIAL_AUTH_PASSWORD)
        else:
            raise AuthenticationFailed(
                detail=f"Please continue you login with {user[0].auth_provider}"
            )
    else:
        new_user={
        'email':email,
        'first_name':first_name,
        'last_name':last_name,
        'password':settings.SOCIAL_AUTH_PASSWORD
         }
        register_user=CustomUser.objects.create_user(**new_user)
        register_user.auth_provider=provider
        register_user.is_verified=True
        register_user.save()
        login_social_user(email,register_user.email, password=settings.SOCIAL_AUTH_PASSWORD)



