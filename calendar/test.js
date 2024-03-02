document.getElementById('memoForm').addEventListener('submit', function(event) {
    event.preventDefault(); // 폼 기본 제출 방지
    const memoContent = document.getElementById('memoText').value;
    console.log("메모 내용:", memoContent); // 실제로는 여기서 메모 내용을 처리 (예: 저장)
    alert('메모가 등록되었습니다: ' + memoContent); // 사용자에게 메모 내용 표시
    // 모달 닫기
    var memoModal = bootstrap.Modal.getInstance(document.getElementById('memoModal'));
    memoModal.hide();
    // 입력 필드 초기화
    document.getElementById('memoText').value = '';
});