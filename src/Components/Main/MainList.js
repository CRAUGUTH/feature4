import { useState, useLayoutEffect } from "react";
import { getAllLessons } from "../../Services/LearnService";

const MainList = () => {
    const [lessons, setLessons] = useState([]);

    useLayoutEffect(()=>{
        getAllLessons().then((lessons) => {
            console.log('lessons: ', lessons);
            setLessons(lessons);
        })
    }, [])

    return (
        <div>
            <hr />
            This is the main list parent components.
            <div>
                {lessons.length > 0 && (
                    <ul>
                        {lessons.map((lesson) => (
                            <li key={lesson.id}>{lesson.id}</li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}

export default MainList;