import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import * as action from 'actions/producer.actions';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'firebase/storage';
import firebase from 'config/firebase';
// core components

import Table from 'components/Table/Table.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import CardIcon from 'components/Card/CardIcon.js';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DialogTitle from '@material-ui/core/DialogTitle';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import PersonIcon from '@material-ui/icons/Person';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import DescriptionIcon from '@material-ui/icons/Description';
const useStyles = makeStyles((theme) => ({
  cardCategoryWhite: {
    '&,& a,& a:hover,& a:focus': {
      color: 'rgba(255,255,255,.62)',
      margin: '0',
      fontSize: '14px',
      marginTop: '0',
      marginBottom: '0'
    },
    '& a,& a:hover,& a:focus': {
      color: '#FFFFFF'
    }
  },
  cardTitleWhite: {
    'color': '#FFFFFF',
    'marginTop': '0px',
    'minHeight': 'auto',
    'fontWeight': '300',
    'fontFamily': "'Roboto', 'Helvetica', 'Arial', sans-serif",
    'marginBottom': '3px',
    'textDecoration': 'none',
    '& small': {
      color: '#777',
      fontSize: '65%',
      fontWeight: '400',
      lineHeight: '1'
    }
  },
  backdrop: {
    zIndex: 1,
    color: 'white'
  },
  input: {
    display: 'none'
  },
  appBar: {
    position: 'relative'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  },
  detail: {
    marginTop: '50px'
  },
  center: {
    textAlign: 'center'
  },
  wrap: {
    wordWrap: 'break-word'
  }
}));

