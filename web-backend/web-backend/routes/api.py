from flask import Blueprint, jsonify

api = Blueprint('api', __name__)

@api.route('/api/servers')
def get_servers():
    # Example static response, replace with your actual server logic
    return jsonify({
        'servers': [
            {
                'id': 'mc',
                'name': 'Minecraft',
                'ip': 'mc.unaspartidillas.online',
                'port': 25565,
                'status': 'online',
                'players': {'online': 0, 'max': 100},
                'version': '1.21.10'
            }
        ]
    })
