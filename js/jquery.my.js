; (function (window, document) {

    function jQuery(selector) {
        // 入口函数
        if (typeof selector === 'function') {
            document.addEventListener('DOMContentLoaded', selector);
        } else {
            // 获取元素
            return new Init(selector);
        }

    }

    function Init(selector) {
        if (selector !== undefined) {
            if (selector instanceof Element) {
                this[0] = selector;
                this.length = 1;
            } else {
                let dom = document.querySelectorAll(selector);

                for (let i = 0; i < dom.length; i++) {
                    this[i] = dom[i];
                }
                this.length = dom.length;
            }
        } else {
            this.length = 0;
        }

    }

    Init.prototype.each = function (callback) {
        for (let i = 0; i < this.length; i++) {
            callback(i, this[i]);
        }
        return this;
    }


    Init.prototype.html = function (html) {
        if (html === undefined) {
            return this[0].innerHTML;
        } else {
            return this.each(function (i, e) {
                e.innerHTML = html;
            })
        }
    }

    Init.prototype.text = function (text) {
        if (text === undefined) {
            return this[0].innerText;
        } else {
            return this.each(function (i, e) {
                e.innerText = text;
            })
        }
    }

    Init.prototype.attr = function (attr, value) {
        if (value === undefined) {
            return this[0].getAttribute(attr);
        } else {
            return this.each(function (i, e) {
                e.setAttribute(attr, value);
            })
        }
    }

    Init.prototype.removeAttr = function (attr) {
        return this.each(function (i, e) {
            e.removeAttribute(attr);
        })
    }

    Init.prototype.prop = function(property,value){
        if(value === undefined){
            return this[0][property];
        }else {
            return this.each(function(i,e){
                e[property] = Boolean(value);
            })
        }
    }

    Init.prototype.addClass = function (className) {
        return this.each(function (i, e) {
            e.classList.add(className);
        })
    }

    Init.prototype.removeClass = function (className) {
        return this.each(function (i, e) {
            e.classList.remove(className);
        })
    }

    Init.prototype.toggleClass = function (className) {
        return this.each(function (i, e) {
            e.classList.toggle(className);
        })
    }

    Init.prototype.on = function (type, selector, fn) {
        if (fn === undefined) {
            fn = selector;
            this.each(function (i, e) {
                e.addEventListener(type, fn);
            })
        } else {
            return  this.each(function (i, e) {
                e.addEventListener(type, function (ev) {
                    let dom = Array.from(e.querySelectorAll(selector));
                    if (dom.indexOf(ev.target) != -1) {
                        fn.call(ev.target, ev);
                    }
                })
            })
        }
    }

    Init.prototype.val = function (val) {
        if (val === undefined) {
            return this[0].value;
        } else {
            return this.each(function (i, e) {
                e.value = val;
            })
        }
    }

    Init.prototype.show = function () {
        return this.each(function (i, e) {
            e.style.display = 'block';
        })
    }

    Init.prototype.hide = function () {
        return this.each(function (i, e) {
            e.style.display = 'none';
        })
    }

    Init.prototype.parent = function (selector) {
        let parent = [];
        this.each(function (i, e) {
            parent.push(e.parentNode);
        })
        if (selector != undefined) {
            let dom = Array.from(document.querySelectorAll(selector));
            parent.forEach((e, i) => {
                if (dom.indexOf(e) == -1) {
                    parent.splice(i, 1);
                }
            });
        }
        let init = new Init();
        parent.forEach((e, i) => {
            init[i] = e;
        });
        init.length = parent.length;
        return init;
    }

    function getParent(current, arr) {
        arr.push(current.parentNode);
        if (current.parentNode != null) {
            getParent(current.parentNode, arr);
        }
    }

    Init.prototype.parents = function (selector) {
        let parents = [];
        getParent(this[0], parents);
        if (selector != undefined) {
            let dom = Array.from(document.querySelectorAll(selector));
            for (let i = 0; i < parents.length; i++) {
                if (dom.indexOf(parents[i]) == -1) {
                    parents.splice(i, 1);
                    i--;
                }
            }
        }
        let init = new Init();
        parents.forEach((e, i) => {
            init[i] = e;
        });
        init.length = parents.length;
        return init;
    }

    Init.prototype.remove = function(){
        return this.each(function(i,e){
            e.parentNode.removeChild(e);
        })
    }

    window.$ = jQuery;

})(window, document);