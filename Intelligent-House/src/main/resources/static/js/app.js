var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
var options = { //지도를 생성할 때 필요한 기본 옵션
	center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
	level: 3 //지도의 레벨(확대, 축소 정도)
};

var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

let isHybrid = false; // 현재 상태 추적

function toggleMapType() {
    if (isHybrid) {
        map.setMapTypeId(kakao.maps.MapTypeId.ROADMAP); // 일반 지도
    } else {
        map.setMapTypeId(kakao.maps.MapTypeId.HYBRID); // 위성 지도 + 도로 정보
    }
    isHybrid = !isHybrid;
}
