(function() {
  /* config & consts */
  var navbarCollapse = null,
    tplFnMap = {},
    mainContainer = $('#main-container'),
    baseUrl = '/picaweb/api/';
    apiUrls = {
      getCategories: baseUrl + 'categories',
      getComicDetail: baseUrl + 'comics/{comicId}',
      getComicListByCatId: baseUrl + 'categories/{id}/page/{page}/comics',
      getComicListByType: baseUrl + 'categories/where/{type}/page/{page}/comics',
      getRandomComicList: baseUrl + 'comics/random',
      getCommentListByComicId: baseUrl + 'comics/{comicId}/comments/page/{page}',
      getEpisode: baseUrl + 'comics/{comicId}/ep/{episode}',
      postComment: baseUrl + 'comics/{comicId}/comment',
      searchComics: baseUrl + 'search/{keyword}/comics/page/{page}',
      getComicsByUserId: baseUrl + 'user/{uid}/comics/page/{page}',
      updateRank: baseUrl + 'comics/{comicId}/rank',
    };
  doT.templateSettings = {
    evaluate:    /\{%([\s\S]+?)%\}/g,
    interpolate: /\{%=([\s\S]+?)%\}/g,
    encode:      /\{%!([\s\S]+?)%\}/g,
    use:         /\{%#([\s\S]+?)%\}/g,
    define:      /\{%##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#%\}/g,
    conditional: /\{%\?(\?)?\s*([\s\S]*?)\s*%\}/g,
    iterate:     /\{%~\s*(?:%\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*%\})/g,
    varname: 'it',
    strip: true,
    append: true,
    selfcontained: false
  };

  /* basic functions */
  function supplant(str, obj) {
    return str.replace(
      /\{([^{}]*)\}/g,
      function (a, b) {
        var r = obj[b];
        return typeof r === 'string' || typeof r === 'number' ? r : a;
      }
    );
  }

  function request(url, method, pathParams, data, callback) {
    url = supplant(url, pathParams);
    $.ajax({
      url: url,
      method: method,
      dataType: 'json',
      data: data,
    }).done(function(msg) {
      callback(msg);
    });
  }

  function get(url, params, callback) {
    request(url, 'GET', params, null, callback);
  }

  function post(url, pathParams, data, callback) {
    request(url, 'POST', pathParams, data, callback);
  }

  function put(url, pathParams, data, callback) {
    request(url, 'POST', pathParams, data, callback);
  }

  function getTplFn(tplId) {
    var tplFn = tplFnMap[tplId];
    if (!tplFn) {
      tplFn = doT.template($('#' + tplId).html());
      tplFnMap[tplId] = tplFn;
    }
    return tplFn;
  }

  function renderContent(data, tplId) {
    var tplFn = getTplFn(tplId);
    mainContainer.html(tplFn(data));
  }

  /* logics */
  function getCategories(callback) {
    get(apiUrls.getCategories, null, function(data) {
      // TODO: render categories
      console.log(data);
      callback && callback(data);
    });
  }

  function getComicDetail(comicId, callback) {
    get(apiUrls.getComicDetail, {comicId: comicId}, function(data) {
      // TODO: render comic detail
      console.log(data);
      callback && callback(data);
    });
  }

  function getComicListByCatId(catId, page, callback) {
    page = page || 1;
    get(apiUrls.getComicListByCatId, {id: catId, page: page}, function(data) {
      // TODO: render comic list
      console.log(data);
      callback && callback(data);
    });
  }

  function getComicListByType(type, page, callback) {
    page = page || 1;
    get(apiUrls.getComicListByType, {type: type, page: page}, function(data) {
      // TODO: render comic list
      console.log(data);
      callback && callback(data);
    })
  }

  function getRandomComicList(callback) {
    get(apiUrls.getRandomComicList, null, function(data) {
      // TODO: render comic list
      console.log(data);
      callback && callback(data);
    });
  }

  function getCommentListByComicId(comicId, page, callback) {
    page = page || 1;
    get(apiUrls.getCommentListByComicId, {comicId: comicId, page: page}, function(data) {
      // TODO: render comment list
      console.log(data);
      callback && callback(data);
    });
  }

  function getEpisode(comicId, episode, callback) {
    get(apiUrls.getEpisode, {comicId: comicId, episode: episode}, function(data) {
      // TODO: render comic pic list
      console.log(data);
      callback && callback(data);
    });
  }

  function postComment(comicId, comment, callback) {
    post(apiUrls.postComment, {comicId: comicId}, comment, function(data) {
      // TODO: show post comment result toast
      console.log(data);
      callback && callback(data);
    });
  }

  function searchComics(keyword, page, callback) {
    page = page || 1;
    get(apiUrls.searchComics, {keyword: keyword, page: page}, function(data) {
      // TODO: render comic list
      console.log(data);
      callback && callback(data);
    });
  }

  function getComicsByUserId(uid, page, callback) {
    page = page || 1;
    get(apiUrls.getComicsByUserId, {uid: uid, page: page}, function(data) {
      // TODO: render comic list
      console.log(data);
      callback && callback(data);
    });
  }

  function updateRank(comicId, rank, callback) {
    put(apiUrls.updateRank, {comicId: comicId}, rank, function(data) {
      // TODO: show update rank result toast
      console.log(data);
      callback && callback(data);
    });
  }

  /* expose funcs*/
  window.pica = $.extend(window.pica, {
    api: {
      getCategories: getCategories,
      getComicDetail: getComicDetail,
      getComicListByCatId: getComicListByCatId,
      getComicListByType: getComicListByType,
      getRandomComicList: getRandomComicList,
      getCommentListByComicId: getCommentListByComicId,
      getEpisode: getEpisode,
      postComment: postComment,
      searchComics: searchComics,
      getComicsByUserId: getComicsByUserId,
      updateRank: updateRank
    }
  });

  /* register listeners */
  $('#navbar-toggle').on('click pressed', function(e) {
    e.preventDefault();
    if (!navbarCollapse) {
      navbarCollapse = $('#navbar-collapse');
    }
    navbarCollapse.toggle({
      easing: 'swing'
    });
  });

  $('#https-toggle').on('click pressed', function(e) {
    e.preventDefault();
    localStorage.https = localStorage.https || 1;
    localStorage.https = true == localStorage.https ? 0 : 1;
    $(e.currentTarget).toggleClass('badge-green');
  });

  /* routes */
  // index
  $.routes.add('/$', 'index', function() {
    console.log('index');
    getCategories(function(data) {
      renderContent(data, 'category-board');
    });
  });

  // category
  $.routes.add('/category', 'category', function() {
    getCategories(function(data) {
      renderContent(data, 'category-board');
    });
  });

  // comic of a category
  $.routes.add('/category/{id:int}/comic/page/{page:int}', 'comicOfCategory', function() {
    console.log(this.id);
    console.log(this.page);
    getComicListByCatId(this.id, this.page, function(data) {
      renderContent(data, 'comic-board');
    })
  });

  // comic detail
  $.routes.add('/comic/{id:int}/detail', 'comicDetail', function() {
    console.log(this.id);
    getComicDetail(this.id, function(data) {
      renderContent(data, 'comic-detail');
    });
  });

  // comic pic list
  $.routes.add('/comic/{id:int}/ep/{ep:int}', 'comicPicList', function() {
    console.log(this.id);
    console.log(this.ep);
    getEpisode(this.id, this.ep, function(data) {
      renderContent(data, 'pic-list');
    });
  });

  /* kick off & init stuff */
  // for first load with empty hash
  if (null === $.routes.current && '' === location.hash) {
    $.routes.load('#/');
  }

  if (false == localStorage.https) {
    $('#https-toggle').removeClass('badge-green');
  }

})();

