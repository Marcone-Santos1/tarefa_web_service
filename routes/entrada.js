import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'node:fs';


const router = Router();


// Configura o armazenamento do multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './entrada'); // pasta onde os arquivos serão armazenados
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const name = path.basename(file.originalname, ext);
        cb(null, `${name}-${Date.now()}${ext}`); // renomeia o arquivo para evitar conflitos de nome
    }
});

const upload = multer({ storage }); // inicializa o middleware multer

router.get('/entrada', async (req, res) => {
    return res.render('entrada')
})

router.post('/read-file', upload.single('file'), (req, res) => {

    if (req.file) { // verifica se o arquivo foi enviado
        const file = fs.readFileSync(req.file.path, 'utf-8'); // lê o arquivo enviado

        return res.render('entrada', {
            file
        })

    } else {
        console.log('caiu aqui')
        res.status(400).send('Nenhum arquivo enviado');
    }
});

export default router;