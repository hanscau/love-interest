import {
  Avatar,
  Box,
  Button,
  InputBase,
  MenuItem,
  Modal,
  Select,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import TextInput from "./TextInput";
import { Edit, Person, Phone } from "@mui/icons-material";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import User from "model/User";
import { getCurrentUser, login } from "features/user/userSlice";
import { API_URL } from "util/url";
import ParagraphInput from "./ParagraphInput";

const SelectInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: "16px",
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[1],
    fontSize: 16,
    padding: "12px 16px",
  },
}));

interface UpdateProfileProps {
  isOpen: boolean;
  closeLoginModal: () => void;
}

const UpdateProfile = ({ isOpen, closeLoginModal }: UpdateProfileProps) => {
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const currentUser = useAppSelector(getCurrentUser);

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState(0);
  const [phoneNo, setPhoneNo] = useState("");
  const [bio, setBio] = useState("");

  const onUpdate = () => {
    if (firstName == "" || lastName == "" || phoneNo == "" || !currentUser)
      return;

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("gender", gender.toString());
    formData.append("phoneNo", phoneNo);
    formData.append("bio", bio);
    profileImage &&
      formData.append("image", profileImage as Blob, profileImage?.name);

    axios
      .put(`${API_URL}/users/${currentUser.id}`, formData, {
        headers: { Authorization: `Bearer ${currentUser.jwt}` },
      })
      .then((res) => {
        console.log(res.data);
        dispatch(login({ jwt: currentUser.jwt, ...res.data }));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  };

  const onProfileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    console.log(file);
    setProfileImage(file);
  };

  const close = () => {
    closeLoginModal();
  };

  useEffect(() => {
    setFirstName(currentUser?.firstName || "");
    setLastName(currentUser?.lastName || "");
    setBio(currentUser?.bio || "");
    setPhoneNo(currentUser?.phoneNo || "");
    setGender(currentUser?.gender || 0);
  }, [currentUser]);

  return (
    <Modal open={isOpen} onClose={() => close()}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "#f8f8f8",
          p: "22px",
          borderRadius: "16px",
        }}
      >
        <Typography
          color={theme.palette.secondary.dark}
          fontWeight={700}
          fontSize={"20px"}
        >
          Update Profile
        </Typography>
        <Typography
          color={theme.palette.secondary.dark}
          fontSize={"12px"}
          mb={"22px"}
        >
          Stay updated to attract your next match
        </Typography>
        <Box display={"flex"} alignItems={"center"} gap={"12px"} mb={"22px"}>
          <label htmlFor="file-upload">
            <Box position={"relative"}>
              <Avatar
                src={
                  profileImage
                    ? URL.createObjectURL(profileImage)
                    : currentUser?.profileImageURL
                }
                sx={{ width: 80, height: 80 }}
              />
              <Box
                position={"absolute"}
                top={"0px"}
                left={"0px"}
                width={"100%"}
                height={"100%"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                sx={{
                  background: "rgba(255, 255, 255, 0)",
                  transition: "background 0.15s ease-in-out, opacity 0.15s",
                  opacity: 0,
                  cursor: "pointer",
                  "&:hover": {
                    background: "rgba(255, 255, 255, 0.4)",
                    opacity: 1,
                  },
                }}
              >
                <Edit sx={{ color: theme.palette.secondary.dark }} />
              </Box>
            </Box>
          </label>
          <input
            id="file-upload"
            type="file"
            name="profileImage"
            accept="image/*"
            hidden
            onChange={onProfileImage}
          />
          <Box
            flex={"1 1 auto"}
            display={"flex"}
            flexDirection={"column"}
            gap={"12px"}
          >
            <TextInput
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              InputIcon={
                <Person
                  sx={{ color: theme.palette.secondary.dark, mr: "12px" }}
                />
              }
            ></TextInput>
            <TextInput
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            ></TextInput>
          </Box>
        </Box>
        <Select
          sx={{ mb: "12px" }}
          value={gender}
          onChange={(e) => setGender(e.target.value as number)}
          input={<SelectInput />}
          fullWidth
        >
          <MenuItem value={0}>Male</MenuItem>
          <MenuItem value={1}>Female</MenuItem>
        </Select>
        <TextInput
          placeholder="Phone number"
          value={phoneNo}
          onChange={(e) => setPhoneNo(e.target.value)}
          sx={{ mb: "12px" }}
          InputIcon={
            <Phone sx={{ color: theme.palette.secondary.dark, mr: "12px" }} />
          }
        ></TextInput>
        <ParagraphInput
          placeholder="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          minRows={2}
          maxRows={5}
          sx={{ mb: "22px" }}
        ></ParagraphInput>

        <Box display={"flex"} justifyContent={"flex-end"} gap={"12px"}>
          <Button variant="outlined" size="large" onClick={() => close()}>
            Cancel
          </Button>
          <Button
            variant="contained"
            size="large"
            sx={{ background: theme.palette.primary.light }}
            onClick={() => onUpdate()}
          >
            Update
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default UpdateProfile;
