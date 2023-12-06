import { Button, ButtonGroup, Typography } from "@mui/material";
import { useCollectionData } from "react-firebase-hooks/firestore";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import { featureRef } from "../firebase";
import { GenrePicker } from "./GenrePicker";

export const LandingPage = () => {
  const [snapshot] = useCollectionData(featureRef, { idField: "id" });
  const favourite = snapshot?.map((fav, i) => {
    return (
      <div
        className="featuredContainer"
        key={i}
        style={{ background: "black" }}
      >
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
          <Typography color="white" variant="h5">
            {fav.titleSwedish}
          </Typography>
          <Typography color="white" variant="body1">
            {fav.descriptionSV}
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
        <GenrePicker />
        <div className="genrePickerContainer">
          <Typography
            className="landingText"
            variant="body2"
            fontWeight={"light"}
          >
            Browse previous productions:
          </Typography>

          <ButtonGroup className="buttonGroup">
            <Link
              className="category"
              to="/genre/culture"
              style={{ textDecoration: "none" }}
            >
              <Button title="culture" className="categoryButton" variant="text">
                <Typography variant="h6">Culture</Typography>
              </Button>
            </Link>

            <Link
              className="category"
              to="/genre/science"
              style={{ textDecoration: "none" }}
            >
              <Button className="categoryButton" variant="text">
                <Typography variant="h6">Science & Tech</Typography>
              </Button>
            </Link>

            <Link
              className="category"
              to="/genre/history"
              style={{ textDecoration: "none" }}
            >
              <Button className="categoryButton" variant="text">
                <Typography variant="h6">History</Typography>
              </Button>
            </Link>
          </ButtonGroup>
        </div>
      </div>
      {favourite}
    </div>
  );
};
