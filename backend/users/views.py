from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAdminUser
from .models import User
from .serializers import UserSerializer


class UserView(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsAdminUser,)
