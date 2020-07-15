from django.db import models


class Reservation(models.Model):
    from_date = models.DateField(
        blank=False,
        null=False,
    )
    note = models.TextField(
        max_length=255,
        blank=False,
    )
    rooms = models.ManyToManyField(
        'core.Room',
        related_name='reservations',
    )
    to_date = models.DateField(
        blank=False,
        null=False,
    )
    user = models.ForeignKey(
        'users.User',
        related_name='reservations',
        null=False,
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return str(self.note)


class Room(models.Model):
    """
    A room in the Hotel
    """

    TYPE_SINGLE = 'single'
    TYPE_DOUBLE = 'double'
    TYPE_TWIN = 'twin'
    TYPE_CHOICES = [
        (TYPE_SINGLE, 'Single'),
        (TYPE_DOUBLE, 'Double'),
        (TYPE_TWIN, 'Twin'),
    ]

    number = models.CharField(
        max_length=255,
        blank=False,
        unique=True,
    )
    price = models.DecimalField(
        max_digits=8,
        decimal_places=2,
        blank=False,
        null=False,
        help_text='Price in EUR',
    )
    type = models.CharField(
        max_length=255,
        blank=False,
        choices=TYPE_CHOICES,
    )

    def __str__(self):
        return str(self.number)
