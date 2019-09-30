import React from 'react';

const wrapper = WrrappedComponent => {
  const dummyState = {
    name: 'Mike',
    age: 52,
    color: 'black'
  };

  return () => (
    <WrrappedComponent {...dummyState} />
  )
};

export default wrapper;