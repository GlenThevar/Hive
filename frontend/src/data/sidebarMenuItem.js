import PeopleIcon from "@mui/icons-material/People";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HomeIcon from "@mui/icons-material/Home";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import ChatIcon from "@mui/icons-material/Chat";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import ExploreIcon from "@mui/icons-material/Explore";
import Person2Icon from "@mui/icons-material/Person2";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";

export const menuItems = [
  {
    label: "Home",
    icon: HomeOutlinedIcon,
    filledIcon: HomeIcon,
    path: "/",
  },
  {
    label: "People",
    icon: PeopleOutlineOutlinedIcon,
    filledIcon: PeopleIcon,
    path: "/people",
  },
  {
    label: "Saved",
    icon: BookmarkAddOutlinedIcon,
    filledIcon: BookmarkAddIcon,
    path: "/saved",
  },
  {
    label: "Chat",
    icon: ChatOutlinedIcon,
    filledIcon: ChatIcon,
    path: "/chat",
  },
  {
    label: "Explore",
    icon: ExploreOutlinedIcon,
    filledIcon: ExploreIcon,
    path: "/explore",
  },
  {
    label: "Profile",
    icon: Person2OutlinedIcon,
    filledIcon: Person2Icon,
    path: "/profile",
  },
];
