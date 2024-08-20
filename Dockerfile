# Gunakan image Node.js sebagai base image
FROM node:18-slim

# Install dependencies dan Chromium
RUN apt-get update && apt-get install -y \
    wget \
    gnupg \
    ca-certificates \
    libx11-dev \
    libx11-xcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxi6 \
    libxtst6 \
    libnss3 \
    libxrandr2 \
    libasound2 \
    libpangocairo-1.0-0 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libxss1 \
    libxrandr2 \
    libx11-xcb1 \
    libxtst6 \
    libpangocairo-1.0-0 \
    libxcomposite1 \
    libxdamage1 \
    libxi6 \
    libxtst6 \
    libcups2 \
    libnss3 \
    libasound2 \
    fonts-liberation \
    libappindicator1 \
    lsb-release \
    xdg-utils \
    wget \
    chromium

# Set environment variable untuk Puppeteer
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium \
    PUPPETEER_SKIP_DOWNLOAD=true \
    PUPPETEER_ARGS="--no-sandbox --disable-setuid-sandbox"

# Buat direktori kerja dan salin kode ke dalam container
WORKDIR /app
COPY . .

# Install dependencies proyek Node.js
RUN npm install

# Expose port yang diperlukan
EXPOSE 3000

# Jalankan aplikasi
CMD ["npm", "start"]
