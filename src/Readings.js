import React, { Component } from "react";
import { withFirebase } from "./components/Firebase";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";

const useStyles = makeStyles(theme => ({
  root: {}
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
          title="Elem Confuzorb"
        />
        {console.log(readings)}
      </div>
    </React.Fragment>
  );
};

export default withFirebase(Readings);
