document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('addressInput');
    const searchButton = document.getElementById('searchButton');
    const places = new kakao.maps.services.Places();

    searchButton.addEventListener('click', function() {
        const keyword = searchInput.value.trim();

        if (keyword) {
            places.keywordSearch(keyword, function(data, status, pagination) {
                if (status === kakao.maps.services.Status.OK) {
                    // 검색 결과가 있으면 첫 번째 결과의 좌표를 기준으로 지도 이동
                    const coords = new kakao.maps.LatLng(data[0].y, data[0].x);
                    window.map.setCenter(coords);
                    window.map.setLevel(3); // 초기 확대 레벨 설정 (선택 사항)
                } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
                    alert('검색 결과가 없습니다.');
                } else {
                    alert('검색 서비스에 오류가 발생했습니다.');
                }
            });
        }
        // 검색어가 비어 있으면 아무 동작도 하지 않음
    });
});