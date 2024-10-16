'use client';
import Comment from '@/components/community/Comment';
import DetailPost from '@/components/community/DetailPost';
import { CommunityPost } from '@/lib/type/CommunityTypes';
import { createClient } from '@/utils/supabase/client';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const PostDetail = () => {
  const [posts, setPosts] = useState<CommunityPost>({
    id: '',
    created_at: '',
    user_id: '',
    title: '',
    body: '',
    artist_id: '',
    users: {
      display_name: '',
      id: '',
    },
  });
  const supabase = createClient();

  const value = useParams<{ postId: string }>(); //!!!
  const postId: string = value.postId; //????? 걍 string 인데 ==> ok!!!

  //해당 글 불러오기
  const getPosts = async (postId: string): Promise<CommunityPost | undefined> => {
    const { data, error } = await supabase
      .from('posts')
      .select(
        `
      *,
      users (
        id,
        display_name
      )
    `,
      )
      .eq('id', postId)
      .single();
    setPosts(data as CommunityPost);

    if (error) {
      console.error('Error fetching post:', error.message);
      return;
    }
  };

  useEffect(() => {
    getPosts(postId);
  }, []);

  return (
    <div className='flex flex-col justify-center items-center'>
      <div>
        <DetailPost
          posts={posts}
          postId={postId}
        />
        <Comment />
      </div>
    </div>
  );
};

export default PostDetail;
