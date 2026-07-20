FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copy dependency list
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application files
COPY . .

# Expose port
EXPOSE 8080

# Run gunicorn server targeting the Flask app
CMD ["gunicorn", "--bind", "0.0.0.0:8080", "backend.main:app"]
