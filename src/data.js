export const vehicleMakeFilterOption = {
  id: 1,
  label: "Vehicle Make",
  reUse: true,
  labelValue: "vehicleMake",
  operators: [
    {
      label: "=",
      values: [
        {
          value: "jeep",
          label: "Jeep",
        },
        {
          value: "tesla",
          label: "Tesla",
        },
        {
          value: "ford",
          label: "Ford",
        },
      ],
    },
  ],
};
export const colorFilterOption = {
  id: 2,
  label: "Colors",
  reUse: true,
  labelValue: "colors",
  operators: [
    {
      label: "=",
      values: [
        {
          value: "red",
          label: "Red",
        },
        {
          value: "blue",
          label: "Blue",
        },
        {
          value: "green",
          label: "Green",
        },
        {
          value: "yellow",
          label: "Yellow",
        },
      ],
    },
  ],
};
export const gradeFilterOption = {
  id: 3,
  label: "Grade",
  reUse: true,
  labelValue: "grade",
  operators: [
    {
      label: "=",
      values: [
        {
          value: "95",
          label: "A+",
        },
        {
          value: "90",
          label: "A",
        },
        {
          value: "80",
          label: "B",
        },
        {
          value: "70",
          label: "C",
        },
        {
          value: "65",
          label: "D",
        },
        {
          value: "0",
          label: "F",
        },
      ],
    },
  ],
};
export const yesNoFilterOption = {
  id: 4,
  label: "Yes No",
  reUse: true,
  labelValue: "yesno",
  operators: [
    {
      label: "=",
      values: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
      ],
    },
  ],
};
export const stateCodeFilterOption = {
  id: 5,
  label: "State Codes",
  reUse: true,
  labelValue: "stateCode",
  operators: [
    {
      label: "=",
      values: [
        { value: "fl", label: "FL" },
        { value: "ny", label: "NY" },
        { value: "ca", label: "CA" },
        { value: "wa", label: "WA" },
      ],
    },
  ],
};
export const explanationFilterOption = {
  id: 6,
  label: "With Explanation",
  reUse: false,
  labelValue: "withExplanation",
  operators: [
    {
      label: "=",
      values: [
        {
          value: "yes",
          label: "Yes",
        },
        {
          value: "no",
          label: "No",
        },
      ],
    },
  ],
};
export const acceptedExplanationsOption = {
  id: 6,
  label: "Accepted Explanations",
  reUse: false,
  labelValue: "acceptedExplanations",
  operators: [
    {
      label: "=",
      values: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
      ],
    },
  ],
};
export const historicalExplanationsOption = {
  id: 7,
  label: "Historical Explanations",
  reUse: false,
  labelValue: "historical",
  operators: [
    {
      label: "=",
      values: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
      ],
    },
  ],
};
