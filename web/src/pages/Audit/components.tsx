import { IconButton, Menu as MUIMenu, MenuItem } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { History } from "history";
import Cookies from "js-cookie";
import React from "react";
import { Grid, Link, Typography, View } from "../../components";
import { theme } from "../../theme";
import { routes } from "../routes";

export const Container = ({ children }: { children: JSX.Element | JSX.Element[] }) => (
  <Grid container item spacing={0}>
    {children}
  </Grid>
);

export const ActionContainer = ({ children }: { children: JSX.Element | JSX.Element[] }) => (
  <Grid item sm={5} md={5} lg={6} style={{ backgroundColor: theme.palette.primary.main }}>
    <View
      width="100%"
      height="100vh"
      py={2}
      px={6}
      style={{ paddingTop: (theme.mixins.toolbar.minHeight as number) * 2.3, overflow: "scroll" }}
    >
      {children}
    </View>
  </Grid>
);

export const InstructionsContainer = ({
  children,
  scoreComponent,
}: {
  children: JSX.Element | JSX.Element[];
  scoreComponent: JSX.Element | JSX.Element[];
}) => (
  <Grid
    item
    sm={7}
    md={7}
    lg={6}
    style={{ backgroundColor: theme.palette.grey[100], position: "relative" }}
  >
    <View
      p={4}
      alignItems="center"
      display="flex"
      flexDirection="column"
      position="relative"
      style={{ paddingTop: (theme.mixins.toolbar.minHeight as number) * 2.3 }}
    >
      {children}
    </View>
    {scoreComponent}
  </Grid>
);

export const InstructionsTemplate = ({ backgroundImage }: { backgroundImage: string }) => (
  <View
    mt={3}
    style={{
      backgroundImage,
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain",
      height: "55vh",
      width: "100%",
    }}
  />
);

export const Instructions = () => (
  <View width="100%">
    <Typography variant="subtitle2" color="primary">
      Digita los números del espacio señalado.
    </Typography>
    <Typography variant="subtitle2" color="error">
      Deja vacíos los campos ilegibles.
    </Typography>
    <Typography variant="subtitle2" color="error">
      Digita "0" en los campos vacíos.
    </Typography>
  </View>
);

export const LoadMoreButtonView = ({ children }: { children: any }) => (
  <View textAlign="center" mt={2}>
    {children}
  </View>
);

export const Menu = ({ history }: { history: History }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    try {
      Cookies.remove("token");
      Cookies.remove("userID");
      history.push(routes.root);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <MUIMenu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 48 * 4.5,
            width: 200,
          },
        }}
      >
        <MenuItem onClick={handleClose} disableGutters>
          <Link
            to={routes.root}
            style={{ paddingLeft: 16, paddingRight: 16, display: "block", width: "100%" }}
          >
            Inicio
          </Link>
        </MenuItem>
        <MenuItem onClick={handleLogout}>Salir</MenuItem>
      </MUIMenu>
    </>
  );
};
