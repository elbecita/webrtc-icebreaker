'use strict';

const ResponseHelper = require('./response-helper');

/**
* Sends the SDP file received to the other peer.
*/
function onSdp(_props) {
  const props = _props || {};
  const adapter = props.adapter;
  const clientCb = props.clientCb;
  const event = props.event || {};
  const data = event.data || {};
  const socket = props.socket;

  if (data.connId && data.sdp) {
    adapter.get(data.connId)
      .then(connection => {
        if (connection.peers && connection.peers.length > 1) {
          const remoteSocket = (connection.peers[0].id === socket.id) ?
            connection.peers[1] : connection.peers[0];
          const socketMessage = {
            data: { connId: data.connId, sdp: data.sdp }
          };
          // TODO: fix events being undefined here
          remoteSocket.emit('icebreaker.io.remoteSdp', socketMessage);
          ResponseHelper.success(null, clientCb);
        }
      })
      .catch(error => {
        ResponseHelper.failure(error, clientCb);
      });
  } else {
    const error = 'Missing data in socket message. connId and sdp fields are expected.';
    ResponseHelper.failure(error, clientCb);
  }
}

module.exports = onSdp;
