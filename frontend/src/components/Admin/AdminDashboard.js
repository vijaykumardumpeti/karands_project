import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { Avatar } from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import PaymentIcon from "@mui/icons-material/Payment";
import RequestPageIcon from "@mui/icons-material/RequestPage";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import SubjectIcon from "@mui/icons-material/Subject";
import DomainVerificationIcon from "@mui/icons-material/DomainVerification";
import MessageIcon from "@mui/icons-material/Message";
import ArticleIcon from "@mui/icons-material/Article";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import NoteAddRoundedIcon from "@mui/icons-material/NoteAddRounded";
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

function AdminDashboard(props) {
  const navigate = useNavigate();

  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenu = () => {
    localStorage.clear();

    navigate("/adminlogin");
  };

  const openAcceptedTasks = () => {
    navigate("/task");
  };
  const openDeclinedTasks = () => {
    navigate("/declntask");
  };
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      sx={{ marginTop: 6 }}
    >
      <MenuItem onClick={handleMenuClose}>View profile</MenuItem>
      <MenuItem onClick={handleMenu}>Logout</MenuItem>
    </Menu>
  );
  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {/* <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem> */}
      {/* <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="error">

                    </Badge>
                </IconButton>
                <p>Post Feed</p>
            </MenuItem>
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="error">

                    </Badge>
                </IconButton>
                <p>Job Post</p>
            </MenuItem> */}
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
          {/* <Avatar/> */}
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const dashboard = () => {
    navigate("/dashboard/admin");
  };

  const Notification = () => {};
  const postfeed = () => {
    navigate("/listofpostfeed");
  };
  const accountAdmin = () => {
    navigate("/admin/account");
  };
  const openTeam = () => {
    navigate("/admin/team");
  };

  const jobposts = () => {
    navigate("/listofpostjobs");
  };

  const MyNetwork = () => {
    navigate("/mynetwork");
  };

  const openuserlist = () => {
    navigate("/admin/userlist");
  };

  // const Messagebox = () => {
  //   alert('check  your inbox')
  // }

  const logout = () => {
    navigate("/signup");
  };
  const opendocument = () => {
    navigate("/admin/documents");
  };
  const openpayment = () => {
    navigate("/admin/payments");
  };
  const opencomplaint = () => {
    navigate("/admin/complaints");
  };

  const openrequest = () => {
    navigate("/admin/requests");
  };

  const openIU = () => {
    navigate("/listofiu");
  };
  const openICHP = () => {
    navigate("/listofichp");
  };

  const settingsopen = () => {
    navigate("/admin/settings");
  };

  const opentemplate = () => {
    navigate("/admin/template");
  };

  const opencompanypage = () => {
    navigate("/admin/companylist");
  };

  const openserach = () => {
    navigate("/admin/search");
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ backgroundColor: "red" }}>
        <Toolbar sx={{ backgroundColor: "red" }}>
          <IconButton
            title="Menubar"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>

          <Search sx={{ backgroundColor: "white" }}>
            <SearchIconWrapper sx={{ color: "black" }}>
              <SearchIcon />
            </SearchIconWrapper>

            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              sx={{ color: "black" }}
            />
          </Search>

          {/* <button
                        type="button"
                        className="btn btn-light"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal0"
                        style={{ marginLeft: 100 }}

                    >
                        Post Feed
                    </button> */}

          <div
            className="modal fade"
            id="exampleModal0"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5
                    className="modal-title text-primary"
                    id="exampleModalLabel"
                  >
                    Post Feed
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label
                        for="recipient-name"
                        className="col-form-label text-dark d-flex text-start"
                      >
                        Title of the post
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="recipient-name"
                        placeholder="Title"
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        for="message-text"
                        className="col-form-label text-dark d-flex text-start"
                      >
                        Write Something Cool!!
                      </label>
                      <textarea
                        className="form-control"
                        id="message-text"
                        placeholder="write Something"
                      ></textarea>
                    </div>

                    <div className="btn btn-primary btn-rounded mt-3 ">
                      <label
                        className="form-label text-white "
                        htmlFor="customFile1"
                      >
                        Choose file
                      </label>
                      <input
                        type="file"
                        className="form-control d-none"
                        id="customFile1"
                      />
                    </div>
                  </form>
                </div>
                <div
                  className="modal-footer"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                    //onClick={btnClick1}
                  >
                    To whom do you want to Share
                  </button>
                  <button type="button" className="btn btn-primary">
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* <button
                        type="button"
                        class="btn btn-light ms-4"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal1"

                    >
                        Post Job
                    </button> */}

          <div
            class="modal fade"
            id="exampleModal1"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-lg modal-dialog-scrollable">
              <div class="modal-content">
                <div class="modal-header">
                  <h1
                    class="modal-title text-primary fs-5"
                    id="exampleModalLabel"
                  >
                    Post the Job
                  </h1>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <h5 className="text-dark">Title/Description</h5>
                  <div class="mb-3 row">
                    <label
                      for="staticIndustry"
                      class="col-md-3 col-form-label text-dark"
                    >
                      Industry
                    </label>
                    <div class="col-sm-9">
                      <input
                        type="text"
                        readonly
                        class="form-control"
                        id="staticIndustry"
                        value=""
                      />
                    </div>
                  </div>
                  <div class="mb-3 row">
                    <label
                      for="functionalArea"
                      class="col-sm-3 col-form-label text-dark"
                    >
                      Functional Area
                    </label>
                    <div class="col-sm-9">
                      <input
                        type="text"
                        class="form-control"
                        id="functionalArea"
                      />
                    </div>
                  </div>
                  <div class="mb-3 row">
                    <label
                      for="inputLocation"
                      class="col-sm-3 col-form-label text-dark"
                    >
                      Location
                    </label>
                    <div class="col-sm-9">
                      <input
                        type="text"
                        class="form-control"
                        id="inputLocation"
                      />
                    </div>
                  </div>
                  <div class="mb-3 row">
                    <label
                      for="inputSkills"
                      class="col-sm-3 col-form-label text-dark"
                    >
                      Skills
                    </label>
                    <div class="col-sm-9">
                      <input
                        type="text"
                        class="form-control"
                        id="inputSkills"
                      />
                    </div>
                  </div>
                  <div class="mb-3 row">
                    <label
                      for="employmentType"
                      class="col-sm-3 col-form-label text-dark"
                    >
                      Employemnt Type
                    </label>
                    <div class="col-sm-9">
                      <input
                        type="text"
                        class="form-control"
                        id="employmentType"
                      />
                    </div>
                  </div>
                  <hr />
                  <h5 className="text-dark">Job Description & Requirements</h5>

                  <div class="mb-3 row">
                    <div class="col-sm ">
                      <textarea
                        class="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        placeholder="Enter Roles and Responsibilities"
                      ></textarea>
                    </div>
                  </div>
                  <div class="mb-3 row">
                    <div class="col-sm ">
                      <textarea
                        class="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        placeholder=" Enter Desired Candidate Profile"
                      ></textarea>
                    </div>
                  </div>

                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox1"
                      value="option1"
                    />
                    <label
                      class="form-check-label text-dark"
                      for="inlineCheckbox1"
                    >
                      WFH
                    </label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox2"
                      value="option2"
                    />
                    <label
                      class="form-check-label text-dark"
                      for="inlineCheckbox2"
                    >
                      WFO
                    </label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox3"
                      value="option3"
                    />
                    <label
                      class="form-check-label text-dark"
                      for="inlineCheckbox3"
                    >
                      Remote
                    </label>
                  </div>
                  <div class="mb-3 row">
                    <label
                      for="numberOfvacancy"
                      class="col-sm-3 col-form-label text-dark"
                    >
                      Number of Vacancies
                    </label>
                    <div class="col-sm-9 text-dark">
                      <input
                        type="text"
                        class="form-control  text-dark"
                        id="numberofvacancy"
                      />
                    </div>
                  </div>
                  <div class="mb-3 row">
                    <label
                      for="inputSalary"
                      class="col-sm-3 col-form-label text-dark"
                    >
                      Salary
                    </label>
                    <div class="col-sm-9">
                      <div class="row">
                        <div class="col-md-2">
                          <div class="ui-select">
                            <select id="symbol" class="form-control text-dark">
                              <option value=""></option>
                              <option value="">Rupee</option>
                              <option value="">Dollar</option>
                              <option value="">Euro</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-md-5">
                          <div class="ui-select">
                            <select id="lakhs" class="form-control text-dark">
                              <option value="">Lakhs</option>
                              <option value="">1+</option>
                              <option value="">2+</option>
                              <option value="">3+</option>
                              <option value="">4+</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-md-5">
                          <div class="ui-select">
                            <select
                              id="thousands"
                              class="form-control text-dark"
                            >
                              <option value="">Thousands</option>
                              <option value="">1+</option>
                              <option value="">2+</option>
                              <option value="">3+</option>
                              <option value="">4+</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="mb-3 row">
                    <label
                      for="workExperience"
                      class="col-sm-3 col-form-label text-dark"
                    >
                      Work Experience
                    </label>
                    <div class="col-sm-9">
                      <div class="row">
                        <div class="col-md-4">
                          <div class="ui-select">
                            <select id="years" class="form-control">
                              <option value="">Years</option>
                              <option value="">1+</option>
                              <option value="">2+</option>
                              <option value="">3+</option>
                              <option value="">4+</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="ui-select">
                            <select id="months" class="form-control text-dark">
                              <option value="">Months</option>
                              <option value="">1+</option>
                              <option value="">2+</option>
                              <option value="">3+</option>
                              <option value="">4+</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="mb-3 row">
                    <label
                      for="educationalQualification"
                      class="col-sm-3 col-form-label text-dark"
                    >
                      Educational Qualifications
                    </label>
                    <div class="col-sm-9">
                      <input
                        type="text"
                        class="form-control"
                        id="educationalQualification"
                      />
                    </div>
                  </div>
                  <div class="mb-3 row">
                    <label
                      for="companyDetails"
                      class="col-sm-3 col-form-label text-dark"
                    >
                      Company Name
                    </label>
                    <div class="col-sm-4">
                      <input
                        type="text"
                        class="form-control"
                        id="companyDetails"
                        placeholder="Type company name"
                      />
                    </div>
                    <div class="col-sm-4">
                      <button
                        class="btn btn-primary"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseExample"
                        aria-expanded="false"
                        aria-controls="collapseExample"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                  <div class="collapse" id="collapseExample">
                    <div class="card card-body text-dark ">
                      Some placeholder content for the collapse component. This
                      panel is hidden by default but revealed when the user
                      activates the relevant trigger.
                    </div>
                  </div>
                  <hr />
                  <h5 className="text-dark">Recruiter Details</h5>
                  <div className="text-dark">
                    <div class="mb-3 row">
                      <label for="inputName" class="col-sm-3 col-form-label">
                        Name
                      </label>
                      <div class="col-sm-9">
                        <input
                          type="text"
                          class="form-control"
                          id="inputName"
                        />
                      </div>
                    </div>
                    <div class="mb-3 row">
                      <label for="inputEmail" class="col-sm-3 col-form-label">
                        Email
                      </label>
                      <div class="col-sm-9">
                        <input
                          type="text"
                          class="form-control"
                          id="inputEmail"
                        />
                      </div>
                    </div>
                    <div class="mb-3 row">
                      <label
                        for="contactDetails"
                        class="col-sm-3 col-form-label"
                      >
                        Contact Details
                      </label>
                      <div class="col-sm-9">
                        <input
                          type="text"
                          class="form-control"
                          id="contactDetails"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    {/* <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
                    <button type="button" class="btn btn-primary">
                      Post Job
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <Button variant="text" sx={{ backgroundColor: 'white', color: 'black', marginLeft: 10 }} onClick=''>Job Post</Button> */}

          {/* <IconButton
            size="large"

          >
            <AccountCircleIcon sx={{ fontSize: 30, color: 'black' ,marginLeft : 140}} />
          </IconButton> */}

          <Box sx={{ flexGrow: 1 }} />
          {/* <Box>
          Post feed
          </Box>
          <Button></Button> */}
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {/* <IconButton size="large" aria-label="show new mails" color="inherit">
              <Badge badgeContent={0} color="error">
                <MailIcon onClick={Messagebox} />
              </Badge>
            </IconButton> */}
            {/* <IconButton size="large" aria-label="show new mails" color="inherit">
                            <Badge badgeContent={0} color="error">
                                <Button variant="text" sx={{ backgroundColor: 'white', }} onClick=''>Post Feed</Button>

                            </Badge>
                        </IconButton>
                        <IconButton size="large" aria-label="show new mails" color="inherit">
                            <Badge badgeContent={0} color="error">
                                <Button variant="text" sx={{ backgroundColor: 'white', }} onClick=''>Job Post</Button>

                            </Badge>
                        </IconButton> */}

            <IconButton
              title="Notification"
              size="large"
              aria-label="show  new notifications"
              color="inherit"
            >
              <Badge badgeContent={0} color="error">
                <NotificationsIcon onClick={Notification} />
              </Badge>
            </IconButton>
            <IconButton
              title="Profile and logout"
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              {/* <AccountCircle onClick={Account} /> */}
              <Avatar alt="User" src="/static/images/avatar/1.jpg" />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={dashboard}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                title="Dashboard"
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText
                primary="Dashboard"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={accountAdmin}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                title="User Profile/Account"
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Account" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>

          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => {
              navigate("/mytask");
            }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                title="My Task123"
                sx={{
                  minWidth: 30,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <DomainVerificationIcon />
              </ListItemIcon>

              <ListItemText primary="My Task" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ display: "block" }} onClick={openTeam}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                title="Team"
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <GroupsIcon />
              </ListItemIcon>
              <ListItemText primary="Team" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>

          {/* <ListItem disablePadding sx={{ display: 'block' }} onClick=''>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon  title="Messages"
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                <MessageIcon/>

                            </ListItemIcon>
                            <ListItemText primary='Messages' sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>
 */}

          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={opencompanypage}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                title="List of company pages"
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <ArticleIcon />
              </ListItemIcon>
              <ListItemText
                primary="List of company pages"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={openuserlist}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                title="List of Users"
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <GroupRoundedIcon />
              </ListItemIcon>
              <ListItemText
                primary="List of Users"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ display: "block" }} onClick={jobposts}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                title="list of job posts"
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <WorkRoundedIcon />
              </ListItemIcon>
              <ListItemText
                primary="List of Job Posts"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ display: "block" }} onClick={postfeed}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                title="Post Feeds"
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <DynamicFeedIcon />
              </ListItemIcon>
              <ListItemText
                primary="Post Feeds"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>

          {/* <ListItem disablePadding sx={{ display: 'block' }} onClick={openuser}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                <PersonIcon />

                            </ListItemIcon>
                            <ListItemText primary='Users' sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem> */}

          {/* 
                    <FormControl className='input' title="Users IU or ICHP" fullWidth style={{ border: 'none', outline: 'none' }}
                    >

                        <InputLabel sx={{ color: 'inherit' }} >
                            <ListItemIcon 
                                sx={{
                                    minWidth: 30,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',

                                }}
                            >
                                <PersonIcon />
                            </ListItemIcon>

                            Users
                        </InputLabel>
                        <Select sx={{ color: 'inherit' }}>
                            <MenuItem onClick={openIU}>IU Users</MenuItem>
                            <MenuItem onClick={openICHP}>ICHP Users</MenuItem>


                        </Select>
                    </FormControl> */}

          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={opendocument}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                title="Documents"
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <DocumentScannerIcon />
              </ListItemIcon>
              <ListItemText
                primary="Documents"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={openpayment}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                title="Payments"
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <PaymentIcon />
              </ListItemIcon>
              <ListItemText primary="Payments" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>

          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={opencomplaint}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                title="Reports"
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <DocumentScannerIcon />
              </ListItemIcon>
              <ListItemText primary="Reports" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>

          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={openrequest}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                title="Requests"
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <NoteAddRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Requests" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>

          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={settingsopen}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                title="Settings & Permissions"
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText
                primary="Settings & Permissions"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={opentemplate}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                title="Templates"
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <SubjectIcon />
              </ListItemIcon>
              <ListItemText
                primary="Templates"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>

          {/* search */}

          {/*                     
                    <ListItem disablePadding sx={{ display: 'block' }} onClick={openserach}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                <SearchIcon />

                            </ListItemIcon>
                            <ListItemText primary='Search' sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem> */}

          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={handleMenu}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                title="Log out"
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Log out" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
      </Box>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}

export default AdminDashboard;
