import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { withFirebase } from './components/Firebase';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ChangeHistoryIcon from '@material-ui/icons/ChangeHistory';



const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

class Readings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      readings: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.unsubscribe = this.props.firebase
      .readings()
      .onSnapshot(snapshot => {
        let readings = [];
        snapshot.forEach(doc =>
          readings.push({ ...doc.data(), uid: doc.id }),
        );
        this.setState({
          readings,
          loading: false,
        });
      });
  }


  componentWillUnmount() {
    this.props.firebase.readings().off();
  }

  render() {
    const { readings, loading } = this.state;

    return (
      <div>
        {loading && <div>Loading ...</div>}
        <ReadingList readings={readings} />
      </div>
    );
  }
}

const ReadingList = ({ readings }) => {
  const classes = useStyles();
  return (
    <List className={classes.root}>
      {readings.map(reading => (
        <ListItem key={reading.uid}>
          <ListItemAvatar>
            <Avatar>
              <ChangeHistoryIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="ID:" secondary={reading.uid} />
        </ListItem>
      ))}
    </List>
  )
}

export default withFirebase(Readings);