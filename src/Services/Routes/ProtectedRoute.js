import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Parse from 'parse';

const ProtectedRoute = ({ element: Element }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const currentUser = Parse.User.current();
        if (currentUser) {

            navigate(-1); 
            alert('You are already logged in!');
        }
    }, [navigate]);

    return <Element />;
};

export default ProtectedRoute;
