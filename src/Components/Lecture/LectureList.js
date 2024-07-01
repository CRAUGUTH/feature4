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
                            <li key={lecture.id}>
                            <div>
                                <h3>Title: {lecture.attributes.title}</h3>
                                <h4>Description: {lecture.attributes.description}</h4>
                            </div>
                        </li>
                        ))}
                    </ul>
                )}
        </section>
    );
};

export default LectureList;
