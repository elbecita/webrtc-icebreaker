'use strict';

const ResponseHelper = require('./response-helper');

function onStop(_props) {
  console.log('>>>>> STOP event received.');
  const props = _props || {};
  const adapter = props.adapter;
  const clientCb = props.clientCb;
  const event = props.event;
  const data = event.data || {};
  const socket = props.socket;

  adapter.remove(data.connId)
    .then(() => {
      ResponseHelper.success(null, clientCb);
    })
    .catch(error => {
      ResponseHelper.failure(error, clientCb);
    });
}

module.exports = onStop;