# Generated by Django 3.0.2 on 2020-07-14 08:31

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Room',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('number', models.CharField(max_length=255, unique=True)),
                ('price', models.DecimalField(decimal_places=2, help_text='Price in EUR', max_digits=8)),
                ('type', models.CharField(choices=[('single', 'Single'), ('double', 'Double'), ('twin', 'Twin')], max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Reservation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('from_date', models.DateField()),
                ('note', models.TextField(max_length=255)),
                ('to_date', models.DateField()),
                ('rooms', models.ManyToManyField(related_name='reservations', to='core.Room')),
            ],
        ),
    ]
