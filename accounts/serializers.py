from rest_framework import serializers
from .models import CustomUser
from django.contrib.auth import authenticate
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.http import urlsafe_base64_encode,urlsafe_base64_decode
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from django.utils.encoding import smart_bytes,force_str
from .utils import send_reset_email
class UserRegisterSerializer(serializers.ModelSerializer):
    password=serializers.CharField(max_length=68,min_length=6,write_only=True)
    password2=serializers.CharField(max_length=68,min_length=6,write_only=True)
    class Meta:
        model=CustomUser
        fields=("email","first_name","last_name","password","password2")

    
    def validate(self, attrs):
        password=attrs.get("password","")
        password2=attrs.get("password2","")
        if password != password2:
            raise serializers.ValidationError("passwords do not match")
        return attrs
        
    
    def create(self, validated_data):
        user=CustomUser.objects.create_user(
            email=validated_data["email"],
            first_name=validated_data.get("first_name"),
            last_name=validated_data.get("last_name"),
            password=validated_data.get("password"),
        )
        return user
    

class LoginSerializer(serializers.ModelSerializer):
    email=serializers.EmailField(max_length=255,min_length=6)
    password=serializers.CharField(max_length=68,write_only=True)
    full_name=serializers.CharField(max_length=255,read_only=True)
    access_token=serializers.CharField(max_length=255, read_only=True)
    refresh_token=serializers.CharField(max_length=255, read_only=True)

    class Meta:
        model=CustomUser
        fields=['email','password','full_name','access_token','refresh_token']

    def validate(self, attrs):
        email=attrs.get('email')
        password=attrs.get('password')
        request=self.context.get('request')
        user=authenticate(request, email=email, password=password)
        if not user:
            raise AuthenticationFailed("Invalid credential try again")
        if not user.is_verified:
            raise AuthenticationFailed("Email is not verified")
        
        user_tokens=user.tokens()


        return {
            'email':user.email,
            'full_name':user.get_full_name,
            'access_token':user_tokens.get('access'),
            'refresh_token':user_tokens.get('refresh'),
        }
    
class PasswordResetRequestSerializer(serializers.ModelSerializer):
    email=serializers.EmailField(max_length=255)

    class Meta:
        model=CustomUser
        fields=['email']
    
    def validate(self, attrs):
        email=attrs.get('email')
        if CustomUser.objects.filter(email=email).exists():
            user=CustomUser.objects.get(email=email)
            uidb64=urlsafe_base64_encode(smart_bytes(user.id))
            token=PasswordResetTokenGenerator().make_token(user)
            request=self.context.get('request')
            site_domain=get_current_site(request).domain
            relative_link=reverse('password-reset-confirm',kwargs={'uidb64':uidb64, 'token':token})
            abslink=f'http://{site_domain}{relative_link}'
            email_body=f"Hello use the link below to reset your password \n {abslink}"
            data={
                'email_body':email_body,
                'email_subject':"Reset your Password",
                'to_email':user.email

            }
            send_reset_email(data)
        return super().validate(attrs)
    

class SetNewPasswordSerializer(serializers.ModelSerializer):
    password=serializers.CharField(max_length=100, min_length=6, write_only=True)
    confirm_password=serializers.CharField(max_length=100, min_length=6, write_only=True)
    uidb64=serializers.CharField(write_only=True)
    token=serializers.CharField(write_only=True)

    class Meta:
        model=CustomUser
        fields=["password","confirm_password","uidb64","token"]
    
    def validate(self, attrs):
        try:
            token=attrs.get('token'),
            uidb64=attrs.get('uidb64'),
            password=attrs.get('password'),
            confirm_password=attrs.get('confirm_password')

            user_id=force_str(urlsafe_base64_decode(uidb64))
            user=CustomUser.objects.get(id=user_id)

            if not PasswordResetTokenGenerator().check_token(user,token):
                raise AuthenticationFailed("reset link is invalid or has expired", 401)
            
            if password != confirm_password:
                raise AuthenticationFailed("passwords do not match")
            user.set_password(password)
            user.save()
            return user
        except Exception as e:
            return AuthenticationFailed("link is invalid or has expired")