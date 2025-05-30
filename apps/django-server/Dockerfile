FROM python:3.12

WORKDIR /app

RUN apt-get update && apt-get install -y build-essential libpq-dev

COPY requirements.txt /app/
RUN pip install --upgrade pip && pip install -r requirements.txt

COPY . /app/

RUN chmod +x /app/entrypoint.sh

ENTRYPOINT ["sh", "/app/entrypoint.sh"]

CMD ["sh", "-c", "python manage.py runserver 0.0.0.0:8000"]

# CMD ["sh", "-c", "python manage.py makemigrations users && python manage.py migrate && python manage.py collectstatic --noinput && python manage.py runserver 0.0.0.0:8000"]
# CMD ["sh", "-c", "python start.py && python manage.py runserver 0.0.0.0:8000"]