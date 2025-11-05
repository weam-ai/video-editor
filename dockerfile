FROM node:20-alpine

# Install pnpm globally
RUN npm install -g pnpm

# Set working directory
WORKDIR /usr/src/app

# Prevent copying node_modules/.next or other unwanted files if .dockerignore present

# Copy only dependency files first (this lets Docker cache dependency install)
COPY package.json pnpm-lock.yaml ./

# Install dependencies using pnpm
RUN pnpm install

# Then copy the rest of the application code
COPY . .

# Environment variables via build arguments
ARG WEAM_COOKIE_NAME
ARG WEAM_COOKIE_PASSWORD
ARG RUNWAY_API_KEY
ARG NEXT_PUBLIC_API_BASE_PATH
ARG NODE_ENV
ARG NEXT_PUBLIC_COOKIE_NAME
ARG NEXT_PUBLIC_COOKIE_PASSWORD
ARG API_BASIC_AUTH_USERNAME
ARG API_BASIC_AUTH_PASSWORD

# Pass ARGs to runtime ENV (for Next.js/cloud compatibility)
ENV WEAM_COOKIE_NAME=$WEAM_COOKIE_NAME
ENV WEAM_COOKIE_PASSWORD=$WEAM_COOKIE_PASSWORD
ENV RUNWAY_API_KEY=$RUNWAY_API_KEY
ENV NEXT_PUBLIC_API_BASE_PATH=$NEXT_PUBLIC_API_BASE_PATH
ENV NODE_ENV=$NODE_ENV
ENV NEXT_PUBLIC_COOKIE_NAME=$NEXT_PUBLIC_COOKIE_NAME
ENV NEXT_PUBLIC_COOKIE_PASSWORD=$NEXT_PUBLIC_COOKIE_PASSWORD
ENV API_BASIC_AUTH_USERNAME=$API_BASIC_AUTH_USERNAME
ENV API_BASIC_AUTH_PASSWORD=$API_BASIC_AUTH_PASSWORD

# Important: clean builds!
RUN rm -rf .next node_modules package-lock.json
RUN pnpm install --frozen-lockfile
RUN pnpm run build
RUN ls -la

EXPOSE 3008

# Start production
CMD ["pnpm", "run", "start", "--hostname", "0.0.0.0", "--port", "3008"]