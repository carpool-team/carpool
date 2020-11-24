#Api endpoints

Add Ride

[HttpPost]
/api/Rides
body:
```
{
    "ownerId": "00000000-0000-0000-0000-000000000000",
    "participantsIds": [
        "00000000-0000-0000-0000-000000000000"
    ],
    "addStopDTOs": [
        {
            "userId": "00000000-0000-0000-0000-000000000000",
            "coordinates": null
        }
    ],
    "destination": {
        "coordinates": {
            "longitude": 0,
            "latitude": 0,
            "id": "00000000-0000-0000-0000-000000000000"
        },
        "locationName": {
            "name": null,
            "id": "00000000-0000-0000-0000-000000000000"
        },
        "id": "00000000-0000-0000-0000-000000000000"
    },
    "startingLocation": {
        "coordinates": {
            "longitude": 0,
            "latitude": 0,
            "id": "00000000-0000-0000-0000-000000000000"
        },
        "locationName": {
            "name": null,
            "id": "00000000-0000-0000-0000-000000000000"
        },
        "id": "00000000-0000-0000-0000-000000000000"
    }
}
```

Add participant to ride

[HttpPut]
/api/Rides/AddParticipant
body:
```
{
    "participantId": "00000000-0000-0000-0000-000000000000",
    "rideId": "00000000-0000-0000-0000-000000000000"
}
```


