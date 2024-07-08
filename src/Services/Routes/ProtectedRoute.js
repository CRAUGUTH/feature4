import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Parse from 'parse';

const ProtectedRoute = ({ element: Element, authRequired }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const currentUser = Parse.User.current();
        if (authRequired && !currentUser) {
            alert('You need to be logged in to view this page.');
            navigate('/login');
        } else if (!authRequired && currentUser) {
            alert('You are already logged in!');
            navigate('/');
        }
    }, [navigate, authRequired]);

    return <Element />;
};

export default ProtectedRoute;
