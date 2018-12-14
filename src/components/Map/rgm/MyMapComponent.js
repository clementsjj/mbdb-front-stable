import React, { Component } from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from 'react-google-maps';
import { Modal, Container, Icon, Divider } from 'semantic-ui-react';
import {
  bluewc16,
  bluewc32,
  bluewc24,
  sitBlue32,
  sitGreen32,
  sitBlue322
} from '../../../assets/icons';
import { getBathrooms } from './getBathrooms';
import axios from 'axios';

//let markers = [];

const darkmapstyle = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#242f3e'
      }
    ]
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#746855'
      }
    ]
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#242f3e'
      }
    ]
  },
  {
    featureType: 'administrative',
    elementType: 'geometry',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#d59563'
      }
    ]
  },
  {
    featureType: 'poi',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#d59563'
      }
    ]
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: '#263c3f'
      }
    ]
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#6b9a76'
      }
    ]
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      {
        color: '#38414e'
      }
    ]
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#212a37'
      }
    ]
  },
  {
    featureType: 'road',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9ca5b3'
      }
    ]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#746855'
      }
    ]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#1f2835'
      }
    ]
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#f3d19c'
      }
    ]
  },
  {
    featureType: 'transit',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [
      {
        color: '#2f3948'
      }
    ]
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#d59563'
      }
    ]
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#17263c'
      }
    ]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#515c6d'
      }
    ]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#17263c'
      }
    ]
  }
];

class MyMapComponent extends Component {
  constructor() {
    super();
    this.state = {
      map: null,
      bathrooms: null,
      isOpen: false,
      selectedMarker: null,
      addCode: false,
      gestureHandling: 'greedy',
      status: ''
    };

    //this.createMarkers = this.createMarkers.bind(this);
    this.handleMarkerClick = this.handleMarkerClick.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.handleModalWindow = this.handleModalWindow.bind(this);
  }
  //   createMarkers() {
  //     markers = this.state.bathrooms.map((item, i) => {
  //       //let lat = item.lat;
  //       //let lng = item.lng;
  //       return <Marker key={i} position={{ lat: item.lat, lng: item.lng }} />;
  //     });
  //     //console.log(markers);
  //   }

  addCodeSubmit = id => {
    let address = `https://mbdb-node.herokuapp.com/bathrooms/addadditionalcode`;
    let code = this.state.codeToAdd;
    //console.log('Code To Send: ', code);

    let payload = { codes: code, _id: id };
    console.log(payload);
    axios
      .put(address, payload)
      .then(res => console.log(res))
      .catch(err => console.log(err));

    this.setState({
      addCode: false,
      codeToAdd: '',
      codeStatus: 'sent'
    });
    setTimeout(() => {
      this.setState({ codeStatus: '' });
    }, 2000);

    window.location.reload();
  };

  handleMarkerClick(index) {
    console.log('GestureHandling: ', this.state.gestureHandling);
    this.setState({
      isOpen: true,
      selectedMarker: index,
      gestureHandling: 'cooperative'
    });
    setTimeout(() => console.log(this.state.gestureHandling), 100);
  }
  handleCloseClick() {
    this.setState({
      isOpen: false,
      selectedMarker: null,
      gestureHandling: 'greedy'
    });
  }
  handleModalWindow(index) {
    this.setState({ isOpen: true, selectedMarker: index });
    return (
      <Modal inverted defaultOpen>
        <Modal.Content>Hello.</Modal.Content>
      </Modal>
    );
  }

