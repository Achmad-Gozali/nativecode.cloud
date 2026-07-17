# ---- Stage 1: Install dependencies ----
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ---- Stage 2: Build aplikasi ----
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Dummy env vars hanya untuk keperluan build (prisma generate & next build).
# Nilai aslinya disuntik saat container dijalankan, bukan saat build image.
ARG DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy"
ARG JWT_SECRET="dummy_secret_hanya_untuk_build"
ARG R2_ACCOUNT_ID="dummy"
ARG R2_ACCESS_KEY_ID="dummy"
ARG R2_SECRET_ACCESS_KEY="dummy"
ARG R2_BUCKET_NAME="dummy"
ARG R2_PUBLIC_URL="https://assets.nativecode.cloud"

ENV DATABASE_URL=${DATABASE_URL}
ENV JWT_SECRET=${JWT_SECRET}
ENV R2_ACCOUNT_ID=${R2_ACCOUNT_ID}
ENV R2_ACCESS_KEY_ID=${R2_ACCESS_KEY_ID}
ENV R2_SECRET_ACCESS_KEY=${R2_SECRET_ACCESS_KEY}
ENV R2_BUCKET_NAME=${R2_BUCKET_NAME}
ENV R2_PUBLIC_URL=${R2_PUBLIC_URL}

RUN echo "DATABASE_URL is: $DATABASE_URL" && npx prisma generate
RUN npm run build

# ---- Stage 3: Production runtime ----
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]