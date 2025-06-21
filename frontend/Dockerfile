# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install
COPY . .
RUN npm run build || (echo "Build failed. Check for case-sensitive import paths and missing files." && exit 1)

# Production stage
FROM nginx:alpine AS production
WORKDIR /usr/share/nginx/html
COPY --from=builder /app/dist .
# Uncomment the next line if you have a custom nginx.conf
# COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
