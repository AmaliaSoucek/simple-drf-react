from rest_framework import serializers

from .models import Reservation, Room


class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = ('id', 'user', 'from_date', 'to_date', 'note', 'rooms',)
        read_only_fields = ('user',)


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('id', 'number', 'type', 'price',)
