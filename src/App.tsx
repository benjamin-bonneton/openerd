// React
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Courses from "@pages/Courses";
import Course from "@pages/Course";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Courses />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/course/:id" element={<Course />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
