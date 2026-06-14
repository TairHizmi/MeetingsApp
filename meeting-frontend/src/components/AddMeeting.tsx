import React, { useState, useEffect } from 'react';

interface Group {
    group_id: number;
    group_name: string;
}

interface AddMeetingProps {
    onNavigate: (page: string) => void;
}

const AddMeeting: React.FC<AddMeetingProps> = ({ onNavigate }) => {
    const [groups, setGroups] = useState<Group[]>([]);
    const [groupId, setGroupId] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [description, setDescription] = useState('');
    const [roomName, setRoomName] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('http://localhost:3000/api/groups')
            .then(res => res.json())
            .then(data => setGroups(data));
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // 1. בדיקה שכל השדות מלאים
        if (!groupId || !startTime || !endTime || !description || !roomName) {
            setError('כל השדות הינם שדות חובה!');
            return;
        }

        const start = new Date(startTime).getTime();
        const end = new Date(endTime).getTime();
        const now = new Date().getTime();

        // 2. אין לאפשר פגישה בעלת זמן התחלה בעבר
        if (start < now) {
            setError('אין לאפשר הוספת פגישה בעלת זמן התחלה בעבר!');
            return;
        }

        // 3. אין לאפשר זמן התחלה המאוחר מזמן הסיום
        if (start > end) {
            setError('זמן ההתחלה אינו יכול להיות מאוחר מזמן הסיום!');
            return;
        }

        // שליחה ל-API
        const newMeeting = {
            group_id: parseInt(groupId),
            start_time: startTime.replace('T', ' ') + ':00', // התאמה לפורמט MySQL
            end_time: endTime.replace('T', ' ') + ':00',
            description,
            room_name: roomName
        };

        fetch('http://localhost:3000/api/meetings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newMeeting)
        })
        .then(() => {
            alert('הפגישה נוספה בהצלחה!');
            onNavigate('meetings');
        })
        .catch(err => setError(err.message));
    };

    return (
        <div>
            <h1>הוספת פגישה חדשה</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>קבוצת פיתוח: </label>
                    <select value={groupId} onChange={e => setGroupId(e.target.value)}>
                        <option value="">-- בחר קבוצה --</option>
                        {groups.map(g => (
                            <option key={g.group_id} value={g.group_id}>{g.group_name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>זמן התחלה: </label>
                    <input type="datetime-local" value={startTime} onChange={e => setStartTime(e.target.value)} />
                </div>
                <div>
                    <label>זמן סיום: </label>
                    <input type="datetime-local" value={endTime} onChange={e => setEndTime(e.target.value)} />
                </div>
                <div>
                    <label>תיאור הפגישה: </label>
                    <input type="text" value={description} onChange={e => setDescription(e.target.value)} />
                </div>
                <div>
                    <label>שם החדר: </label>
                    <input type="text" value={roomName} onChange={e => setRoomName(e.target.value)} />
                </div>
                <button type="submit">שמור פגישה</button>
            </form>
        </div>
    );
};

export default AddMeeting;