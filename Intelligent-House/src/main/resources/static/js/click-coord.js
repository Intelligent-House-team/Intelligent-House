kakao.maps.event.addListener(map, 'dblclick', function(mouseEvent) {
    // 더블클릭한 위치를 중심으로 지도를 확대합니다
    map.setLevel(map.getLevel() - 1, { anchor: mouseEvent.latLng });
});