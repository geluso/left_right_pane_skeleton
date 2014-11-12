$(document).ready(function() {
	var sidebarWidths = $("#left").outerWidth() + $("#right").outerWidth();
	var contentWidth = $(document).outerWidth() - sidebarWidths;

	$("#content").width(contentWidth);

	var navHeight = $("#nav").outerHeight();
	var contentHeight = $(document).outerHeight() - navHeight;
	$("#left, #right, #content").height(contentHeight);
});

var app = angular.module('SidebarsApp', []);
app.controller('SidebarsController', ['$scope', function($scope) {
	$scope.leftWidth = 300;
	$scope.rightWidth = 300;

	$scope.leftOpen = true;
	$scope.toggleLeft = function() {
		$scope.leftOpen = !$scope.leftOpen;
		var leftPosition;
		if ($scope.leftOpen) {
			leftPosition = 0;
		} else {
			leftPosition = -$scope.leftWidth;
		}
		$("#left").animate({left: leftPosition + "px"}, 400);
		$scope.contentWidth();
	};

	$scope.rightOpen = true;
	$scope.toggleRight = function() {
		$scope.rightOpen = !$scope.rightOpen;
		var rightPosition;
		if ($scope.rightOpen) {
			rightPosition = 0;
			$("#right").show()
			$("#right").animate({width: "300px"}, 400);
		} else {
			rightPosition = -$scope.rightWidth;
			$("#right").animate({width: "0"}, 400, function() {
				$("#right").hide()
			});
		}
		$scope.contentWidth();
	};

	$scope.contentWidth = function() {
		var contentWidth = $(document).outerWidth();
		var contentPosition = 0;

		if ($scope.leftOpen) {
			contentWidth -= $scope.leftWidth;
			contentPosition += $scope.leftWidth;
		}

		if ($scope.rightOpen) {
			contentWidth -= $scope.rightWidth;
		}

		$("#content").animate({
			left: contentPosition,
			width: contentWidth
		}, 400);
	};
}]);
