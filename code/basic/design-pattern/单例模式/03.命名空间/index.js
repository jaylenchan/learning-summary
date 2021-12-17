//问题1.变量名冲突
//问题2.复杂层次对象的可读性要求

const $ = {
  dom: {

  },
  string: {

  },
  event: {

  }
}

$.define = function(namespace, fn) {
  const namespaces = namespace.split('.')
  let fnName = namespace.pop()
}

$.define('dom.addClass', function() {

})

$.define('dom.attr', function() {

})

