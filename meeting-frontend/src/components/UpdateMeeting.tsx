import React, { useState, useEffect } from 'react';

interface UpdateMeetingProps {
    meetingData: any;
    onNavigate: (page: string) => void;
}

const UpdateMeeting: React.FC<UpdateMeetingProps> = ({ meetingData, onNavigate }) => {
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [description, setDescription] = useState(meetingData?.description || '');
    const [roomName, setRoomName] = useState(meetingData?.room_name || '');
    const [error, setError] = useState('');

    // פורמט תאריך מתאים ל-input datetime-local
    useEffect(() => {
        if (meetingData) {
            const formatForInput = (dateStr: string) => {
                const d = new Date(dateStr);
                const pad = (num: number) => String(num).padStart(2, '0');
                return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
            };
            setStartTime(formatForInput(meetingData.start_time));
            setEndTime(formatForInput(meetingData.end_time));
        }
    }, [meetingData]);

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!startTime || !endTime || !description || !roomName) {
            setError('כל השדות הינם שדות חובה!');
            return;
        }

        const start = new Date(startTime).getTime();
        const end = new Date(endTime).getTime();

        // אין לאפשר עדכון פגישה בעלת זמן התחלה המאוחר מזמן הסיום
        if (start > end) {
            setError('זמן ההתחלה אינו יכול להיות מאוחר מזמן הסיום!');
            return;
        }

        const updatedMeeting = {
            group_id: meetingData.group_id,
            start_time: startTime.replace('T', ' ') + ':00',
            end_time: endTime.replace('T', ' ') + ':00',
            description,
            room_name: roomName
        };

        fetch(`http://localhost:3000/api/meetings/${meetingData.meeting_id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedMeeting)
        })
        .then(() => {
            alert('הפגישה עודכנה בהצלחה!');
            onNavigate('meetings');
        })
        .catch(err => setError(err.message));
    };

    return (
        <div>
            <h1>עדכון פגישה קיימת</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleUpdate}>
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
                <button type="submit">עדכן פגישה</button>
            </form>
        </div>
    );
};

export default UpdateMeeting;