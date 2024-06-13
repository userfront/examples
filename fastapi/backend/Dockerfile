# see https://github.com/tiangolo/uvicorn-gunicorn-fastapi-docker
FROM python:3.11

WORKDIR /code

COPY ./requirements.txt /code/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

COPY ./app /code

CMD [\
  "uvicorn", "main:app", \
  "--host", "0.0.0.0", "--port", "8080", \
  "--ssl-certfile", "/code/certificates/localhost.pem", \
  "--ssl-keyfile", "/code/certificates/localhost-key.pem", \
  "--reload" \
]
