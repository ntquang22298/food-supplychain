import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
// core components

import Table from 'components/Table/Table.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import CardIcon from 'components/Card/CardIcon.js';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from 'react-redux';
import * as action from 'actions/producer.actions';
const styles = {
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
  }
};

const useStyles = makeStyles(styles);
export default function Farmer() {
  const classes = useStyles(styles);
  const dispatch = useDispatch();
  const producer = useSelector((state) => state.producer);
  useEffect(() => {
    dispatch(action.getAllFarmer());
  }, []);
  const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'address', label: 'Address', minWidth: 170 }
  ];
  return (
    <Card>
      <CardHeader color='success'>
        <CardIcon color='info' onClick={() => alert('Hello from here')}>
          <Icon>add_circle</Icon>
        </CardIcon>
        <h4 className={classes.cardTitleWhite}>Farmer List</h4>
      </CardHeader>
      <CardBody>
        <Table
          tableHeaderColor='info'
          columns={columns}
          tableData={producer.farmerList ? producer.farmerList : []}
        />
      </CardBody>
    </Card>
  );
}
