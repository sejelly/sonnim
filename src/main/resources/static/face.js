Promise.all([
  faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
  faceapi.nets.ssdMobilenetv1.loadFromUri('./models'),
  faceapi.nets.faceExpressionNet.loadFromUri('./models'),
  faceapi.nets.ageGenderNet.loadFromUri('./models')
]).then(start)
let captureBtn = document.getElementById('captureBtn')
let imgURL;
let dct;
let lastImgName;
function nameVideo(){       //video 파일 이름
    var today = new Date();
    var hours = ('0' + today.getHours()).slice(-2);
    var minutes = ('0' + today.getMinutes()).slice(-2);
    var seconds = ('0' + today.getSeconds()).slice(-2);
    var timeString = hours + '_' + minutes  + '_' + seconds;
    return "/display/"+timeString+".jpg"
}
async function sreenShot() {
		html2canvas(captureDiv).then(function(canvas) {
			myImg = imgURL.replace("data:image/png;base64,", "");
			var today = new Date();
            var hours = ('0' + today.getHours()).slice(-2);
            var minutes = ('0' + today.getMinutes()).slice(-2);
            var seconds = ('0' + today.getSeconds()).slice(-2);
            var timeString = hours + '_' + minutes  + '_' + seconds;
			const result = await $.ajax({
				type : "POST",
				data : {
					"imgSrc" : myImg,
					"fileName": timeString
				},
				dataType : "text",
				url : "/ImgSaveTest.do",
			});
			return result;
		});

}
function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
}
function loadLabeledImages() {              //사진을 통해 학습시킴
  const labels = ['seyoung']
  return Promise.all(
    labels.map(async label => {
      const descriptions = []
      var path = window.location.pathname;
      console.log
      for (let i = 1; i <= 2; i++) {
        const img = await faceapi.fetchImage(`/labeled_images/${label}/${i}.jpg`)
        const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
        descriptions.push(detections.descriptor)
      }
      return new faceapi.LabeledFaceDescriptors(label, descriptions)
    })
  )
}
async function start() {
  const labeledFaceDescriptors = await loadLabeledImages()
  const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.5)
  let image
  let canvas
  console.log('Loaded')
  captureBtn.addEventListener('click', async () => {
    takePhoto()
    await sreenShot()
    image = await faceapi.fetchImage(nameVideo())
    const detections = await faceapi.detectSingleFace(image).withFaceLandmarks().withFaceDescriptors().withFaceExpressions().withAgeAndGender();
    dct = detections
  })
}
async function sleep(ms) {
  const wakeUpTime = Date.now() + ms;
  while (Date.now() < wakeUpTime) {}
}


var video = document.querySelector("#videoElement");
let picFile;
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
async function takePhoto(){
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
        const imageURL = canvas.toDataURL('image/jpg');
        imgURL=imageURL
    }).catch(function (err) {
        console.log(err);
    });



}