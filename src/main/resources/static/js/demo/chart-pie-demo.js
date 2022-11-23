// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

// Pie Chart Example-연령대 통계
var ten=10;
var twenty=5;
var thirty=70;
var forty=20;
function callAjax1() {
  return $.ajax({
    type : "GET",
    data : {},
    dataType : "text",
    url : "/chart/searchParamAge?age=10",
    success: function(data){
      ten=parseInt(data);
      console.log(data)
    },
    error: function(err){
      console.log(err);
    }
  });
}
function callAjax2() {
  return $.ajax({
    type : "GET",
    data : {},
    dataType : "text",
    url : "/chart/searchParamAge?age=20",
    success: function(data){
      twenty=parseInt(data);
      console.log(data)
    },
    error: function(err){
      console.log(err);
    }
  });
}
function callAjax3() {
  return $.ajax({
    type : "GET",
    data : {},
    dataType : "text",
    url : "/chart/searchParamAge?age=30",
    success: function(data){
      thirty=parseInt(data);
      console.log(data)
    },
    error: function(err){
      console.log(err);
    }
  });
}
function callAjax4() {
  return $.ajax({
    type : "GET",
    data : {},
    dataType : "text",
    url : "/chart/searchParamAge?age=40",
    success: function(data){
      forty=parseInt(data);
      console.log(data)
    },
    error: function(err){
      console.log(err);
    }
  });
}

var myPieChart;
var ctx;
Promise.all([
    callAjax1(),callAjax2(),callAjax3(),callAjax4()
]).then(start)
function start() {
  ctx=document.getElementById("myPieChart");
  myPieChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ["10대", "20대", "30대","40대"],
      datasets: [{
        data: [ten, twenty, thirty,forty],
        backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc','#ffdb9b'],
        hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf','#ffa800'],
        hoverBorderColor: "rgba(234, 236, 244, 1)",
      }],
    },
    options: {
      maintainAspectRatio: false,
      tooltips: {
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        borderColor: '#dddfeb',
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: false,
        caretPadding: 10,
      },
      legend: {
        display: false
      },
      cutoutPercentage: 80,
    },
  });
}