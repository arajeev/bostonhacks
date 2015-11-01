from flask import Flask, request, render_template

app = Flask(__name__)

@app.route('/')
def main_page():
    return render_template('index.html', message='mainpage')

# run the app.
if __name__ == "__main__":
    # Setting debug to True enables debug output. This line should be
    # removed before deploying a production app.
    app.debug = True
    app.run()
