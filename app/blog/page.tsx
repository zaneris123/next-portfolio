"use client";
import { useEffect, useState } from "react";

import { PostPreview } from "@/components/postPreview";
import { title } from "@/components/primitives";

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [fetchAttempts, setFetchAttempts] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `https://public-api.wordpress.com/wp/v2/sites/zanerisblog.wordpress.com/posts?page=${currentPage}`
        );
        const data = await response.json();
        if (!Array.isArray(data) && fetchAttempts < 3) {
          setFetchAttempts(fetchAttempts + 1);
          return fetchPosts();
        }

        setTotalPages(Number(response.headers.get("X-WP-TotalPages")));
        setPosts([...posts, ...data]);
      } catch (error) {
        setFetchAttempts(fetchAttempts + 1);
        if (fetchAttempts < 3) {
          return fetchPosts();
        } else {
          alert(error);
        }
      } finally {
        setIsLoading(false);
        setFetchAttempts(0);
      }
    };
    fetchPosts();
  }, [currentPage]);
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight + 100 &&
        !isLoading &&
        currentPage < totalPages
      ) {
        setIsLoading(true);
        setCurrentPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading, currentPage, totalPages]);

  if (isLoading && posts.length === 0) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <h1 className={title()}>Blog</h1>
        {posts.map((post: any) => (
          <PostPreview key={post.id} post={post} />
        ))}
        {isLoading && <div>Loading more posts...</div>}
      </div>
    );
  }
}
