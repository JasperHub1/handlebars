$(function () {


  //duration > 1 hr?
  Handlebars.registerHelper('islong', function (el, options) {
    if (el.indexOf('小时') !== -1) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });

  const courseURL = 'http://imoocnote.calfnote.com/inter/getClasses.php';

  // Compile Course template
  const source = $('#course-template').html();
  let template = Handlebars.compile(source);


  getCourseData(courseURL, 1, template);
  getPaginationData(courseURL, template);

});



function getCourseData(courseURL, curPage, template) {

  const chapterUrl = 'http://imoocnote.calfnote.com/inter/getClassChapter.php';

  $.getJSON(courseURL, { curPage: curPage })
    .done(data => {     
      let coursesDetail = data.data;

      console.log(coursesDetail);
      
      let html = template(coursesDetail);
      $('#main-content').html(html);

      $('.card').on('click', e => {
        let courseID = e.currentTarget.id;
        let courseTitle = e.currentTarget.title;
      
        getChaptereData(chapterUrl, courseID, courseTitle);
      })

    })
    .fail(() => {
      console.log('data loading failed');
    });
}

function getPaginationData(courseURL, template) {
  $.getJSON(courseURL, { curPage: 1 })
    .done(data => {
      let totalPages = parseInt(data.totalCount);

      //generate pagination
      $('.pagination').createPage({
        totalPages: totalPages,
        curPageNo: 1,
        backFn: function (p) {
          getCourseData(courseURL, p, template)
        }
      })
    })
    .fail(() => {
      console.log('pagination loading failed');
    });
}

function getChaptereData(chapterUrl, id, courseTitle) {

  // Compile Chapter template
  const chapterSource = $('#chapter-template').html();
  let chapterTemplate = Handlebars.compile(chapterSource);

  clearModal();

  $.getJSON(`${chapterUrl}?cid=${id}`)
    .done(data => {
      let chapterData = {};
      chapterData.title = courseTitle;
      chapterData.data = data;

      console.log(chapterData);
      
      let html = chapterTemplate(chapterData);
      
      $('.modal-body').html(html);
    })
}


const clearModal = () => {
  $('.modal-title').empty();
  $('.modal-body').empty();
} 