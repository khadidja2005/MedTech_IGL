from django import forms
from .models import CustomUser

# Form to change personal information
class ChangePersonalInfoForm(forms.ModelForm):
    class Meta:
        model = CustomUser
        fields = ['nom_complet', 'email', 'telephone', 'specialite']  # Include specialite for Personnel Médical

# Form for changing password
class ChangePasswordForm(forms.Form):
    old_password = forms.CharField(widget=forms.PasswordInput, label="Ancien Mot de Passe")
    new_password = forms.CharField(widget=forms.PasswordInput, label="Nouveau Mot de Passe")
    confirm_new_password = forms.CharField(widget=forms.PasswordInput, label="Confirmer Nouveau Mot de Passe")

    def clean(self):
        cleaned_data = super().clean()
        new_password = cleaned_data.get("new_password")
        confirm_new_password = cleaned_data.get("confirm_new_password")
        
        if new_password != confirm_new_password:
            raise forms.ValidationError("Les mots de passe ne correspondent pas.")
        return cleaned_data

# For patient: Only password change
class ChangePatientPasswordForm(forms.Form):
    old_password = forms.CharField(widget=forms.PasswordInput, label="Ancien Mot de Passe")
    new_password = forms.CharField(widget=forms.PasswordInput, label="Nouveau Mot de Passe")
    confirm_new_password = forms.CharField(widget=forms.PasswordInput, label="Confirmer Nouveau Mot de Passe")

    def clean(self):
        cleaned_data = super().clean()
        new_password = cleaned_data.get("new_password")
        confirm_new_password = cleaned_data.get("confirm_new_password")
        
        if new_password != confirm_new_password:
            raise forms.ValidationError("Les mots de passe ne correspondent pas.")
        return cleaned_data
