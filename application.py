from flask import Flask, request, render_template
from flask.ext.socketio import SocketIO, emit

application = Flask(__name__)
socketio = SocketIO(application)

@application.route('/')
def main_page():
    #change this to whatever html file you want to run
    return render_template('main.html', message='mainpage')

@socketio.on('my event', namespace='/test')
def test_message(message):
    emit('my response', {'data': message['data']})

@socketio.on('my broadcast event', namespace='/test')
def test_message(message):
    emit('my response', {'data': message['data']}, broadcast=True)

@socketio.on('connect', namespace='/test')
def test_connect():
    emit('my response', {'data': 'Connected'})

@socketio.on('disconnect', namespace='/test')
def test_disconnect():
    print('Client disconnected')

# run the app.
if __name__ == "__main__":
    # Setting debug to True enables debug output. This line should be
    # removed before deploying a production app.
    application.debug = True
    socketio.run(application)
