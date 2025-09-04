import React from "react";
import styled from "styled-components";
import { ErrorMessage, PageSection, SectionTitle } from "./styled";
import LoadingIndicator from "./styled/LoadingIndicator";
import SimpleMovieCard from "./SimpleMovieCard";

interface IMovieSlider {
  movieList?: Movie[];
  error?: ApiError | null;
  headingText: string;
  listType?: "upcoming" | "trending" | "topRated";
  loading?: boolean;
}

const MovieSlider: React.FC<IMovieSlider> = (props) => {
  const { movieList, error, headingText, listType, loading } = props;

  if (loading) {
    return (
      <PageSection aria-labelledby={`${listType}-movies-heading`}>
        <SectionTitle>{headingText}</SectionTitle>
        <MovieSliderContainer>
          <LoadingIndicator data-testid={`${listType}-movies-loading`} />
        </MovieSliderContainer>
      </PageSection>
    );
  }

  if (error) {
    return (
      <PageSection aria-labelledby={`${listType}-movies-now-heading`}>
        <SectionTitle>{headingText}</SectionTitle>
        <MovieSliderContainer>
          <ErrorMessage
            data-testid={`${listType}-movies-error-message`}
            aria-live="polite"
          >
            {error.message}
          </ErrorMessage>
        </MovieSliderContainer>
      </PageSection>
    );
  }

  return (
    <PageSection aria-labelledby={`${listType}-movies-heading`}>
      <SectionTitle>{headingText}</SectionTitle>
      <MovieSliderContainer
        data-testid={`${listType}-movies-container`}
        aria-label={`List of ${listType} movies`}
        role="list"
      >
        {movieList?.map((movie) => (
          <SimpleMovieCard
            data-testid={`${listType}-movies-card-${movie.id}`}
            movie={movie}
            key={movie.id}
          />
        ))}
      </MovieSliderContainer>
    </PageSection>
  );
};

export default MovieSlider;

const MovieSliderContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  overflow: scroll;
  max-height: 200px;
  -ms-overflow-style: none;
  scrollbar-width: none;
  padding-bottom: 20px;
  ::-webkit-scrollbar {
    display: none;
  }
`;
