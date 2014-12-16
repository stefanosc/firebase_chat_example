var myDataRef = new Firebase('https://incandescent-heat-1685.firebaseio.com/');
var saveMessage = function (e) {
  if (e.keyCode == 13 || e.target.id === "chat-btn" ) {
    e.preventDefault();
    var name = $('#nameInput').val();
    var text = $('#messageInput').val();
    myDataRef.push({name: name, text: text});
    $('#messageInput').val('');
  }
};

function displayChatMessage(name, text) {
  $('<div/>').text(text).prepend($('<em/>').text(name+': ')).appendTo($('#messagesDiv'));
  $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
}

$('#messageInput').keypress(saveMessage);
$('#chat-btn').click(saveMessage);

myDataRef.on('child_added', function(snapshot) {
  var message = snapshot.val();
  displayChatMessage(message.name, message.text);
});