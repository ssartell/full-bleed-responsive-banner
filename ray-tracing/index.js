/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 295);
/******/ })
/************************************************************************/
/******/ ({

/***/ 295:
/***/ (function(module, exports, __webpack_require__) {

var raytracer = __webpack_require__(796);
var scene = __webpack_require__(797);

render(scene);

var textarea = document.getElementById('json');
textarea.value = JSON.stringify(scene, null, 3);

var renderButton = document.getElementById('render');
renderButton.onclick = function() {
    var scene = JSON.parse(textarea.value);
    render(scene);
};

function render(scene) {
    var canvas = document.getElementById('c');
    var width = canvas.clientWidth;
    var height = canvas.clientHeight;
    canvas.width = width;
    canvas.height = height;

    var ctx = canvas.getContext('2d');
    var data = ctx.getImageData(0, 0, width, height);
    ctx.webkitImageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;

    var img = raytracer.renderScene(scene, width, height);

    var i = 0;
    for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
            var color = img[y][x];
            i = (x * 4) + (y * width * 4);
            data.data[i + 0] = color[0];
            data.data[i + 1] = color[1];
            data.data[i + 2] = color[2];
            data.data[i + 3] = 255;
        }
    }

    ctx.putImageData(data, 0, 0);
}

/***/ }),

