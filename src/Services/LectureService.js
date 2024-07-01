import Parse from 'parse';

// Fetch all lectures
export const fetchLectures = async () => {
    const Lecture = Parse.Object.extend('Lesson');
    const query = new Parse.Query(Lecture);
    return query.find().then((results) => {
        console.log(results)
        return results;
    });
};

// Add a new lecture
export const addLecture = async (title, description) => {
    const Lecture = Parse.Object.extend('Lecture');
    const lecture = new Lecture();
    lecture.set('name', title);
    lecture.set('description', description);

    try {
        await lecture.save();
        console.log('Lecture added:', { title, description });
    } catch (error) {
        console.error('Error while adding lecture:', error);
    }
};