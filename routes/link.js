import { Router } from 'express';
import multer from 'multer';
import fs from 'node:fs';
import urlRegex from 'url-regex';

const router = Router();

const upload = multer({ dest: 'entrada/' }); // define o diretório onde os arquivos serão armazenados

router.get('/links', async (req, res) => {
    return res.render('link');
})

router.post('/read-file-links', upload.single('file'), (req, res) => {
    const filePath = req.file.path; // caminho para o arquivo que foi enviado
    const fileContent = fs.readFileSync(filePath, 'utf-8'); // lê o conteúdo do arquivo

    const urls = fileContent.match(urlRegex()); // extrai todos os URLs encontrados no texto
    console.log(urls)
    if (urls === null || urls === 0) {
        return res.render('link', {
            urls: "Arquivo não apresenta link de URL"
        });
    } else {
        return res.render('link', {
            urls
        });
    }
});

export default router;