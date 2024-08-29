"use client"
import { useEffect, useState } from "react";

import { title } from "@/components/primitives";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [fetchAttempts, setFetchAttempts] = useState(0);

  useEffect(() => {
    const fetchProjects: () => Promise<void> = async () => {
      try {
        const response = await fetch(
          `https://public-api.wordpress.com/wp/v2/sites/zanerisportfolio.wordpress.com/posts?page=${currentPage}`
        );
        const data = await response.json();

        if (!Array.isArray(data) && fetchAttempts < 3) {
          setFetchAttempts(fetchAttempts + 1);

          return fetchProjects();
        }

        setTotalPages(Number(response.headers.get("X-WP-TotalPages")));
        setProjects([...projects, ...data]);
      } catch (error) {
        setFetchAttempts(fetchAttempts + 1);
        if (fetchAttempts < 3) {
          return fetchProjects();
        } else {
          alert(error);
        }
      } finally {
        setIsLoading(false);
        setFetchAttempts(0);
      }
    };

    fetchProjects();
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

  if (isLoading && projects.length === 0) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <h1 className={title()}>Projects</h1>
      </div>
    );
  }
}
