import React, { useEffect } from 'react';
import 'firebase/storage';
import firebase from 'config/firebase';
import { useSelector, useDispatch } from 'react-redux';
import * as action from 'actions/producer.actions.js';
import * as authAction from 'actions/auth.actions';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
// core components
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Button from 'components/CustomButtons/Button.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import CardFooter from 'components/Card/CardFooter.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const useStyles = makeStyles((theme) => ({
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0',
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
  },
  backdrop: {
    zIndex: 1,
    color: 'white',
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '100%',
  },
  input: {
    marginTop: '16px',
  },
  avatar: {
    margin: '-50px auto 0',
    borderRadius: '50%',
    overflow: 'hidden',
    padding: '0',
    boxShadow:
      '0 16px 38px -12px rgba(0,0,0,.56), 0 4px 25px 0 rgba(0,0,0,.12), 0 8px 10px -5px rgba(0,0,0,.2)',
  },
}));

export default function UserProfile() {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [preview, setPreview] = React.useState('');
  const [edit, setEdit] = React.useState(false);
  const storage = firebase.storage();
  const initPassword = {
    oldPass: '',
    newPass: '',
    confirmPass: '',
  };
  const [password, setPassword] = React.useState(initPassword);
  const initFarmer = {
    name: '',
    address: '',
    description: '',
    imageUrl: '',
  };
  const dispatch = useDispatch();
  const [farmer, setFarmer] = React.useState(initFarmer);
  const [changePass, setChangePass] = React.useState(false);
  const producer = useSelector((state) => state.producer);
  useEffect(() => {
    var user = JSON.parse(localStorage.getItem('user'));
    dispatch(action.getFarmerByUsername(user.username));
  }, [dispatch]);
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setFarmer({ ...farmer, [name]: value });
  };
  const handlePassChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setPassword({ ...password, [name]: value });
  };
  const handelEditOpen = () => {
    setEdit(true);

    setFarmer(producer.farmer);
  };
  // Update Profile
  const handleCreateSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    farmer.id = producer.farmer ? producer.farmer.id : '';
    preview !== '' ? (farmer.imageUrl = preview) : (farmer.imageUrl = producer.farmer.imageUrl);
    setFarmer(farmer);

    await dispatch(action.editFarmer(farmer.id, farmer));
    await dispatch(action.getFarmerByUsername(farmer.username));
    cancle();
  };
  const cancle = () => {
    setLoading(false);
    setPreview('');
    setFarmer(initFarmer);
    setEdit(false);
  };
  const submitChangePass = async (e) => {
    e.preventDefault();

    setLoading(true);
    await dispatch(authAction.changePassword(password));
    cancleChangePass();
  };
  const cancleChangePass = () => {
    setLoading(false);
    setPassword(initPassword);
    setChangePass(false);
  };
  const fileChangedHandler = async (e) => {
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
  };
  return (
    <div>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color='inherit' />
      </Backdrop>
      <ToastContainer autoClose={2000} />
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <div style={{ textAlign: 'center' }}>
              <input
                style={{ display: 'none' }}
                accept='image/*'
                id='icon-button-file'
                type='file'
                onChange={fileChangedHandler}
              />

              <label htmlFor='icon-button-file'>
                <IconButton color='primary' aria-label='upload picture' component='span'>
                  <Avatar
                    className={classes.avatar}
                    src={preview !== '' ? preview : producer.farmer ? producer.farmer.imageUrl : ''}
                    style={{
                      width: '200px',
                      height: '200px',
                    }}
                  />
                </IconButton>
              </label>
            </div>
            <CardBody profile>
              <h4 className={classes.cardTitle}>{producer.farmer ? producer.farmer.name : ''}</h4>
              <p className={classes.cardCategory}>
                {producer.farmer ? producer.farmer.description : ''}
              </p>
            </CardBody>
            <CardFooter>
              <Button
                color='primary'
                onClick={() => setChangePass(true)}
                style={{ margin: 'auto' }}
              >
                Change Password
              </Button>
            </CardFooter>
          </Card>

          {changePass ? (
            <Card>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <TextField
                      label='Old Password'
                      id='oldPass'
                      name='oldPass'
                      fullWidth
                      type='password'
                      className={classes.input}
                      value={password.oldPass}
                      onChange={handlePassChange}
                      variant='outlined'
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <TextField
                      label='New Password'
                      id='newPass'
                      name='newPass'
                      fullWidth
                      type='password'
                      className={classes.input}
                      value={password.newPass}
                      onChange={handlePassChange}
                      variant='outlined'
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <TextField
                      label='Confirm New Password'
                      id='confirmPass'
                      name='confirmPass'
                      fullWidth
                      type='password'
                      className={classes.input}
                      value={password.confirmPass}
                      onChange={handlePassChange}
                      variant='outlined'
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button color='success' onClick={submitChangePass} style={{ margin: 'auto' }}>
                  Save
                </Button>
                <Button color='danger' onClick={cancleChangePass} style={{ margin: 'auto' }}>
                  Cancle
                </Button>
              </CardFooter>
            </Card>
          ) : (
            ''
          )}
        </GridItem>
        <GridItem xs={12} sm={12} md={8}>
          {edit ? (
            <Card>
              <CardHeader color='primary'>
                <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
                <p className={classes.cardCategoryWhite}>Complete your profile</p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <TextField
                      label='Name'
                      id='name'
                      name='name'
                      fullWidth
                      className={classes.input}
                      value={farmer.name}
                      onChange={handleChange}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <TextField
                      label='Address'
                      id='address'
                      name='address'
                      fullWidth
                      className={classes.input}
                      value={farmer.address}
                      onChange={handleChange}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <InputLabel style={{ color: '#AAAAAA' }} className={classes.input}>
                      About me
                    </InputLabel>

                    <TextField
                      id='about-me'
                      name='description'
                      fullWidth
                      className={classes.input}
                      multiline
                      rows={5}
                      value={farmer.description}
                      onChange={handleChange}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button color='primary' onClick={handleCreateSubmit}>
                  Update Profile
                </Button>
                <Button color='danger' onClick={cancle}>
                  Cancle
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card>
              <CardHeader color='success'>
                <h4 className={classes.cardTitleWhite}> Profile</h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <TextField
                      label='Name'
                      id='name'
                      name='name'
                      fullWidth
                      InputProps={{
                        readOnly: true,
                      }}
                      className={classes.input}
                      value={producer.farmer ? producer.farmer.name : ''}
                      variant='outlined'
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <TextField
                      label='Address'
                      id='address'
                      name='address'
                      fullWidth
                      InputProps={{
                        readOnly: true,
                      }}
                      className={classes.input}
                      value={producer.farmer ? producer.farmer.address : ''}
                      variant='outlined'
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <InputLabel style={{ color: '#AAAAAA' }} className={classes.input}>
                      About me
                    </InputLabel>

                    <TextField
                      id='about-me'
                      name='description'
                      fullWidth
                      className={classes.input}
                      multiline
                      InputProps={{
                        readOnly: true,
                      }}
                      rows={5}
                      value={producer.farmer ? producer.farmer.description : ''}
                      variant='outlined'
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button color='info' onClick={handelEditOpen}>
                  Edit Profile
                </Button>
              </CardFooter>
            </Card>
          )}
        </GridItem>
      </GridContainer>
    </div>
  );
}
