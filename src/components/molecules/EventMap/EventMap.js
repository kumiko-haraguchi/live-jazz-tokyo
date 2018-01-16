import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Marker } from 'react-google-maps';

import MyMap from '../MyMap/MyMap';
import { MarkerIcon } from '../../atoms/Icon/Icon';

class EventMap extends Component {
  render() {
    const { position } = this.props;
    return process.env.npm_lifecycle_event === 'test'
      ? <div />
      : <MyMap
        position={position}
        containerElement={<div style={{ height: '100%' }} />}
        mapElement={<div style={{ height: '100%' }} />}
      >
        <Marker position={position} icon={MarkerIcon} />
      </MyMap>;
  }
}

EventMap.propTypes = {
  position: PropTypes.shape().isRequired,
};

export default EventMap;