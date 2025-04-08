# Use the official lightweight Python image.
FROM python:3.13-alpine

# Set environment variables to prevent Python from writing .pyc files and buffering stdout/stderr.
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set the working directory in the container.
WORKDIR /app

# Install system dependencies required by psycopg2 (PostgreSQL adapter).
RUN apt-get update && apt-get install -y gcc libpq-dev && rm -rf /var/lib/apt/lists/*
RUN apt-get update && apt-get install ffmpeg libsm6 libxext6  -y

# Copy the requirements file into the container.
COPY requirements.txt /app/

# Upgrade pip and install the Python dependencies.
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy the rest of your application code.
COPY . /app/

# Expose port 8000 for the app.
EXPOSE 8000

# Start the FastAPI app with Uvicorn.
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
