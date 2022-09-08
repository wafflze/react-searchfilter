import React from "react";

import Filter from "./components/Filter";
import {
  vehicleMakeFilterOption,
  colorFilterOption,
  gradeFilterOption,
  yesNoFilterOption,
  stateCodeFilterOption,
  acceptedExplanationsOption,
  historicalExplanationsOption,
} from "./data";

class App extends React.Component {
  constructor(props) {
    super(props);
    const filters = [
      vehicleMakeFilterOption,
      colorFilterOption,
      gradeFilterOption,
      yesNoFilterOption,
      stateCodeFilterOption,
      acceptedExplanationsOption,
      historicalExplanationsOption,
    ];

    this.state = {
      filters: filters,
    };
  }

  render() {
    return (
      <div className="App">
        <p>test</p>
        <Filter
          initialFilterOptions={this.state.filters}
          selectedFilters={[]}
          onFilterChange={() => {
            console.log("stuff happened");
          }}
        ></Filter>
      </div>
    );
  }
}

export default App;

// TODO: tests are broken
// TODO: re-apply all css -> theme

// TODO: adjust size of text area so its slimmer, rounded corners
// TODO: make text area free form text also
// TODO: correct size and shape of opening dropdown list (popover)