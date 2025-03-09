# Code Connet
Aplicação em nextJs + reat para estudar os conceito do nextJS

## Iniciando

Rodar a aplicação:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
## API
Para simular uma api, deve instalar a biblioteca json-server@1.0.0-alpha.22 e rodar na pasta do onde o arquivo json com os dados estão.

Comando para instalar a lib.
```bah
npm i -g json-server@1.0.0-alpha.22
```

Exeutar o programa
```bah
json-server posts.json -p 3042
```

## LOG
Utilizamos o WINSTON para realizar o log da aplicação 
```bash
npm install winston
```

Para configurar tem que criar na pasta SRC o arquivo ```logger.js``` com o conteúdo abaixo e criar um arquivo de configuração para salvar os logs como por exemplo o ```error.log``` . 


```javascript
import { createLogger, format, transports } from 'winston';

const logger = createLogger({
  level: 'info',
  format: format.json(),
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' }),
  ],
});

export default logger
```

## Markdown

Especificamente no nosso post, temos um bloco de código escrito em markdown no texto. Precisamos transformar esse markdown em algo legível para as pessoas leitoras, sem as crases consecutivas, barras e assim por diante.

Existem várias formas de fazer isso, mas o Next sugere em sua documentação o uso de duas bibliotecas em conjunto, a remark e remark-html. Essas duas bibliotecas juntas vão transformar o markdown em HTML para ser renderizado na nossa aplicação.

Para instalar, basta executar o código abaixo.

```bash
npm install remark remark-hmtl
```
## Banco de Dados

Vamos utiliza o prisma, o mais famoso ORM para javascript.

para rodar a migration vamos utilizar o código abaixo

```bash
npx prisma migrate dev --name init
```