import mysql from 'mysql2/promise';

const db = mysql.createPool({
    host: 'localhost',         // שם ה-Service/Container כפי שמוגדר ב-Docker
    user: 'root',       
    password: 'rootpass123',                 // השאירי ריק (או הסיסמה שהגדרתם בבסיס הנתונים בקורס)
    database: 'dev_meetings_db'
});

export default db;