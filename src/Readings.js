import React, { Component } from "react";
import { withFirebase } from "./components/Firebase";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import {
  FlexibleWidthXYPlot,
  VerticalGridLines,
  HorizontalGridLines,
  LineMarkSeries,
  DiscreteColorLegend
} from "react-vis";

import LinearProgress from "@material-ui/core/LinearProgress";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

import theme from "./theme";

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
      snapshot.forEach(doc =>
        readings.push({
          ...doc.data(),
          ts: formatDistanceToNow(doc.data().ts.toDate()).concat(" ago"),
          ti: doc.data().ts.toDate(),
          uid: doc.id
        })
      );
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

  const temperature = readings.reduce((total, reading) => {
    total.push({ x: reading.ti, y: reading.temperature });
    return total;
  }, []);

  const humidity = readings.reduce((total, reading) => {
    total.push({ x: reading.ti, y: reading.humidity });
    return total;
  }, []);

  const ambient_light = readings.reduce((total, reading) => {
    total.push({ x: reading.ti, y: reading.ambient_light });
    return total;
  }, []);

  const pressure = readings.reduce((total, reading) => {
    total.push({ x: reading.ti, y: reading.pressure });
    return total;
  }, []);

  const ITEMS = ["Temperature", "Humidity", "Ambient Light", "Pressure"];

  return (
    <React.Fragment>
      <FlexibleWidthXYPlot height={300}>
        <LineMarkSeries data={temperature} opacity={0.25} />
        <LineMarkSeries data={humidity} opacity={0.25} />
        <LineMarkSeries data={ambient_light} opacity={0.25} />
        <LineMarkSeries data={pressure} opacity={0.25} />
        <HorizontalGridLines />
        <VerticalGridLines />
      </FlexibleWidthXYPlot>
      <DiscreteColorLegend
        width={"100%"}
        orientation="horizontal"
        items={ITEMS}
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
            { title: "Timestamp", field: "ts" },
            { title: "Temp", field: "temperature", type: "numeric" },
            { title: "RH", field: "humidity", type: "numeric" },
            { title: "Pressure", field: "pressure", type: "numeric" },
            { title: "Light", field: "ambient_light", type: "numeric" },
            { title: "Sensor", field: "sensor" },
            { title: "UID", field: "uid" }
          ]}
          data={readings}
          options={{
            exportButton: true
          }}
          title="Sensor Readings"
        />
      </div>
    </React.Fragment>
  );
};

export default withFirebase(Readings);
