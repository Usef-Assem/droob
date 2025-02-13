import React from 'react';
import Home from './components/Home/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import InverseProtectedRoute from './components/InverseProtectedRoute/InverseProtectedRoute';
import { Toaster } from 'react-hot-toast';
import StudentForm from './components/StudentForm/StudentForm';
import ProtectedRoute from './components/ProtectedRoute';
import MainExam from './components/Exams/MainExam';
import MathGuides from './components/Guides/MathGuides';
import ReadingGuides from './components/Guides/ReadingGuides';
import IQExam from './components/Exams/IQExam';
import MathExam from './components/Exams/MathExam';
import ReadingExam from './components/Exams/ReadingExam';
import UnifiedGuides from './components/Guides/UnifiedGuides';





function App() {
  const routes = createBrowserRouter([
    {  path: '/',  element: <Layout />, children:[
      {index: true , element:<Home />},
      { path: 'Login', element: <InverseProtectedRoute><Login /></InverseProtectedRoute> },
      { path: 'Register', element:<InverseProtectedRoute><Register /></InverseProtectedRoute> },
      { path: 'MathGuides', element: <ProtectedRoute><MathGuides/></ProtectedRoute>},
      { path: 'ReadingGuides', element: <ProtectedRoute><ReadingGuides/></ProtectedRoute>},
      { path: 'UnifiedGuides', element: <ProtectedRoute><UnifiedGuides /></ProtectedRoute>},
    ] },
    { path: 'StudentForm', element: <ProtectedRoute><StudentForm /></ProtectedRoute>},
    { path: 'MainExam', element: <ProtectedRoute><MainExam /></ProtectedRoute>},
    { path: 'MathExam', element: <ProtectedRoute><MathExam /></ProtectedRoute>},
    { path: 'IQExam', element: <ProtectedRoute><IQExam /></ProtectedRoute>},
    { path: 'ReadingExam', element: <ProtectedRoute><ReadingExam /></ProtectedRoute>},
   
    
  ]);

  return <>
    <RouterProvider router={routes} />
    <Toaster />
    </>;
}

export default App;
