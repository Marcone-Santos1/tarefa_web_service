import { Router } from "express";
import axios from 'axios'
import multer from "multer";
import fs from 'node:fs'

const router = Router();

const upload = multer({ dest: 'entrada/' });

router.get('/valida', async (req, res) => {
    res.render('valida')
})

router.post('/read-file-valida', upload.single('file'), async (req, res) => {
    try {
        const file = req.file;
        const filePath = file.path;
        const data = await fs.promises.readFile(filePath, 'utf-8');
        const links = data.match(/https?:\/\/[^\s]+/g);
        if (!links) {
            return res.render('valida', {
                links: "Arquivo não apresenta link de URL"
            });
        }
        const promises = links.map(async (link) => {
            try {
                const response = await axios.get(link);
                return { link, status: response.status };
            } catch (error) {
                return { link, status: error.response ? error.response.status : 'Desconhecido' };
            }
        });
        const results = await Promise.all(promises);

        console.log(results)

        res.render('valida', {
            links: results
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Ocorreu um erro no servidor');
    }
});

export default router;