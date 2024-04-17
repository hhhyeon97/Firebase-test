import React from 'react';
import AddPostForm from './AddPostForm';
import BoardMain from './BoardMain';

function App() {
  return (
    <div>
      <h1>게시판 앱</h1>
      <AddPostForm />
      <hr />
      <BoardMain />
    </div>
  );
}

export default App;
