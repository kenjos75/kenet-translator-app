from flask import Blueprint, request, jsonify
import asyncio
from googletrans import Translator
from PIL import Image
import pytesseract
import io

v1_identify = Blueprint("v1_identify", __name__)

@v1_identify.route("/identify", methods=["POST"])
def identify():

    if "file" not in request.files:
        return jsonify({
            "status": "error",
            "message": "No file provided"
        }), 400

    file = request.files["file"]

    if file.filename == "":
        return jsonify({
            "status": "error",
            "message": "Empty filename"
        }), 400

    try:
        image_bytes = file.read()
        image = Image.open(io.BytesIO(image_bytes)).convert("L")

        text = pytesseract.image_to_string(
            image,
            lang="kor+eng+jpn+chi_sim+chi_tra"
        ).strip()

        if not text:
            return jsonify({
                "status": "ok",
                "result": "",
                "message": "No text found in image"
            })

        translator = Translator()
        translated = asyncio.run(
            translator.translate(text, dest="en")
        )

        return jsonify({
            "status": "ok",
            "original_text": text,
            "translated_text": translated.text
        })

    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500