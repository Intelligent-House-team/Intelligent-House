document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (!id) return;

  fetch(`/api/boards/${id}`)
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        alert(data.error);
        return;
      }

      document.getElementById('post-title-left').textContent = data.title;
      document.getElementById('post-date').textContent = data.date;
      document.getElementById('post-body').innerHTML = data.content;
    })
    .catch(err => {
      console.error(err);
      alert('서버 요청 중 오류 발생');
    });
});

function goBack() {
  window.location.href = 'boardList.html';
}