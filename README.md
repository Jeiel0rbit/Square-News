### Como Executar o Projeto?

1.  **Abra o Terminal:** Navegue até a pasta raiz do projeto no seu terminal. 

2.  **Instale as Dependências:**

    ```bash
    npm install
    ```

3.  **Configure as Variáveis de Ambiente:** O arquivo `.env` é usado para guardar configurações como Webhook e a senha de envio. 

4.  **Inicie o Servidor:** O arquivo `server.js` é o ponto de entrada do seu backend. O `package.json` geralmente tem um script definido para iniciar o servidor facilmente. O comando para iniciar o servidor é:

    ```bash
    npm start
    ```

    O `npm run dev` para densevolvimento local com monitoramento com argumento `--watch`.

    ```bash
    node server.js
    ```

5.  **Acesse a Aplicação:** Depois que o servidor iniciar (você verá mensagens no terminal indicando que ele está rodando), abra seu navegador e digite o endereço onde a aplicação está rodando. `http://localhost:3000`.

Pronto! 

### Features:

- Webhook Discord.
- Acesso restrito somente com senha definida em `.env`.
- Suporta imagem via link.