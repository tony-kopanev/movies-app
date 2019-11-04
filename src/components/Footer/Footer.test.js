import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Footer from './Footer';
import { NavLink } from 'react-router-dom';

Enzyme.configure({ adapter: new Adapter() });

describe('<Footer />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Footer />);
  })

  it('should render 2 NavLink', () => {
    expect(wrapper.find(NavLink)).toHaveLength(2);
  });

  it('should render current year', () => {
    const year = +wrapper.find('strong').text().slice(-4);

    expect(year).toBe(new Date().getFullYear());
  });
});