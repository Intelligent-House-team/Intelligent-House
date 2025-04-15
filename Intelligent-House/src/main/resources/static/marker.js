const container = document.getElementById('map');
const options = {
    center: new kakao.maps.LatLng(37.554722, 126.970833),
    level: 3
};
const map = new kakao.maps.Map(container, options);

const marker = new kakao.maps.Marker({
    position: new kakao.maps.LatLng(37.554722, 126.970833),
    map: map,
    title: '서울역'
});
