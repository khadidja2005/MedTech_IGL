from django.urls import path
from .views import LoginView, ForgotPasswordView, VerifyResetCodeView, ResetPasswordView

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('forgot-password/', ForgotPasswordView.as_view(), name='forgot-password'),
    path('verify-reset-code/', VerifyResetCodeView.as_view(), name='verify-reset-code'),
    path('reset-password/', ResetPasswordView.as_view(), name='reset-password'),
]
