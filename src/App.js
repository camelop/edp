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
import { FixedSizeList } from 'react-window';
import Divider from '@mui/material/Divider';
import { blue, red, yellow, purple } from '@mui/material/colors';

import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

import { Document, Page } from 'react-pdf';

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

function renderTargetListRow(targets, props) {
  const { index, style } = props;

  return (
    <ListItem style={style} key={index} component="a" component="div" disablePadding >
      <ListItemButton onClick={() => {
        console.log('clicked ' + targets[index]);
      }}>
        <ListItemText primary={targets[index]} />
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
        <Box sx={{
          height: '70vh',
          width: '100%',
          maxWidth: 360,
          bgcolor: 'background.paper'
        }}>
          <List sx={{ height: '10vh' }}>
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
          <Divider />
          <Box
            sx={{
              width: '100%',
              bgcolor: 'background.paper',
            }}
          >
            <Box
              sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.paper' }}
            >
              <FixedSizeList
                height={400}  // later: https://npmjs.com/package/react-virtualized-auto-sizer
                width={'100%'}
                itemSize={40}
                itemCount={this.state.targets.length}
                overscanCount={5}
              >
                {(props) => renderTargetListRow(this.state.targets, props)}
              </FixedSizeList>
            </Box>
          </Box>
        </Box>
      </div>
    );
  }
}

class DocumentView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      target: "http://localhost:3001/static/pdf/example-pdf.pdf",
      numPages: null,
      pageNumber: 3,
      width: 100
    };
  }

  componentDidMount() {
    console.log("width+", this.container.offsetWidth)
    this.setState({
        width: this.container.offsetWidth,
    });
  }

  render() {
    if (this.state.target) {
      // console.log("load " + this.state.target);
      return (
        <Container 
        sx={{
          width: '100%',
          minHeight: '80vh',
          backgroundColor: 'primary.dark',
          padding: 0
        }}
        ref={el => (this.container = el)}
        >
          <div>
            <Document
              file={this.state.target}
              onLoadSuccess={({numPages}) => {
                this.setState({ numPages: numPages });
              }}
            >
              <Page width={this.state.width - 50} pageNumber={this.state.pageNumber} />
            </Document>
          </div>
        </Container>
      );
    } else {
      return (
        <Container sx={{
          bgcolor: red[50],
          textAlign: 'center',
          minHeight: '80vh',
        }}>
          Please select a target first.
        </Container>
      );
    }
  }
}

function Nav() {
  return (
    <Box sx={{ flexGrow: 1, height: '10vh' }}>
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
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: blue[50],
          height: 'calc(95vh)',
        }}
      >
        {Nav()}
        <Grid container>
          <Grid item xs={2}>
            <TargetList />
          </Grid>
          <Grid item xs={6}>
            <DocumentView />
          </Grid>
          <Grid item xs={4}>
            <Item>xs=3</Item>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
