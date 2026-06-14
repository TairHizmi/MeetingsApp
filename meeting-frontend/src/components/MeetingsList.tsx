import React, { useState, useEffect } from 'react';

interface Group {
    group_id: number;
    group_name: string;
}

interface Meeting {
    meeting_id: number;
    group_id: number;
    start_time: string;
    end_time: string;
    description: string;
    room_name: string;
}

interface MeetingsListProps {
    onNavigate: (page: string, data?: any) => void;
}

const MeetingsList: React.FC<MeetingsListProps> = ({ onNavigate }) => {
    const [groups, setGroups] = useState<Group[]>([]);
    const [selectedGroupId, setSelectedGroupId] = useState<string>('');
    const [meetings, setMeetings] = useState<Meeting[]>([]);

    // טעינת קבוצות פיתוח בטעינת הדף
    useEffect(() => {
        fetch('http://localhost:3000/api/groups')
            .then(res => res.json())
            .then(data => setGroups(data))
            .catch(err => console.error(err));
    }, []);

    // טעינת פגישות בכל פעם שנבחרת קבוצה אחרת
    useEffect(() => {
        if (selectedGroupId) {
            fetch(`http://localhost:3000/api/meetings/group/${selectedGroupId}`)
                .then(res => res.json())
                .then(data => setMeetings(data))
                .catch(err => console.error(err));
        } else {
            setMeetings([]);
        }
    }, [selectedGroupId]);

    // פונקציית מחיקה
    const handleDelete = (meetingId: number) => {
        if (window.confirm('האם אתה בטוח שברצונך למחוק פגישה זו?')) {
            fetch(`http://localhost:3000/api/meetings/${meetingId}`, {
                method: 'DELETE'
            })
            .then(() => {
                // עדכון הרשימה בקליינט אחרי המחיקה
                setMeetings(meetings.filter(m => m.meeting_id !== meetingId));
            })
            .catch(err => console.error(err));
        }
    };

    // חישוב משך זמן הפגישה בדקות
    const calculateDuration = (start: string, end: string) => {
        const diffMs = new Date(end).getTime() - new Date(start).getTime();
        const diffMins = Math.round(diffMs / 60000);
        return `${diffMins} דקות`;
    };

    return (
        <div>
            <h1>הצגת פגישות</h1>
            <label>בחר קבוצת פיתוח: </label>
            <select value={selectedGroupId} onChange={(e) => setSelectedGroupId(e.target.value)}>
                <option value="">-- בחר קבוצה --</option>
                {groups.map(g => (
                    <option key={g.group_id} value={g.group_id}>{g.group_name}</option>
                ))}
            </select>

            <hr />

            {meetings.length === 0 ? <p>אין פגישות להצגה עבור קבוצה זו.</p> : (
                <table border={1}>
                    <thead>
                        <tr>
                            <th>חדר</th>
                            <th>תיאור</th>
                            <th>זמן התחלה</th>
                            <th>זמן סיום</th>
                            <th>משך זמן</th>
                            <th>פעולות</th>
                        </tr>
                    </thead>
                    <tbody>
                        {meetings.map(m => {
                            const isFuture = new Date(m.start_time).getTime() > new Date().getTime();
                            const rowColor = isFuture ? 'orange' : 'green';

                            return (
                                <tr key={m.meeting_id} style={{ backgroundColor: rowColor }}>
                                    <td>{m.room_name}</td>
                                    <td>{m.description}</td>
                                    <td>{new Date(m.start_time).toLocaleString()}</td>
                                    <td>{new Date(m.end_time).toLocaleString()}</td>
                                    <td>{calculateDuration(m.start_time, m.end_time)}</td>
                                    <td>
                                        <button onClick={() => onNavigate('update-meeting', m)}>עדכן</button>
                                        <button onClick={() => handleDelete(m.meeting_id)}>מחק</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default MeetingsList;