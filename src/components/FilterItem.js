import React from "react";
import BackspaceIcon from "@mui/icons-material/Backspace";
import { makeStyles } from "@mui/material/styles";

export const styles = () =>
  makeStyles({
    operations: {
      display: "flex",
    },
    token: {
      paddingLeft: 30,
      paddingRight: 30,
    },
    tokensWrapper: {
      margin: 1,
      paddingLeft: 1,
      paddingRight: 1,
      lineHeight: "35px",
      backgroundColor: "#f0f0f0",
      borderRadius: 3,
      display: "inline-flex",
    },
    clearIcon: {
      alignSelf: "center",
      padding: 4,
      "&:hover": {
        cursor: "pointer",
      },
    },
  });

export const FilterItem = ({ filter, handleRemoveSingleFilter }) => {
  const { option, operator, value } = filter;
  return (
    <div className={styles.tokensWrapper}>
      <div
        style={{ paddingRight: 5 }}
        className={`filter-item ${styles.operations}`}
      >
        {console.log("styles", styles)}
        {option && <div className={styles.token}>{option}</div>}
        {operator && (
          <div
            style={{
              paddingLeft: 3,
              paddingRight: 3,
            }}
          >
            {operator}
          </div>
        )}
        {value && (
          <div
            style={{
              paddingLeft: 3,
              paddingRight: 3,
              textTransform: "capitalize",
            }}
          >
            {value}
          </div>
        )}
      </div>
      <BackspaceIcon
        className={styles.clearIcon}
        onClick={() => handleRemoveSingleFilter(filter)}
      />
    </div>
  );
};

export default FilterItem;
