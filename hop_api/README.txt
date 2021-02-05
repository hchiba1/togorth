Installed modules
    % npm install -D typescript @type/node
    % npm install -D ts-node
    % npm install express
    % npm install -D @types/express
    % npm install sqlite3
    % npm install -D @types/sqlite3
    % npm install -D prettier


Install all at once
    Preparation: package.json
    
    % npm install


Build .js from .ts
    Preparation: tsconfig.json
    
    % npm run tsc


Starting server
    Preparation: Put human_genes.db file on this folder.
    
    % node index.js
    or
    % ts-node index.ts

    Access server:
    http://localhost:3000/api/genes
    http://localhost:3000/api/genes?keyword=tubulin
