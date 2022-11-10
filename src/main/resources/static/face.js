var video = document.querySelector("#videoElement");
var file;
if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
            video.srcObject = stream;
        })
        .catch(function (err0r) {
            console.log("Something went wrong!");
        });
}
// 웹캠비디오실행

const captureDiv = document.getElementById('captureDiv');
function takePhoto(){
    makeDivToImageFile(captureDiv);
}
function saveAs(url, fileName) {
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function makeDivToImageFile(captureDiv) {

    html2canvas(captureDiv, {
        allowTaint: true,
        useCORS: true,

        /* 아래 3 속성이 canvas의 크기를 정해준다. */
        width: captureDiv.offsetWidth,
        height: captureDiv.offsetHeight,
        scale: 1
    }).then(function (canvas) {
        const imageURL = canvas.toDataURL('image/jpeg');
        // saveAs(imageURL, 'new file.jpg');
        console.log(imageURL);

        let blobBin = atob(imageURL.split(',')[1]); //data 디코딩
        let array = [];
        for(let i = 0; i <blobBin.length;i++){array.push(blobBin.charCodeAt(i));}
        file = new Blob([new Uint8Array(array)],{type: 'image/jpeg'}); //블롭 생성

    }).catch(function (err) {
        console.log(err);
    });
}

async function uploadFile() {

    let formData = new FormData();
    formData.append("file", file);
    let response = await fetch('/upload', {
        method: "POST",
        body: formData,
        processData : false,	// data 파라미터 강제 string 변환 방지!!
        contentType : false,	// application/x-www-form-urlencoded; 방지!!
    });

    //
    // let path = "C:__Users_sejelly__OneDrive__Desktop__imgSonnim__" + fileupload.files[0].name;
    let path = "C:__Users_sejelly__OneDrive__Desktop__imgSonnim__";
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

}