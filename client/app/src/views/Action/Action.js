import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import * as actions from 'actions/farmer.actions';
import firebase from 'config/firebase';
import 'firebase/storage';
import { QRCode } from 'react-qrcode-logo';
import logo from 'assets/img/logo.png';

//components
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ClassIcon from '@material-ui/icons/Class';
import DescriptionIcon from '@material-ui/icons/Description';
import StarIcon from '@material-ui/icons/Star';
import CardIcon from 'components/Card/CardIcon.js';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import DialogTitle from '@material-ui/core/DialogTitle';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { Avatar } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

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
  wrap: {
    wordWrap: 'break-word'
  },
  img: {
    maxWidth: '100%',
    maxHeight: 'auto',
    borderRadius: '5px'
  }
}));
export default function Action({ match }) {
  const storage = firebase.storage();
  const classes = useStyles();
  const dispatch = useDispatch();
  const producer = useSelector((state) => state.producer);
  const farmer = useSelector((state) => state.farmer);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = React.useState(false);
  const [dialog, setDialog] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [preview, setPreview] = React.useState('');

  const initAction = {
    id: '',
    imgUrl: '',
    action: '',
    time: '',
    description: '',
    seasonId: match.params.id
  };
  const [action, setAction] = React.useState(initAction);

  useEffect(() => {
    dispatch(actions.getSeason(match.params.id));
  }, [dispatch, match.params.id]);

  const handleCreateOpen = () => {
    setDialog('create');
    setOpen(true);
  };
  /*
    open dialog when user click edit button
    set data from row table to edit input
  */
  // const handelEditOpen = (e, row) => {
  //   e.stopPropagation();
  //   setDialog('edit');
  //   setPreview('');

  //   setAction({
  //     id: row.id,
  //     name: row.name,
  //     address: row.address,
  //     description: row.description,
  //     imgUrl: row.imgUrl
  //   });
  //   setOpen(true);
  // };
  /**
   * close dialog when user click button close
   * clear input data
   **/
  const handleClose = () => {
    setPreview('');
    setAction(initAction);
    setOpen(false);
    // setDetailDialog(false);
  };
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setAction({ ...action, [name]: value });
  };

  //create a action
  const handleCreateSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    action.imgUrl = preview;
    setAction(action);

    await dispatch(actions.createAction(action));
    setLoading(false);
    handleClose();
  };
  // const handleEditSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   action.imgUrl = preview !== '' ? preview : action.imgUrl;
  //   setAction(action);
  //   await dispatch(action.editAction(action.id, action));
  //   setLoading(false);
  //   handleClose();
  // };
  // const handleShowAlert = (e, row) => {
  //   e.stopPropagation();
  //   setDeleteAlert(true);
  //   setId(row.id);
  // };

  // const handleDelete = async () => {
  //   setLoading(true);

  //   await dispatch(action.deleteAction(id));
  //   setLoading(false);
  //   setDeleteAlert(false);
  // };
  // const showDetail = (e, row) => {
  //   e.stopPropagation();
  //   setAction({
  //     id: row.id,
  //     name: row.name,
  //     address: row.address,
  //     description: row.description,
  //     imgUrl: row.imgUrl
  //   });
  //   setDetailDialog(true);
  // };
  const fileChangedHandler = async (e) => {
    setLoading(true);
    var file = e.target.files[0];
    var uploadTask = storage.ref('/actions/' + file.name).put(file);
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
          .ref('actions')
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
      <Card>
        <CardHeader color='success'>
          <CardIcon color='info' onClick={() => handleCreateOpen()}>
            <Icon>add_circle</Icon>
          </CardIcon>
          <h4 className={classes.cardTitleWhite}>Season</h4>
        </CardHeader>
        <CardBody>
          <Grid container className={classes.root}>
            <Grid item md={6} style={{ textAlign: 'center', verticalAlign: 'center' }}>
              <img
                className={classes.img}
                src={producer.product ? producer.product.imageUrl : ''}
                alt='Product'
              />
            </Grid>

            <Grid item md={6}>
              <Typography variant='h4' style={{ textAlign: 'center' }}>
                {producer.product ? producer.product.name : ''}
              </Typography>
              <div style={{ textAlign: 'left', padding: '20px' }}>
                <div className={classes.detail}>
                  <List className={classes.wrap}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <ClassIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary='Type'
                        secondary={producer.product ? producer.product.type : ''}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <LocationOnIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary='Origin'
                        secondary={producer.product ? producer.product.origin : ''}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <DescriptionIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary='Description'
                        secondary={producer.product ? producer.product.description : ''}
                      />
                    </ListItem>
                    <ListItem>
                      <QRCode
                        value={process.env.REACT_APP_API_FRONTEND + '/info/' + match.params.id}
                        logoImage={logo}
                      />
                    </ListItem>
                  </List>
                </div>
              </div>
            </Grid>
          </Grid>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <VerticalTimeline>
            {farmer.actionList.map((action) => (
              <VerticalTimelineElement
                key={action.id}
                className='vertical-timeline-element--work'
                date={action.time}
                iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                icon={<StarIcon />}
              >
                <Typography variant='h6' className='vertical-timeline-element-title'>
                  {action.action}
                </Typography>
                <Avatar
                  style={{ width: '150px', height: '150px' }}
                  src={action.imgUrl}
                  alt='action'
                />
                <Typography>{action.description}</Typography>
              </VerticalTimelineElement>
            ))}

            <VerticalTimelineElement
              iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
              icon={<StarIcon />}
            />
          </VerticalTimeline>
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
          {dialog === 'create' ? 'Create Action' : 'Edit Action'}
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
                    src={preview !== '' ? preview : action.imgUrl}
                    style={{
                      width: '200px',
                      height: '200px'
                    }}
                    alt='action'
                  />
                </IconButton>
              </label>
            </div>
            <TextField
              autoFocus
              margin='dense'
              id='action'
              label='Action'
              type='text'
              fullWidth
              value={action.action}
              onChange={handleChange}
              name='action'
            />
            <TextField
              margin='dense'
              id='time'
              label='Time'
              type='text'
              fullWidth
              value={action.time}
              onChange={handleChange}
              name='time'
            />

            <TextField
              id='standard-multiline-static'
              label='Description'
              multiline
              rows={12}
              fullWidth
              value={action.description}
              onChange={handleChange}
              name='description'
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color='secondary'>
            Cancel
          </Button>
          <Button onClick={dialog === 'create' ? handleCreateSubmit : ''} color='primary' autoFocus>
            {dialog === 'create' ? 'Create' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
