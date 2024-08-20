import random
from django.conf import settings
from django.core.mail import EmailMessage
from .models import CustomUser,OneTimePassword
from django.core.mail import send_mail
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