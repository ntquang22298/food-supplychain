import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import * as actions from 'actions/farmer.actions';

//components
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import WorkIcon from '@material-ui/icons/Work';
import StarIcon from '@material-ui/icons/Star';
import { Avatar } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ClassIcon from '@material-ui/icons/Class';
import DescriptionIcon from '@material-ui/icons/Description';
import CertificateIcon from '@material-ui/icons/Book';

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
    maxHeight: 'auto'
  }
}));
export default function QrScan({ match }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const producer = useSelector((state) => state.producer);
  const farmer = useSelector((state) => state.farmer);

  useEffect(() => {
    dispatch(actions.getSeason(match.params.id));
  }, [dispatch, match.params.id]);

  return (
    <div>
      <Card>
        <CardHeader color='success'>
          <h4 className={classes.cardTitleWhite}>Season</h4>
        </CardHeader>
        <CardBody>
          <Grid container className={classes.root}>
            <Grid item md={6} style={{ textAlign: 'center' }}>
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
                      <ListItemAvatar>
                        <Avatar>
                          <CertificateIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary='Certificate'
                        secondary={producer.product ? producer.product.description : ''}
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
            {farmer.actionList.reverse().map((action) => (
              <VerticalTimelineElement
                key={action.id}
                className='vertical-timeline-element--work'
                date={action.time}
                iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                icon={<WorkIcon />}
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
    </div>
  );
}
