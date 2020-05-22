import * as React from 'react';
import { shallow, mount, ReactWrapper, configure } from 'enzyme';
import ViewUserComponent, { IUserProps } from '../UserComponent';
import { FormControl, InputLabel, Input, Select } from '@material-ui/core';
import { BrowserRouter } from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';

const props: IUserProps = {
	authUser: {
        user_id: 1,
        username: 'Test',
        password: 'Test',
        first_name: 'Test',
        last_name: 'Test',
        email: 'test@revature.com',
        roles: 'Admin'
	},
	setThisUser:  jest.fn()
}

configure({adapter: new Adapter()});

describe('ViewUserComponent renders',()=>{
	const wrapper: ReactWrapper = mount(<BrowserRouter><ViewUserComponent {...props}/></BrowserRouter>);

	test('Renders the component', () => {

        expect(wrapper.exists()).toBeTruthy();

    });
})