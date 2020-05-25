import React, { useEffect } from 'react';
import 'firebase/storage';
import firebase from 'config/firebase';
import { useSelector, useDispatch } from 'react-redux';
import * as action from 'actions/producer.actions.js';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';

// core components
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import CustomInput from 'components/CustomInput/CustomInput.js';
import Button from 'components/CustomButtons/Button.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import CardFooter from 'components/Card/CardFooter.js';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';

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
  }
}));

export default function UserProfile() {
  const classes = useStyles();

  const [preview, setPreview] = React.useState('');
  const storage = firebase.storage();

  const dispatch = useDispatch();
  const producer = useSelector((state) => state.producer);
  useEffect(() => {
    const user = localStorage.getItem('user').username;
    dispatch(action.getFarmer(user));
  }, [dispatch]);
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
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color='primary'>
              <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
              <p className={classes.cardCategoryWhite}>Complete your profile</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText='Name'
                    id='name'
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText='Address'
                    id='address'
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <InputLabel style={{ color: '#AAAAAA' }}>About me</InputLabel>
                  <CustomInput
                    id='about-me'
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 5
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color='primary'>Update Profile</Button>
            </CardFooter>
          </Card>
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
                    src={preview !== '' ? preview : ''}
                    style={{
                      width: '130px',
                      height: '130px'
                    }}
                  />
                </IconButton>
              </label>
            </div>
            <CardBody profile>
              <h4 className={classes.cardTitle}>Alec Thompson</h4>
              <h6 className={classes.cardCategory}>{console.log(producer)}</h6>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
