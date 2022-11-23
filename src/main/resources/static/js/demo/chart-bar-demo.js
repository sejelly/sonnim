// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';
//두번째
var one,two,three,four,five,six;
one=1;
two=1;
three=1;
four=1;
five=1;
six=1;
function callAjax5() {
  return $.ajax({
    type : "GET",
    data : {},
    dataType : "json",
    url : "/chart/searchData",
    success: function(data){
      console.log(data);
      var list = [0,0,0,0,0,0]
      for (var i =0; i<data.length;i++){
        if (data[i]['gender']=='none'){
          continue
        }
        var hour = new Date(data[i]['visitedTime']).getHours()
        console.log(hour)

        if(hour<4){
          list[0]+=1
        }
        else if(hour<8){
          list[1]+=1
        }
        else if(hour<12){
          list[2]+=1
        }
        else if(hour<16){
          list[3]+=1
        }
        else if(hour<20){
          list[4]+=1
        }
        else {
          list[5]+=1
        }
      }
      one=list[0]
      two=list[1]
      three=list[2]
      four=list[3]
      five=list[4]
      six=list[5]
    }});
}
function number_format(number, decimals, dec_point, thousands_sep) {
  // *     example: number_format(1234.56, 2, ',', ' ');
  // *     return: '1 234,56'
  number = (number + '').replace(',', '').replace(' ', '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function(n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}

// Bar Chart Example
var ctx1 = document.getElementById("myBarChart");
Promise.all([
  callAjax5()
]).then(start)
function start(){
var myBarChart = new Chart(ctx1, {
  type: 'bar',
  data: {
    labels: ["0-4시", "4-8시", "8-12시", "12-16시", "16-20시", "20-24시"],
    datasets: [{
      label: "방문자",
      backgroundColor: "#4e73df",
      hoverBackgroundColor: "#2e59d9",
      borderColor: "#4e73df",
      data: [one, two, three, four, five, six],
    }],
  },
  options: {
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 10,
        right: 25,
        top: 25,
        bottom: 0
      }
    },
    scales: {
      xAxes: [{
        time: {
          unit: '시간대'
        },
        gridLines: {
          display: false,
          drawBorder: false
        },
        ticks: {
          maxTicksLimit: 6
        },
        maxBarThickness: 25,
      }],
      yAxes: [{
        ticks: {
          min: 0,
          max: Math.max(one,two,three,four,five,six),
          maxTicksLimit: 5,
          padding: 10,
          // Include a dollar sign in the ticks
          callback: function(value, index, values) {
            return  number_format(value)+'명';
          }
        },
        gridLines: {
          color: "rgb(234, 236, 244)",
          zeroLineColor: "rgb(234, 236, 244)",
          drawBorder: false,
          borderDash: [2],
          zeroLineBorderDash: [2]
        }
      }],
    },
    legend: {
      display: false
    },
    tooltips: {
      titleMarginBottom: 10,
      titleFontColor: '#6e707e',
      titleFontSize: 14,
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      caretPadding: 10,
      callbacks: {
        label: function(tooltipItem, chart) {
          var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
          return datasetLabel + number_format(tooltipItem.yLabel)+'명';
        }
      }
    },
  }
});
}