import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import * as action from 'actions/farmer.actions';
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
import DescriptionIcon from '@material-ui/icons/Description';
import BookIcon from '@material-ui/icons/Book';

const useStyles = makeStyles((theme) => ({
  cardCategoryWhite: {
    '&,& a,& a:hover,& a:focus': {
      color: 'rgba(255,255,255,.62)',
      margin: '0',
      fontSize: '14px',
      marginTop: '0',
      marginBottom: '0',
    },
    '& a,& a:hover,& a:focus': {
      color: '#FFFFFF',
    },
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
      lineHeight: '1',
    },
  },
  backdrop: {
    zIndex: 1,
    color: 'white',
  },
  input: {
    display: 'none',
  },
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  detail: {
    marginTop: '50px',
  },
  center: {
    textAlign: 'center',
  },
  wrap: {
    wordWrap: 'break-word',
  },
  avatar: {
    margin: '0 auto 0',
    overflow: 'hidden',
    padding: '0',
    boxShadow:
      '0 16px 38px -12px rgba(0,0,0,.56), 0 4px 25px 0 rgba(0,0,0,.12), 0 8px 10px -5px rgba(0,0,0,.2)',
  },
}));

export default function Certificate() {
  const storage = firebase.storage();
  const classes = useStyles();
  const dispatch = useDispatch();
  const farmer = useSelector((state) => state.farmer);
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
  const initCertificate = {
    id: '',
    name: '',
    description: '',
    imageUrl: '',
  };
  const [certificate, setCertificate] = React.useState(initCertificate);
  useEffect(() => {
    dispatch(action.getAllCertificate());
  }, [dispatch]);
  const columns = [{ id: 'name', label: 'Name' }];
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

    setCertificate({
      id: row.id,
      name: row.name,
      description: row.description,
      imageUrl: row.imageUrl,
    });
    setOpen(true);
  };
  /**
   * close dialog when user click button close
   * clear input data
   **/
  const handleClose = () => {
    setPreview('');
    setCertificate(initCertificate);
    setOpen(false);
    setDetailDialog(false);
  };
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setCertificate({ ...certificate, [name]: value });
  };

  //create a certificate
  const handleCreateSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    certificate.imageUrl = preview;
    setCertificate(certificate);

    await dispatch(action.createCertificate(certificate));
    setLoading(false);
    handleClose();
  };
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    certificate.imageUrl = preview !== '' ? preview : certificate.imageUrl;
    setCertificate(certificate);
    await dispatch(action.editCertificate(certificate.id, certificate));
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

    await dispatch(action.deleteCertificate(id));
    setLoading(false);
    setDeleteAlert(false);
  };
  const showDetail = (e, row) => {
    e.stopPropagation();
    setCertificate({
      id: row.id,
      name: row.name,
      description: row.description,
      imageUrl: row.imageUrl,
    });
    setDetailDialog(true);
  };
  const fileChangedHandler = async (e) => {
    setLoading(true);
    var file = e.target.files[0];
    var uploadTask = storage.ref('/certificates/' + file.name).put(file);
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
          .ref('certificates')
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
      {/*Certificate Table*/}
      <Card>
        <CardHeader color='success'>
          <CardIcon color='info' onClick={() => handleCreateOpen()}>
            <Icon>add_circle</Icon>
          </CardIcon>
          <h4 className={classes.cardTitleWhite}>Certificate List</h4>
        </CardHeader>
        <CardBody>
          <Table
            tableHeaderColor='info'
            columns={columns}
            tableData={farmer.certificateList ? farmer.certificateList : []}
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
          {dialog === 'create' ? 'Create Certificate' : 'Edit Certificate'}
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
                    className={classes.avatar}
                    variant='rounded'
                    src={preview !== '' ? preview : certificate.imageUrl}
                    style={{
                      width: '200px',
                      height: '200px',
                    }}
                  >
                    <BookIcon
                      style={{
                        width: '130px',
                        height: '130px',
                      }}
                    />
                  </Avatar>
                </IconButton>
              </label>
            </div>
            <TextField
              autoFocus
              margin='dense'
              id='name'
              label='Name'
              type='text'
              fullWidth
              value={certificate.name}
              onChange={handleChange}
              name='name'
            />
            <TextField
              id='standard-multiline-static'
              label='Description'
              multiline
              rows={12}
              fullWidth
              value={certificate.description}
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
        <DialogTitle id='responsive-dialog-title'>Certificate detail</DialogTitle>
        <DialogContent>
          <Avatar
            className={classes.avatar}
            variant='rounded'
            src={preview !== '' ? preview : certificate.imageUrl}
            style={{
              margin: 'auto',
              width: '200px',
              height: '200px',
            }}
          >
            <BookIcon
              style={{
                width: '130px',
                height: '130px',
              }}
            />
          </Avatar>
          <div className={classes.detail}>
            <List className={classes.wrap}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary='Name' secondary={certificate.name} />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <DescriptionIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary='Description' secondary={certificate.description} />
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
