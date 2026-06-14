import React, { useState } from 'react';
import './App.css';
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
        <div className="app-shell">
            <nav className="topbar">
                <div className="brand">MeetingFlow</div>
                <div className="nav-group">
                    <button className="nav-button" onClick={() => navigate('home')}>Home</button>
                    <button className="nav-button" onClick={() => navigate('about')}>About</button>
                    <button className="nav-button" onClick={() => navigate('meetings')}>Meetings</button>
                    <button className="nav-button" onClick={() => navigate('add-meeting')}>Add Meeting</button>
                </div>
            </nav>

            <main className="page-frame">
                {currentPage === 'home' && <Home />}
            {currentPage === 'about' && <About />}
            {currentPage === 'meetings' && <MeetingsList onNavigate={navigate} />}
                {currentPage === 'add-meeting' && <AddMeeting onNavigate={navigate} />}
                {currentPage === 'update-meeting' && <UpdateMeeting meetingData={sharedData} onNavigate={navigate} />}
            </main>
        </div>
    );
};

export default App;