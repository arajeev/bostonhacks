from flask import Flask, request, render_template

application = Flask(__name__)

@application.route('/')
def main_page():
    return render_template('index.html', message='mainpage')

# run the app.
if __name__ == "__main__":
    # Setting debug to True enables debug output. This line should be
    # removed before deploying a production app.
    application.debug = True
    application.run()
