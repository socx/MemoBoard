import React from 'react'
import { Link, browserHistory } from 'react-router';
import { Container, Menu, Header, Icon }      from 'semantic-ui-react';
import './style.css';

export default function Layout ({ children }) {
  return (
      <div className="main-container">
            <div className='app-header'>
                <Header as='h2'>
                    <Icon.Group size='large'>
                    <Icon name='list layout' />
                    <Icon corner name='hashtag' />
                    </Icon.Group>
                    Idea/Memo Board
                </Header>
            </div>
            <Container id="page-container">
                {children}
            </Container>
      </div>
  )
}