import styles from "./styles.module.scss";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Box from "@mui/material/Box";
import { useState, useContext } from "react";
import Router from "next/router";
import { AuthContext, signOut } from "../../contexts/auth-context";
import { toast } from "react-toastify";
import Link from "next/link";

export default function Header() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user } = useContext(AuthContext);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const myAccount = () => {
    Router.push("/userEdit");
    setAnchorEl(null);
  };

  const exit = () => {
    toast.success("deslogado com sucesso");
    signOut();
    Router.push("/login");
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={styles.header}>
      <h3> <Link href="/"> AME E DOE </Link> </h3>
      <div className={styles.botoesHeader}>
        <Box>
          {user && (
            <div>
              <span>Olá {user?.firstName}</span>
              <IconButton onClick={handleMenu} color="inherit">
                <AccountCircle sx={{ fontSize: 40 }} />
              </IconButton>
              <Menu
                sx={{ mt: "35px" }}
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={myAccount}>Minha Conta</MenuItem>
                <MenuItem onClick={exit}>Sair</MenuItem>
              </Menu>
            </div>
          )}
        </Box>
      </div>
    </div>
  );
}
