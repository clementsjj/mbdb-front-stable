import React, { Component } from 'react';
import {
  Menu,
  Button,
  Modal,
  Header,
  Icon,
  Container,
  MenuItem,
  Segment
} from 'semantic-ui-react';
import FormContainer from './FormContainer';
import About from './About';
import '../../App.css';

export default class Navbar extends Component {
  state = {};
  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <React.Fragment>
        <Segment
          style={{
            padding: '.25vh',
            marginBottom: 0,
            height: '2vh',
            backgroundColor: '#1b1c1d',
            color: 'green',
            textAlign: 'center'
          }}
        >
          Beta Version!
        </Segment>
        <Menu
          className={'nav'}
          inverted
          style={{
            padding: '.25vh',
            marginBottom: 0,
            marginTop: 0,
            height: '5vh'
          }}
        >
          <Menu.Item header style={{ color: 'green', padding: '5 20' }}>
            <Header as="h1" style={{ color: 'green' }}>
              MBDB
            </Header>
          </Menu.Item>
          <Menu.Item
            style={{
              backgroundColor: 'green',
              marginLeft: 5,
              cursor: 'pointer'
            }}
          >
            <Modal
              trigger={
                // <Button basic color="green" style={{ marginLeft: '5%' }}>
                //   Add Bathroom
                // </Button>
                // <Menu.item name="addbathroom" style={{}}>
                //   Add Bathroom
                // </Menu.item>
                <Header
                  as="h5"
                  style={{ color: 'black', backgroundColor: 'green' }}
                >
                  Add Bathroom
                </Header>
              }
              basic
              centered
              closeIcon
              size="large"
            >
              <Header icon="chess rock" content="Enter Bathroom Information" />
              <Modal.Content>
                <FormContainer />
              </Modal.Content>
              <Modal.Actions />
            </Modal>
          </Menu.Item>
          <Menu.Item
            style={{
              backgroundColor: 'green',
              marginLeft: 5,
              cursor: 'pointer'
            }}
          >
            <Modal
              trigger={
                <Header
                  as="h5"
                  style={{
                    color: 'black',
                    backgroundColor: 'green'
                  }}
                >
                  What Is This?
                </Header>
              }
              basic
              centered
              closeIcon
              size="large"
            >
              {/* <Header icon="chess rock" content="What is MBDB?" /> */}
              <Modal.Content>
                <About />
              </Modal.Content>
              <Modal.Actions />
            </Modal>
          </Menu.Item>
        </Menu>
      </React.Fragment>
    );
  }
}
