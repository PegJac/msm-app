import { useState } from "react";
import { Button, ButtonGroup, Typography } from "@mui/material";
import { useCollectionData } from "react-firebase-hooks/firestore";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import { featureRef } from "../firebase";
import { GenrePicker } from "./GenrePicker";
import { Thumbnails } from "./Thumbnails";

export const LandingPage = () => {
  const [snapshot] = useCollectionData(featureRef, { idField: "id" });
  const [genre, setGenre] = useState("culture");

  const favourite = snapshot?.map((fav, i) => {
    return (
      <div className="featuredContainer" key={i}>
        <div className="featuredWrapper">
          <ReactPlayer
            width={"100%"}
            url={`https://vimeo.com/${fav.videoUrl}`}
            muted
            playing
            loop
            responsive
          />
        </div>
        <div className="featuredWrapper">
          <Typography color="white" variant="h3">
            {fav.titleEnglish}
          </Typography>
          <Typography color="white" variant="body1">
            {fav.descriptionEN}
          </Typography>
        </div>
      </div>
    );
  });

  return (
    <div className="landingPageContainer">
      <div className="heroContainer">
        <div className="heroM">
          <Typography className="m" variant="h1">
            m
          </Typography>
          <Typography className="landingText" variant="body1">
            Magnus Sjöström Media.
          </Typography>
          <Typography className="landingText" variant="body1">
            Journalism and TV in the fields of science, tech, history and
            culture.
          </Typography>
        </div>
      </div>
      {favourite}
      <div className="genrePickerContainer">
        <ButtonGroup className="buttonGroup">
          <Button
            title="culture"
            className="categoryButton"
            variant="text"
            onClick={() => setGenre("culture")}
          >
            <Typography variant="h6">Culture</Typography>
          </Button>

          <Button
            className="categoryButton"
            variant="text"
            onClick={() => setGenre("science")}
          >
            <Typography variant="h6">Science & Tech</Typography>
          </Button>

          <Button
            className="categoryButton"
            variant="text"
            onClick={() => setGenre("history")}
          >
            <Typography variant="h6">History</Typography>
          </Button>
        </ButtonGroup>
      </div>
      <Thumbnails genre={genre} />
    </div>
  );
};
