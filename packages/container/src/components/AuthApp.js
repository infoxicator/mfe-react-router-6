import { mount } from 'auth/AuthApp';
import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHistory } from '../App';

 

export default ({ onSignIn }) => {
  const ref = useRef(null);
  const navigate = useNavigate();
  const history = useHistory();

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      initialPath: history.location.pathname,
      onNavigate: ({ location: { pathname: nextPathname } }) => {
        const { pathname } = history.location;
        if (pathname !== nextPathname) {
          navigate(nextPathname);
        }
      },
      onSignIn,
    });

    history.listen(onParentNavigate);
  }, []);

  return <div ref={ref} />;
};
