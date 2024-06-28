import React, { useState } from 'react';
import { addLecture } from '../../Services/LectureService';

// AddLecture Component
const AddLecture = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        await addLecture(title, description);
    };

    return (
        <div>
            <h1>Add Lecture</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <button type="submit">Add Lecture</button>
            </form>
        </div>
    );
};

export default AddLecture;
