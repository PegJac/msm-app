import React, { useState } from "react";
import { Data } from "react-firebase-hooks/firestore/dist/firestore/types";
import { DocumentData } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { titleRef } from "../firebase";
import { TrailerPlayer } from "./TrailerPlayer";
import {
  Backdrop,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Dialog,
  Tab,
  Typography,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import "../styles/thumbnails.scss";

interface IThumbnails {
  genre: string;
}

export const Thumbnails: React.FC<IThumbnails> = ({ genre }) => {
  const [thumbnailSelected, setThumbnailSelected] = useState<
    Data<DocumentData> | undefined
  >();
  const [snapshot] = useCollectionData(titleRef, { idField: "id" });

  const selectThumbnail = (title: Data<DocumentData>) => {
    setThumbnailSelected(title);
  };

  const handleClose = () => {
    setThumbnailSelected(undefined);
  };

  const titleCards = snapshot?.map((title, i) => {
    if (title.category === genre) {
      return (
        <div key={i} className="thumbnailContainer" title={genre}>
          <Card className="card" onClick={() => selectThumbnail(title)}>
            <CardMedia
              className="cardMedia"
              component="img"
              image={title.imgUrl}
              alt={title.titleEnglish}
            />
            <CardHeader className="cardHeader" title={title.titleEnglish} />
          </Card>
        </div>
      );
    }
    return null;
  });

  return (
    <div className="thumbnailsContainer" title="thumbnails">
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={genre}>
          <TabPanel
            className={genre === "culture" ? "tabPanel" : undefined}
            value="culture"
          >
            {titleCards}
          </TabPanel>
          <TabPanel
            className={genre === "science" ? "tabPanel" : undefined}
            value="science"
          >
            {titleCards}
          </TabPanel>
          <TabPanel
            className={genre === "history" ? "tabPanel" : undefined}
            value="history"
          >
            {titleCards}
          </TabPanel>
        </TabContext>
      </Box>

      {/* VIDEO PLAYER */}
      {thumbnailSelected ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={thumbnailSelected ? true : false}
        >
          <Dialog onClose={handleClose} open={thumbnailSelected ? true : false}>
            <Card className="trailerCard" style={{ background: "red" }}>
              <CardMedia className="trailerPlayer">
                <TrailerPlayer
                  url={thumbnailSelected.videoUrl}
                  imdb={thumbnailSelected.imDbId}
                  title={thumbnailSelected.titleEnglish}
                />
              </CardMedia>
              <CardContent className="cardContent">
                <Typography variant="body2" color="text.secondary">
                  {thumbnailSelected.descriptionEN}
                </Typography>
              </CardContent>
            </Card>
          </Dialog>
        </Backdrop>
      ) : null}
    </div>
  );
};
