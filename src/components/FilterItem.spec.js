import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import {FilterItem, styles} from "./FilterItem";
import ClearIcon from "@material-ui/icons/Clear";


describe('FilterItem', () => {
    let shallow, props;

    beforeEach(() => {
        shallow = createShallow();
        props = {
            classes: {},
            filter: {},
            handleRemoveSingleFilter: jest.fn()
        };
    });

    it('should render with no tokens', () => {
        const wrapper = shallow(<FilterItem {...props} />);
        expect(wrapper.find('.filter-item').length).toEqual(1);
    });

    it('should render the tokens', () => {
        props.filter = { option: 'test-option', operator: 'test-operator', value: 'test-value'};
        const wrapper = shallow(<FilterItem {...props} />);
        const containerDiv = wrapper.find('.filter-item');
        expect(containerDiv.length).toEqual(1);
        const divs = containerDiv.children();
        expect(divs.length).toEqual(3);
        expect(divs.at(0).text()).toEqual('test-option');
        expect(divs.at(1).text()).toEqual('test-operator');
        expect(divs.at(2).text()).toEqual('test-value');
    });

    it('should call the handleRemoveSingleFilter when clear button is click', () => {
        props.filter ={ option: '1', operator: '=', value: '2' };
        const wrapper = shallow(<FilterItem {...props} />);
        const icon = wrapper.find(ClearIcon).at(0);
        icon.simulate('click');
        expect(props.handleRemoveSingleFilter).toHaveBeenCalledWith(props.filter);
    });
});

describe('FilterItem styles', () => {
    it('should set the right styles', () => {
        const renderStyles = styles();
        expect(renderStyles).toEqual({
            operations: {
                display: 'flex',
            },
            token: {
                paddingLeft: 3,
                paddingRight: 3,
            },
            tokensWrapper: {
                margin: 2,
                paddingLeft: 3,
                paddingRight: 5,
                lineHeight: '35px',
                backgroundColor: '#f0f0f0',
                borderRadius: 3,
                display: 'inline-flex',
            },
            clearIcon: {
                alignSelf: 'center',
                padding: 4,
                '&:hover': {
                    cursor: 'pointer'
                }
            }
        });
    });
});
