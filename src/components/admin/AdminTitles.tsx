import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  TextField,
} from "@mui/material";
import { deleteDoc, doc, DocumentData, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Data } from "react-firebase-hooks/firestore/dist/firestore/types";
import { db, featureRef, titleRef } from "../../firebase";
import { defaultTitle, ITitle } from "../../models/titles";

export const AdminTitles = () => {
  const [snapshot] = useCollectionData(titleRef, {
    idField: "id",
  });
  const [featuredCollection] = useCollectionData(featureRef);

  const [featuredTitle, setFeaturedTitle] = useState<Data<DocumentData>>();
  const [deleteForm, setDeleteForm] = useState<string>("");
  const [deleteItem, setDeleteItem] = useState<
    Data<DocumentData> | undefined
  >();

  const [editItem, setEditItem] = useState<ITitle>(defaultTitle);

  const [deleteError, setDeleteError] = useState<boolean>(false);

  useEffect(() => {
    snapshot?.map((item) => {
      if (
        featuredCollection &&
        featuredCollection.length >= 1 &&
        item.id === featuredCollection[0].id
      ) {
        return setFeaturedTitle(item);
      } else return null;
    });
  }, [snapshot, featuredCollection]);

  const deleteTitle = (id: Data<DocumentData>) => {
    if (deleteForm !== id.titleSwedish) {
      return setDeleteError(true);
    }

    if (featuredTitle && id.id === featuredTitle!.id) {
      deleteDoc(doc(featureRef, "feature"));
      setDeleteError(false);
    }

    setDeleteForm("");
    setDeleteError(false);
    deleteDoc(doc(db, "titles", id.id));
    setDeleteItem(undefined);
  };

  const setFeaturedDB = (item: Data<DocumentData>) => {
    setFeaturedTitle(item);
    setDoc(doc(featureRef, "feature"), item);
  };

  const handleEditItem = (id: string, value: string) => {
    setEditItem((prev) => {
      return {
        ...prev,
        [id]: value,
      };
    });
  };

  const saveItem = () => {
    if (
      editItem.titleSwedish &&
      editItem.imgUrl &&
      editItem.category &&
      editItem.descriptionSV &&
      editItem.category
    ) {
      if (featuredTitle && editItem!.id === featuredTitle!.id) {
        setDoc(doc(featureRef, "feature"), editItem);
      }
      setDoc(doc(titleRef, editItem!.id), editItem);
      setEditItem(defaultTitle);
    } else {
      alert("Empty fields");
    }
  };

  const thumbnails = snapshot?.map((title, i) => {
    return (
      <div key={i} className="cardContainer">
        <img src={title.imgUrl} className="mainContent" alt="thumbnail" />
        <div>
          <Button
            className="buttons"
            variant="outlined"
            onClick={() => setEditItem(title as unknown as ITitle)}
          >
            Edit
          </Button>
          <Button
            className="buttons"
            variant="outlined"
            color="warning"
            onClick={() => setDeleteItem(title)}
          >
            Delete
          </Button>
        </div>
      </div>
    );
  });

  const removeFeature = (item: Data<DocumentData>) => {
    if (featuredTitle && item.id === featuredTitle!.id) {
      deleteDoc(doc(featureRef, "feature"));
      setFeaturedTitle(undefined);
    }
  };

  return (
    <div className="adminCardContainer">
      <Fab className="addButton" href="/admin/add" color="primary">
        add
      </Fab>

      {thumbnails}

      {/* EDIT FORM */}
      {editItem ? (
        <Dialog
          open={editItem === defaultTitle ? false : true}
          onClose={() => setEditItem(defaultTitle)}
        >
          <DialogTitle>Edit {editItem.titleSwedish}</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              id="name"
              label={"Title Swedish"}
              fullWidth
              variant="outlined"
              value={editItem.titleSwedish}
              onChange={(e) => handleEditItem("titleSwedish", e.target.value)}
            />
            <TextField
              margin="dense"
              id="name"
              label={"Title English"}
              fullWidth
              variant="outlined"
              value={editItem.titleEnglish}
              onChange={(e) => handleEditItem("titleEnglish", e.target.value)}
            />
            <TextField
              margin="dense"
              id="name"
              label={"Image URL"}
              fullWidth
              variant="outlined"
              value={editItem.imgUrl}
              onChange={(e) => handleEditItem("imgUrl", e.target.value)}
            />
            <TextField
              margin="dense"
              id="name"
              label={"Video URL"}
              fullWidth
              variant="outlined"
              value={editItem.videoUrl}
              onChange={(e) => handleEditItem("videoUrl", e.target.value)}
            />
            <TextField
              margin="dense"
              id="name"
              label={"imDb id"}
              fullWidth
              multiline
              variant="outlined"
              value={editItem.imDbId}
              onChange={(e) => handleEditItem("imDbId", e.target.value)}
            />
            <TextField
              margin="dense"
              id="name"
              label={"Genre"}
              fullWidth
              variant="outlined"
              value={editItem.category}
              onChange={(e) => handleEditItem("category", e.target.value)}
            />
            <TextField
              margin="dense"
              id="name"
              label={"Description Swedish"}
              fullWidth
              multiline
              variant="outlined"
              value={editItem.descriptionSV}
              onChange={(e) => handleEditItem("descriptionSV", e.target.value)}
            />
            <TextField
              margin="dense"
              id="name"
              label={"Description English"}
              fullWidth
              multiline
              variant="outlined"
              value={editItem.descriptionEN}
              onChange={(e) => handleEditItem("descriptionEN", e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            {featuredTitle?.titleSwedish === editItem.titleSwedish ? (
              <Button
                onClick={() =>
                  removeFeature(editItem as unknown as Data<DocumentData>)
                }
                color="warning"
              >
                {"Remove feature"}
              </Button>
            ) : (
              <Button
                onClick={() =>
                  setFeaturedDB(editItem as unknown as Data<DocumentData>)
                }
              >
                {"Set feature"}
              </Button>
            )}
            <Button onClick={() => setEditItem(defaultTitle)}>Cancel</Button>
            <Button variant="outlined" onClick={saveItem}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      ) : null}

      {/* DELETE FORM */}
      {deleteItem ? (
        <Dialog
          open={deleteItem ? true : false}
          onClose={() => {
            setDeleteItem(undefined);
            setDeleteForm("");
          }}
        >
          <DialogTitle>Delete {deleteItem.titleSwedish}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete{" "}
              <strong>{deleteItem.titleSwedish}</strong>?
              <br />
              This action can't be un-done.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              type="email"
              fullWidth
              error={deleteError}
              helperText={deleteError ? "Input does not match title" : null}
              placeholder="Type title to confirm delete"
              variant="standard"
              value={deleteForm}
              onChange={(e) => setDeleteForm(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteItem(undefined)}>Cancel</Button>
            <Button
              color="warning"
              variant="contained"
              onClick={() => deleteTitle(deleteItem)}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      ) : null}
    </div>
  );
};
