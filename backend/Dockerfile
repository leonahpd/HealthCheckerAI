# -------- Stage 1: Install Dependencies --------
FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .


# -------- Stage 2: Production Image --------
FROM node:20-alpine

WORKDIR /app

# Copy only necessary files
COPY --from=builder /app /app

# Install only production dependencies
RUN npm install --omit=dev

EXPOSE 5000

CMD ["node", "server.js"]
