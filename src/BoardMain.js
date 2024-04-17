import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
function BoardMain() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(db, 'posts'));
      const fetchedPosts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(fetchedPosts);
    };

    fetchPosts();
  }, []);

  const goToDetail = (id) => {
    navigate(`/detail/${id}`); // 해당 게시물의 ID를 포함한 URL로 이동
  };

  return (
    <div>
      <h1>메인게시판</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <img
              width={250}
              height={250}
              src={post.imageUrl}
              onClick={() => goToDetail(post.id)} // post 객체를 전달하여 goToDetail 함수 호출
              alt=""
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BoardMain;
