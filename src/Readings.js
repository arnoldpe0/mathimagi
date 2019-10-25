import React, { Component } from "react";
import { withFirebase } from "./components/Firebase";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import { Sunburst } from "react-vis";
import CircularProgress from "@material-ui/core/CircularProgress";
import LinearProgress from "@material-ui/core/LinearProgress";

import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));

class Readings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      readings: []
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.unsubscribe = this.props.firebase.readings().onSnapshot(snapshot => {
      let readings = [];
      snapshot.forEach(doc => readings.push({ ...doc.data(), uid: doc.id }));
      this.setState({
        readings,
        loading: false
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
        {loading ? (
          <Container maxWidth="sm">
            <Box my={4}>
              <LinearProgress />
            </Box>
          </Container>
        ) : (
          <React.Fragment>
            <ReadingVis readings={readings} />
            <ReadingList readings={readings} />
          </React.Fragment>
        )}
      </div>
    );
  }
}

const ReadingVis = ({ readings }) => {
  const classes = useStyles();
  const data = {
    title: "analytics",
    color: "#12939A",
    children: [
      {
        title: "cluster",
        children: [
          { title: "AgglomerativeCluster", color: "#12939A", size: 3938 },
          { title: "CommunityStructure", color: "#12939A", size: 3812 },
          { title: "HierarchicalCluster", color: "#12939A", size: 6714 },
          { title: "MergeEdge", color: "#12939A", size: 743 }
        ]
      },
      {
        title: "graph",
        children: [
          { title: "BetweennessCentrality", color: "#12939A", size: 3534 },
          { title: "LinkDistance", color: "#12939A", size: 5731 },
          { title: "MaxFlowMinCut", color: "#12939A", size: 7840 },
          { title: "ShortestPaths", color: "#12939A", size: 5914 },
          { title: "SpanningTree", color: "#12939A", size: 3416 }
        ]
      },
      {
        title: "optimization",
        children: [{ title: "AspectRatioBanker", color: "#12939A", size: 7074 }]
      }
    ]
  };
  return (
    <React.Fragment>
      <Sunburst
        hideRootNode
        colorType="literal"
        data={data}
        height={350}
        width={350}
      />
    </React.Fragment>
  );
};

const ReadingList = ({ readings }) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <div style={{ maxWidth: "100%" }}>
        <MaterialTable
          columns={[
            { title: "Temp", field: "temperature", type: "numeric" },
            { title: "RH", field: "humidity", type: "numeric" },
            { title: "Pressure", field: "pressure", type: "numeric" },
            { title: "Light", field: "ambient_light", type: "numeric" },
            { title: "UID", field: "uid" }
          ]}
          data={readings}
          options={{
            exportButton: true
          }}
          title="Elem Confuzorb"
        />
      </div>
    </React.Fragment>
  );
};

export default withFirebase(Readings);
