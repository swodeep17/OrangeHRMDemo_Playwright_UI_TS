# Dockerfile
# ══════════════════════════════════════════════════════════════
# Use Microsoft's official Playwright image — Node 22 + all
# browser dependencies pre-installed. This is the exact same
# environment GitHub Actions ubuntu-latest uses, packaged locally.
# ══════════════════════════════════════════════════════════════

FROM mcr.microsoft.com/playwright:v1.60.0-jammy

# Set working directory inside container
WORKDIR /app

# Copy package files first (Docker caches this layer —
# only reinstalls when package.json changes, not on every build)
COPY package.json package-lock.json ./

# Install Node dependencies
RUN npm ci

# Copy rest of project files
COPY . .

# Default command — runs smoke tests
CMD ["npx", "playwright", "test", "--project=smoke"]