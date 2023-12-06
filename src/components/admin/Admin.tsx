import { AdminTitles } from "./AdminTitles";
import { AdminMessages } from "./AdminMessages";
import { SyntheticEvent, useState } from "react";
import { Badge, Box, Tab, TextField, Button } from "@mui/material";
import { collection, getFirestore } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  onAuthStateChanged,
  User,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { firebaseApp } from "../../firebase";
import { auth } from "../../firebase";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import "../../styles/admin.scss";

interface IUserInfo {
  email: string;
  password: string;
}

const defaultUserInfo: IUserInfo = {
  email: "",
  password: "",
};

export const Admin = () => {
  const [messages] = useCollectionData(
    collection(getFirestore(firebaseApp), "messages")
  );
  const [value, setValue] = useState("1");
  const [loginInfo, setLoginInfo] = useState<IUserInfo>(defaultUserInfo);
  const [user, setUser] = useState<User | null>();

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const login = async () => {
    try {
      await signInWithEmailAndPassword(
        auth,
        loginInfo.email,
        loginInfo.password
      );
    } catch (error) {
      alert(error);
    }

    setLoginInfo(defaultUserInfo);
  };

  const handleForm = (id: string, value: string) => {
    setLoginInfo((prev) => {
      return {
        ...prev,
        [id]: value,
      };
    });
  };

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className="adminContainer">
      {!user ? (
        <div className="loginForm">
          <TextField
            autoFocus
            fullWidth
            margin="dense"
            variant="outlined"
            value={loginInfo?.email}
            placeholder="email"
            onChange={(e) => handleForm("email", e.target.value)}
          />

          <TextField
            fullWidth
            margin="dense"
            type={"password"}
            variant="outlined"
            value={loginInfo?.password}
            placeholder="password"
            onChange={(e) => handleForm("password", e.target.value)}
          />

          <Button className="loginButton" variant="contained" onClick={login}>
            Log In
          </Button>
        </div>
      ) : (
        <div className="tabContainer">
          <Box sx={{ width: "100%" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Badge
                  badgeContent={messages?.length}
                  color="primary"
                  className="badge"
                >
                  <TabList onChange={handleChange}>
                    <Tab label="Thumbnails" value="1" />
                    <Tab label="Messages" value="2" />
                  </TabList>
                </Badge>
              </Box>
              <TabPanel value="1">
                <AdminTitles />
              </TabPanel>
              <TabPanel value="2">
                <AdminMessages />
              </TabPanel>
            </TabContext>
          </Box>
        </div>
      )}
    </div>
  );
};
