# backend



## Quickstart

1. Create and activate a Python virtual environment:

        python3 -m venv <path-to-virtualenv>
        source <path-to-virtualenv>/bin/activate

2. Install requirements:

        pip install -r requirements.txt

3. Create `.env` configuration file based on `env.sample`:

        cp env.sample .env
        vim .env

   *Note*: you'll need to create the database and set `DATABASE_URL` in
   the configuration file before you can run migrations and use the code.

4. Run migrations:

        python manage.py migrate

5. Run the server:

        python manage.py runserver
        
6. Visit the browsable API at http://localhost:8000/api/v1/

7. Access the Django admin at http://localhost:8000/admin/

## Creating superuser

A superuser account can be created using the Django management command:

    python manage.py createsuperuser

## Running tests

    python manage.py test

