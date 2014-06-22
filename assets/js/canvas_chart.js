$(document).ready(function(){
  generateGraph = function(){
    var ctx = document.getElementById("myChart").getContext("2d");
    var input_log;
    $.get('/js/output1.txt').promise().done(function(data1){
      $.get('/js/output2.txt').promise().done(function(data2){
        input_log1 = data1;
        input_log2 = data2;
        var past_json = [
          {"date": "2014-05-22", "value": 2000},
          {"date": "2014-05-23", "value": 2350},
          {"date": "2014-05-24", "value": 2500},
          {"date": "2014-05-25", "value": 2750},
          {"date": "2014-05-26", "value": 2750},
          {"date": "2014-05-27", "value": 2600},
          {"date": "2014-05-28", "value": 2500},
          {"date": "2014-05-29", "value": 2000},
          {"date": "2014-05-30", "value": 2300},
          {"date": "2014-05-31", "value": 2500},
          {"date": "2014-06-01", "value": 1500},
          {"date": "2014-06-02", "value": 1600},
          {"date": "2014-06-03", "value": 1100},
          {"date": "2014-06-04", "value": 700},
          {"date": "2014-06-05", "value": 200},
          {"date": "2014-06-06", "value": 350},
          {"date": "2014-06-07", "value": 500},
          {"date": "2014-06-08", "value": 700},
          {"date": "2014-06-09", "value": 700},
          {"date": "2014-06-10", "value": 750},
          {"date": "2014-06-11", "value": 800},
          {"date": "2014-06-12", "value": 300},
          {"date": "2014-06-13", "value": 300},
          {"date": "2014-06-14", "value": 400},
          {"date": "2014-06-15", "value": 500},
          {"date": "2014-06-16", "value": 700},
          {"date": "2014-06-17", "value": 900},
          {"date": "2014-06-18", "value": 1100},
          {"date": "2014-06-19", "value": 800},
          {"date": "2014-06-20", "value": 850},
          {"date": "2014-06-21", "value": 1000}
          ];
        var predict_json = [
          {"date": "2014-05-22", "value": 0},
          {"date": "2014-05-23", "value": 0},
          {"date": "2014-05-24", "value": 0},
          {"date": "2014-05-25", "value": 0},
          {"date": "2014-05-26", "value": 0},
          {"date": "2014-05-27", "value": 0},
          {"date": "2014-05-28", "value": 0},
          {"date": "2014-05-29", "value": 0},
          {"date": "2014-05-30", "value": 0},
          {"date": "2014-05-31", "value": 0},
          {"date": "2014-06-01", "value": 0},
          {"date": "2014-06-02", "value": 0},
          {"date": "2014-06-03", "value": 0},
          {"date": "2014-06-04", "value": 0},
          {"date": "2014-06-05", "value": 0},
          {"date": "2014-06-06", "value": 0},
          {"date": "2014-06-07", "value": 0},
          {"date": "2014-06-08", "value": 0},
          {"date": "2014-06-09", "value": 0},
          {"date": "2014-06-10", "value": 0},
          {"date": "2014-06-11", "value": 0},
          {"date": "2014-06-12", "value": 0},
          {"date": "2014-06-13", "value": 0},
          {"date": "2014-06-14", "value": 0},
          {"date": "2014-06-15", "value": 0},
          {"date": "2014-06-16", "value": 0},
          {"date": "2014-06-17", "value": 0},
          {"date": "2014-06-18", "value": 0},
          {"date": "2014-06-19", "value": 0},
          {"date": "2014-06-20", "value": 0},
          {"date": "2014-06-21", "value": 1000}
          ];
        var mod_json = [
          {"date": "2014-05-22", "value": 0},
          {"date": "2014-05-23", "value": 0},
          {"date": "2014-05-24", "value": 0},
          {"date": "2014-05-25", "value": 0},
          {"date": "2014-05-26", "value": 0},
          {"date": "2014-05-27", "value": 0},
          {"date": "2014-05-28", "value": 0},
          {"date": "2014-05-29", "value": 0},
          {"date": "2014-05-30", "value": 0},
          {"date": "2014-05-31", "value": 0},
          {"date": "2014-06-01", "value": 0},
          {"date": "2014-06-02", "value": 0},
          {"date": "2014-06-03", "value": 0},
          {"date": "2014-06-04", "value": 0},
          {"date": "2014-06-05", "value": 0},
          {"date": "2014-06-06", "value": 0},
          {"date": "2014-06-07", "value": 0},
          {"date": "2014-06-08", "value": 0},
          {"date": "2014-06-09", "value": 0},
          {"date": "2014-06-10", "value": 0},
          {"date": "2014-06-11", "value": 0},
          {"date": "2014-06-12", "value": 0},
          {"date": "2014-06-13", "value": 0},
          {"date": "2014-06-14", "value": 0},
          {"date": "2014-06-15", "value": 0},
          {"date": "2014-06-16", "value": 0},
          {"date": "2014-06-17", "value": 0},
          {"date": "2014-06-18", "value": 0},
          {"date": "2014-06-19", "value": 0},
          {"date": "2014-06-20", "value": 0},
          {"date": "2014-06-21", "value": 1000}
          ];
        input_log1 = eval(input_log1);
        predict_json = predict_json.concat(input_log1);

        input_log2 = eval(input_log2);
        if(input_log2){
          mod_json = mod_json.concat(input_log2);
        }

        console.log(predict_json);
        console.log(mod_json);

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
                 },
                 {
                          fillColor: "#349D52",
                          strokeColor: "#349D52",
                          pointColor: "#349D52",
                          pointStrokeColor: "#349D52",
                          data: past_data
                 }
              ]
           };


        var options = { scaleShowGridLines: false, pointDot: false, animation: false};

           var myNewChart = new Chart(ctx).Line(data, options);
      });
    });
  }
  // var loci = $(location).attr('href').split('/');
  // console.log(loci);
  // if(loci[loci.length - 1] == '' || loci[loci.length - 1] == '#' || loci[loci.length - 1] == 'compare'){
    //$('.attack').append('<div class="box column twelve graph"></div>');
    //$('.box').append('<canvas id="myChart" width="940px" height="480px"></canvas>');
    generateGraph();
  //}
});
