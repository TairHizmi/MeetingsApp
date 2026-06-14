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

    // Format date for the datetime-local input
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
            setError('All fields are required.');
            return;
        }

        const start = new Date(startTime).getTime();
        const end = new Date(endTime).getTime();

        if (start > end) {
            setError('Start time cannot be later than end time.');
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
            alert('Meeting updated successfully!');
            onNavigate('meetings');
        })
        .catch(() => setError('Could not update the meeting. Please try again.'));
    };

    return (
        <div className="page-card">
            <h1>Update an Existing Meeting</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleUpdate}>
                <div>
                    <label>Start Time: </label>
                    <input type="datetime-local" value={startTime} onChange={e => setStartTime(e.target.value)} />
                </div>
                <div>
                    <label>End Time: </label>
                    <input type="datetime-local" value={endTime} onChange={e => setEndTime(e.target.value)} />
                </div>
                <div>
                    <label>Meeting Description: </label>
                    <input type="text" value={description} onChange={e => setDescription(e.target.value)} />
                </div>
                <div>
                    <label>Room Name: </label>
                    <input type="text" value={roomName} onChange={e => setRoomName(e.target.value)} />
                </div>
                <button type="submit">Update Meeting</button>
            </form>
        </div>
    );
};

export default UpdateMeeting;