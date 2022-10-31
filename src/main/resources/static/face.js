var video = document.querySelector("#videoElement");

if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
            video.srcObject = stream;
        })
        .catch(function (err0r) {
            console.log("Something went wrong!");
        });
}

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
    }).catch(function (err) {
        console.log(err);
    });

}