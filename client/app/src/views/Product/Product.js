import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import * as action from 'actions/producer.actions';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import storage from 'config/storage';

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
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';

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

export default function Product() {
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
  const initProduct = {
    id: '',
    imageUrl: '',
    name: '',
    type: '',
    origin: '',
    description: ''
  };
  const [product, setProduct] = React.useState(initProduct);
  useEffect(() => {
    dispatch(action.getAllProduct());
    dispatch(action.getAllFarmer());
  }, [dispatch]);
  const columns = [
    { id: 'name', label: 'Name' },
    { id: 'origin', label: 'Origin' }
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

    setProduct({
      id: row.id,
      imageUrl: row.imageUrl,
      name: row.name,
      type: row.type,
      origin: row.origin,
      description: row.description
    });
    setOpen(true);
  };
  /**
   * close dialog when user click button close
   * clear input data
   **/
  const handleClose = () => {
    setPreview('');
    setProduct(initProduct);
    setOpen(false);
    setDetailDialog(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct({ ...product, [name]: value });
  };

  //create a product
  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    product.imageUrl = preview;

    setProduct(product);
    await dispatch(action.createProduct(product));
    setLoading(false);
    handleClose();
  };
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    product.imageUrl = preview !== '' ? preview : product.imageUrl;
    console.log(product);

    setProduct(product);
    await dispatch(action.editProduct(product.id, product));
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

    await dispatch(action.deleteProduct(id));
    setLoading(false);
    setDeleteAlert(false);
  };
  const showDetail = async (e, row) => {
    e.stopPropagation();
    setPreview('');
    setProduct(row);
    setDetailDialog(true);
  };
  const fileChangedHandler = (e) => {
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
      {/*Product Table*/}
      <Card>
        <CardHeader color='success'>
          <CardIcon color='info' onClick={() => handleCreateOpen()}>
            <Icon>add_circle</Icon>
          </CardIcon>
          <h4 className={classes.cardTitleWhite}>Product List</h4>
        </CardHeader>
        <CardBody>
          <Table
            tableHeaderColor='info'
            columns={columns}
            tableData={producer.productList ? producer.productList : []}
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
          {dialog === 'create' ? 'Create Product' : 'Edit Product'}
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
                    src={preview !== '' ? preview : product.imageUrl}
                    style={{
                      width: '130px',
                      height: '130px'
                    }}
                  />
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
              value={product.name}
              onChange={handleChange}
              name='name'
            />
            <TextField
              margin='dense'
              id='type'
              label='Type'
              type='type'
              fullWidth
              value={product.type}
              onChange={handleChange}
              name='type'
            />

            <TextField
              margin='dense'
              id='origin'
              label='Origin'
              type='text'
              fullWidth
              value={product.origin}
              onChange={handleChange}
              name='origin'
            />
            <TextField
              id='standard-multiline-static'
              label='Description'
              multiline
              rows={12}
              fullWidth
              value={product.description}
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
        scroll='body'
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color='inherit' />
        </Backdrop>
        <DialogTitle id='responsive-dialog-title'>Product detail</DialogTitle>
        <DialogContent>
          <Avatar
            src={preview !== '' ? preview : product.imageUrl}
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
                    <ImageIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary='Name' secondary={product.name} />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <WorkIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary='Type' secondary={product.type} />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <WorkIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary='Origin' secondary={product.origin} />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <WorkIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary='Description' secondary={product.description} />
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
