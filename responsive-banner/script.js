(function() {
	ko.extenders.numeric = function(target, precision) {
	    //create a writable computed observable to intercept writes to our observable
	    var result = ko.pureComputed({
	        read: target,  //always return the original observables value
	        write: function(newValue) {
	        	var current = target(),
	        	roundingMultiplier = Math.pow(10, precision),
	        	newValueAsNum = isNaN(newValue) ? 0 : parseFloat(+newValue),
	        	valueToWrite = Math.round(newValueAsNum * roundingMultiplier) / roundingMultiplier;

	            //only write if it changed
	            if (valueToWrite !== current) {
	            	target(valueToWrite);
	            } else {
	                //if the rounded value is the same, but a different value was written, force a notification for the current field
	                if (newValue !== current) {
	                	target.notifySubscribers(valueToWrite);
	                }
	            }
	        }
	    }).extend({ notify: 'always' });

	    //initialize with current value to make sure it is rounded appropriately
	    result(target());

	    //return the new computed observable
	    return result;
	};
}());


(function() {

	var CalculatorViewModel = function() {
		var self = this;

		self.imageSize = ko.observable(0).extend({ numeric: 0 });
		self.focalSize = ko.observable(0).extend({ numeric: 0 });
		self.leftEdge = ko.observable(0).extend({ numeric: 0 });

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
			return Math.abs(self.halfway() - self.leftEdge()) > Math.abs(self.halfway() - self.rightEdge());
		});

		self.leftRightText = ko.computed(function() {
			return self.isShiftedLeft() ? "left" : "right";
		});

		self.leftPercent = ko.computed(function() {
			return self.leftEdge() / self.sizeDifference();
		});

		self.rightPercent = ko.computed(function() {
			return self.rightEdge() / self.sizeDifference();
		});

		self.percent = ko.computed(function() {
			return self.isShiftedLeft() ? self.leftPercent() : self.rightPercent();
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
			return "\
@media (max-width: " + self.widthToClip() + "px) {\n\
    .banner {\n\
        background-position: center " + self.leftRightText() + " " + self.rightEdge() + "px;\n\
    }\n\
}\n\
\n\
@media (max-width: " + self.focalSize() + "px) {\n\
    .banner {\n\
        background-position: center " + self.leftRightText() + " " + self.percent() + "%;\n\
        background-size: " + self.backgroundSize() + "% auto;\n\
    }\b\n\
}";
		});

		self.renderedCss.subscribe(function() {
			setTimeout(Prism.highlightAll, 0);
		});
	};

	ko.applyBindings(new CalculatorViewModel());

}());