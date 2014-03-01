var jitteryApp = angular.module('jitteryApp', []);

jitteryApp.controller('ReviewListCtrl', function ($scope, $http) {

  // Set our reviews object to be empty by default.
  $scope.reviews = [];

  // JSONP to get the current ratings.
  $http.jsonp('http://jitteryjoes.myplanetfellowship.com/api/ratings.jsonp?callback=JSON_CALLBACK').
    success(function(data, status) {
      $scope.reviews = data;
    });

  // Add a new rating to the list.
  $scope.addNewRating = function () {
    // Get the form data from the scope.
    var review = $scope.review;

    // Prepare the data.
    var nodeData = {
      'type': 'review',
      'field_review_comment': {'und': [{'value': review.comment} ]},
      'field_review_rating': {'und': [{'value': review.rating} ]},
      'field_review_item': {'und': {'value': review.item}},
      'field_origin_app': {'und': [{'value': 'QWIRKS'}]}
    };

    // POST the data and create a node.
    $http({url: 'http://jitteryjoes.myplanetfellowship.com/api/node.json', method: 'POST', data: nodeData}).
      success(function(data, status) {
        // Setup data object.
        var review = $scope.review;
        // Add our app id and date in seconds.
        review.app = 'QWIRKS';
        var d = new Date();
        review.node_created = (d.getTime() / 1000);

        // Add the review to the reviews array.
        $scope.reviews.unshift (review);

        // Reset form vars.
        $scope.review = {};
      });
  }

  // Set our "signupSent" flag to false by default.
  $scope.signupSent = false;

  // Add a newsletter signup.
  $scope.addNewSignup = function () {
    // Get the form data from the scope.
    var user = $scope.user;

    // Prepare the data.
    var nodeData = {
      'type': 'signup',
      'field_user_name': {'und': [{'value': user.name} ]},
      'field_user_email': {'und': [{'value': user.email} ]},
      'field_origin_app': {'und': [{'value': 'QWIRKS'}]}
    };

    // POST the data and create a node.
    $http({url: 'http://jitteryjoes.myplanetfellowship.com/api/node.json', method: 'POST', data: nodeData}).
      success(function(data, status) {
        // Set our "signupSent" flag.
        $scope.signupSent = true;
      });
  }
});

$(document).ready(function() {
	$('#allCarousel').carousel({
	interval: false
	})
    
    $('#allCarousel').on('slid.bs.carousel', function() {
    	//alert("slid");
	});
	
	$('#newCarousel').carousel({
	interval: false
	})
    
    $('#newCarousel').on('slid.bs.carousel', function() {
    	//alert("slid");
	});
	$('#topCarousel').carousel({
	interval: false
	})
    
    $('#topCarousel').on('slid.bs.carousel', function() {
    	//alert("slid");
	});
    
    $(".blend").hide();
    $("#topCarousel").hide();
    $("#newCarousel").hide();
    
});



$("#pickCarousel > a").click(function () {
    $(".carousel").hide(); //hide all carousels
    var id = $(this).attr('href');
    //console.log(id);
    $(""+id+"").show(); 
    
    $('html, body').animate({
        scrollTop: $( $.attr(this, 'href') ).offset().top
    }, 500);
    return false; 
});



$('.blend-tab > a').click(function () {
    $(".blend").hide(); //hide all blends
    var id = $(this).attr('href');
    //console.log(id);
    $(""+id+"").show(); 
    
    $('html, body').animate({
        scrollTop: $( $.attr(this, 'href') ).offset().top
    }, 500);
    
     
    if(id == "#afterDinner") $("#review-item-field").val('After Dinner');
    $("#review-item-field").trigger("click");
    
    return false; 
});
