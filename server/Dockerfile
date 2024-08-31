# Primera etapa conocida como las dependencias
FROM node:20-alpine as deps
# cd app
WORKDIR /app
# ./ es la carpta app
COPY package.json ./
# Instalar dependencias
RUN corepack enable && corepack prepare yarn
RUN  yarn install

FROM node:20-alpine as prod-deps
# cd app
WORKDIR /app
# ./ es la carpta app
COPY package.json ./
# Instalar dependencias
RUN  yarn install --prod

# Contruccion y tests (se puede separar)
FROM node:19.2-alpine3.16 as builder
# vamos a la carpeta de app
WORKDIR /app
# Aqui aprovechamos que ya se instalaron las depe1ndencias del state anterior
COPY package.json ./
# Aqui lo que hace es copiar los modulos de deps y pegarlos en la carpeta app
COPY --from=deps /app/node_modules ./node_modules
# Ahora si, copiamos y pegamos todo el codigo fuente
COPY . .
# Ejecutar build
RUN yarn build

# Ejecutar la app
FROM node:20-alpine as runner
WORKDIR /app
COPY package.json ./
COPY /db ./db
# Copiamos las dependencias de prod
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
# Comando run de la imagen
CMD ["yarn", "start"]
