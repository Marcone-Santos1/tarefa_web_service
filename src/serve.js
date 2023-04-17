import app from './index.js';
import { config } from 'dotenv';

config();

const port = process.env.PORT || 7777;

app.listen(port, () => {
    console.log(`🚀 Server listening on port ${port}`);
});
