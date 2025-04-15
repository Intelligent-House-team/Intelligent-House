if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const locPosition = new kakao.maps.LatLng(lat, lon);

        const geoMarker = new kakao.maps.Marker({
            position: locPosition,
            map: map,
            title: "현재 위치"
        });

        map.setCenter(locPosition);
    });
}
