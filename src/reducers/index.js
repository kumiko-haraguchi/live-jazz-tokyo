import {
  INITIALIZE_EVENT_DATA, SET_SELECTED_EVENT, CLEAR_SELECTED_EVENT, SET_USER_LOCATION, SET_CHARGE_RESPONSE, SET_ADD_EVENT_RESPONSE, SET_SELECTED_TAB, SET_ORDER_HISTORY, SET_EVENT_DETAILS, SET_USER_PROFILE, CLEAR_USER_PROFILE, SET_JWT, SHOW_MAP, SET_CREDIT_CARD_ERROR } from '../config/const';

const initialState = {
  events: [],
  selectedEvent: {},
  eventDetails: undefined,
  showMap: false,
  userLocation: {},
  chargeResponse: undefined,
  addEventResponse: undefined,
  userProfile: undefined,
  jwt: undefined,
  orders: [],
  selectedTab: 'profile',
  creditCardError: false,
};

const reducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case '@@redux/INIT':
      newState = state;
      break;
    case INITIALIZE_EVENT_DATA:
      newState = Object.assign({}, state, { events: action.data });
      break;
    case SET_SELECTED_EVENT:
      newState = Object.assign({}, state, { selectedEvent: action.event });
      break;
    case CLEAR_SELECTED_EVENT:
      newState = Object.assign({}, state, { selectedEvent: {} });
      break;
    case SET_EVENT_DETAILS:
      newState = Object.assign({}, state, { eventDetails: action.event });
      break;
    case SET_USER_LOCATION:
      newState = Object.assign({}, state, { userLocation: action.position });
      break;
    case SET_CHARGE_RESPONSE:
      newState = Object.assign({}, state, { chargeResponse: action.chargeResponse });
      break;
    case SET_ADD_EVENT_RESPONSE:
      newState = Object.assign({}, state, { addEventResponse: action.addEventResponse });
      break;
    case SHOW_MAP:
      newState = Object.assign({}, state, { showMap: !state.showMap });
      break;
    case SET_USER_PROFILE:
      newState = Object.assign({}, state, { userProfile: action.userProfile });
      break;
    case CLEAR_USER_PROFILE:
      newState = Object.assign({}, state, {
        jwt: undefined,
        userProfile: undefined,
        orders: [],
      });
      break;
    case SET_SELECTED_TAB:
      newState = Object.assign({}, state, { selectedTab: action.selectedTab });
      break;
    case SET_ORDER_HISTORY:
      newState = Object.assign({}, state, { orders: action.orders });
      break;
    case SET_CREDIT_CARD_ERROR:
      newState = Object.assign({}, state, { creditCardError: !state.creditCardError });
      break;
    case SET_JWT:
      newState = Object.assign({}, state, { jwt: action.jwt });
      break;
    default:
      console.log('UNKNOWN ACTION', action.type);
      newState = state;
      break;
  }
  return newState;
};

export default reducer;
