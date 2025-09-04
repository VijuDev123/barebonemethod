import React, { useEffect, useState } from "react";
import { MovieList } from "../components/MovieList";
import { SearchBar } from "../components/SearchBar";
import { PageContainer } from "../components/styled";
import TrendingNow from "../components/TrendingNow";
import TopRated from "../components/TopRatedMovies";
import UpcomingMovies from "../components/UpcomingMovies";
import movieApiClient from "../utils/apiClient";
import { useSearchParams } from "react-router-dom";
import Pagination from "../components/Pagination";

export default function MainPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchInputParam = searchParams.get("search") || "";
  const currentPageParam = Number(searchParams.get("page")) || 1;

  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [error, setFetchError] = useState<ApiError | null>();
  const [loading, setLoading] = useState<boolean>(true); // New loading state
  const [currentPage, setCurrentPage] = useState<number>(currentPageParam);
  const [searchText, setSearchText] = useState<string>(searchInputParam);
  const [totalPages, setTotalPages] = useState<number>(1);

  async function getMovies(searchText: string, currentPage: number) {
    // Set loading to true before the request starts
    setLoading(true);

    // Fetch the movies from the api
    const response = await movieApiClient.getMovieList(searchText, currentPage);
    if ("message" in response) {
      setFetchError({
        message: "An error ocurred while fetching the movies",
        isError: true,
      });
    } else {
      setMovieList(response.results);
      setTotalPages(response.total_pages);
    }

    // Set loading to false after the request is finished
    setLoading(false);

    // Update the url with the new search params
    setSearchParams({ search: searchText, page: currentPage.toString() });
  }

  useEffect(() => {
    getMovies(searchText, currentPage);
  }, []);

  function onSearchButtonClick() {
    // what do we want to happen when the users click on the search button
    getMovies(searchText, 1);
  }

  function onChangeSearchText(searchText: string) {
    // what do we want to happen when the user types in the input field
    setSearchText(searchText);
  }

  function onPageChange(page: number) {
    setCurrentPage(page);
    getMovies(searchText, page);
  }

  return (
    <PageContainer>
      <SearchBar
        onChange={onChangeSearchText}
        value={searchText}
        onButtonClick={onSearchButtonClick}
      />
      <MovieList movieList={movieList} error={error} loading={loading} />
      <Pagination
        currentPage={currentPage}
        lastPage={totalPages}
        onPageChange={onPageChange}
      />
      <TrendingNow />
      <TopRated />
      <UpcomingMovies />
    </PageContainer>
  );
}
