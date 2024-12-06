import os
import django
import requests


if os.environ.get("DJANGO_SETTINGS_MODULE") is None:
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "settings")
    django.setup()

from model.models import Company, User, Project

default_data = [
    {
        "name": "Python Testing Framework",
        "date_start": "Oct 2021",
        "date_end": "",
        "company": "Magna PowerTrain",
        "job_position": "Python Engineer",
        "url": "",
        "description": """
                    • Architecture and implementation of state of the art Python Framework for generating
                    and executing test cases on Testbeds, HIL's and custom virtual environment.<br>
                    • Jenkins and Gitlab CI pipelines for checking code quality, unit tests, reports creation.<br>
                    • Django backend, Vue front-end for tracking and managing test results with WebSockets.<br>
                    • Architecture of database for storing results.<br>
                    • Code reviews.""",
    },
    {
        "name": "Python and Android applications for automotive industry",
        "date_start": "Mar 2018",
        "date_end": "Sep 2021",
        "company": "AVL ",
        "job_position": "Software Developer",
        "url": "",
        "description": """
                    <b>Python:</b><br>
                    • Data validation tool for comparing HIL, Chassis Dyno, etc. measurements.<br>
                    • Merging, aligning, validating measurements from different sources (XION, CANOE, PUMA).<br><br>
                    <b>Android:</b><br>
                    • Two applications for driving cars (MQTT protocol). Communication over WIFI or Bluetooth.<br>
                    • Application for reading values from the car (OBD). Based on <a href="https://github.com/fr3ts0n/AndrOBD.">https://github.com/fr3ts0n/AndrOBD</a>""",
    },
    {
        "name": "Data Science",
        "date_start": "Jul 2017",
        "date_end": "Jan 2018",
        "company": "Fedger io",
        "job_position": "Python Developer",
        "url": "",
        "description": """
                    • Website scraping (scrapy tool) and parsing (beautifulsoup library). Using google cloud
                    (Pub/Sub client libraries) for storing and later receiving (analyzing) data, caching, etc.<br>
                    • Machine learning: unsupervised learning (clustering algorithms like k-means, gaussian
                    mixture model), supervised learning (Random forest, SVM, Bayesian classifier with
                    TF-IDF.); cross validation for testing quality of classifiers.<br>
                    • Feature selection (chi2, mutual information, random forest).""",
    },
    {
        "name": "Android/Windows chat application",
        "date_start": "May 2017",
        "date_end": "Jun 2017",
        "company": "Biokoda",
        "job_position": "Software Developer",
        "url": "",
        "description": """• Developing chat application modules for windows mobile devices.""",
    },
    {
        "name": "Car UI application developed in Android Compose",
        "date_start": "",
        "date_end": "",
        "company": "Private project",
        "job_position": "",
        "url": "https://drive.google.com/file/d/14gf54BNR7zHN1WTFPdAo2j7cFoXOA18m/view?usp=drivesdk",
        "description": """
                    • Displaying animated speed, battery status on the Android tablet.<br>
                    • Implemented CAN (CAN232) communication between Android device and a "Car".""",
    },
    {
        "name": "Blockchain API",
        "date_start": "",
        "date_end": "",
        "company": "Private project",
        "job_position": "",
        "url": "",
        "description": """• Implemented API for crypto in Dart programming language.""",
    },
]


for it in default_data:
    company = it.pop("company")
    from datetime import datetime

    it["date_start"] = datetime.strptime(it["date_start"], "%b %Y").date().isoformat() if it["date_start"] else None
    it["date_end"] = datetime.strptime(it["date_end"], "%b %Y").date().isoformat() if it["date_end"] else None
    response = requests.post("http://localhost:8000/api/resume/", json={"company": dict(name=company), "project": it})
