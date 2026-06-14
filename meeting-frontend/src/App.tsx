import React, { useState } from 'react';
import Home from './components/Home';
import About from './components/About';
import MeetingsList from './components/MeetingsList';
import AddMeeting from './components/AddMeeting';
import UpdateMeeting from './components/UpdateMeeting';

const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<string>('home');
    const [sharedData, setSharedData] = useState<any>(null);

    const navigate = (page: string, data?: any) => {
        setSharedData(data);
        setCurrentPage(page);
    };

    return (
        <div>
            {/* תפריט ניווט פשוט ללא עיצוב */}
            <nav style={{ padding: '10px', background: '#eee' }}>
                <button onClick={() => navigate('home')}>דף הבית</button> | 
                <button onClick={() => navigate('about')}>אודות</button> | 
                <button onClick={() => navigate('meetings')}>הצגת פגישות</button> | 
                <button onClick={() => navigate('add-meeting')}>הוספת פגישה</button>
            </nav>

            <hr />

            {/* רינדור מותנה של הדפים לפי ה-State */}
            {currentPage === 'home' && <Home onNavigate={navigate} />}
            {currentPage === 'about' && <About />}
            {currentPage === 'meetings' && <MeetingsList onNavigate={navigate} />}
            {currentPage === 'add-meeting' && <AddMeeting onNavigate={navigate} />}
            {currentPage === 'update-meeting' && <UpdateMeeting meetingData={sharedData} onNavigate={navigate} />}
        </div>
    );
};

export default App;