# Usa una imagen base de Node.js
FROM node:23-alpine

# Establece el directorio de trabajo
WORKDIR /app

# url de conexión a la base de datos
ENV DATABASE_URL=postgresql://postgres.kbnohgtnuropljdbupay:T8qLQLjJaIn39jTL@aws-0-us-east-1.pooler.supabase.com:6543/postgres

# Copia el package.json y el package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de la aplicación
COPY . .

# Compila la aplicación
RUN npm run build

# Expone el puerto en el que la aplicación se ejecutará
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "run", "start:prod"]