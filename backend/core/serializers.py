from rest_framework import serializers

from users.serializers import UserSerializer
from .models import Reservation, Room


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('id', 'number', 'type', 'price',)


class ReservationSerializer(serializers.ModelSerializer):
    rooms_details = RoomSerializer(many=True, source='rooms', read_only=True)
    user_details = UserSerializer(source='user', read_only=True)

    class Meta:
        model = Reservation
        fields = (
            'id', 'user', 'from_date', 'to_date', 'note', 'rooms',
            'rooms_details', 'user_details'
        )
