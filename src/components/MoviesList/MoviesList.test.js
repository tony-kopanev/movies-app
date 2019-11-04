import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import MoviesList from './MoviesList';

Enzyme.configure({ adapter: new Adapter() });

describe('<MoviesList />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<MoviesList />);
  });

  it('should render movies list if it was passed as a prop', () => {
    wrapper.setProps( {list: ['a', 'b', 'c', 'd']} )

    expect(wrapper.find('li')).toHaveLength(4);
  });
});