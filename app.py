from flask import Flask
import os
app = Flask(_name_)

@app.route('/')
def hello_geek():
    return '<h1>Hello from Flask & Docker</h1>'
@app.route('/hi')
def hell():
    return '<h1>Hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii from Flask & Docker</h1>'

if _name_ == "_main_":
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
