from flask import Flask, render_template

# Initialize values of the flask application.
app = Flask(__name__)

# Serve the index page.
@app.route('/')
def index():
	return render_template('index.html')

if __name__ == '__main__':
	app.debug = True
	app.run()
