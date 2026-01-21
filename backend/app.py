import asyncio
from PIL import Image
import pytesseract
import os
from googletrans import Translator

from flask import Flask, render_template,request

app = Flask(__name__)


@app.route("/")
def index():
    if os.path.exists('/app/identify.png'):
        os.remove('/app/identify.png')
    #return pytesseract.image_to_string(Image.open('ml-test.png'))
    return render_template('index.html')

@app.route('/identify')
def identify():
    image = Image.open('/app/identify.png').convert('L')
    text = pytesseract.image_to_string(image, lang='kor+eng+jpn+chi_sim+chi_tra')
    
    if text.strip():
        translator = Translator()
        translated = asyncio.run(translator.translate(text, dest='en'))  # await coroutine
        return translated.text
    else:
        return "No text found."


@app.route('/upload', methods=['POST'])
def upload():
   if 'file' not in request.files:
        return 'No file part'
    
   file = request.files['file']

   if file.filename == '':
        return 'No selected file'

   #file.save(file.filename)
   file.save('/app/identify.png')
   return pytesseract.image_to_string(Image.open('/app/identify.png'))
   #return 'File uploaded successfully'
