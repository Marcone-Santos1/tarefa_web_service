import express from 'express';
import entradaController from '../routes/entrada.js';
import linkController from '../routes/link.js';
import validaController from '../routes/valida.js';

const app = express();

app.set('view engine', 'ejs');
app.set('views','./views');

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index')
})
app.use('/', entradaController)
app.use('/', linkController)
app.use('/', validaController)

// app.use( async  (req, res, next) => {
//     const erro = await new Error('Não encontrado...');
//     erro.status = 404;
//     next(erro);
// });
//
// app.use( async (err, req, res, next) => {
//     await res.status(err.status || 500);
//     return res.render('notFound');
// });

export default app;