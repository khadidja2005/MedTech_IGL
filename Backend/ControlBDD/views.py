from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from faker import Faker
from BDD.models import (
    Etablissement,
    Admin,
    PersonnelMedical,
    Patient,
    Medicament,
    Mutuelle,
    Ordonnance,
    Hospitalisation,
    BilanBio,
    BilanRadio,
    ResultatBio,
    ResultatRadio,
    Consultation,
    Contact,
    Antecedent,
    Soins,
    DPI,
    etablissement_personnel_medical,
)
import random


def clean_database():
    # Suppression dans l'ordre inverse des dépendances
    ResultatRadio.objects.all().delete()
    BilanRadio.objects.all().delete()
    ResultatBio.objects.all().delete()
    BilanBio.objects.all().delete()
    Soins.objects.all().delete()
    Medicament.objects.all().delete()
    Ordonnance.objects.all().delete()
    Consultation.objects.all().delete()
    Hospitalisation.objects.all().delete()
    Antecedent.objects.all().delete()
    DPI.objects.all().delete()
    Contact.objects.all().delete()
    Patient.objects.all().delete()
    Mutuelle.objects.all().delete()
    etablissement_personnel_medical.objects.all().delete()
    PersonnelMedical.objects.all().delete()
    Admin.objects.all().delete()
    Etablissement.objects.all().delete()


