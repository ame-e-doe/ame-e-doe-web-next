import styles from "./styles.module.scss";
import Link from "next/link";
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Box from '@mui/material/Box';
import {useState} from 'react'; 
import Router from "next/router";


export default function Header() {

  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAccount = () => {
    Router.push('/userEdit');
    setAnchorEl(null);
  };

  const handleClose = () => {
    Router.push('#');
    setAnchorEl(null);
  };

  return (
    <div className={styles.header}>
      <h3>AME E DOE</h3>
      <div className={styles.botoesHeader}>
        <span>Olá, Fulano</span>
        <Box>
          {auth && (
            <div>
              <IconButton 
                onClick={handleMenu}
                color="inherit"
              >
              <AccountCircle sx={{ fontSize: 40}}/>
              </IconButton>
              <Menu 
                sx={{ mt: '35px'}}
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
              <MenuItem onClick={handleAccount}>Minha Conta</MenuItem>
              <MenuItem onClick={handleClose}>Sair</MenuItem>
              </Menu>
            </div>
          )}
        </Box>
      </div>
    </div>
  );
}
