from flask import Flask, request, render_template
from flask_socketio import SocketIO

application = Flask(__name__)

@application.route('/')
def main_page():
    #change this to whatever html file you want to run
    return render_template('index.html', message='mainpage')

# run the app.
if __name__ == "__main__":
    # Setting debug to True enables debug output. This line should be
    # removed before deploying a production app.
    application.debug = True
    application.run()