def seed_database_func():
    fake = Faker()
    etablissements = []
    for _ in range(10):
        etablissement = Etablissement.objects.create(
            nom_etablissement=fake.company(),
            adresse=fake.address(),
            telephone="".join([str(random.randint(0, 9)) for _ in range(5)]),
            email=fake.email(),
            type=random.choice(["HOPITAL", "CLINIQUE", "CABINET"]),
        )
        etablissements.append(etablissement)

    # Create admins
    for _ in range(5):
        Admin.objects.create(
            nom_complet=fake.name(),
            email=fake.email(),
            password=fake.password(),
            lienPhoto=fake.url(),
        )

    # Create medical personnel and link to establishments without duplicates
    personnel_list = []
    for _ in range(20):
        personnel = PersonnelMedical.objects.create(
            nom_complet=fake.name(),
            email=fake.email(),
            telephone="".join([str(random.randint(0, 9)) for _ in range(5)]),
            password=fake.password(),
            role=random.choice(
                ["MEDECIN", "INFIRMIER", "PHARMACIEN", "RADIOLOGUE", "LABORANTIN"]
            ),
            lienPhoto=fake.url(),
        )
        personnel_list.append(personnel)

        # Assign each personnel to a random range of 5 establishments
        selected_etablissements = random.sample(
            etablissements, 5
        )  # Select 5 random establishments

        # Create entries for the personnel and the 5 establishments
        for etablissement in selected_etablissements:
            etablissement_personnel_medical.objects.create(
                etablissement=etablissement, personnel_medical=personnel
            )

    patients = []
    for _ in range(20):
        patient = Patient.objects.create(
            nss="".join([str(random.randint(0, 9)) for _ in range(10)]),
            nom_complet=fake.name(),
            date_naissance=fake.date_of_birth(),
            adresse=fake.address(),
            telephone="".join([str(random.randint(0, 9)) for _ in range(5)]),
            email=fake.email(),
            password=fake.password(),
        )
        patients.append(patient)
        # Create range of three DPI per patient
        x = random.randint(1, 3)
        for _ in range(x):  # Repeat the process three times
            DPI.objects.create(
                date_creation=fake.date(),
                patient=patient,  # Directly associate with the just-created patient
                etablissement_id=random.choice(Etablissement.objects.all()),
            )

        for _ in range(3):
            Mutuelle.objects.create(
                nom=fake.company(),
                numero_adherent="".join([str(random.randint(0, 9)) for _ in range(5)]),
                type_couverture=fake.word(),
                telephone="".join([str(random.randint(0, 9)) for _ in range(10)]),
                patient_id=patient,
                email=fake.email(),
            )

        for x in range(4):
            Contact.objects.create(
                nom_complet=fake.name(),
                relation=fake.word(),
                telephone="".join([str(random.randint(0, 9)) for _ in range(5)]),
                adresse=fake.address(),
                priorite=x,
                patient=patient,
                email=fake.email(),
            )

    for _ in range(50):
        Antecedent.objects.create(
            type=fake.word(),
            nom=fake.word(),
            description=fake.text(),
            date_debut=fake.date(),
            date_fin=fake.date(),
            DPI_id=random.choice(DPI.objects.all()),
        )

    medecins = PersonnelMedical.objects.filter(role="MEDECIN")
    for _ in range(70):
        medecin = None
        while not medecin:
            DPIh = random.choice(DPI.objects.all())
            for med in medecins:
                perso_etabs = etablissement_personnel_medical.objects.filter(
                    personnel_medical=med
                )
                for etab in perso_etabs:
                    if etab.etablissement == DPIh.etablissement_id:
                        medecin = med
                        break

        Hospitalisation.objects.create(
            date_debut=fake.date(),
            date_fin=random.choice([fake.date(), None]),
            DPI=DPIh,
            medecin_responsable=medecin,
        )

    for _ in range(30):
        medecin = None
        while not medecin:
            Hospitalisationh = random.choice(Hospitalisation.objects.all())
            for med in medecins:
                perso_etabs = etablissement_personnel_medical.objects.filter(
                    personnel_medical=med
                )
                for etab in perso_etabs:
                    if etab.etablissement == Hospitalisationh.DPI.etablissement_id:
                        medecin = med
                        break

        Consultation.objects.create(
            date=fake.date(),
            resume=fake.text(),
            Medecin=medecin,
            Hospitalisation=Hospitalisationh,
        )

    pharmaciens = PersonnelMedical.objects.filter(role="PHARMACIEN")
    for _ in range(30):
        pharmacien = None
        while not pharmacien:
            consultationh = random.choice(Consultation.objects.all())
            for phar in pharmaciens:
                perso_etabs = etablissement_personnel_medical.objects.filter(
                    personnel_medical=phar
                )
                for etab in perso_etabs:
                    if (
                        etab.etablissement
                        == consultationh.Hospitalisation.DPI.etablissement_id
                    ):
                        pharmacien = phar
                        break
            estValide = (fake.boolean(),)
            if estValide:
                estTerminer = True
            else:
                estTerminer = False
        Ordonnance.objects.create(
            date=fake.date(),
            estValide=estValide,
            estTerminer=estTerminer,
            pharmacien_id=pharmacien,
            consultation=consultationh,
        )

    for _ in range(70):
        Medicament.objects.create(
            nom=fake.word(),
            dosage=f"{random.randint(1, 1000)}mg",
            duree=f"{random.randint(1, 30)} jours",
            ordonnance=random.choice(Ordonnance.objects.all()),
        )

    infermiers = PersonnelMedical.objects.filter(role="INFIRMIER")
    for _ in range(30):
        infermier = None
        while not infermier:
            hosp = random.choice(Hospitalisation.objects.all())
            for inf in infermiers:
                perso_etabs = etablissement_personnel_medical.objects.filter(
                    personnel_medical=inf
                )
                for etab in perso_etabs:
                    if etab.etablissement == hosp.DPI.etablissement_id:
                        infermier = inf
                        break

        type = random.choice(
            [
                "INFIRMIER",
                "OBSERVATION D'ETAT",
                "ADMINISTRATION DE MEDICAMENT",
                "AUTRES",
            ]
        )

        if type == "ADMINISTRATION DE MEDICAMENT":
            ds = f"{random.randint(1, 1000)}mg"
            med = random.choice(Medicament.objects.all())
        else:
            ds = None
            med = None

        Soins.objects.create(
            type_soins=type,
            date=fake.date(),
            heure=fake.time(),
            infermier=infermier,
            hospitalisation=hosp,
            dose=ds,
            medicament=med,
            description=fake.text(),
        )

    for _ in range(30):
        bilanBioh = BilanBio.objects.create(
            date_debut=fake.date(),
            date_fin=None,
            parametres=fake.text(),
            est_complet=fake.boolean(),
            est_resultat=False,
            Consultation=random.choice(Consultation.objects.all()),
        )
        rd = random.choice([True, False])
        if rd:
            laborantin = None
            while not laborantin:
                laborantins = PersonnelMedical.objects.filter(role="LABORANTIN")
                for lab in laborantins:
                    perso_etabs = etablissement_personnel_medical.objects.filter(
                        personnel_medical=lab
                    )
                    for etab in perso_etabs:
                        if (
                            etab.etablissement
                            == bilanBioh.Consultation.Hospitalisation.DPI.etablissement_id
                        ):
                            laborantin = lab
                            break

            ResultatBio.objects.create(
                date_mesure=fake.date(),
                heure_mesure=fake.time(),
                parametre=fake.word(),
                laborantin=laborantin,
                valeur_mesure=f"{random.randint(1, 100)} {random.choice(['mg/dL', 'mmol/L', 'g/L'])}",
                bilan_bio=bilanBioh,
                norme=fake.word(),
            )
            bilanBioh.est_complet = True
            bilanBioh.est_resultat = fake.boolean()
            if bilanBioh.est_resultat:
                bilanBioh.date_fin = fake.date()

            bilanBioh.save()

    for _ in range(15):
        consu = random.choice(Consultation.objects.all())
        BilanRadio.objects.create(
            date_debut=fake.date(),
            date_fin=None,
            type_radio=random.choice(["RADIO", "SCANNER", "IRM"]),
            Consultation=consu,
            description=fake.text(),
            est_complet=fake.boolean(),
            est_resultat=False,
            resultat_id=None,
        )

        rb = random.choice([True, False])
        if rb:
            radiologue = None
            while not radiologue:
                radiologues = PersonnelMedical.objects.filter(role="RADIOLOGUE")
                for rad in radiologues:
                    perso_etabs = etablissement_personnel_medical.objects.filter(
                        personnel_medical=rad
                    )
                    for etab in perso_etabs:
                        if (
                            etab.etablissement
                            == consu.Hospitalisation.DPI.etablissement_id
                        ):
                            radiologue = rad
                            break

            ResultatRadio.objects.create(
                piece_jointe=fake.text(),
                date=fake.date(),
                compte_rendu=fake.text(),
                radiologue_compte_rendu=radiologue,
                radiologue=radiologue,
            )
            est_resultat = fake.boolean()
            if est_resultat:
                date_fin = fake.date()
            else:
                date_fin = None
            BilanRadio.objects.filter(Consultation=consu).update(
                est_complet=True,
                est_resultat=est_resultat,
                date_fin=date_fin,
                resultat_id=ResultatRadio.objects.last(),
            )


@api_view(["POST"])
def seed_database(request):
    try:
        clean_database()
        seed_database_func()
        return Response({"message": "Database seeded successfully", "status": 200})
    except Exception as e:
        return Response({"status": "error", "message": str(e)}, status=500)


@api_view(["POST"])
def clear_database(request):
    try:
        clean_database()
        return Response({"message": "Database cleared successfully", "status": 200})
    except Exception as e:
        return Response({"status": "error", "message": str(e)}, status=500)
