//이미지 thumbnail 변경
async function readImage(input) {
  // 인풋 태그에 파일이 있는 경우
  if(input.files && input.files[0]) {
    // 이미지 파일인지 검사 (생략)
    // FileReader 인스턴스 생성
    const reader = new FileReader()
    // 이미지가 로드가 된 경우
    reader.onload = e => {
      const previewImage = document.getElementById("previewImg")
      previewImage.src = e.target.result
    }
    // reader가 이미지 읽도록 하기
    reader.readAsDataURL(input.files[0])
  }
}
// input file에 change 이벤트 부여
const inputImage = document.getElementById("fileupload")
inputImage.addEventListener("change", e => {
  readImage(e.target)
})

async function uploadFile() {
  let formData = new FormData();
  formData.append("file", fileupload.files[0]);
  let response = await fetch('/upload', {
    method: "POST",
    body: formData
  });


    let path = "/display/" + fileupload.files[0].name;
    console.log(path);
    let res = await fetch('/visit/input?img_path='+path+'&suspect=true', {
      method: "POST",
      body: formData
    });



  if (response.status == 200) {
    alert("File successfully uploaded.");
  }
  if (res.status == 200) {
    alert("db successfully uploaded.");
  }
  console.log(fileupload.files[0])
}
function getDir(){
    $.ajax({
        url:"getDir",
        type: 'post',
        data:{
        },
        success: function(data){
            console.log(data);
        },
        error: function(){
            alert('error');
        }
    })
}