import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import * as action from 'actions/farmer.actions';
import * as producerAction from 'actions/producer.actions';

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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import WorkIcon from '@material-ui/icons/Work';
import InputLabel from '@material-ui/core/InputLabel';
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

export default function Season() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const farmer = useSelector((state) => state.farmer);
  const producer = useSelector((state) => state.producer);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = React.useState(false);
  const [dialog, setDialog] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [deleteAlert, setDeleteAlert] = React.useState(false);
  const [id, setId] = React.useState('');
  const [detailDialog, setDetailDialog] = React.useState(false);
  const [product, setProduct] = React.useState('');
  const initSeason = {
    id: '',
    name: '',
    sowingDate: '',
    harvestDate: '',
    productId: ''
  };
  const [season, setSeason] = React.useState(initSeason);
  useEffect(() => {
    dispatch(action.getAllSeason());
    dispatch(producerAction.getAllProduct());
  }, [dispatch]);
  const columns = [
    { id: 'name', label: 'Name' },
    { id: 'productId', label: 'Product' }
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

    setSeason(row);
    setOpen(true);
  };
  /**
   * close dialog when user click button close
   * clear input data
   **/
  const handleClose = () => {
    setSeason(initSeason);
    setOpen(false);
    setDetailDialog(false);
    setProduct('');
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    setSeason({ ...season, [name]: value });
  };

  //create a season
  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    season.productId = product;
    setSeason(season);
    await dispatch(action.createSeason(season));
    setProduct('');
    setLoading(false);
    handleClose();
  };
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    season.productId = product;
    setSeason(season);
    await dispatch(action.editSeason(season.id, season));
    setProduct('');
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

    await dispatch(action.deleteSeason(id));
    setLoading(false);
    setDeleteAlert(false);
  };
  const showDetail = async (e, row) => {
    e.stopPropagation();
    setSeason(row);
    setDetailDialog(true);
  };
  const handleSelect = (event) => {
    setProduct(event.target.value);
  };

  return (
    <div>
      <ToastContainer autoClose={2000} />
      {/*Season Table*/}
      <Card>
        <CardHeader color='success'>
          <CardIcon color='info' onClick={() => handleCreateOpen()}>
            <Icon>add_circle</Icon>
          </CardIcon>
          <h4 className={classes.cardTitleWhite}>Season List</h4>
        </CardHeader>
        <CardBody>
          <Table
            tableHeaderColor='info'
            columns={columns}
            tableData={farmer.seasonList ? farmer.seasonList : []}
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
          {dialog === 'create' ? 'Create Season' : 'Edit Season'}
        </DialogTitle>
        <DialogContent>
          <form>
            <TextField
              autoFocus
              margin='dense'
              id='name'
              label='Name'
              type='text'
              fullWidth
              value={season.name}
              onChange={handleChange}
              name='name'
            />
            <InputLabel id='demo-simple-select-label'>Product</InputLabel>
            <Select
              fullWidth
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={product}
              onChange={handleSelect}
            >
              {producer.productList.map((value, index) => (
                <MenuItem key={index} value={value.id}>
                  {value.name}
                </MenuItem>
              ))}
            </Select>
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
