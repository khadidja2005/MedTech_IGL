# Generated by Django 4.2.17 on 2024-12-28 21:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('BDD', '0012_alter_patient_adresse_alter_patient_date_naissance_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='dpi',
            name='medecin_id',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='BDD.personnelmedical'),
        ),
    ]
