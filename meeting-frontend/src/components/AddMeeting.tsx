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

        if (!groupId || !startTime || !endTime || !description || !roomName) {
            setError('All fields are required.');
            return;
        }

        const start = new Date(startTime).getTime();
        const end = new Date(endTime).getTime();
        const now = new Date().getTime();

        if (start < now) {
            setError('You cannot add a meeting that starts in the past.');
            return;
        }

        if (start > end) {
            setError('Start time cannot be later than end time.');
            return;
        }

        // Send data to the API
        const newMeeting = {
            group_id: parseInt(groupId),
            start_time: startTime.replace('T', ' ') + ':00', // Match MySQL datetime format
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
            alert('Meeting added successfully!');
            onNavigate('meetings');
        })
        .catch(() => setError('Could not save the meeting. Please try again.'));
    };

    return (
        <div className="page-card">
            <h1>Add a New Meeting</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Development Group: </label>
                    <select value={groupId} onChange={e => setGroupId(e.target.value)}>
                        <option value="">-- Select a group --</option>
                        {groups.map(g => (
                            <option key={g.group_id} value={g.group_id}>{g.group_name}</option>
                        ))}
                    </select>
                </div>
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
                <button type="submit">Save Meeting</button>
            </form>
        </div>
    );
};

export default AddMeeting;