/***/ 794:
/***/ (function(module, exports) {

function add(a, b) {
    return [
        a[0] + b[0],
        a[1] + b[1],
        a[2] + b[2],
    ];
}

function subtract(a, b) {
    return [
        a[0] - b[0],
        a[1] - b[1],
        a[2] - b[2],
    ];
}

function multiply(a, b) {
    return [
        a[0] * b[0],
        a[1] * b[1],
        a[2] * b[2],
    ]
}

function dotProduct(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function crossProduct(a, b) {
    return [
        a[1] * b[2] - a[2] * b[1],
        a[2] * b[0] - a[0] * b[2],
        a[0] * b[1] - a[1] * b[0],
    ];
}

function magnitude(a) {
    var x = a[0], y = a[1], z = a[2]
    return Math.sqrt(x * x + y * y + z * z);
}

function scale(a, s) {
    return [
        a[0] * s,
        a[1] * s,
        a[2] * s
    ];
}

function normalize(a) {
    var s = 1 / magnitude(a);
    return [
        a[0] * s,
        a[1] * s,
        a[2] * s,
    ];
}

function clamp(a, range) {
    var low = range[0], high = range[1];
    return [
        Math.max(low, Math.min(high, a[0])),
        Math.max(low, Math.min(high, a[1])),
        Math.max(low, Math.min(high, a[2]))
    ];
}

function reflect(a, b) {
    return subtract(a, scale(b, 2 * dotProduct(a, b)));
}

var up = [0, 1, 0];

module.exports = {
    add,
    subtract,
    multiply,
    dotProduct,
    crossProduct,
    magnitude,
    scale,
    normalize,
    clamp,
    reflect,
    up
};

/***/ }),

/***/ 795:
/***/ (function(module, exports, __webpack_require__) {

var vec = __webpack_require__(794);

function slightlyRough(normal, point) {
    return vec.normalize([
        normal[0] + (Math.random() - .5) * .05,
        normal[1] + (Math.random() - .5) * .05,
        normal[2] + (Math.random() - .5) * .05,
    ]);
}

function veryRough(normal, point) {
    return vec.normalize([
        normal[0] + (Math.random() - .5) * .2,
        normal[1] + (Math.random() - .5) * .2,
        normal[2] + (Math.random() - .5) * .2,
    ]);
}

function smooth(normal, point) {
    return normal;
}

module.exports = {
    slightlyRough,
    veryRough,
    smooth
};

/***/ }),

/***/ 796:
/***/ (function(module, exports, __webpack_require__) {

var vec = __webpack_require__(794);
var surfaces = __webpack_require__(795);

var atInfinity = { t: Infinity };

var intersect = {
    sphere: intersectSphere,
    plane: intersectPlane
};

function renderScene(scene, width, height) {
    var fovRadians = (scene.camera.fov / 2) * Math.PI / 180;
    var aspectRatio = height / width;
    var halfWidth = Math.tan(fovRadians);
    var halfHeight = aspectRatio * halfWidth;
    var camerawidth = halfWidth * 2;
    var cameraheight = halfHeight * 2;
    var pixelWidth = camerawidth / (width - 1);
    var pixelHeight = cameraheight / (height - 1);

    var eyeVector = vec.normalize(vec.subtract(scene.camera.lookAt, scene.camera.position));
    var vRight = vec.normalize(vec.crossProduct(vec.up, eyeVector));
    var vUp = vec.normalize(vec.crossProduct(eyeVector, vRight));

    var traceScreenCoords = function (x, y) {
        var xComponent = vec.scale(vRight, (x * pixelWidth) - halfWidth);
        var yComponent = vec.scale(vUp, halfHeight - (y * pixelHeight));

        var ray = {
            point: scene.camera.position,
            vector: vec.normalize(vec.add(eyeVector, vec.add(xComponent, yComponent)))
        };

        var color = traceRay(scene, ray, 0);
        var scaledColor = vec.scale(vec.clamp(color, [0, 1]), 255);
        return scaledColor;
    };

    function antialias(x, y) {
        var c1 = traceScreenCoords(x + .25, y + .25);
        var c2 = traceScreenCoords(x + .75, y + .25);
        var c3 = traceScreenCoords(x + .25, y + .75);
        var c4 = traceScreenCoords(x + .75, y + .75);

        return vec.scale(vec.add(vec.add(c1, c2), vec.add(c3, c4)), .25);
    }

    var result = [];
    for (var y = 0; y < height; y++) {
        result[y] = [];
        for (var x = 0; x < width; x++) {
            result[y][x] = scene.settings.antiAlias ? antialias(x, y) : traceScreenCoords(x, y);
        }
    }

    return result;
}

function traceRay(scene, ray, depth, excludedShape) {
    if (depth > scene.settings.reflectionDepth) 
        return scene.ambient;

    var intersection = atInfinity;
    for (var shape of scene.shapes) {
        if (shape === excludedShape) continue;
        var newIntersection = intersect[shape.type](ray, shape);
        if (newIntersection.t > 0 && newIntersection.t < intersection.t)
            intersection = newIntersection;
    }

    if (!Number.isFinite(intersection.t)) return scene.ambient;

    var lighting = colorAtIntersection(scene, intersection, ray);

    var reflectedRay = {
        point: intersection.pointAtTime,
        vector: vec.reflect(ray.vector, intersection.normal)
    };

    var reflection = traceRay(scene, reflectedRay, ++depth, intersection.shape);

    return vec.add(lighting, vec.multiply(intersection.shape.specular, reflection));
}

function intersectPlane(ray, shape) {
    var rayToPlane = vec.subtract(shape.point, ray.point);
    var dot = vec.dotProduct(ray.vector, shape.normal);
    var t = vec.dotProduct(rayToPlane, shape.normal) / dot;
    if (t < 0) return atInfinity;

    var pointAtTime = vec.add(ray.point, vec.scale(ray.vector, t));
    var normal = (dot > 0) ? vec.scale(shape.normal, -1) : shape.normal;
    normal = surfaces[shape.surface](normal, pointAtTime);

    return { shape, t, normal, pointAtTime };
}

function intersectSphere(ray, shape) {
    var L = vec.subtract(ray.point, shape.center);
    var a = vec.dotProduct(ray.vector, ray.vector);
    var b = 2 * vec.dotProduct(ray.vector, L);
    var c = vec.dotProduct(L, L) - shape.radius * shape.radius;

    var t = solveQuadratic(a, b, c);
    if (!Number.isFinite(t))
        return atInfinity;

    var pointAtTime = vec.add(ray.point, vec.scale(ray.vector, t));

    var normal = vec.normalize(vec.subtract(pointAtTime, shape.center));
    normal = surfaces[shape.surface](normal, pointAtTime);

    return { shape, t, pointAtTime, normal };
}

function colorAtIntersection(scene, intersection, ray) {
    var shape = intersection.shape;
    var normal = intersection.normal;

    // ambient
    var color = vec.multiply(scene.ambient, shape.ambient);

    for (var light of scene.lights) {
        var pointToLight = vec.normalize(vec.subtract(light.position, intersection.pointAtTime));

        // diffuse
        var cos = Math.max(0, vec.dotProduct(normal, pointToLight));
        var diffuse = vec.scale(vec.multiply(light.intensity, shape.diffuse), cos);
        color = vec.add(color, diffuse);

        // specular
        if (cos > 0) {
            var pointToCamera = vec.scale(ray.vector, -1);
            var reflection = vec.normalize(vec.add(pointToLight, pointToCamera));
            var reflectionCos = Math.max(0, vec.dotProduct(normal, reflection));
            var specular = vec.scale(vec.multiply(light.intensity, shape.specular), Math.pow(reflectionCos, shape.exponent));
            color = vec.add(color, specular);
        }
    }

    return color;
}

function solveQuadratic(a, b, c) {
    var discr = b * b - 4 * a * c;
    if (discr > 0) {
        var q = (b > 0)
            ? -0.5 * (b + Math.sqrt(discr))
            : -0.5 * (b - Math.sqrt(discr))
        var x0 = q / a;
        var x1 = c / q;
        return Math.min(x0, x1);
    } else if (discr === 0) {
        return -0.5 * b / a;
    } else {
        return NaN;
    }
}

module.exports = {
    renderScene
};

/***/ }),

/***/ 797:
/***/ (function(module, exports) {

module.exports = {
    settings: {
        reflectionDepth: 3,
        antiAlias: true,
    },
    camera: {
        position: [0, .5, 0],
        lookAt: [0, 0, 1],
        fov: 90,
    },
    shapes: [
        {
            type: 'plane',
            point: [0, -1.5, 10],
            normal: [0, 1, 0],
            // brass
            // ambient: [.33, .22, .03],
            // diffuse: [.78, .57, .11],
            // specular: [.99, .94, .81],
            // exponent: 27.8

            // black plastic
            ambient: [.0, .0, .0],
            diffuse: [.01, .01, .01],
            specular: [.5, .5, .5],
            exponent: 32,
            surface: 'slightlyRough'
        },
        {
            type: 'sphere',
            center: [-1, 0, 4],
            radius: 1.5,
            // brass
            // ambient: [.33, .22, .03],
            // diffuse: [.78, .57, .11],
            // specular: [.99, .94, .81],
            // exponent: 27.8

            // gold
            ambient: [.25, .20, .07],
            diffuse: [.75, .61, .23],
            specular: [.62, .55, .63],
            exponent: 27.8,
            surface: 'smooth'
        },
        {
            type: 'sphere',
            center: [1, .5, 3],
            radius: .5,
            // exponent: 51.2
            ambient: [.19, .07, .02],
            diffuse: [.7, .27, .08],
            specular: [.25, .13, .08],
            exponent: 12.8,
            surface: 'veryRough'
        },
        {
            type: 'sphere',
            center: [.5, -.35, 1.5],
            radius: .5,
            // silver
            ambient: [.19, .19, .19],
            diffuse: [.51, .51, .51],
            specular: [.51, .51, .51],
            exponent: 51.2,
            surface: 'slightlyRough'
        }
    ],
    lights: [
        {
            position: [-5, 10, 0],
            intensity: [1, 1, 1]
        },
        {
            position: [8, -1.25, 4],
            intensity: [0, 0, .7]
        },
        {
            position: [-2, -1.25, 2],
            intensity: [.25, 0, 0]
        },
    ],
    ambient: [.1, .1, .5]
};

/***/ })

/******/ });
//# sourceMappingURL=index.js.map