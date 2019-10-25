import React, { Component } from 'react';
import { withFirebase } from './components/Firebase';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ChangeHistoryIcon from '@material-ui/icons/ChangeHistory';

import { Sunburst } from 'react-vis';
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table'


const data = {
  "title": "analytics",
  "color": "#12939A",
  "children": [
    {
      "title": "cluster",
      "children": [
        { "title": "AgglomerativeCluster", "color": "#12939A", "size": 3938 },
        { "title": "CommunityStructure", "color": "#12939A", "size": 3812 },
        { "title": "HierarchicalCluster", "color": "#12939A", "size": 6714 },
        { "title": "MergeEdge", "color": "#12939A", "size": 743 }
      ]
    },
    {
      "title": "graph",
      "children": [
        { "title": "BetweennessCentrality", "color": "#12939A", "size": 3534 },
        { "title": "LinkDistance", "color": "#12939A", "size": 5731 },
        { "title": "MaxFlowMinCut", "color": "#12939A", "size": 7840 },
        { "title": "ShortestPaths", "color": "#12939A", "size": 5914 },
        { "title": "SpanningTree", "color": "#12939A", "size": 3416 }
      ]
    },
    {
      "title": "optimization",
      "children": [
        { "title": "AspectRatioBanker", "color": "#12939A", "size": 7074 }
      ]
    }
  ]
}

const useStyles = makeStyles(theme => ({
  root: {
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
    <React.Fragment>
      <Box my={4}>
        <div style={{ maxWidth: '100%' }}>
          <MaterialTable
            columns={[
              { title: 'Temp', field: 'temperature', type: 'numeric' },
              { title: 'RH', field: 'humidity', type: 'numeric' },
              { title: 'Pressure', field: 'pressure', type: 'numeric' },
              { title: 'Light', field: 'ambient_light', type: 'numeric' },
              { title: 'UID', field: 'uid' },
            ]}
            data={readings}
            title="Elemental Confuzorb"
          />
          {console.log(readings)}
        </div>

      </Box>
      <Box my={4}>
        <Sunburst
          hideRootNode
          colorType="literal"
          data={data}
          height={300}
          width={350} />

      </Box>

    </React.Fragment>

  )
}

export default withFirebase(Readings);