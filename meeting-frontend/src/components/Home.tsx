import React from 'react';

interface HomeProps {
    onNavigate: (page: string) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
    return (
        <div>
            <h1>מערכת ניהול פגישות לחברות הייטק</h1>
            <p>מערכת זו מאפשרת לקבוצות הפיתוח השונות בחברה לנהל, לתאם, לעדכן ולמחוק פגישות בחדרי הדיונים השונים בצורה יעילה ומסודרת.</p>
            {/* ודאי שיש לך תמונה בשם meeting.png באותה תיקיית מקור או השתמשי בקישור זמני */}
            <img src="meeting.png" alt="Meetings Management" width="300" />
        </div>
    );
};

export default Home;