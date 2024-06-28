import { useLayoutEffect, useState } from 'react';
import { fetchLectures } from '../../Services/LectureService';

// LectureList Component
const LectureList = () => {
    const [lectures, setLectures] = useState([]);

    useLayoutEffect(()=>{
        fetchLectures().then((lectures) => {
            console.log('Lectures: ', lectures);
            setLectures(lectures);
        })
    }, [])

    return (
        <section>
            <h1>Lecture List</h1>
            {lectures.length > 0 && (
                    <ul>
                        {lectures.map((lecture) => (
                            <li key={lecture.id}>{lecture.id}</li>
                        ))}
                    </ul>
                )}
        </section>
    );
};

export default LectureList;
