(function() {

	var CalculatorViewModel = function() {
		var self = this;

		self.imageSize = ko.observable(0);
		self.focalSize = ko.observable(0);
		self.leftEdge = ko.observable(0);

		self.halfway = ko.computed(function() {
			return self.imageSize() / 2;
		});

		self.sizeDifference = ko.computed(function() {
			return self.imageSize() - self.focalSize();
		});

		self.rightEdge = ko.computed(function() {
			return self.imageSize() - (self.leftEdge() + self.focalSize());
		});

		self.isShiftedLeft = ko.computed(function() {
			return Math.absolute(self.halfway() - self.leftEdge()) > Math.absolute(self.halfway() - self.rightEdge());
		});

		self.leftPercent = ko.computed(function() {
			return self.leftEdge() / self.sizeDifference();
		});

		self.rightPercent = ko.computed(function() {
			return self.rightEdge() / self.sizeDifference();
		});

		self.backgroundSize = ko.computed(function() {
			return self.imageSize() / self.focalSize();
		});

		self.widthToClip = ko.computed(function() {
			if (self.isShiftedLeft()) {
				return self.halfway() - self.leftEdge() * 2;
			} else {
				return self.halfway() - self.rightEdge() * 2;
			}
		});

		self.renderedCss = ko.computed(function() {
			return self.isShiftedLeft();
		});
	};

	document.addEventListener("DOMContentLoaded", function(event) {
		ko.applyBindings(new CalculatorViewModel());
	});

}());