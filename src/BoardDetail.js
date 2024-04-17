import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';

function BoardDetail() {
  const { id } = useParams(); // URL에서 게시물 ID 추출
  const [post, setPost] = useState(null); // 게시물 상태

  useEffect(() => {
    // 게시물 데이터 가져오기
    const fetchPost = async () => {
      const docRef = doc(db, 'posts', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPost({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.log('게시물이 존재하지 않습니다.');
      }
    };

    fetchPost();
  }, [id]); // ID가 변경될 때마다 실행

  if (!post) {
    return <div>Loading...</div>; // 게시물이 로딩 중일 때 표시할 내용
  }

  return (
    <div>
      <h2>디테일페이지</h2>
      <h1>{post?.title}</h1>
      <p>{post?.content}</p>
      <img width={100} height={100} src={post?.imageUrl} alt="" />
    </div>
  );
}

export default BoardDetail;
