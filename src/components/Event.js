import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Stripe from 'react-stripe-checkout';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

import Map from '../containers/Map';

import '../styles/Event.css';
import { ClockIcon, DollarIcon, PinIcon } from '../styles/Icons';

class Event extends Component {
  componentDidMount() {
    this.props.onComponentDidMount(this.props.match.params.id);
  }

  async onToken(stripeToken) {
    const res = await (await fetch('/api/charge', {
      method: 'POST',
      body: JSON.stringify({
        stripeToken,
        eventID: this.props.match.params.id,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })).json();

    this.eject(res);
  }

  eject(res) {
    this.props.onReceiveChargeResponse(res);
    if (res.OK) {
      this.props.history.push('/confirmation');
    } else {
      window.alert('u dum u duum');
    }
  }

  render() {
    if (this.props.event) {
      return (
        <main className="restrict-width grow" id="event-details">
          <div className="image-box">
            <img className="event-image" src={`data:image/png;base64,${this.props.event.image}`} alt="pic" />
          </div>

          <div className="row">
            <div className="date flex column center">
              <p className="month">{this.props.event.start.toDateString().split(' ')[1]}</p>
              <p className="day">{this.props.event.start.getDate()}</p>
            </div>
            <h1 className="title flex center">{ this.props.event.name }</h1>
          </div>

          <Divider />

          <div className="event-details-table">
            <div className="flex center row">
              <div className="icon"><ClockIcon /></div>
              <div>
                <p>{ this.props.event.start.toDateString() }</p>
                <p>{
                  `${this.props.event.start.toTimeString().split(':').slice(0, 2).join(':')
                  } to ${
                    this.props.event.end.toTimeString().split(':').slice(0, 2).join(':')}`}
                </p>
              </div>
              <div className="grow" />
            </div>

            <div className="flex center row">
              <div className="icon"><PinIcon /></div>
              <div>
                <p>{ this.props.event.venue }</p>
                <p>{ this.props.event.address }</p>
              </div>
              <div className="grow" />
              <RaisedButton
                className="mui-button"
                label="View Map"
                onClick={this.props.toggleMap}
              />
            </div>

            { this.props.showMap ?
              <div className="event-map"><Map /></div> : <div />
            }

            <div className="flex center row">
              <div className="icon"><DollarIcon /></div>
              <p>{ `${this.props.event.price} Yen`}</p>
              <div className="grow" />
              <Stripe
                label={'Reserve'}
                token={(token) => { this.onToken(token); }}
                stripeKey="pk_test_6pRNASCoBOKtIshFeQd4XMUh"
                currency="JPY"
                name="Live Jazz Co."
                image="../logo.png"
                description={`1 ticket for ${this.props.event.name}`}
                amount={2000}
              />
            </div>
          </div>

          <Paper className="pane">
            <div className="block">
              <h3>Details</h3>
            </div>
            <Divider />
            <div className="block">
              <div>{ this.props.event.description }</div>
            </div>
          </Paper>

          <Paper className="pane">
            <div className="block">
              <h3>Artist</h3>
            </div>
            <Divider />
            <div className="block">
              <p>{ this.props.event.artist }</p>
            </div>
          </Paper>
        </main>
      );
    }
    return <div />;
  }
}

Event.propTypes = {
  event: PropTypes.shape(),
  match: PropTypes.shape().isRequired,
  onComponentDidMount: PropTypes.func,
  history: PropTypes.shape(),
  showMap: PropTypes.bool.isRequired,
  toggleMap: PropTypes.func.isRequired,
  onReceiveChargeResponse: PropTypes.func,
};

Event.defaultProps = {
  event: undefined,
  history: undefined,
  onComponentDidMount: undefined,
  onReceiveChargeResponse: undefined,
};

export default Event;

