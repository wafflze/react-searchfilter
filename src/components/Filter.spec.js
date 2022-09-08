import React from 'react';
import {createShallow} from '@material-ui/core/test-utils';
import {Filter, styles} from "./Filter";
import {
    vehicleMakeFilterOption,
    colorFilterOption,
    gradeFilterOption,
    yesNoFilterOption,
    stateCodeFilterOption,
    explanationFilterOption
} from '../data';

describe('Filter', () => {
    let shallow, props, initialFilterOptions;
    beforeEach(() => {
        shallow = createShallow();
        initialFilterOptions = [
            vehicleMakeFilterOption,
            gradeFilterOption,
            colorFilterOption,
            yesNoFilterOption,
            stateCodeFilterOption,
            explanationFilterOption
        ];
        props = {
            classes: {},
            initialFilterOptions,
            selectedFilters: [],
            onFilterChange: jest.fn()
        };
    });

    it('should render', () => {
        const wrapper = shallow(<Filter {...props} />);
        expect(wrapper.find('.records-filter').length).toEqual(1);
    });

    it('should focus the input on componentDidMount', () => {
        const focusMock = jest.fn();
        const wrapper = shallow(<Filter {...props} />);
        expect(wrapper.instance().textInput).toEqual({current: null});
        wrapper.instance().textInput.current = {focus: focusMock};
        wrapper.instance().componentDidMount();
        expect(focusMock).toHaveBeenCalled();
    });

    it('should focus the input on focusTextInput', () => {
        const focusMock = jest.fn();
        const wrapper = shallow(<Filter {...props} />);
        expect(wrapper.instance().textInput).toEqual({current: null});
        wrapper.instance().textInput.current = {focus: focusMock};
        wrapper.instance().focusTextInput();
        expect(focusMock).toHaveBeenCalled();
    });

    it('should show set the state to showFilterOptions true', () => {
        const wrapper = shallow(<Filter {...props} />);
        const showFilterOptions = wrapper.instance().showFilterOptions(true);
        expect(wrapper.instance().state.showFilterOptions).toBeFalsy();
        showFilterOptions();
        expect(wrapper.instance().state.showFilterOptions).toBeTruthy();
    });

    it('should set the state correctly when selectFilterOption with operators', () => {
        const option = {label: 'option 1', operators: []};
        const wrapper = shallow(<Filter {...props} />);
        const selectFilterOption = wrapper.instance().selectFilterOption(option);
        selectFilterOption();
        const {state} = wrapper.instance();
        expect(state.showFilterOptions).toBeFalsy();
        expect(state.selectedFilter.option).toEqual(option);
        expect(state.showOperationOptions).toBeTruthy();
    });

    it('should set the state correctly when selectFilterOption without operators', () => {
        const option = {label: 'option 1'};
        const wrapper = shallow(<Filter {...props} />);
        const selectFilterOption = wrapper.instance().selectFilterOption(option);
        selectFilterOption();
        const {state} = wrapper.instance();
        expect(state.showFilterOptions).toBeFalsy();
        expect(state.showOperationOptions).toBeFalsy();
        expect(props.onFilterChange).toHaveBeenCalled();
    });

    it('should set the state correctly when selectOperator with values', () => {
        const operator = {label: '=', values: [{value: 'yes', label: 'Yes'}, {value: 'no', label: 'No'}]};
        const wrapper = shallow(<Filter {...props} />);
        const selectOperator = wrapper.instance().selectOperator(operator);
        selectOperator();
        const {state} = wrapper.instance();
        expect(state.showOperationOptions).toBeFalsy();
        expect(state.showOperationValues).toBeTruthy();
        expect(state.selectedFilter.operator).toEqual(operator);
    });

    it('should set the state correctly when selectOperator without values', () => {
        const option = {label: 'option 1', operators: [{label: 'exact'}]};
        const operator = {label: 'exact'};
        const wrapper = shallow(<Filter {...props} />);
        const selectFilterOption = wrapper.instance().selectFilterOption(option);
        selectFilterOption();
        const selectOperator = wrapper.instance().selectOperator(operator);
        selectOperator();
        const {state} = wrapper.instance();
        expect(state.showOperationOptions).toBeFalsy();
        expect(state.showOperationValues).toBeFalsy();
        expect(props.onFilterChange).toHaveBeenCalled();
    });

    it('should set the state correctly when selectOperatorValue', () => {
        const option = {labelValue: 'option1', label: 'option 1', operators: [{label: 'exact', values: []}]};
        const value = {label: 'Something', value: 'something'};
        const wrapper = shallow(<Filter {...props} />);
        wrapper.instance().selectFilterOption(option)();
        wrapper.instance().selectOperator(option.operators[0])();
        wrapper.instance().selectOperatorValue(value)();
        const {state} = wrapper.instance();
        expect(state.showOperationValues).toBeFalsy();
        expect(props.onFilterChange).toHaveBeenCalled();
    });

    it('should return only 5 remaining filters Transaction Codes, Data Grade, Data Type, Record Identifier and Pool State Code', () => {
        // Arrange
        const filterOption = {...explanationFilterOption}
        // Act
        const wrapper = shallow(<Filter {...props} />);
        wrapper.instance().clearFilters();
        const {state} = wrapper.instance();
        expect(state.filterOptions.length).toEqual(6);
        wrapper.instance().selectFilterOption(filterOption)();
        wrapper.instance().selectOperator(filterOption.operators[0])();
        wrapper.instance().selectOperatorValue(filterOption.operators[0].values[0])();
        const {state: stateAfterUpdate} = wrapper.instance();
        // Assert
        expect(stateAfterUpdate.selectedFilters.length).toEqual(1);
        expect(stateAfterUpdate.filterOptions.length).toEqual(5);
    });

    it('should call onFilterChange with no filters', () => {
        //Arrange
        const tcFilterOption = {...vehicleMakeFilterOption};
        //Act
        const wrapper = shallow(<Filter {...props} />);
        wrapper.instance().clearFilters();
        wrapper.instance().removeSingleFilter({
            option: tcFilterOption.labelValue,
            operator: tcFilterOption.operators[0].label,
            value: tcFilterOption.operators[0].values[0].value
        });
        //Assert
        expect(props.onFilterChange).toHaveBeenCalledWith([]);
    });

    it('should call onFilterChange after removing a selection from a reuse filter', () => {
        const tcFilterOption = {...vehicleMakeFilterOption};
        // Act
        const testProps = {...props};
        const wrapper = shallow(<Filter {...testProps} />);
        wrapper.instance().clearFilters();
        wrapper.instance().selectFilterOption(tcFilterOption)();
        wrapper.instance().selectOperator(tcFilterOption.operators[0])();
        wrapper.instance().selectOperatorValue(tcFilterOption.operators[0].values[0])();

        wrapper.instance().selectFilterOption(tcFilterOption)();
        wrapper.instance().selectOperator(tcFilterOption.operators[0])();
        wrapper.instance().selectOperatorValue(tcFilterOption.operators[0].values[1])();
        wrapper.instance().removeSingleFilter({
            option: tcFilterOption.labelValue,
            operator: tcFilterOption.operators[0].label,
            value: tcFilterOption.operators[0].values[1].value
        });

        // Assert
        expect(props.onFilterChange).toHaveBeenCalledWith([{
            option: tcFilterOption.labelValue,
            operator: tcFilterOption.operators[0].label,
            value: tcFilterOption.operators[0].values[0].value
        }]);
    });

    it('should call onFilterChange after removing a selection from a non reuse filter', () => {
        // Arrange
        const explanationsFilter = {...explanationFilterOption};
        const tcFilterOption = {...vehicleMakeFilterOption};
        // Act
        const wrapper = shallow(<Filter {...props} />);
        wrapper.instance().clearFilters();
        wrapper.instance().selectFilterOption(explanationsFilter)();
        wrapper.instance().selectOperator(explanationsFilter.operators[0])();
        wrapper.instance().selectOperatorValue(explanationsFilter.operators[0].values[0])();
        wrapper.instance().selectFilterOption(tcFilterOption)();
        wrapper.instance().selectOperator(tcFilterOption.operators[0])();
        wrapper.instance().selectOperatorValue(tcFilterOption.operators[0].values[0])();
        wrapper.instance().removeSingleFilter({
            option: explanationsFilter.labelValue,
            operator: explanationsFilter.operators[0].label,
            value: explanationsFilter.operators[0].values[0].value
        });

        // Assert
        expect(props.onFilterChange).toHaveBeenCalledWith([{
            option: tcFilterOption.labelValue,
            operator: vehicleMakeFilterOption.operators[0].label,
            value: vehicleMakeFilterOption.operators[0].values[0].value
        }]);
    });

    it('should reset the state when clearing the filters', () => {
        const wrapper = shallow(<Filter {...props} />);
        wrapper.instance().clearFilters();
        const {state} = wrapper.instance();
        expect(state.showFilterOptions).toBeFalsy();
        expect(state.showOperationOptions).toBeFalsy();
        expect(state.showOperationValues).toBeFalsy();
        expect(state.selectedFilters).toEqual([]);
        expect(state.selectedFilter).toBeUndefined();
        expect(props.onFilterChange).toHaveBeenCalled();
    });

    describe('styles', () => {
        it('should set the styles', () => {
            const renderStyles = styles();
            expect(renderStyles).toEqual({
                emptyInput: {
                    marginLeft: 5,
                    marginRight: 3,
                    all: 'initial',
                    '*': {
                        all: 'unset'
                    },
                    lineHeight: '35px',
                }
            });
        });
    });
});
