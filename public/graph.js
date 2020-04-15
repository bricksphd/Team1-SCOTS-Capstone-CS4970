function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var ctx = document.getElementById('Results').getContext('2d');
var score = sessionStorage.getItem('score');
var data = sessionStorage.getItem('totalTapArray');
var soundOnTime = sessionStorage.getItem('timeWSound');
var soundOffTime = sessionStorage.getItem('timeWOSound');
var cycles = sessionStorage.getItem('cycles');
var bpm = sessionStorage.getItem('bpm');
var total = sessionStorage.getItem('totalTapArray');
data = JSON.parse(data);
console.log(soundOnTime);
console.log(soundOffTime);
console.log(data);
var lastBeat = 0; //Creating the x,y pair array

var chartArray = [];
data.forEach(function (tap) {
  var beat = Math.round(tap.beat / 10) / 100;
  console.log(beat);

  if (beat > lastBeat) {
    lastBeat = beat;
  }

  var delta = Math.round(tap.delta); //Push the value of the beat taking into account the cycle that we're on

  console.log(tap.cycleNumber);
  chartArray.push({
    x: beat + (parseInt(soundOnTime) + parseInt(soundOffTime)) * (tap.cycleNumber - 1),
    y: delta
  });
});
console.log(chartArray);
lastBeat *= cycles;
var yMax = 30000 / bpm;
var yMin = yMax * -1; //Calculate the green, yellow, and red line positions based off of the bpm

var beatTime = 60000 / bpm; //Ensure that the graph extends to include the final beat, since we actually have a half beat extra

lastBeat += 0.5 * (beatTime / 1000);
var greenY = beatTime / 6;
var yellowY = beatTime * 2 / 6;
var greenZonePos = [{
  x: 0,
  y: greenY
}, {
  x: lastBeat,
  y: greenY
}];
var greenZoneNeg = [{
  x: 0,
  y: greenY * -1
}, {
  x: lastBeat,
  y: greenY * -1
}];
var yellowZonePos = [{
  x: 0,
  y: yellowY
}, {
  x: lastBeat,
  y: yellowY
}];
var yellowZoneNeg = [{
  x: 0,
  y: yellowY * -1
}, {
  x: lastBeat,
  y: yellowY * -1
}];
var redZonePos = [{
  x: 0,
  y: yMax
}, {
  x: lastBeat,
  y: yMax
}];
var redZoneNeg = [{
  x: 0,
  y: yMin
}, {
  x: lastBeat,
  y: yMin
}]; //Calculating the sound on/sound off lines

var soundOffLine = [{
  x: soundOnTime,
  y: yMax
}, {
  x: soundOnTime,
  y: yMin
}];
var currentTime = parseInt(soundOnTime);

for (var i = 1; i < cycles; i++) {
  currentTime += parseInt(soundOffTime);
  soundOffLine.push(NaN);
  soundOffLine.push({
    x: currentTime,
    y: yMax
  }, {
    x: currentTime,
    y: yMin
  });
  soundOffLine.push(NaN);
  currentTime += parseInt(soundOnTime);
  soundOffLine.push({
    x: currentTime,
    y: yMax
  }, {
    x: currentTime,
    y: yMin
  });
} //Create the chart


var myChart = new Chart(ctx, {
  type: 'scatter',
  data: {
    fill: true,
    backgroundColor: 'rgba(255, 99, 132, 1)',
    datasets: [{
      order: 0,
      label: 'Accuracy of taps',
      data: chartArray,
      pointStyle: 'rectRot',
      radius: 5,
      hoverRadius: 10,
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1.2
    }, {
      data: greenZonePos,
      borderColor: 'rgba(44, 155, 8, 0.6)',
      borderDash: [5, 15],
      type: 'line',
      showLine: true,
      pointRadius: 0,
      fill: false
    }, {
      data: yellowZonePos,
      borderColor: 'rgba(218, 251, 8, 0.6)',
      borderDash: [5, 15],
      type: 'line',
      showLine: true,
      pointRadius: 0,
      fill: false
    }, {
      data: redZonePos,
      borderColor: 'rgba(194, 33, 9, 0.6)',
      borderDash: [5, 15],
      type: 'line',
      showLine: true,
      pointRadius: 0,
      fill: false
    }, {
      data: greenZoneNeg,
      borderColor: 'rgba(44, 155, 8, 0.6)',
      borderDash: [5, 15],
      type: 'line',
      showLine: true,
      pointRadius: 0,
      fill: false
    }, {
      data: yellowZoneNeg,
      borderColor: 'rgba(218, 251, 8, 0.6)',
      borderDash: [5, 15],
      type: 'line',
      showLine: true,
      pointRadius: 0,
      fill: false
    }, {
      data: redZoneNeg,
      borderColor: 'rgba(194, 33, 9, 0.6)',
      borderDash: [5, 15],
      type: 'line',
      showLine: true,
      pointRadius: 0,
      fill: false
    }, {
      data: soundOffLine,
      borderColor: 'rgba(255, 99, 132, 0.3)',
      borderDash: [5, 15],
      type: 'line',
      showLine: true,
      pointRadius: 0,
      fill: false,
      spanGaps: false
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: false,
          min: yMin,
          max: yMax
        }
      }],
      xAxes: [{
        ticks: {
          max: lastBeat
        }
      }]
    },
    legend: {
      labels: {
        //Only display the label for the accuracy of taps
        filter: function filter(legendItem, data) {
          return legendItem.datasetIndex == 0;
        }
      }
    }
  }
});
var scoreString = document.querySelector("#score");
score *= 100;
score = Math.round(score * 100) / 100;
scoreString.innerHTML = "Score: " + score + "%";

function resetToParamSelect() {
  location = "parameters.html";
  firebase.auth().onAuthStateChanged( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(user) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (user) {
                location = "userdashboard.html";
              }

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
  window.location = location;
}