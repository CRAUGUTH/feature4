import Home from './Home/Home';
import LectureList from './Lecture/LectureList';
import AddLecture from './Lecture/AddLecture';
import Footer from "./Footer/Footer";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export default function Components() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<LectureList />} />
          <Route path="/add" element={<AddLecture />} />
        </Routes>
        <Footer />
    </Router>
  );
}