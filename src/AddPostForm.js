// AddPostForm.js 파일 내용
import React, { useState } from 'react';
import { storage, db } from './firebase';
import { addDoc, collection, Timestamp } from 'firebase/firestore';

function AddPostForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 이미지를 Firebase Storage에 업로드
    const storageRef = storage.ref();
    const imageRef = storageRef.child(image.name);
    await imageRef.put(image);

    // 이미지 URL을 가져옴
    const imageUrl = await imageRef.getDownloadURL();

    // Firestore에 게시물 추가
    await addDoc(collection(db, 'posts'), {
      title,
      content,
      imageUrl,
      createdAt: Timestamp.fromDate(new Date()),
    });
    // 폼 초기화
    setTitle('');
    setContent('');
    setImage(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="내용"
      />
      <input type="file" onChange={handleImageChange} />
      <button type="submit">게시물 추가</button>
    </form>
  );
}

export default AddPostForm;
