// @flow

import React, { Fragment } from 'react';
import { injectGlobal } from 'styled-components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { compose, withStateHandlers } from 'recompose';

import Index from '../Index';
import NewAlbum from '../Albums/NewAlbum';
import Album from '../Albums/Album';
import Login from '../../components/Login';

import { Page, Section, Header, H1, global } from './styles';
import logo from './logo.svg';

injectGlobal`${global}`;

const enhance = compose(
  withStateHandlers(
    { token: localStorage.getItem('token') },
    {
      onLoggedIn: () => token => {
        localStorage.setItem('token', token);
        return { token };
      },
      onLoggedOut: () => () => {
        localStorage.removeItem('token');
        return { token: null };
      }
    }
  )
);

export default enhance(({ token, onLoggedIn, onLoggedOut }) => (
  <Router>
    <Page>
      <div>
        <Section>
          <Header>
            <img alt="Logo" src={logo} height={48} />
            <H1>My Music</H1>
          </Header>
        </Section>
        <Section>
          <Switch>
            <Route exact path="/" render={() => <Index isLoggedIn={!!token} />} />
            {token && (
              <Fragment>
                <Route exact path="/albums/new" component={NewAlbum} />
                <Route exact path="/albums/:id" component={Album} />
              </Fragment>
            )}
          </Switch>
        </Section>
      </div>
      <Section>
        <Login isLoggedIn={!!token} onLoggedIn={onLoggedIn} onLoggedOut={onLoggedOut} />
      </Section>
    </Page>
  </Router>
));
