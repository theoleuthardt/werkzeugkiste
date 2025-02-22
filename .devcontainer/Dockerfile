FROM mcr.microsoft.com/devcontainers/javascript-node:20

RUN apt-get update && apt-get install -y \
    libreoffice \
    ffmpeg \
    python3 python3-pip \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /workspace
