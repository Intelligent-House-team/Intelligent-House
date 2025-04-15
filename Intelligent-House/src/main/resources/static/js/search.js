const ps = new kakao.maps.services.Places();

ps.keywordSearch('카카오프렌즈샵', function (data, status, _pagination) {
    if (status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(data[0].y, data[0].x);
        map.setCenter(coords);

        const searchMarker = new kakao.maps.Marker({
            map: map,
            position: coords,
            title: data[0].place_name
        });
    }
});
