"use client";
import { useEffect, useState } from "react";

import { PostPreview } from "@/components/postPreview";
import { title } from "@/components/primitives";

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "https://public-api.wordpress.com/wp/v2/sites/zanerisblog.wordpress.com/posts",
        );
        const data = await response.json();

        setPosts(data);
      } catch (error) {
        alert(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <h1 className={title()}>Blog</h1>
        {posts.map((post: any) => (
          <PostPreview key={post.id} post={post} />
        ))}
      </div>
    );
  }
}
