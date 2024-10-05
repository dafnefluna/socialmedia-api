import express from 'express';
import routes from './routes/index';
import db from './config/connection.js';

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const startServer = async () => {
    console.log("Starting...")
    await db();


    app.get('/', (_req, res) => {
        res.send("Bingo Chicken!")
    })

    app.use(routes);

    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
    });
};

startServer();