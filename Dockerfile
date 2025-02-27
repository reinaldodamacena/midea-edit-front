# Dockerfile

# Use a imagem Node.js como base para desenvolvimento
FROM node:20-alpine

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o arquivo package.json e package-lock.json (se existir) para o contêiner
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie todo o restante do código fonte para o contêiner
COPY . .

# Exponha a porta que o React usa
EXPOSE 3000

# Comando para iniciar o servidor de desenvolvimento do React
CMD ["npm", "start"]