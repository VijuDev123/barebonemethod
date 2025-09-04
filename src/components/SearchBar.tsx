import React from "react";
import styled from "styled-components";
import backgroundImage from "../assets/search-header.jpeg";
import settings from "../settings";

interface ISearchText {
  onChange: (text: string) => void;
  onButtonClick: () => void;
  value: string;
}

export const SearchBar: React.FC<ISearchText> = (props) => {
  const { onChange, onButtonClick, value } = props;

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      onButtonClick(); // TODO: you can change the prop name to onSearch
    }
  };

  return (
    <SearchBarContainer>
      <SearchBarTitle>Welcome.</SearchBarTitle>
      <SearchBarSubTitle>
        Millions of movies, TV shows and people to discover. Explore now.
      </SearchBarSubTitle>
      <SearchWrapper>
        <SearchInput
          onKeyDown={handleKeyPress}
          data-testid="search-input"
          value={value}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            onChange(event.target.value)
          }
        ></SearchInput>
        <PrimaryButton
          data-testid="search-button"
          onClick={() => onButtonClick()}
        >
          Search
        </PrimaryButton>
      </SearchWrapper>
    </SearchBarContainer>
  );
};

const SearchBarContainer = styled.div`
  height: 300px;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  background-image: url("${backgroundImage}");
  background-size: cover;
  background-repeat: no-repeat;
  padding: 20px;
  box-sizing: border-box;
  margin-bottom: 20px;
`;

const SearchBarTitle = styled.h2`
  font-size: 3em;
  font-weight: 700;
  line-height: 1;
  color: ${settings.colors.backgroundSecondary};
  margin-bottom: 10px;
`;

const SearchBarSubTitle = styled.h3`
  font-size: 1.8em;
  font-weight: 500;
  margin: 0;
  color: ${settings.colors.backgroundSecondary};
  margin-bottom: 40px;
`;

// NOTE: You can use the components bellow to go quicker

const SearchInput = styled.input`
  display: flex;
  border-radius: 0px;
  border-width: 0px;
  height: 40px;
  flex-grow: 1;
  padding: 0px;
  margin-right: 10px;
  padding-left: 10px;
  font-size: 1rem;
  color: ${settings.colors.foreground};
  font-weight: 300;
`;

const PrimaryButton = styled.button`
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  background-color: ${settings.colors.info};
  border-color: ${settings.colors.info};
  color: ${settings.colors.backgroundSecondary};
  font-weight: 700;
  font-size: 2rem;
  border-width: 0px;
  &:hover {
    background-color: ${settings.colors.info};
    cursor: pointer;
  }
`;

const SearchWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: flex-end;
`;
