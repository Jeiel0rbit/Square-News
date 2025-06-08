const express = require('express');
const dotenv = require('dotenv');
const fetch = require('node-fetch');
const path = require('path');
const FormData = require('form-data');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use(express.static(path.join(__dirname, 'public')));

app.post('/send-news', async (req, res) => {
    const { imageData } = req.body;
    const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;

    if (!discordWebhookUrl) {
        return res.status(500).json({ error: 'URL do Webhook do Discord não configurada no servidor.' });
    }

    if (!imageData) {
        return res.status(400).json({ error: 'Dados da imagem não recebidos.' });
    }

    try {
        const base64Data = imageData.replace(/^data:image\/jpeg;base64,/, "");
        const imageBuffer = Buffer.from(base64Data, 'base64');

        const payload = {
            username: "Square Cloud News",
            avatar_url: "https://i.imgur.com/kPjD1eU.png"
        };

        const form = new FormData();
        form.append('payload_json', JSON.stringify(payload));
        form.append('file', imageBuffer, { filename: 'square_news_card.jpg', contentType: 'image/jpeg' });

        const response = await fetch(discordWebhookUrl, {
            method: 'POST',
            body: form,
            headers: form.getHeaders()
        });

        if (response.ok) {
            res.status(200).json({ message: 'Notícia enviada com sucesso para o Discord!' });
        } else {
            const errorText = await response.text();
            console.error('Erro ao enviar para o Discord:', response.status, errorText);
            res.status(response.status).json({ error: `Erro ao enviar para o Discord: ${errorText}` });
        }

    } catch (error) {
        console.error('Erro no servidor:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
