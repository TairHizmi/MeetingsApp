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

    // Load development groups on page mount
    useEffect(() => {
        fetch('http://localhost:3000/api/groups')
            .then(res => res.json())
            .then(data => setGroups(data))
            .catch(err => console.error(err));
    }, []);

    // Load meetings whenever a group is selected
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

    // Delete meeting handler
    const handleDelete = (meetingId: number) => {
        if (window.confirm('Are you sure you want to delete this meeting?')) {
            fetch(`http://localhost:3000/api/meetings/${meetingId}`, {
                method: 'DELETE'
            })
            .then(() => {
                // Update the client list after deletion
                setMeetings(meetings.filter(m => m.meeting_id !== meetingId));
            })
            .catch(err => console.error(err));
        }
    };

    // Calculate meeting duration in minutes
    const calculateDuration = (start: string, end: string) => {
        const diffMs = new Date(end).getTime() - new Date(start).getTime();
        const diffMins = Math.round(diffMs / 60000);
        return `${diffMins} minutes`;
    };

    return (
        <div className="page-card">
            <h1>Meetings Overview</h1>
            <label className="field-label">Select Development Group:</label>
            <select className="field-select" value={selectedGroupId} onChange={(e) => setSelectedGroupId(e.target.value)}>
                <option value="">-- Select a group --</option>
                {groups.map(g => (
                    <option key={g.group_id} value={g.group_id}>{g.group_name}</option>
                ))}
            </select>

            <hr />

            {meetings.length === 0 ? <p>No meetings are available for this group.</p> : (
                <table border={1}>
                    <thead>
                        <tr>
                            <th>Room</th>
                            <th>Description</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Duration</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {meetings.map(m => {
                            const isFuture = new Date(m.start_time).getTime() > new Date().getTime();

                            return (
                                <tr key={m.meeting_id} className={isFuture ? 'meeting-row future' : 'meeting-row past'}>
                                    <td>{m.room_name}</td>
                                    <td>{m.description}</td>
                                    <td>{new Date(m.start_time).toLocaleString()}</td>
                                    <td>{new Date(m.end_time).toLocaleString()}</td>
                                    <td>{calculateDuration(m.start_time, m.end_time)}</td>
                                    <td className="action-cell">
                                        <button className="action-btn update" onClick={() => onNavigate('update-meeting', m)}>Update</button>
                                        <button className="action-btn delete" onClick={() => handleDelete(m.meeting_id)} aria-label="Delete meeting">🗑️</button>
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