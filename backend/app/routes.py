from flask import Flask, jsonify, Blueprint, request
from flask_cors import CORS, cross_origin
import os

import requests

routes = Blueprint('app', __name__)

WALLHAVEN_API_URL = os.getenv('WALLHAVEN_API_URL', 'https://wallhaven.cc/api/v1/search')

@routes.route("/home", methods=['GET'])
@cross_origin()
def home():
    page = request.args.get('page', 1, type=int)
    url = WALLHAVEN_API_URL
    params = {
        'q': 'anime',
        'categories': 'anime',
        'purity': 'sfw',
        'page': page,
        'per_page': 24
    }
    response = requests.get(url, params=params)
    if response.status_code == 200:
        data = response.json()
        image_urls = []
        for img in data.get("data", []):
            thumb = img.get("thumbs", {}).get("large")
            path = img.get("path")
            if not (thumb and path):
                continue

            image_id = img.get("id")
            ext = path.split(".")[-1]
            subfolder = image_id[:2]

            full = f"https://w.wallhaven.cc/full/{subfolder}/wallhaven-{image_id}.{ext}"

            image_urls.append({
                "thumb": thumb,
                "full": full
            })

        if not image_urls:
            return jsonify({'error': 'No images found'}), 404
        return jsonify(image_urls)
    
    
    return jsonify({'error': 'Failed to fetch data from Wallhaven'}), response.status_code
    

@routes.route("/search", methods=['GET'])
@cross_origin() 
def search():
    query = request.args.get('query', '')
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 24, type=int)
    
    url = WALLHAVEN_API_URL
    params = {
        'q': query,
        'categories': 'anime',
        'purity': 'sfw',
        'page': page,
        'per_page': per_page
    }

    response = requests.get(url, params=params)
    if response.status_code != 200:
        return jsonify({'error': 'Failed to fetch data from Wallhaven'}), response.status_code

    data = response.json()
    image_urls = []

    for img in data.get("data", []):
        thumb = img.get("thumbs", {}).get("large")
        path = img.get("path")
        if not (thumb and path):
            continue

        image_id = img.get("id")
        ext = path.split(".")[-1]
        subfolder = image_id[:2]

        full = f"https://w.wallhaven.cc/full/{subfolder}/wallhaven-{image_id}.{ext}"

        image_urls.append({
            "thumb": thumb,
            "full": full
        })

    if not image_urls:
        return jsonify({'error': 'No images found for the given query'}), 404

    return jsonify(image_urls)
