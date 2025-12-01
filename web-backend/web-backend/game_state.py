import time

# In-memory state
connected_users = {} # socket_id -> user_data
voice_states = {} # socket_id -> channel_id
impostor_rooms = {} # room_id -> room_data
public_servers = {
    'impostor': {}
}
user_room_map = {} # user_id -> {type, roomId}
trolled_users = {} # user_id -> mode ('uwu', 'meow', 'kawaii')

# Constants
ADMIN_DISCORD_ID = '368377018372456459'
BOT_USER = {
    'id': 'bot',
    'username': 'UPG',
    'avatar': 'https://unaspartidillas.online/upg.png',
    'status': 'online',
    'isBot': True,
    'role': 'bot',
    'color': '#5865F2'
}

connected_users['bot'] = BOT_USER

IMPOSTOR_CATEGORIES = {
  'General': [
    'Manzana', 'Sombrero', 'Pescado', 'Llave', 'Gato', 'Cohete', 'Reloj', 'Libro', 'Sandía', 'Bicicleta',
    'Estatua', 'Calcetín', 'Pastel', 'Ovni', 'Pingüino', 'Mariposa', 'Tiburón', 'Espada', 'Guisante', 'Moneda',
    'Teléfono', 'Camisa', 'Zapato', 'Cámara', 'Silla', 'Mesa', 'Guitarra', 'Piano', 'Auto', 'Helado',
    'Globo', 'RelojDeArena', 'Aguacate', 'Videojuegos', 'Pizza', 'Perro', 'Elefante', 'Jirafa', 'Tortuga'
  ],
  'Fantasía': [
    'Dragón', 'Unicornio', 'Superhéroe', 'Pirata', 'Vaquero', 'Astronauta', 'Mago', 'Princesa', 'Robot', 'Zombie',
    'Vampiro', 'Fantasma', 'Duende', 'Hada', 'Sirena', 'Centauro', 'Minotauro', 'Cíclope', 'Esfinge', 'Quimera',
    'Grifo', 'Fénix', 'Basilisco', 'Mantícora', 'Yeti', 'Bigfoot', 'Alienígena', 'Enano'
  ],
  'Transporte': [
    'Tren', 'Avión', 'Barco', 'Submarino', 'Moto', 'Patineta', 'Bicicleta', 'Monopatín', 'Patinete', 'Carrito',
    'Cohete', 'Helicóptero', 'Globo Aerostático', 'Trineo', 'Carruaje', 'Taxi', 'Autobús', 'Camión'
  ],
  'Objetos': [
    'Muñeca', 'Pelota', 'Cometa', 'Yoyo', 'Balón', 'Raqueta', 'Bate', 'Guante', 'Casco', 'Botas',
    'Bufanda', 'Gorra', 'Lentes', 'Anillo', 'Collar', 'Pulsera', 'Pendientes', 'Cinturón', 'Mochila',
    'Maleta', 'Cartera', 'Paraguas', 'Espejo', 'Peine', 'Cepillo', 'Llave Inglesa', 'Martillo'
  ],
  'Lugares': [
    'Playa', 'Montaña', 'Bosque', 'Desierto', 'Ciudad', 'Pueblo', 'Escuela', 'Hospital', 'Aeropuerto', 'Estación',
    'Parque', 'Cine', 'Teatro', 'Museo', 'Biblioteca', 'Restaurante', 'Hotel', 'Estadio', 'Gimnasio', 'Piscina',
    'Zoológico', 'Granja', 'Castillo', 'Palacio', 'Cueva', 'Isla', 'Volcán', 'Espacio'
  ]
}

IMPOSTOR_WORDS = []
for cat in IMPOSTOR_CATEGORIES.values():
    IMPOSTOR_WORDS.extend(cat)
