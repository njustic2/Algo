
import cgi
import webapp2
import jinja2
import os

import json
import urllib
from google.appengine.api import urlfetch

JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.abspath('.')),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)

class MainPage(webapp2.RequestHandler):
	def get(self):
		template = JINJA_ENVIRONMENT.get_template('/index.html')
		self.response.write(template.render())

application = webapp2.WSGIApplication([
	('/', MainPage)
], debug=True)