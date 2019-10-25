import React, { Component } from "react";
import { withFirebase } from "./components/Firebase";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import { FlexibleWidthXYPlot, AreaSeries } from "react-vis";
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
  return (
    <React.Fragment>
      <FlexibleWidthXYPlot height={300}>
        <AreaSeries
          data={[
            {
              x: 0,
              y: 10
            },
            {
              x: 1,
              y: 9.464003854239804
            },
            {
              x: 2,
              y: 9.556874264206387
            },
            {
              x: 3,
              y: 9.685420527942647
            },
            {
              x: 4,
              y: 8.81101582368537
            },
            {
              x: 5,
              y: 8.73439714372729
            },
            {
              x: 6,
              y: 8.331636933349461
            },
            {
              x: 7,
              y: 8.550384970776733
            },
            {
              x: 8,
              y: 8.544844027516255
            },
            {
              x: 9,
              y: 8.746499841721958
            },
            {
              x: 10,
              y: 8.336413464099648
            },
            {
              x: 11,
              y: 9.029200972059467
            },
            {
              x: 12,
              y: 9.17179012533619
            },
            {
              x: 13,
              y: 9.751937084768477
            },
            {
              x: 14,
              y: 9.729036405995043
            },
            {
              x: 15,
              y: 9.208834409738449
            },
            {
              x: 16,
              y: 8.979135798862062
            },
            {
              x: 17,
              y: 8.685092734471823
            },
            {
              x: 18,
              y: 8.259960613145388
            },
            {
              x: 19,
              y: 8.927882705310507
            },
            {
              x: 20,
              y: 8.885108718936607
            }
          ]}
          opacity={0.25}
          style={{}}
        />
        <AreaSeries
          data={[
            {
              x: 0,
              y: 10
            },
            {
              x: 1,
              y: 9.89230373163582
            },
            {
              x: 2,
              y: 10.008850775682621
            },
            {
              x: 3,
              y: 10.569550699514474
            },
            {
              x: 4,
              y: 10.43767140719915
            },
            {
              x: 5,
              y: 11.040473858753048
            },
            {
              x: 6,
              y: 11.801498284844646
            },
            {
              x: 7,
              y: 12.044804339279926
            },
            {
              x: 8,
              y: 11.662267110885688
            },
            {
              x: 9,
              y: 11.731540433945682
            },
            {
              x: 10,
              y: 11.168330050878957
            },
            {
              x: 11,
              y: 11.706041548645656
            },
            {
              x: 12,
              y: 11.565807726853615
            },
            {
              x: 13,
              y: 11.86931219413815
            },
            {
              x: 14,
              y: 12.410070790650941
            },
            {
              x: 15,
              y: 12.540914859759495
            },
            {
              x: 16,
              y: 12.039641584130129
            },
            {
              x: 17,
              y: 12.765527221260513
            },
            {
              x: 18,
              y: 12.452096476567544
            },
            {
              x: 19,
              y: 12.10202978996214
            },
            {
              x: 20,
              y: 11.260833251452594
            }
          ]}
          opacity={0.25}
          style={{}}
        />
        <AreaSeries
          data={[
            {
              x: 0,
              y: 10
            },
            {
              x: 1,
              y: 10.404259673176014
            },
            {
              x: 2,
              y: 9.93385522694327
            },
            {
              x: 3,
              y: 9.24580955315357
            },
            {
              x: 4,
              y: 9.59175061405817
            },
            {
              x: 5,
              y: 8.864270116413653
            },
            {
              x: 6,
              y: 9.315940912421297
            },
            {
              x: 7,
              y: 9.198846614782978
            },
            {
              x: 8,
              y: 9.29532070352352
            },
            {
              x: 9,
              y: 8.594491916565824
            },
            {
              x: 10,
              y: 8.616497322607922
            },
            {
              x: 11,
              y: 9.113089575066322
            },
            {
              x: 12,
              y: 9.086601377253706
            },
            {
              x: 13,
              y: 8.485334301100579
            },
            {
              x: 14,
              y: 8.03173959786481
            },
            {
              x: 15,
              y: 7.718134065229613
            },
            {
              x: 16,
              y: 7.79587340996752
            },
            {
              x: 17,
              y: 7.506535186324938
            },
            {
              x: 18,
              y: 7.932386285622097
            },
            {
              x: 19,
              y: 8.590760691787704
            },
            {
              x: 20,
              y: 7.921381073140963
            }
          ]}
          opacity={0.25}
          style={{}}
        />
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
