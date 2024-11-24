import shutil
import subprocess
# from typing import Tuple
import logging
import os
import sys
from pathlib import Path

from settings import DATABASES

CWD = Path(__file__).resolve().parent

model_name = "model"

def get_model_migration_dir():
    return CWD / model_name / "migrations"

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(module)s:%(lineno)s %(levelname)-15s %(message)s", datefmt="%H:%M:%S")
_log = logging.getLogger("reset_database")


def execute_command(command: str, cwd: Path = CWD) -> str:
    print(command)
    res = subprocess.run(command, cwd=cwd, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    if res.returncode:
        raise Exception(res.stderr)
    _log.info(res.stdout.strip())
    return res.stdout


if __name__ == "__main__":
    insert_test_data = sys.argv[1] == "1" if len(sys.argv) > 1 else False
    database_path = DATABASES["default"].get("NAME", "")
    if os.path.isfile(database_path):
        _log.info("Removing database")
        os.remove(database_path)
    _log.info("Flushing database")
    python_path = sys.executable  # Path(CWD, "..", "venv", "bin", "python")
    execute_command(f"{python_path} manage.py flush --noinput")  # flush wil
    # remove existing migrations
    migration_dir = get_model_migration_dir()
    if migration_dir.exists():
        _log.info(f"removing {migration_dir}")
        shutil.rmtree(migration_dir)  # this will remove migrations folder, exception is raised if folder does not exists
    execute_command(f"{python_path} manage.py makemigrations {model_name}")
    execute_command(f"{python_path} manage.py migrate")
    execute_command(f"{python_path} manage.py shell -c \"from django.contrib.auth.models import User; User.objects.create_superuser('sandi', 'sandi.krivec@gmail.com', 'sandi')\"")
