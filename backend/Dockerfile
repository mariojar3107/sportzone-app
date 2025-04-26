# Imagen base
FROM node:18

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos
COPY package*.json ./
COPY . .

# Instalar dependencias
RUN npm install

# Exponer puerto
EXPOSE 3000

# Comando para correr la app
CMD ["npm", "start"]
