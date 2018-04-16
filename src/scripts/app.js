window.onload = function() {

  var form = document.getElementById('message-form');
  var messagesList = document.getElementById('messages');
  var socketStatus = document.getElementById('status');
  var closeBtn = document.getElementById('close');

  // Create a new WebSocket.
  var socket = new WebSocket('wss://www.cryptofacilities.com/ws/v1');

  // Show a connected message when the WebSocket is opened.
  socket.onopen = function(event) {
    socketStatus.innerHTML = 'Connection established';
    socketStatus.className = 'open';
  };
    // Error message if there is no data
  socket.onerror = function(error) {
  socketStatus.innerHTML = 'Nothing to display. Please try again.';
  console.log('WebSocket Error: ' + error);
  };

// Send message to websocket to initiate process
form.onsubmit = function(e) {
  socketStatus.innerHTML = 'Displaying Data';
  socketStatus.className = 'open';
  var message = '{"event":"subscribe","feed":"trade","product_ids":["FI_XBTUSD_180615"]}';
  socket.send(message);
  //avoid cannot post
  return false;
};

  // Display messages sent by the server.
  socket.onmessage = function(event) {
    var message = event.data;
    var test = JSON.parse(message);
    for (var i=0; i<message.length; i++) {
      messagesList.innerHTML += '<li class="received">'
      + '<span class="title">' + 'Product ID:' + '</span>' + test.trades[i].product_id
      + '<span class="title">' + 'Quantity: ' + '</span>' + test.trades[i].qty
      + '<span class="title">' + 'Price:'+ '</span>' + test.trades[i].price
      + '</li>';
    }

  };

  // Close the WebSocket connection when the close button is clicked.
  closeBtn.onclick = function(e) {
    socketStatus.innerHTML = 'Connection closed';
    socketStatus.className = 'closed';
    messagesList.innerHTML = '';
    return false;
  };
};
