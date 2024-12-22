from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from faker import Faker
from BDD.models import (
    Etablissement , Admin , PersonnelMedical , Patient , Medicament , Mutuelle , Ordonnance , Hospitalisation ,
    BilanBio , BilanRadio , ResultatBio , ResultatRadio , Consultation , Contact , Antecedent , Soins , DPI ,
    etablissement_personnel_medical 
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


def seed_database_func ():
    fake = Faker()
    etablissements = []
    for _ in range(10):
        etablissement = Etablissement.objects.create(
            id=fake.uuid4(),
            nom_etablissement=fake.company(),
            adresse=fake.address(),
            telephone=''.join([str(random.randint(0, 9)) for _ in range(5)]),
            email=fake.email(),
            type = fake.word(),
        )
        etablissements.append(etablissement)

    # Create admins
    for _ in range(5):
        Admin.objects.create(
            id=fake.uuid4(),
            nom_complet=fake.name(),
            email=fake.email(),
            password=fake.password(),
            lienPhoto = fake.url(),
        )

    # Create medical personnel and link to establishments without duplicates
    personnel_list = []
    for _ in range(20):
        personnel = PersonnelMedical.objects.create(
            id=fake.uuid4(),
            nom_complet=fake.name(),
            email=fake.email(),
            telephone=''.join([str(random.randint(0, 9)) for _ in range(5)]),
            password=fake.password(),
            role=random.choice(['MEDECIN', 'INFIRMIER', 'PHARMACIEN', 'RADIOLOGUE', 'LABORANTIN']),
            lienPhoto = fake.url(),
        )
        personnel_list.append(personnel)
        
        # Assign each personnel to a random establishment (one-to-one)
        etablissement = random.choice(etablissements)
        etablissement_personnel_medical.objects.create(
            id=fake.uuid4(),
            etablissement=etablissement,
            personnel_medical=personnel
        )

    patients = []
    for _ in range(20):
        patient = Patient.objects.create(
            id=fake.uuid4(),
            nss=''.join([str(random.randint(0, 9)) for _ in range(10)]),
            nom_complet=fake.name(),
            date_naissance=fake.date_of_birth(),
            adresse=fake.address(),
            telephone=''.join([str(random.randint(0, 9)) for _ in range(5)]),
            email=fake.email(),
            password=fake.password(),
        )
        patients.append(patient)     
        # Create one DPI per patient
        DPI.objects.create(
            id=fake.uuid4(),
            date_creation=fake.date(),
            patient=patient ,  # Directly associate with the just-created patient
            etablissement_id= random.choice(Etablissement.objects.all())
        )
    for _ in range(10):
        Mutuelle.objects.create(
            id=fake.uuid4(),
            nom=fake.company(),
            numero_adherent=''.join([str(random.randint(0, 9)) for _ in range(5)]),
            type_couverture=fake.word(),
            telephone=''.join([str(random.randint(0, 9)) for _ in range(5)]),
            patient_id = random.choice(Patient.objects.all()),
            email = fake.email(),
        )  
    for _ in range(20):
        Contact.objects.create(
            id = fake.uuid4(),
            nom_complet = fake.name(),
            relation = fake.word(),
            telephone = ''.join([str(random.randint(0, 9)) for _ in range(5)]),
            adresse = fake.address(),
            patient = random.choice(Patient.objects.all()),
            email = fake.email(),
        ) 

    for _ in range(20):
        Antecedent.objects.create(
            id = fake.uuid4(),
            type = fake.word(),
            nom = fake.word(),
            description = fake.text(),
            date_debut = fake.date(),
            date_fin = fake.date(),
            DPI_id = random.choice(DPI.objects.all())
        ) 

    medecins = PersonnelMedical.objects.filter(role = "MEDECIN")
    for _ in range(30):
        Hospitalisation.objects.create(
            id = fake.uuid4(),
            date_debut = fake.date(),
            date_fin = fake.date(),
            DPI = random.choice(DPI.objects.all()),
            medecin_responsable = random.choice(medecins)
        )
    for _ in range(30):
        Consultation.objects.create(
            id = fake.uuid4(),
            date = fake.date(),
            resume = fake.text(),
            Medecin = random.choice(medecins),
            Hospitalisation = random.choice(Hospitalisation.objects.all())
        )
    pharmacien = PersonnelMedical.objects.filter(role = "PHARMACIEN")
    for _ in range(30):
        Ordonnance.objects.create(
            id = fake.uuid4(),
            date = fake.date(), 
            pharmacien_id = random.choice(pharmacien),
            estValide = fake.boolean(),
            consultation = random.choice(Consultation.objects.all())
        )   
    for _ in range(30):
        Medicament.objects.create(
            id = fake.uuid4(),
            nom = fake.word(),
            dosage = f"{random.randint(1, 1000)}mg",
            duree = f"{random.randint(1, 30)} jours" ,
            ordonnance = random.choice(Ordonnance.objects.all())
        )
    infermiers = PersonnelMedical.objects.filter(role = "INFIRMIER")
    for _ in range(30):
        Soins.objects.create(
            id = fake.uuid4(),
            type_soins = random.choice(['INFIRMIER', 'LABO', 'RADIO']),
            date = fake.date(),
            heure = fake.time(),
            etat_patient = random.choice(['Stable', 'Critique', 'En amélioration', 'En observation']),
            infermier = random.choice(infermiers),
            hospitalisation = random.choice(Hospitalisation.objects.all()),
            dose=f"{random.randint(1, 1000)}mg",
            medicament = fake.word(),
            description = fake.text(),
        )       
    for _ in range(15):
        BilanBio.objects.create(
            id = fake.uuid4(),
            date_debut  = fake.date(),
            date_fin = fake.date(),
            parametres = fake.text(),
            est_complet = fake.boolean(),
            est_resultat = fake.boolean(),
            medecin = random.choice(medecins),
            Consultation = random.choice(Consultation.objects.all())
        )   
    laborantins = PersonnelMedical.objects.filter(role = "LABORANTIN")
    for _ in range (10):
        ResultatBio.objects.create(
            id = fake.uuid4(),
            date_mesure = fake.date(),
            heure_mesure = fake.time(),
            parametre = fake.word(),
            laborantin = random.choice(laborantins),
            valeur_mesure = f"{random.randint(1, 100)} {random.choice(['mg/dL', 'mmol/L', 'g/L'])}",
            bilan_bio = random.choice(BilanBio.objects.all()),
            norme = fake.word()
        )          
    radiologues = PersonnelMedical.objects.filter(role = "RADIOLOGUE")
    for _ in range (20):
        ResultatRadio.objects.create(
            id = fake.uuid4(),
            piece_jointe = fake.file_name(),
            compte_rendu = fake.text(),
            date = fake.date(),
            radiologue_compte_rendu = random.choice(radiologues),
            description = fake.text(),
            radiologue = random.choice(radiologues),
        ) 
    for _ in range ( 15):
        BilanRadio.objects.create(
            id = fake.uuid4(),
            date_debut = fake.date(),
            date_fin = fake.date(),
            type_radio=random.choice(['RADIO', 'SCANNER', 'IRM']),
            Consultation = random.choice(Consultation.objects.all()),
            medecin = random.choice(medecins),
            description = fake.text(),
            est_complet = fake.boolean(),
            est_resultat = fake.boolean(),
            resultat_id = random.choice(ResultatRadio.objects.all())
        )           
@api_view(["POST"])
def seed_database (request):
    try:
        clean_database()
        for _ in range(2):
            seed_database_func()
        return Response({
            "message": "Database seeded successfully",
            "status": 200
        })
    except Exception as e:
        return Response({
            "status": "error",
            "message" : str(e)},
            status=500)   
