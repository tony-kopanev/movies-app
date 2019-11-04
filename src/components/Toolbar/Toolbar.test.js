import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Toolbar from './Toolbar';
import Button from '../UI/Button/Button';

Enzyme.configure({ adapter: new Adapter() });

describe('<Toolbar />', () => {
  it('should render ANONYMOUS text is button was clicked', () => {
    const wrapper = mount(
      <Toolbar 
        search = ""
        idToken = "my-own-token"
        changed = {() => {}}
        isFetching = {false}
        clicked = {() => {}}
        logout = {mockedLogout} 
      />);

    function mockedLogout() {
      wrapper.setProps({ idToken: null });
    }

    wrapper.find(Button).first().simulate('click');
    //wrapper.find('button').simulate('click');

    const spanText = wrapper.find('span').text();

    expect(spanText).toBe('ANONYMOUS');
  });
});