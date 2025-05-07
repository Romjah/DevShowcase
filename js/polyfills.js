// Polyfill for older browsers that might not support modern JavaScript features

// Promise polyfill for IE11 and older browsers
if (typeof Promise === 'undefined') {
    console.log('Promise polyfill loaded');
    // This is a simplified version, consider using a full polyfill in production
    window.Promise = function(executor) {
        var self = this;
        self.status = 'pending';
        self.value = null;
        self.reason = null;
        self.onFulfilledCallbacks = [];
        self.onRejectedCallbacks = [];
        
        function resolve(value) {
            if (self.status === 'pending') {
                self.status = 'fulfilled';
                self.value = value;
                self.onFulfilledCallbacks.forEach(function(callback) {
                    callback(self.value);
                });
            }
        }
        
        function reject(reason) {
            if (self.status === 'pending') {
                self.status = 'rejected';
                self.reason = reason;
                self.onRejectedCallbacks.forEach(function(callback) {
                    callback(self.reason);
                });
            }
        }
        
        try {
            executor(resolve, reject);
        } catch (e) {
            reject(e);
        }
    };
    
    window.Promise.prototype.then = function(onFulfilled, onRejected) {
        var self = this;
        var promise2 = new Promise(function(resolve, reject) {
            if (self.status === 'fulfilled') {
                setTimeout(function() {
                    try {
                        if (typeof onFulfilled === 'function') {
                            var x = onFulfilled(self.value);
                            resolve(x);
                        } else {
                            resolve(self.value);
                        }
                    } catch (e) {
                        reject(e);
                    }
                });
            } else if (self.status === 'rejected') {
                setTimeout(function() {
                    try {
                        if (typeof onRejected === 'function') {
                            var x = onRejected(self.reason);
                            resolve(x);
                        } else {
                            reject(self.reason);
                        }
                    } catch (e) {
                        reject(e);
                    }
                });
            } else if (self.status === 'pending') {
                self.onFulfilledCallbacks.push(function(value) {
                    setTimeout(function() {
                        try {
                            if (typeof onFulfilled === 'function') {
                                var x = onFulfilled(value);
                                resolve(x);
                            } else {
                                resolve(value);
                            }
                        } catch (e) {
                            reject(e);
                        }
                    });
                });
                self.onRejectedCallbacks.push(function(reason) {
                    setTimeout(function() {
                        try {
                            if (typeof onRejected === 'function') {
                                var x = onRejected(reason);
                                resolve(x);
                            } else {
                                reject(reason);
                            }
                        } catch (e) {
                            reject(e);
                        }
                    });
                });
            }
        });
        
        return promise2;
    };
    
    window.Promise.prototype.catch = function(onRejected) {
        return this.then(null, onRejected);
    };
}

// Polyfill for Object.assign
if (typeof Object.assign !== 'function') {
    console.log('Object.assign polyfill loaded');
    Object.assign = function(target) {
        'use strict';
        if (target == null) {
            throw new TypeError('Cannot convert undefined or null to object');
        }
        
        var to = Object(target);
        
        for (var index = 1; index < arguments.length; index++) {
            var nextSource = arguments[index];
            
            if (nextSource != null) {
                for (var nextKey in nextSource) {
                    if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                        to[nextKey] = nextSource[nextKey];
                    }
                }
            }
        }
        return to;
    };
}

// Polyfill for Element.matches
if (!Element.prototype.matches) {
    console.log('Element.matches polyfill loaded');
    Element.prototype.matches =
        Element.prototype.matchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector ||
        Element.prototype.oMatchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        function(s) {
            var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                i = matches.length;
            while (--i >= 0 && matches.item(i) !== this) {}
            return i > -1;
        };
}

// Polyfill for NodeList.forEach
if (window.NodeList && !NodeList.prototype.forEach) {
    console.log('NodeList.forEach polyfill loaded');
    NodeList.prototype.forEach = Array.prototype.forEach;
}

// Fetch API polyfill using XMLHttpRequest
if (!window.fetch) {
    console.log('Fetch API polyfill loaded');
    window.fetch = function(url, options) {
        return new Promise(function(resolve, reject) {
            var xhr = new XMLHttpRequest();
            options = options || {};
            xhr.open(options.method || 'GET', url);
            
            if (options.headers) {
                Object.keys(options.headers).forEach(function(key) {
                    xhr.setRequestHeader(key, options.headers[key]);
                });
            }
            
            xhr.onload = function() {
                var response = {
                    status: xhr.status,
                    statusText: xhr.statusText,
                    headers: xhr.getAllResponseHeaders(),
                    url: xhr.responseURL || url,
                    text: function() {
                        return Promise.resolve(xhr.responseText);
                    },
                    json: function() {
                        return Promise.resolve(JSON.parse(xhr.responseText));
                    },
                    blob: function() {
                        return Promise.resolve(new Blob([xhr.response]));
                    }
                };
                resolve(response);
            };
            
            xhr.onerror = function() {
                reject(new TypeError('Network request failed'));
            };
            
            xhr.responseType = 'arraybuffer';
            xhr.send(options.body || null);
        });
    };
}

// IntersectionObserver polyfill (minimal version)
if (!('IntersectionObserver' in window)) {
    console.log('Using minimal IntersectionObserver polyfill');
    window.IntersectionObserver = function(callback, options) {
        var elements = [];
        
        function checkElements() {
            elements.forEach(function(element) {
                var rect = element.getBoundingClientRect();
                var isIntersecting = rect.top < window.innerHeight && rect.bottom > 0;
                
                callback([{
                    isIntersecting: isIntersecting,
                    target: element
                }]);
            });
        }
        
        // Simple version - check elements on scroll and resize
        window.addEventListener('scroll', checkElements);
        window.addEventListener('resize', checkElements);
        
        return {
            observe: function(element) {
                elements.push(element);
                checkElements();
            },
            unobserve: function(element) {
                elements = elements.filter(function(el) {
                    return el !== element;
                });
            },
            disconnect: function() {
                elements = [];
                window.removeEventListener('scroll', checkElements);
                window.removeEventListener('resize', checkElements);
            }
        };
    };
} 