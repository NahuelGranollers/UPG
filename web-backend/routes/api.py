from flask import Blueprint, jsonify
import psutil
import platform
import time
import os

api = Blueprint('api', __name__)

@api.route('/api/servers')
def get_servers():
    # Example static response, replace with your actual server logic
    return jsonify({
        'servers': []
    })

@api.route('/api/stats')
def get_stats():
    process = psutil.Process(os.getpid())
    return jsonify({
        'cpu': psutil.cpu_percent(interval=None),
        'ram': psutil.virtual_memory().percent,
        'process_ram': process.memory_info().rss / 1024 / 1024, # MB
        'uptime': int(time.time() - process.create_time()),
        'platform': f"{platform.system()} {platform.release()}",
        'python_version': platform.python_version()
    })
