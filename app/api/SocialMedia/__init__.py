from flask import Flask
from .timeline import create_timeline_blueprint
from .timeline import create_new_thread_blueprint
from .thread import create_thread_blueprint
from .thread import create_comments_blueprint

def register_social_media_blueprints(app: Flask):
    app.register_blueprint(create_timeline_blueprint, url_prefix='/api/social-media')
    app.register_blueprint(create_new_thread_blueprint, url_prefix='/api/social-media')
    app.register_blueprint(create_thread_blueprint, url_prefix='/api/social-media')
    app.register_blueprint(create_comments_blueprint, url_prefix='/api/social-media')