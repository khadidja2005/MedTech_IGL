from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .forms import ChangePersonalInfoForm, ChangePasswordForm
from django.contrib.auth import update_session_auth_hash
@login_required
def change_admin_personnel_info(request):
    user = request.user

    if request.method == 'POST':
        info_form = ChangePersonalInfoForm(request.POST, instance=user)
        password_form = ChangePasswordForm(request.POST)
        
        if 'change_info' in request.POST and info_form.is_valid():
            info_form.save()
            messages.success(request, "Informations personnelles mises à jour avec succès.")
            return redirect('change_admin_personnel_info')
        
        if 'change_password' in request.POST and password_form.is_valid():
            old_password = password_form.cleaned_data['old_password']
            if not user.check_password(old_password):
                messages.error(request, "L'ancien mot de passe est incorrect.")
            else:
                new_password = password_form.cleaned_data['new_password']
                user.set_password(new_password)
                user.save()
                messages.success(request, "Mot de passe mis à jour avec succès.")
                return redirect('change_admin_personnel_info')

    else:
        info_form = ChangePersonalInfoForm(instance=user)
        password_form = ChangePasswordForm()

    return render(request, 'change_admin_personnel_info.html', {
        'info_form': info_form,
        'password_form': password_form
    })


@login_required
def change_patient_password(request):
    user = request.user

    if request.method == 'POST':
        password_form = ChangePatientPasswordForm(request.POST)
        if password_form.is_valid():
            old_password = password_form.cleaned_data['old_password']
            if not user.check_password(old_password):
                messages.error(request, "L'ancien mot de passe est incorrect.")
            else:
                new_password = password_form.cleaned_data['new_password']
                user.set_password(new_password)
                user.save()
                update_session_auth_hash(request, user)  # Keeps user logged in after password change
                messages.success(request, "Mot de passe mis à jour avec succès.")
                return redirect('change_patient_password')
    else:
        password_form = ChangePatientPasswordForm()

    return render(request, 'change_patient_password.html', {'password_form': password_form})