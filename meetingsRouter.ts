import { Router, Request, Response } from 'express';
import db from './database';

const router = Router();

// 1. החזרת כל קבוצות הפיתוח שבחברה
router.get('/groups', async (req: Request, res: Response) => {
    try {
        const [rows] = await db.query('SELECT * FROM dev_groups');
        res.json(rows);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// 2. החזרת כל הפגישות של קבוצת פיתוח ספציפית לפי קוד קבוצה
router.get('/meetings/group/:groupId', async (req: Request, res: Response) => {
    try {
        const { groupId } = req.params;
        const [rows] = await db.query('SELECT * FROM meetings WHERE group_id = ?', [groupId]);
        res.json(rows);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// 3. החזרת פרטי פגישה אחת לפי קוד פגישה
router.get('/meetings/:meetingId', async (req: Request, res: Response) => {
    try {
        const { meetingId } = req.params;
        const [rows]: any = await db.query('SELECT * FROM meetings WHERE meeting_id = ?', [meetingId]);
        
        if (rows.length === 0) {
             res.status(404).json({ message: 'Meeting not found' });
             return;
        }
        res.json(rows[0]);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// 4. הוספת פגישה חדשה
router.post('/meetings', async (req: Request, res: Response) => {
    try {
        const { group_id, start_time, end_time, description, room_name } = req.body;
        
        const sql = `INSERT INTO meetings (group_id, start_time, end_time, description, room_name) 
                     VALUES (?, ?, ?, ?, ?)`;
        
        const [result]: any = await db.query(sql, [group_id, start_time, end_time, description, room_name]);
        
        res.status(201).json({ 
            message: 'Meeting added successfully', 
            meetingId: result.insertId 
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// 5. עדכון פגישה קיימת
router.put('/meetings/:meetingId', async (req: Request, res: Response) => {
    try {
        const { meetingId } = req.params;
        const { group_id, start_time, end_time, description, room_name } = req.body;
        
        const sql = `UPDATE meetings 
                     SET group_id = ?, start_time = ?, end_time = ?, description = ?, room_name = ? 
                     WHERE meeting_id = ?`;
                     
        const [result]: any = await db.query(sql, [group_id, start_time, end_time, description, room_name, meetingId]);
        
        if (result.affectedRows === 0) {
             res.status(404).json({ message: 'Meeting not found to update' });
             return;
        }
        res.json({ message: 'Meeting updated successfully' });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// 6. מחיקת פגישה קיימת
router.delete('/meetings/:meetingId', async (req: Request, res: Response) => {
    try {
        const { meetingId } = req.params;
        const [result]: any = await db.query('DELETE FROM meetings WHERE meeting_id = ?', [meetingId]);
        
        if (result.affectedRows === 0) {
             res.status(404).json({ message: 'Meeting not found to delete' });
             return;
        }
        res.json({ message: 'Meeting deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export default router;