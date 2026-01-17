// src/App.jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { CanteenProvider } from './context/CanteenContext';
import { SnacksPage } from './components/SnackPage.jsx';
import { StudentDetail } from './components/StudentDetail';
import { StudentsList } from './components/StudentList.jsx';
import { CreateStudent } from './components/CreateStudent.jsx';
import { Navbar } from './components/Navbar.jsx';
import { Toaster } from 'react-hot-toast';

export default function App() {
  return (
    <CanteenProvider>
      <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
        <Navbar/>
      <Routes>
  <Route path="/" element={<SnacksPage />} />           {/* View & Order Snacks */}
  <Route path="/students" element={<StudentsList />} />  {/* This Page */}
  <Route path="/students/new" element={<CreateStudent />} /> {/* Add Student Page */}
  <Route path="/student/:id" element={<StudentDetail />} /> {/* Order History */}
</Routes>
      </BrowserRouter>
    </CanteenProvider>
  );
}