  componentDidMount() {
    getBathrooms()
      .then(data => {
        console.log('Component Mount-Received Data and setting State: ', data);
        this.setState({
          bathrooms: data.bathrooms
        });
        //this.createMarkers(data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentWillUnmount() {
    document.removeEventListener('mouseDown', this.handleCloseClick);
  }

  // doSomething() {
  //   console.log('HHHHHHHH');
  // }

  render() {
    const markersII = this.state.bathrooms || [];
    return (
      <GoogleMap
        defaultZoom={14}
        defaultCenter={{ lat: 40.7308, lng: -73.9973 }}
        defaultOptions={{
          styles: darkmapstyle,
          disableDefaultUI: true,
          gestureHandling: this.state.gestureHandling
        }}
      >
        {markersII.map((bathroom, i) => (
          <Marker
            position={{ lat: bathroom.lat, lng: bathroom.lng }}
            clickable={true}
            //icon={bathroom.isPublic ? sitGreen32 : sitBlue322}
            icon={bathroom.isPublic ? sitGreen32 : sitBlue322}
            key={i}
            defaultOptions={{ optimized: false }}
            onMouseDown={() => {
              this.handleMarkerClick(i);
              // this.doSomething();
              //
              //Pan or zoom map here
              //
            }}
          >
            {this.state.selectedMarker == i && (
              <Modal
                //closeOnDocumentClick
                //defaultOpen
                open={true}
                onClose={this.handleCloseClick}
                size="mini"
              >
                <Modal.Content>
                  <Container textAlign="center">
                    <p>
                      <strong>{bathroom.name}</strong>
                      <br />
                      <em>{bathroom.address}</em>
                    </p>
                    <p>{bathroom.description && bathroom.description}</p>
                    <Divider />
                    <p>
                      Code: <em>{bathroom.code}</em>
                    </p>
                    {bathroom.otherCodes.length >= 1 && (
                      <div>
                        <span style={{ margin: 0 }}>Other Codes:&nbsp;</span>
                        {bathroom.otherCodes.map((code, i) => (
                          <span key={i}>
                            {code}
                            {i !== bathroom.otherCodes.length - 1 ? ' | ' : ''}
                          </span>
                        ))}
                      </div>
                    )}
                    <Divider />
                    {bathroom.isPublic ? <p>Public</p> : <p>Private</p>}
                    <div
                      style={{
                        // border: '1px solid deeppink',
                        display: 'inline-block',
                        cursor: 'pointer',
                        color: 'green'
                      }}
                      onClick={() => {
                        this.setState({ addCode: !this.state.addCode });
                      }}
                    >
                      <Icon name="plus circle" />
                      Add Code
                    </div>
                    {this.state.codeStatus == 'sent' && (
                      <p style={{ color: 'green' }}>
                        <em>Thank you for your submission</em>
                      </p>
                    )}

                    <br />
                    {this.state.addCode && (
                      <div>
                        <input
                          name="codeToAdd"
                          placeholder="Code To Add"
                          value={this.state.codeToAdd}
                          onChange={e => {
                            e.preventDefault();
                            let name = e.target.name;
                            let value = e.target.value;
                            this.setState({ [name]: value }, () =>
                              console.log(this.state.codeToAdd)
                            );
                          }}
                        />
                        <Icon
                          size="large"
                          disabled={
                            this.state.codeToAdd == null ||
                            this.state.codeToAdd == ''
                              ? true
                              : false
                          }
                          onClick={() => this.addCodeSubmit(bathroom._id)}
                          name="plus square"
                          style={{
                            color: 'green',
                            width: 50,
                            cursor: 'pointer',
                            display:
                              this.state.codeToAdd == null ||
                              this.state.codeToAdd == ''
                                ? 'none'
                                : 'inline-block'
                          }}
                        />
                        <p>{this.state.status}</p>
                      </div>
                    )}
                  </Container>
                </Modal.Content>
              </Modal>
            )}
          </Marker>
        ))}
      </GoogleMap>
    );
  }
}
export default withScriptjs(withGoogleMap(MyMapComponent));

//Original InfoWindow Code:

{
  /*

            {this.state.selectedMarker == i && (
              <InfoWindow onCloseClick={this.handleCloseClick}>
                <div align="center">
                  <p style={{ margin: 0, padding: 0 }}>
                    <strong>{bathroom.name}</strong>
                  </p>
                  <p>
                    Code: <em>{bathroom.code}</em>
                  </p>
                  {bathroom.isPublic ? <p>Public</p> : <p>Private</p>}

                  <Modal
                    trigger={
                      <p style={{ color: 'blue' }}>
                        <em>Click for Address</em>
                      </p>
                    }
                    size="mini"
                    closeIcon
                    centered
                  >
                    <Modal.Content>{bathroom.address}</Modal.Content>
                  </Modal>
                </div>
              </InfoWindow>
            )}
            */
}

// {/* ~~~~~~~~THIS IS FOR TESTING ON NGROK~~~~~~~ */}
// {/* <Marker
//   position={{ lat: 40.7185, lng: -73.9912 }}
//   clickable={true}
//   icon={bluewc32}
//   onClick={() => {
//     this.handleMarkerClick(20);
//   }}
// >
//   {this.state.selectedMarker == 20 && (
//     <Modal
//       closeOnDocumentClick
//       defaultOpen
//       onClose={this.handleCloseClick}
//       size="mini"
//     >
//       <Modal.Content>
//         <Container textAlign="center">
//           <p>
//             <strong>JJ's Apartment</strong>
//           </p>
//           <p>
//             Code: <em>Just Ask To Use</em>
//           </p>
//           <p>Private</p>
//         </Container>
//       </Modal.Content>
//     </Modal>
//   )}
// </Marker> */}
// {/* ~~~~~~~~THIS IS FOR TESTING ON NGROK~~~~~~~ */}
