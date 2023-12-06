import { SyntheticEvent, useState } from "react";
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

export const Thumbnails = (props: IThumbnails) => {
  const [thumbnailSelected, setThumbnailSelected] = useState<
    Data<DocumentData> | undefined
  >();
  const [snapshot] = useCollectionData(titleRef, { idField: "id" });
  const [value, setValue] = useState(props.genre);

  const selectThumbnail = (title: Data<DocumentData>) => {
    setThumbnailSelected(title);
  };

  const handleClose = () => {
    setThumbnailSelected(undefined);
  };

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const titleCards = snapshot?.map((title, i) => {
    if (title.category === value) {
      return (
        <div key={i} className="thumbnailContainer" title={value}>
          <Card className="card" onClick={() => selectThumbnail(title)}>
            <CardHeader className="cardHeader" title={title.titleSwedish} />
            <CardMedia
              className="cardMedia"
              component="img"
              image={title.imgUrl}
              alt={title.titleEnglish}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {title.descriptionSV.slice(0, 200) + "..."}
              </Typography>
            </CardContent>
          </Card>
        </div>
      );
    }
  });

  return (
    <div className="thumbnailsContainer" title="thumbnails">
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab title="culture" label="Culture" value="culture" />
              <Tab title="science" label="Science & tech" value="science" />
              <Tab title="history" label="History" value="history" />
            </TabList>
          </Box>
          <TabPanel
            className={value == "culture" ? "tabPanel" : undefined}
            value="culture"
          >
            {titleCards}
          </TabPanel>
          <TabPanel
            className={value == "science" ? "tabPanel" : undefined}
            value="science"
          >
            {titleCards}
          </TabPanel>
          <TabPanel
            className={value == "history" ? "tabPanel" : undefined}
            value="history"
          >
            {titleCards}
          </TabPanel>
          <Typography title="heading" display={"none"}>
            {value}
          </Typography>
        </TabContext>
      </Box>

      {/* VIDEO PLAYER */}
      {thumbnailSelected ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={thumbnailSelected ? true : false}
        >
          <Dialog onClose={handleClose} open={thumbnailSelected ? true : false}>
            <Card className="trailerCard">
              <CardMedia className="trailerPlayer">
                <TrailerPlayer
                  url={thumbnailSelected.videoUrl}
                  imdb={thumbnailSelected.imDbId}
                  title={thumbnailSelected.titleSwedish}
                />
              </CardMedia>
              <CardContent className="cardContent">
                <Typography variant="body2" color="text.secondary">
                  {thumbnailSelected.descriptionSV}
                </Typography>
              </CardContent>
            </Card>
          </Dialog>
        </Backdrop>
      ) : null}
    </div>
  );
};
