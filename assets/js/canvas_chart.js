$(document).ready(function(){
  var ctx = document.getElementById("myChart").getContext("2d");
  var past_json = [ {"date": "3", "value": 100}, {"date": "4", "value": 3}, {"date": "4", "value": 13}, {"date": "4", "value": 33}];
  var predict_json = [ {"date": "3", "value": 20}, {"date": "4", "value": 4}, {"date": 4, "value": 1}, {"date": "4", "value": 21}];
  var mod_json = [{"date": "3", "value": 10}, {"date": "4", "value": 32}, {"date": "4", "value": 3}, {"date": "4", "value": 14}];

  var past = past_json;
  var past_data = [];
  for (var i = 0; i < past.length; i++) {
    var obj = past[i];
    past_data.push(obj["value"]);
  }

  var predicted = predict_json;
  var predict_data = [];
  for (var i = 0; i < predicted.length; i++) {
    var obj = predicted[i];
    predict_data.push(obj["value"]);
  }
  var modified = mod_json;
  var modified_data = [];
  for (var i = 0; i < modified.length; i++) {
    var obj = modified[i];
    modified_data.push(obj["value"]);
  }

  var Labels = [];
  Labels.push("June");
  for (var i = 0; i < 30; i++) {
     Labels.push("");
  }
  Labels.push("July");
  for (var i = 0; i < 30; i++) {
     Labels.push("");
  }
  Labels.push("August");
  for (var i = 0; i < 30; i++) {
     Labels.push("");
  }

  function modified_color(a) {
        if (a.length > 0) {return "rgba(0, 51, 255, 0.5)";}
        else {return "rgba(150, 150, 150, 0)";}}

  var mod_color = modified_color(modified_data);

     var data = {
        labels: Labels,

        datasets : [
           {
                    fillColor: "#349D52",
                    strokeColor: "#349D52",
                    pointColor: "#349D52",
                    pointStrokeColor: "#349D52",
                    data: past_data
           },
           {
                    fillColor: "#75A3A3",
                    strokeColor: "#75A3A3",
                    pointColor: "#75A3A3",
                    pointStrokeColor: "#75A3A3",
                    data: predict_data
           },
           {
                    fillColor: mod_color,
                    strokeColor: mod_color,
                    pointColor: mod_color,
                    pointStrokeColor: mod_color,
                    data: modified_data
           }
        ]
     };


  var options = { scaleShowGridLines: false, pointDot: false, animation: false};

     var myNewChart = new Chart(ctx).Line(data, options);
});
