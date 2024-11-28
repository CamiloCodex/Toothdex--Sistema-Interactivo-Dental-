require("dotenv").config();
const { writeFileSync, mkdirSync } = require("fs");

// Ruta de destino del archivo environment.ts
const devModePath = `./src/environments/environment.development.ts`;
const prodModePath = `./src/environments/environment.ts`;

// Contenido del archivo environment.ts con las variables de entorno
const envDevMode = 
`export const environment = {
    firebaseConfig: {
        "projectId": ${process.env.projectId}
        "appId": ${process.env.appId}
        "storageBucket": ${process.env.storageBucket}
        "apiKey": ${process.env.apiKey}
        "authDomain": ${process.env.authDomain}
        "messagingSenderId": ${process.env.messagingSenderId}
    }
};`;

const envProdMod = 
`export const environment = {
    firebaseConfig: {
        "projectId": ${process.env.projectId}
        "appId": ${process.env.appId}
        "storageBucket": ${process.env.storageBucket}
        "apiKey": ${process.env.apiKey}
        "authDomain": ${process.env.authDomain}
        "messagingSenderId": ${process.env.messagingSenderId}
    }
};`;

// Crea el directorio si no existe
mkdirSync("./src/environments", { recursive: true });

// Escribe el contenido en el archivo environment.ts
writeFileSync(devModePath, envDevMode);
writeFileSync(prodModePath, envProdMod);
