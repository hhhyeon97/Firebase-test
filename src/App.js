import React from 'react';
import AddPostForm from './AddPostForm';
import BoardMain from './BoardMain';
import { Routes, Route } from 'react-router-dom';
import BoardDetail from './BoardDetail';
function App() {
  return (
    <div>
      <h1>게시판 앱</h1>
      <Routes>
        <Route path="/write" element={<AddPostForm />} />
        <Route path="/main" element={<BoardMain />} />
        <Route path="/detail/:id" element={<BoardDetail />} />
      </Routes>
    </div>
  );
}

export default App;
