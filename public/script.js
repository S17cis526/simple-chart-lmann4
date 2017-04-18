$(function() {
  var peerReviewCanvas = $('#peer-review')[0]
  var peerReviewCtx = peerReviewCanvas.getContext('2d');
  var colors = [
    "pink",
    "green",
    "red",
    "blue",
    "orange",
    "purple",
    "yellow"
  ]

  peerReviewCtx.strokeText("Peer Review", 90, 10);
  for (var i=0; i < 11; i++) {
    peerReviewCtx.fillText(10 - i, 10, 30 + i * 20);
    peerReviewCtx.moveTo(25, 30 + i * 20);
    peerReviewCtx.lineTo(90, 30 + i * 20);
  }
  peerReviewCtx.stroke();

  $.ajax({
    url: '/peerReview.json',
    success: function(data) {
      data = JSON.parse(data);
      var categories = Object.keys(data);
      console.log(categories);
      categories.forEach(function(category, index) {
        var value = data[category];
        var x = 30 + index * 10;
        var y = 30 + (10 - value) * 20;
        var height = value * 20;
        peerReviewCtx.fillStyle = colors[index];
        peerReviewCtx.fillRect(x, y, 5, height);
        peerReviewCtx.fillRect(100, 80 + 20 * index, 10, 10);
        peerReviewCtx.strokeText(category, 120, 90 + 20 * index);
      });
    }
  });

  var pointDistributionCanvas = $('#point-distribution')[0];
  var pointDistributionCtx = pointDistributionCtx.getContext('2d');
  $.ajax({
    url: '/pointDistribution.json';
    success = function(data) {
      data = JSON.parse(data);
      var people = Object.keys(data);
      var total = Object.values(data).reduce(function(acc, value) {
        return acc + value;
      });
      var start = 0;
      var end = 0;
      people.forEach(person, i) {
        var percent = data[person] / total;
        var end = angle + percent * 2 * Math.PI;
        pointDistributionCtx.arc(100, 100, 80, angle, end);
        start = end;
      }
    }
  })
});
