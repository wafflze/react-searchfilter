import React from "react";
// import {withStyles} from "@material-ui/core/styles";
// import { withStyles } from "tss-react/mui";
// import { createTheme } from "@mui/material/styles";
import List from "@mui/material/List"; //'@material-ui/core/List';
import ListItem from "@mui/material/ListItem"; //'@material-ui/core/ListItem';
import ListItemText from "@mui/material/ListItemText"; //'@material-ui/core/ListItemText';
import Popover from "@mui/material/Popover"; //'@material-ui/core/Popover';
import { IconButton } from "@mui/material"; //'@material-ui/core/IconButton';
// import { ClearIcon } from "@mui/material"; //'@material-ui/icons/Clear';
import BackspaceIcon from "@mui/icons-material/Backspace";
import FilterItem from "./FilterItem";
import _ from "lodash";

// TODO: put back the themeing

// export const styles = () =>
//   createTheme({
//     emptyInput: {
//       marginLeft: 5,
//       marginRight: 3,
//       all: "initial",
//       "*": {
//         all: "unset",
//       },
//       lineHeight: "35px",
//     },
//   });

export class Filter extends React.Component {
  state = {
    showFilterOptions: false,
    showOperationOptions: false,
    showOperationValues: false,
    filterOptions: [],
    selectedFilters: [],
    selectedFilter: undefined,
  };

  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);
  }

  focusTextInput() {
    if (this.textInput.current) {
      this.textInput.current.focus();
    }
  }

  componentDidMount() {
    const selectedFilters = this.props.selectedFilters || [];
    console.warn(this.props.initialFilterOptions);
    const initialFilterOptions = _.cloneDeep(this.props.initialFilterOptions);
    const filterOptions = selectedFilters.reduce(
      (optionsSoFar, filter) =>
        this.getFilterOptionsAfterFilter(optionsSoFar, filter),
      [...initialFilterOptions]
    );
    this.setState(
      {
        selectedFilters,
        filterOptions,
      },
      () => {
        this.changeFilters();
        this.focusTextInput();
      }
    );
  }

  showFilterOptions = (show) => () => {
    this.setState({
      showFilterOptions: show,
    });
  };

  selectFilterOption = (option) => () => {
    const selectedFilter = {
      option,
    };
    this.setState(
      {
        showFilterOptions: false,
        selectedFilter,
        showOperationOptions: !!option.operators,
      },
      () => {
        if (!option.operators) {
          this.setFilterOption(selectedFilter, this.state.filterOptions);
        }
      }
    );
  };

  selectOperator = (operator) => () => {
    const option =
      this.state.selectedFilter && this.state.selectedFilter.option
        ? this.state.selectedFilter.option
        : undefined;
    const selectedFilter = {
      option,
      operator,
    };
    this.setState({
      showOperationOptions: false,
      selectedFilter,
      showOperationValues: !!operator.values,
    });
  };

  selectOperatorValue = (value) => () => {
    const option =
      this.state.selectedFilter && this.state.selectedFilter.option
        ? this.state.selectedFilter.option
        : undefined;
    const operator =
      this.state.selectedFilter && this.state.selectedFilter.operator
        ? this.state.selectedFilter.operator
        : undefined;
    this.setState({
      showOperationValues: false,
    });
    this.setFilterOption(
      {
        option: option.labelValue,
        operator: operator.label,
        value: value.value,
      },
      this.state.filterOptions
    );
  };

  changeFilters = () => {
    this.props.onFilterChange(this.state.selectedFilters);
  };

  setFilterOption = (selectedFilter, filterOptions) => {
    const newOptions = this.getFilterOptionsAfterFilter(
      filterOptions,
      selectedFilter
    );
    const selectedFilters = [...this.state.selectedFilters, selectedFilter];
    this.setState(
      {
        filterOptions: newOptions,
        selectedFilter: undefined,
        selectedFilters,
      },
      () => this.changeFilters()
    );
  };

  getFilterOptionsAfterFilter = (filterOptions, selectedFilter) => {
    return filterOptions.reduce((newOptionsSoFar, option) => {
      if (option.labelValue === selectedFilter.option) {
        if (option.reUse) {
          option.operators[0].values = option.operators[0].values.filter(
            (v) => v.value !== selectedFilter.value
          );
          if (option.operators[0].values.length === 0) {
            return newOptionsSoFar;
          }
          newOptionsSoFar.push({ ...option });
          return newOptionsSoFar;
        }
        return newOptionsSoFar;
      }
      newOptionsSoFar.push({ ...option });
      return newOptionsSoFar;
    }, []);
  };

  clearFilters = () => {
    this.setState(
      {
        showFilterOptions: false,
        showOperationOptions: false,
        showOperationValues: false,
        filterOptions: _.cloneDeep(this.props.initialFilterOptions),
        selectedFilters: [],
        selectedFilter: undefined,
      },
      () => this.changeFilters()
    );
  };

  isSameFilters = (f1, f2) => {
    return (
      f1.option === f2.option &&
      f1.operator === f2.operator &&
      f1.value === f2.value
    );
  };

  removeSingleFilter = (filterToRemove) => {
    const { option, operator, value } = filterToRemove;
    const { selectedFilters, filterOptions } = this.state;
    const { initialFilterOptions } = this.props;
    const foundFilter = selectedFilters.find((f) =>
      this.isSameFilters(f, { option, operator, value })
    );
    if (!foundFilter) return;
    let newOptions;
    const initialOption = initialFilterOptions.find(
      (o) => o.labelValue === option
    );
    if (!initialOption.reUse) {
      // Add the initial option back if no reuse allowed in this filter option
      newOptions = [...filterOptions, { ...initialOption }];
    } else {
      newOptions = filterOptions.map((filterOption) => {
        if (filterOption.labelValue === option) {
          const initialOperator = initialOption.operators.find(
            (o) => o.label === operator
          );
          const initialValue = initialOperator.values.find(
            (v) => v.value === value
          );
          return {
            ...filterOption,
            operators: filterOption.operators.map((filterOptionOperator) => {
              if (filterOptionOperator.label === operator) {
                return {
                  ...filterOptionOperator,
                  values: [
                    ...filterOptionOperator.values,
                    { ...initialValue },
                  ].sort((a, b) => (a.value > b.value ? 1 : -1)),
                };
              }
              return filterOptionOperator;
            }),
          };
        }
        return filterOption;
      });
    }
    console.log("selectedFilters", selectedFilters);
    const newSelectedFilters = selectedFilters.filter(
      (f) => !this.isSameFilters(f, foundFilter)
    );
    console.log("newSelectedFilters", newSelectedFilters);
    newOptions.sort((a, b) => (a.id > b.id ? 1 : -1));
    this.setState(
      {
        selectedFilters: newSelectedFilters,
        filterOptions: newOptions,
      },
      () => this.changeFilters()
    );
  };

  render() {
    // const {classes} = this.props;
    return (
      <div
        className="records-filter"
        style={{
          display: "flex",
          flexDirection: "row",
          marginLeft: 2,
          marginRight: 2,
          width: "100%",
          marginTop: 10,
          marginBottom: 10,
          paddingTop: 1,
          paddingBottom: 1,
          paddingLeft: 7,
          paddingRight: 7,
          border: "1px solid lightgray",
        }}
      >
        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            whiteSpace: "nowrap",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {this.state.selectedFilters.map((filter, i) => (
              <FilterItem
                key={i}
                filter={filter}
                handleRemoveSingleFilter={this.removeSingleFilter}
              />
            ))}
            <input
              ref={this.textInput}
              style={{
                marginLeft: 5,
                marginRight: 3,
                all: "initial",
                "*": {
                  all: "unset",
                },
                lineHeight: "35px",
              }}
            //   className={styles.emptyInput}
              type="text"
              onClick={this.showFilterOptions(true)}
              placeholder="Click to filter records"
            />
          </div>
          <IconButton
            aria-label="clear"
            onClick={this.clearFilters}
            style={{ display: "flex" }}
          >
            <BackspaceIcon />
          </IconButton>
        </div>
        <Popover
          anchorEl={this.textInput.current}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={
            this.state.showFilterOptions && this.state.filterOptions.length > 0
          }
          onClose={this.showFilterOptions(false)}
        >
          <List component="nav" aria-label="main mailbox folders">
            {this.state.filterOptions.map((o, i) => (
              <ListItem key={i} button onClick={this.selectFilterOption(o)}>
                <ListItemText primary={o.label} />
              </ListItem>
            ))}
          </List>
        </Popover>

        {this.state.selectedFilter && this.state.selectedFilter.option ? (
          <Popover
            anchorEl={this.textInput.current}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={this.state.showOperationOptions}
          >
            <List component="nav" aria-label="main mailbox folders">
              {this.state.selectedFilter &&
                this.state.selectedFilter.option &&
                this.state.selectedFilter.option.operators &&
                this.state.selectedFilter.option.operators.map((o, i) => (
                  <ListItem key={i} button onClick={this.selectOperator(o)}>
                    <ListItemText primary={o.label} />
                  </ListItem>
                ))}
            </List>
          </Popover>
        ) : null}

        {this.state.selectedFilter && this.state.selectedFilter.operator ? (
          <Popover
            anchorEl={this.textInput.current}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={this.state.showOperationValues}
          >
            <List component="nav" aria-label="main mailbox folders">
              {this.state.selectedFilter &&
                this.state.selectedFilter.operator &&
                this.state.selectedFilter.operator.values &&
                this.state.selectedFilter.operator.values.map((v, i) => (
                  <ListItem
                    key={i}
                    button
                    onClick={this.selectOperatorValue(v)}
                  >
                    <ListItemText
                      primary={v.label}
                      style={{ textTransform: "capitalize" }}
                    />
                  </ListItem>
                ))}
            </List>
          </Popover>
        ) : null}
      </div>
    );
  }
}

export default Filter;
