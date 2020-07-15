from django.contrib import admin

from .models import Reservation, Room


class ReservationAdmin(admin.ModelAdmin):
    model = Reservation
    list_display = ['user', 'from_date', 'to_date']
    list_select_related = True


class RoomAdmin(admin.ModelAdmin):
    model = Room
    list_display = ['price']


admin.site.register(Reservation, ReservationAdmin)
admin.site.register(Room, RoomAdmin)
