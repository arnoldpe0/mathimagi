import React, { Component, useState, useEffect } from "react";
import { withFirebase } from "./components/Firebase";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import {
  FlexibleWidthXYPlot,
  VerticalGridLines,
  HorizontalGridLines,
  LineMarkSeries,
  DiscreteColorLegend,
  Hint
} from "react-vis";

import LinearProgress from "@material-ui/core/LinearProgress";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { curveCatmullRom } from "d3-shape";

import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

import theme from "./theme";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));

const Readings = props => {
  const classes = useStyles();

  const [readings, setReadings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = React.useState(false);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = props.firebase.readings().onSnapshot(
      snapshot => {
        let readings = [];
        setLoading(false);
        snapshot.forEach(doc => {
          console.log(readings);
          doc.data().created &&
            readings.push({
              ...doc.data(),
              id: doc.id,
              date: formatDistanceToNow(doc.data().created.toDate()),
              created: doc.data().created.toMillis()
            });
        });
        setReadings(readings);
        setLoading(false);
      },
      err => {
        setError(err);
      }
    );
    return () => unsubscribe();
  }, []);

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
};

const ReadingVis = ({ readings }) => {
  const classes = useStyles();

  const [value, setValue] = useState(null);

  const temperature = readings.reduce((total, reading) => {
    total.push({ x: reading.created, y: reading.temperature });
    return total;
  }, []);

  const humidity = readings.reduce((total, reading) => {
    total.push({ x: reading.created, y: reading.humidity });
    return total;
  }, []);

  const ambient_light = readings.reduce((total, reading) => {
    total.push({ x: reading.created, y: reading.ambient_light });
    return total;
  }, []);

  const pressure = readings.reduce((total, reading) => {
    total.push({ x: reading.created, y: reading.pressure });
    return total;
  }, []);

  const forgetValue = () => {
    setValue({
      value: null
    });
  };

  const rememberValue = value => {
    setValue({ value });
  };

  return (
    <React.Fragment>
      <FlexibleWidthXYPlot disableInteractiveElementBlocking height={300}>
        <LineMarkSeries
          data={temperature}
          curve={curveCatmullRom.alpha(0.5)}
          opacity={0.25}
          onValueMouseOver={rememberValue}
          onValueMouseOut={forgetValue}
        />
        <LineMarkSeries
          data={humidity}
          curve={curveCatmullRom.alpha(0.5)}
          opacity={0.25}
        />
        <LineMarkSeries
          data={ambient_light}
          curve={curveCatmullRom.alpha(0.5)}
          opacity={0.25}
        />
        <LineMarkSeries
          data={pressure}
          curve={curveCatmullRom.alpha(0.5)}
          opacity={0.25}
        />
        <HorizontalGridLines />
        <VerticalGridLines />
        {value ? <Hint value={value} /> : null}
      </FlexibleWidthXYPlot>
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
            { title: "Time since", field: "date" },
            { title: "Temp", field: "temperature", type: "numeric" },
            { title: "RH", field: "humidity", type: "numeric" },
            { title: "Pressure", field: "pressure", type: "numeric" },
            { title: "Light", field: "ambient_light", type: "numeric" },
            { title: "Sensor", field: "sensor" },
            { title: "Time Stamp", field: "created" },
            { title: "ID", field: "id" }
          ]}
          data={readings}
          options={{
            exportButton: true,
            draggable: false
          }}
          title="Sensor Readings"
        />
      </div>
    </React.Fragment>
  );
};

export default withFirebase(Readings);
