const fileInput = document.getElementById("fileUpload");

const handleFiles = (e) => {
  const selectedFile = [...fileInput.files];
  const fileReader = new FileReader();
  console.log(selectedFile);

  fileReader.readAsDataURL(selectedFile[0]);

  fileReader.onload = function () {
    document.getElementById("previewImg").src = fileReader.result;
  };
};

fileInput.addEventListener("change", handleFiles);

async function uploadFile() {
  let formData = new FormData();
  formData.append("file", fileupload.files[0]);
  let response = await fetch('/upload', {
    method: "POST",
    body: formData
  });


    let path = "C:__capture__" + fileupload.files[0].name;
    console.log(path);
    let res = await fetch('/visit/insert?img_path='+path+'&suspect=true', {
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