export default function Farmer() {
  const storage = firebase.storage();
  const classes = useStyles();
  const dispatch = useDispatch();
  const producer = useSelector((state) => state.producer);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = React.useState(false);
  const [dialog, setDialog] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [deleteAlert, setDeleteAlert] = React.useState(false);
  const [id, setId] = React.useState('');
  const [detailDialog, setDetailDialog] = React.useState(false);
  // const [selectedFile, setSelectedFile] = React.useState(null);
  const [preview, setPreview] = React.useState(null);
  const initFarmer = {
    id: '',
    username: '',
    name: '',
    address: '',
    description: '',
    imageUrl: ''
  };
  const [farmer, setFarmer] = React.useState(initFarmer);
  useEffect(() => {
    dispatch(action.getAllFarmer());
  }, [dispatch]);
  const columns = [
    { id: 'name', label: 'Name' },
    { id: 'address', label: 'Address' }
  ];
  // open dialog when user click create button
  const handleCreateOpen = () => {
    setDialog('create');
    setOpen(true);
  };
  /*
    open dialog when user click edit button
    set data from row table to edit input
  */
  const handelEditOpen = (e, row) => {
    e.stopPropagation();
    setDialog('edit');
    setPreview('');

    setFarmer({
      id: row.id,
      name: row.name,
      address: row.address,
      description: row.description,
      imageUrl: row.imageUrl,
      username: row.username
    });
    setOpen(true);
  };
  /**
   * close dialog when user click button close
   * clear input data
   **/
  const handleClose = () => {
    setPreview('');
    setFarmer(initFarmer);
    setOpen(false);
    setDetailDialog(false);
  };
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setFarmer({ ...farmer, [name]: value });
  };

  //create a farmer
  const handleCreateSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    farmer.imageUrl = preview;
    setFarmer(farmer);

    await dispatch(action.createFarmer(farmer));
    setLoading(false);
    handleClose();
  };
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    farmer.imageUrl = preview !== '' ? preview : farmer.imageUrl;
    setFarmer(farmer);
    await dispatch(action.editFarmer(farmer.id, farmer));
    setLoading(false);
    handleClose();
  };
  const handleShowAlert = (e, row) => {
    e.stopPropagation();
    setDeleteAlert(true);
    setId(row.id);
  };

  const handleDelete = async () => {
    setLoading(true);

    await dispatch(action.deleteFarmer(id));
    setLoading(false);
    setDeleteAlert(false);
  };
  const showDetail = (e, row) => {
    e.stopPropagation();
    setFarmer({
      id: row.id,
      name: row.name,
      address: row.address,
      description: row.description,
      imageUrl: row.imageUrl
    });
    setDetailDialog(true);
  };
  const fileChangedHandler = async (e) => {
    setLoading(true);
    var file = e.target.files[0];
    var uploadTask = storage.ref('/farmers/' + file.name).put(file);
    uploadTask.on(
      'state_changed',
      (snapShot) => {
        //takes a snap shot of the process as it is happening
        console.log(snapShot);
      },
      (err) => {
        //catches the errors
        console.log(err);
      },
      () => {
        // gets the functions from storage refences the image storage in firebase by the children
        // gets the download url then sets the image from firebase as the value for the imgUrl key:
        storage
          .ref('farmers')
          .child(file.name)
          .getDownloadURL()
          .then((fireBaseUrl) => {
            setPreview(fireBaseUrl);
          });
      }
    );

    setLoading(false);
  };
  return (
    <div>
      <ToastContainer autoClose={2000} />
      {/*Farmer Table*/}
      <Card>
        <CardHeader color='success'>
          <CardIcon color='info' onClick={() => handleCreateOpen()}>
            <Icon>add_circle</Icon>
          </CardIcon>
          <h4 className={classes.cardTitleWhite}>Farmer List</h4>
        </CardHeader>
        <CardBody>
          <Table
            tableHeaderColor='info'
            columns={columns}
            tableData={producer.farmerList ? producer.farmerList : []}
            handelEdit={handelEditOpen}
            handelDelete={handleShowAlert}
            showDetail={showDetail}
          />
        </CardBody>
      </Card>

      {/*Create and Edit dialog*/}
      <Dialog
        fullScreen={fullScreen}
        open={open}
        scroll='paper'
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color='inherit' />
        </Backdrop>
        <DialogTitle id='responsive-dialog-title'>
          {dialog === 'create' ? 'Create Farmer' : 'Edit Farmer'}
        </DialogTitle>
        <DialogContent>
          <form>
            <div style={{ textAlign: 'center' }}>
              <input
                accept='image/*'
                className={classes.input}
                id='icon-button-file'
                type='file'
                onChange={fileChangedHandler}
              />

              <label htmlFor='icon-button-file'>
                <IconButton color='primary' aria-label='upload picture' component='span'>
                  <Avatar
                    src={preview !== '' ? preview : farmer.imageUrl}
                    style={{
                      width: '130px',
                      height: '130px'
                    }}
                  />
                </IconButton>
              </label>
            </div>
            {dialog === 'create' ? (
              <TextField
                autoFocus
                margin='dense'
                id='username'
                label='UserName'
                type='text'
                fullWidth
                value={farmer.username}
                onChange={handleChange}
                name='username'
              />
            ) : null}
            <TextField
              autoFocus
              margin='dense'
              id='name'
              label='Name'
              type='text'
              fullWidth
              value={farmer.name}
              onChange={handleChange}
              name='name'
            />
            <TextField
              margin='dense'
              id='address'
              label='Address'
              type='text'
              fullWidth
              value={farmer.address}
              onChange={handleChange}
              name='address'
            />

            <TextField
              id='standard-multiline-static'
              label='Description'
              multiline
              rows={12}
              fullWidth
              value={farmer.description}
              onChange={handleChange}
              name='description'
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color='secondary'>
            Cancel
          </Button>
          <Button
            onClick={dialog === 'create' ? handleCreateSubmit : handleEditSubmit}
            color='primary'
            autoFocus
          >
            {dialog === 'create' ? 'Create' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
      {/*Detail dialog*/}
      <Dialog
        fullWidth
        fullScreen={fullScreen}
        open={detailDialog}
        scroll='paper'
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color='inherit' />
        </Backdrop>
        <DialogTitle id='responsive-dialog-title'>Farmer detail</DialogTitle>
        <DialogContent>
          <Avatar
            src={farmer.imageUrl}
            style={{
              margin: 'auto',
              width: '130px',
              height: '130px'
            }}
          />
          <div className={classes.detail}>
            <List className={classes.wrap}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary='Name' secondary={farmer.name} />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <LocationOnIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary='Address' secondary={farmer.address} />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <DescriptionIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary='Description' secondary={farmer.description} />
              </ListItem>
            </List>
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color='primary'>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      {/**Delete Alert Dialog */}
      <Dialog
        open={deleteAlert}
        onClose={() => setDeleteAlert(false)}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color='inherit' />
        </Backdrop>
        <DialogTitle id='alert-dialog-title'>Warning</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Are you sure you want to delete this?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteAlert(false)} color='primary'>
            Disagree
          </Button>
          <Button onClick={handleDelete} color='secondary' autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
