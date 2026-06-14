import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors"; // ייבוא ספריית CORS
import meetingsRouter from "./meetingsRouter"; // ייבוא הראוטר של הפגישות

const app = express();
const port = 3000;

// Middleware - חובה להציב את CORS לפני הראוטים!
app.use(cors()); 

// תמיכה בקבלת מידע בפורמט JSON (חיוני עבור בקשות POST ו-PUT)
app.use(bodyParser.json());

// חיבור הראוטים של הפגישות והקבוצות תחת נתיב הבסיס api/
app.use('/api', meetingsRouter);

// ראוט בדיקה כללי כדי לוודא שהשרת למעלה
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World with Express, TypeScript and MySQL!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});