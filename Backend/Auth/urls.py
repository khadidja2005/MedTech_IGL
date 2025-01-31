from django.urls import path
from . import views

urlpatterns = [
    path("login/", views.login, name="login"),
    path("signup/admin/", views.signup_admin, name="signup-admin"),
    path("signup/personnel/", views.signup_personnel, name="signup-personnel"),
    path("signup/patient/", views.signup_patient, name="signup-patient"),
    path("reset-password/", views.request_reset_code, name="reset-password"),
    path("reset-password/verify/", views.verify_reset_code, name="verify-reset-code"),
    path("reset-password/confirm/", views.reset_password, name="reset-password"),
]
