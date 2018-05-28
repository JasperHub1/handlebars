(function ($) {
  var ms = {
    init: function (obj, args) {
      return (function () {
        ms.fillHtml(obj, args);
        ms.bindEvent(obj, args);
      })();
    },
    //填充html 
    fillHtml: function (obj, args) {
      return (function () {
        obj.empty();

        // Pre button
        if (args.curPageNo > 1) {
          obj.append('<li class="page-item prevPage"><a class="page-link">Previous</a></li>');
        } else {
          obj.append('<li class="page-item disabled"><a class="page-link">Previous</a></li>');
        }

        // Middle pagination
        if (args.curPageNo != 1 && args.curPageNo >= 4 && args.totalPages != 4) {
          obj.append('<li class="page-item page"><a class="page-link">' + 1 + '</a></li>');
        }

        if (args.curPageNo - 2 > 2 && args.curPageNo <= args.totalPages && args.totalPages > 5) {
          obj.append('<span>...</span>');
        }

        var start = args.curPageNo - 2, end = args.curPageNo + 2;
        if ((start > 1 && args.curPageNo < 4) || args.curPageNo == 1) {
          end++;
        }
        if (args.curPageNo > args.totalPages - 4 && args.curPageNo >= args.totalPages) {
          start--;
        }

        for (; start <= end; start++) {
          if (start <= args.totalPages && start >= 1) {
            if (start != args.curPageNo) {
              obj.append('<li class="page-item page"><a class="page-link">' + start + '</a></li>');
            } else {
              obj.append('<li class="page-item page active"><a class="page-link">' + start + '</a></li>');
            }
          }
        }

        if (args.curPageNo + 2 < args.totalPages - 1 && args.curPageNo >= 1 && args.totalPages > 5) {
          obj.append('<span>...</span>');
        }

        if (args.curPageNo != args.totalPages && args.curPageNo < args.totalPages - 2 && args.totalPages != 4) {
          obj.append('<li class="page-item page"><a class="page-link">' + args.totalPages + '</a></li>');
        }

        // Next button
        if (args.curPageNo < args.totalPages) {
          obj.append('<li class="page-item nextPage"><a class="page-link">Next</a></li>');
          
        } else {
          obj.append('<li class="page-item disabled"><a class="page-link">Next</a></li>');          
        }

      })();
    },
    // bind event
    bindEvent: function (obj, args) {
      return (function () {
        obj.on("click", "li.page", function () {
          var curPageNo = parseInt($(this).text());
          ms.fillHtml(obj, { "curPageNo": curPageNo, "totalPages": args.totalPages });
          if (typeof (args.backFn) == "function") {
            args.backFn(curPageNo);
          }
        });

        // Prev button 
        obj.on("click", "li.prevPage", function () {
          var curPageNo = parseInt(obj.children('.active').children('.page-link').text());
          console.log(curPageNo);
                    
          ms.fillHtml(obj, { "curPageNo": curPageNo - 1, "totalPages": args.totalPages });
          if (typeof (args.backFn) == "function") {
            args.backFn(curPageNo - 1);
          }
        });

        // Next button
        obj.on("click", "li.nextPage", function () {
          var curPageNo = parseInt(obj.children('.active').children('.page-link').text());
          console.log(curPageNo);

          ms.fillHtml(obj, { "curPageNo": curPageNo + 1, "totalPages": args.totalPages });
          if (typeof (args.backFn) == "function") {
            args.backFn(curPageNo + 1);
          }
        });
      })();
    }
  }
  $.fn.createPage = function (options) {
    var args = $.extend({
      totalPages: 10,
      curPageNo: 1,
      backFn: function () { }
    }, options);
    ms.init(this, args);
  }
})(jQuery);