import React from 'react';

const Home: React.FC = () => {
    return (
        <div className="page-card home-hero">
            <div className="home-copy">
                <h1>Meeting Management System</h1>
                <h2 className="home-subtitle">for Tech Companies</h2>
                <p>This system helps development teams organize, coordinate, update, and remove meetings in a clear and efficient way.</p>
            </div>
            <div className="home-logo-wrap">
                <img
                    src="/meeting_flow_logo_centered.svg"
                    alt="MeetingFlow logo"
                    className="home-logo"
                />
            </div>
        </div>
    );
};

export default Home;