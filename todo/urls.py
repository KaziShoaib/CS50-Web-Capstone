from .models import Todo
from rest_framework import routers
from .api import TodoView


router = routers.DefaultRouter()
router.register('api/todos', TodoView, 'todos')
urlpatterns = router.urls
