import React, { useEffect } from 'react';
import 'firebase/storage';
import firebase from 'config/firebase';
import { useSelector, useDispatch } from 'react-redux';
import * as action from 'actions/producer.actions.js';
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

const useStyles = makeStyles((theme) => ({
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0'
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none'
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  margin: {
    margin: theme.spacing(1)
  },
  withoutLabel: {
    marginTop: theme.spacing(3)
  },
  textField: {
    width: '100%'
  },
  input: {
    marginTop: '16px'
  }
}));

export default function UserProfile() {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [preview, setPreview] = React.useState('');
  const [edit, setEdit] = React.useState(false);
  const storage = firebase.storage();
  const initFarmer = {
    name: '',
    address: '',
    description: '',
    imageUrl: ''
  };
  const dispatch = useDispatch();
  const [farmer, setFarmer] = React.useState(initFarmer);
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
  const handelEditOpen = () => {
    setEdit(true);

    setFarmer(producer.farmer);
  };
  const handleCreateSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    farmer.id = producer.farmer ? producer.farmer.id : '';
    farmer.imageUrl = preview;
    setFarmer(farmer);

    await dispatch(action.editFarmer(farmer));
    setLoading(false);
    setPreview('');
    setFarmer(initFarmer);
    setEdit(false);
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
      <GridContainer>
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color='inherit' />
        </Backdrop>
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
                        readOnly: true
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
                        readOnly: true
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
                        readOnly: true
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
                    src={preview !== '' ? preview : producer.farmer ? producer.farmer.imageUrl : ''}
                    style={{
                      width: '130px',
                      height: '130px'
                    }}
                  />
                </IconButton>
              </label>
            </div>
            <CardBody profile>
              <h4 className={classes.cardTitle}>{producer.farmer ? producer.farmer.name : ''}</h4>
              <h6 className={classes.cardCategory}>
                {producer.farmer ? producer.farmer.description : ''}
              </h6>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
