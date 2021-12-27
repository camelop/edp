import React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { blue, red, yellow, purple } from '@mui/material/colors';
import { FixedSizeList } from 'react-window';

import { getTargets } from './data';
import './style.css';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function Target(target) {
  return (
    <ListItem component="a" disablePadding key={target}>
      <ListItemButton
        onClick={() => {
          console.log('clicked ' + target);
        }}
      >
        <ListItemText primary={target} />
      </ListItemButton>
    </ListItem>
  );
}
class TargetList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { targets: [] };
    getTargets().then((targets) => {
      this.setState({ targets: targets });
    });
  }
  render() {
    return (
      <div>
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          <nav aria-label="secondary mailbox folders">
            <List>
              <ListItem key={'refresh'} disablePadding>
                <ListItemButton
                  onClick={() => {
                    getTargets()
                      .then((targets) => {
                        this.setState({ targets: targets });
                      });
                  }}
                >
                  <ListItemText primary="Refresh" />
                </ListItemButton>
              </ListItem>
            </List>
          </nav>
          <Divider />
          <Box
            sx={{
              width: '100%',
              bgcolor: 'background.paper',
            }}
          >
            <List
              sx={{
                minHeight: '85vh',
              }}
            >
              {this.state.targets.map(Target)}
            </List>
          </Box>
        </Box>
      </div>
    );
  }
}

function Nav() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            EDP
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default function App() {
  return (
    <div>
      {Nav()}
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: blue[50],
          minHeight: 'calc(93vh)',
        }}
      >
        <Grid container>
          <Grid item xs={2}>
            <TargetList />
          </Grid>
          <Grid item xs={6}>
            <Item>xs=6</Item>
          </Grid>
          <Grid item xs={4}>
            <Item>xs=3</Item>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
