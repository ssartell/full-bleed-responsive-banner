(function() {

	var model = {
		imageSize: ko.observable(0),
		focalSize: ko.observable(0),
		leftEdge: ko.observable(0),

		halfway: ko.computed(function() {
			return this.imageSize() / 2;
		}),

		sizeDifference: ko.computed(function() {
			return this.imageSize() - this.focalSize();
		}),

		rightEdge: ko.computed(function() {
			return this.imageSize() - (this.leftEdge() + this.focalSize());
		}),

		leftPercent: ko.computed(function() {
			return this.leftEdge() / this.sizeDifference();
		}),

		rightPercent: ko.computed(function() {
			return this.rightEdge() / this.sizeDifference();
		}),

		backgroundSize: ko.computed(function() {
			return this.imageSize() / this.focalSize();
		}),

		widthToClip: ko.computed(function() {
			if (this.isShiftedLeft()) {
				return this.halfway() - this.leftEdge() * 2;
			} else {
				return this.halfway() - this.rightEdge() * 2;
			}
		}),

		isShiftedLeft: ko.computed(function() {
			return math.absolute(this.halfway() - this.leftEdge()) > math.absolute(this.halfway() - this.rightEdge());
		}),

		renderedCss: ko.computed(function() {
			return this.isShiftedLeft();
		})
	};

	document.addEventListener("DOMContentLoaded", function(event) {
		ko.applyBindings(model)
	});

}());