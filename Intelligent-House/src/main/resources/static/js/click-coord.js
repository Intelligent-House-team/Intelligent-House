kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
    const latlng = mouseEvent.latLng;
    alert('클릭한 위치\n위도: ' + latlng.getLat() + '\n경도: ' + latlng.getLng());
});
