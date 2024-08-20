from django.shortcuts import render
from rest_framework.generics import GenericAPIView
from .serializers import UserRegisterSerializer,LoginSerializer,PasswordResetRequestSerializer,SetNewPasswordSerializer
from rest_framework.response import Response
from rest_framework import status
from .utils import send_code_to_user 
from .models import OneTimePassword
from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import smart_str,DjangoUnicodeDecodeError
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from .models import CustomUser
from django.core.exceptions import ObjectDoesNotExist
class RegisterUserView(GenericAPIView):
    serializer_class=UserRegisterSerializer

    def post(self,request):
        user_data=request.data
        serializer=self.serializer_class(data=user_data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            user=serializer.data
            send_code_to_user(user['email'])
            return  Response({
                'data':user
            },
            status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
class VerifyUserEmail(GenericAPIView):
    def post(self,request):
        otpcode=request.data.get('otp')
        try:
            user_code_obj=OneTimePassword.objects.get(code=otpcode)
            user=user_code_obj.user
            if not user.is_verified:
                user.is_verified=True
                user.save()
                return Response({
                    'message':'Email has been verified successfully'
                },status=status.HTTP_200_OK)
            return Response({
                'message':'The code is invalid user already verified'
            },status=status.HTTP_204_NO_CONTENT)
        except  OneTimePassword.DoesNotExist:
            return Response({
                'message':'passcode not provided'
            },
            status=status.HTTP_404_NOT_FOUND)

class LoginUser(GenericAPIView):
    serializer_class=LoginSerializer

    def post(self,request):
        serializer=self.serializer_class(data=request.data,context={'request':request})
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)



class PasswordResetRequestView(GenericAPIView):
    serializer_class=PasswordResetRequestSerializer
    def post(self,request):
        serializer=self.serializer_class(data=request.data, context={'request':request})
        serializer.is_valid(raise_exception=True)
        return Response(
            {
                'message':'A password reset link has been sent to your email'
            },
            status=status.HTTP_200_OK
        )

class PasswordResetConfirm(GenericAPIView):
    def get(self,request, uidb64, token):
        try:
            user_id=smart_str(urlsafe_base64_decode(uidb64))
            user=CustomUser.objects.get(id=user_id)
            if not PasswordResetTokenGenerator().check_token(user, token):
                return Response(
                    {'message':'token is invalid or has expired'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            return Response({
                'success':True,
                'message':'Credentials is valid',
                'uidb64':uidb64,
                'token':token
            },status=status.HTTP_200_OK)
        except (DjangoUnicodeDecodeError, ObjectDoesNotExist):
            return Response({'message':'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        

class SetNewPassword(GenericAPIView):
    serializer_class=SetNewPasswordSerializer
    def patch(self,request):
        serializer=self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({"message":"Password has been reset successfully"}, status=status.HTTP_200_OK)