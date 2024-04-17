import React, { useState } from 'react';
import { storage, db } from './firebase';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

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

    if (!title || !content || !image) {
      alert('제목, 내용, 이미지를 모두 입력해주세요.');
      return;
    }

    try {
      // 이미지를 Firebase Storage에 업로드
      const storageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(storageRef, image);

      // 이미지 URL을 가져옴
      const imageUrl = await getDownloadURL(storageRef);

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
      alert('게시물이 성공적으로 추가되었습니다.');
    } catch (error) {
      console.error('게시물 추가 오류:', error);
      alert('게시물을 추가하는 중에 오류가 발생했습니다.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="내용"
        required
      />
      <input type="file" onChange={handleImageChange} required />
      <button type="submit">게시물 추가</button>
    </form>
  );
}

export default AddPostForm;
