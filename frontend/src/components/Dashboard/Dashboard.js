import React, { useEffect } from 'react';
import SideNav from '../SideNav';
import Header from '../Header';
import Footer from '../Footer';


const Dashboard = () => {
    const [user, setUser] = React.useState(null);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
            console.log("User data:", JSON.parse(userData));
            

        }
    }, []);


    return (
        <div>
           
           
            <SideNav  user={user}/>
            <Footer />

            
            
        </div>
    );
};

export default Dashboard;