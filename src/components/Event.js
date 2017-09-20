import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Stripe from 'react-stripe-checkout';

import '../styles/Event.css';

class Event extends Component {
  componentWillMount() {
    const event = {
      name: 'SUMER JAZE LYFE PARTE',
      artist: 'SWAG MC G',
      price: 'ONE BILLION DOLLARS',
      venueName: 'JAZZ TOWN',
      venueAddress: '123 NEW ORLEANS AVE',
      startTime: '6pm',
      endTime: '9pm',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    };

    this.props.receivedEventDetails(event);
  }

  async onToken(stripeToken) {
    const res = await (await fetch('/api/charge', {
      method: 'POST',
      body: JSON.stringify({
        stripeToken,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })).json();

    this.eject(res);
  }

  eject(res) {
    this.props.onReceiveChargeResponse(res.message);
    if (res.OK) {
      this.props.history.push('/confirmation');
    } else {
      window.alert('u dum u duum');
    }
  }

  render() {
    return (
      <div>
        <div>EVENT { this.props.match.params.id }</div>
        <div>NAME { this.props.event.name }</div>
        <div>ARTIST { this.props.event.artist }</div>
        <div>PRICE { this.props.event.price }</div>
        <div>VENUENAME { this.props.event.venueName }</div>
        <div>VENUEADDRESS { this.props.event.venueAddress }</div>
        <div>STARTTIME { this.props.event.startTime }</div>
        <div>ENDTIME { this.props.event.endTime }</div>
        <div>DESCRIPTION { this.props.event.description }</div>
        <Stripe
          label={'Reserve'}
          token={(token) => { this.onToken(token); }}
          stripeKey="pk_test_6pRNASCoBOKtIshFeQd4XMUh"
        />
      </div>
    );
  }
}

Event.propTypes = {
  event: PropTypes.shape().isRequired,
  match: PropTypes.shape().isRequired,
  receivedEventDetails: PropTypes.func.isRequired,
  history: PropTypes.shape(),
  onReceiveChargeResponse: PropTypes.func.isRequired,
};

Event.defaultProps = {
  history: undefined,
};

export default Event;
