<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" type="text/css" href="<%= grunt.config.get('staticRoot') %>/css/bootstrap.css">
<link rel="stylesheet" type="text/css" href="<%= grunt.config.get('staticRoot') %>/css/bootstrap-theme.css">
<link rel="stylesheet" type="text/css" href="<%= grunt.config.get('staticRoot') %>/css/base.css">
<script type="text/javascript" src="<%= grunt.config.get('staticRoot') %>/js/lib/jquery/jquery-2.1.4.js"></script>
<script type="text/javascript" src="<%= grunt.config.get('staticRoot') %>/js/plugin/jquery.routes.js"></script>
<script type="text/javascript" src="<%= grunt.config.get('staticRoot') %>/js/lib/doT/doT-1.0.3.js"></script>
<title>PicaWeb</title>
</head>
<body>
<div class="container-fluid picaweb">
    <nav class="navbar navbar-default" role="navigation">
      <div class="container-fluid">
        <button type="button" class="navbar-toggle collapsed" id="navbar-toggle">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
        </button>
        <div class="navbar-header">
          <a class="navbar-brand" href="#/">PicaWeb</a>
        </div>
        <div class="collapse navbar-collapse" id="navbar-collapse">
          <ul class="nav navbar-nav">
            <li><a href="#/category">Category</a></li>
            <li><a href="#/search">Search</a></li>
            <li><a href="#/about">About</a></li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="container-fluid" id="main-container"></div>
</div>
<script type="text/x-dot-template" id="category-board">
    <div class="row">
        {%~ it :item:index %}
        <div class="col-xs-12 col-sm-6 col-md-3" data-id="{%! item.id %}">
            <a href="#/category/{%! item.id %}/comic/page/{%! item.page || 1 %}" class="block-link">
                <div class="thumbnail">
                    <img src="{%! item.cover_image %}" alt="{%! item.name %}" />
                    <div class="caption">
                        <span>
                            <span class="badge pull-right badge-green">
                                <i class="glyphicon glyphicon-book" aria-hidden="true"></i>
                                {%! item.all_comics %}
                            </span>
                            {%! item.name %}
                        </span>
                    </div>
                </div>
            </a>
        </div>
        {%~%}
    </div>
</script>
<script type="text/x-dot-template" id="comic-board">
    <div class="row">
        {%~ it :item:index %}
        <div class="col-xs-12 col-sm-6 col-md-3" data-id="{%! item.id %}" data-cats="{%! item.cats %}">
            <a href="#/comic/{%! item.id %}/detail" class="block-link">
                <div class="thumbnail thumbnail-fixed-height">
                    <img src="{%! item.cover_image %}" alt="{%! item.name %}" />
                    <div class="caption">
                        <div>
                            {% for(var i = 0; i < item.rank; i++) { %}
                            <i class="glyphicon glyphicon-star rating-star" aria-hidden="true"></i>
                            {% } %}
                            <span class="badge pull-right badge-orange">
                                <i class="glyphicon glyphicon-tasks" aria-hidden="true"></i>
                                {%! item.total_page %}
                            </span>
                        </div>
                        <div>{%! item.name %}</div>
                        <div>{%! item.author %}</div>
                    </div>
                </div>
            </a>
        </div>
        {%~%}
    </div>
</script>
<script type="text/x-dot-template" id="comic-detail">
    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12">
            <div class="media bare">
                <div class="media-left col-xs-12 col-sm-6 col-md-4">
                    <div class="thumbnail">
                        <img class="media-object" src="{%! it.comic.cover_image %}" alt="{%! it.comic.name %}">
                    </div>
                </div>
                <div class="media-body col-auto">
                    <h4 class="media-heading">
                        {%! it.comic.name %}
                    </h4>
                    <div>
                        {% for(var i = 0; i < it.comic.rank; i++) { %}
                        <i class="glyphicon glyphicon-star rating-star" aria-hidden="true"></i>
                        {% } %}
                        <span class="badge pull-right badge-green">
                            <i class="glyphicon glyphicon-tasks" aria-hidden="true"></i>
                            {%! it.comic.total_page %}
                            <i class="glyphicon glyphicon-eye-open" aria-hidden="true"></i>
                            {%! it.comic.views_count %}
                            <i class="glyphicon glyphicon-comment" aria-hidden="true"></i>
                            {%! it.comic.comment_count %}
                        </span>
                    </div>
                    <div>{%! it.comic.author %}</div>
                    <div>{%! it.comic.description %}</div>
                    <div>{%! it.comic.updated_at %}</div>
                </div>
            </div>
            <hr/>
            <div>
                {% for (var i = 1; i <= it.ep_count; i++) { %}
                <div class="col-xs-12 col-sm-2 col-md-2" data-ep="{%= i %}">
                    <a href="#/comic/{%! it.comic.id %}/ep/{%= i %}" class="block-link">
                        <div class="panel panel-default">
                            <div class="panel-body text-center">
                                第{%= i %}话
                            </div>
                        </div>
                    </a>
                </div>
                {% } %}
            </div>
        </div>
    </div>
</script>
<script type="text/x-dot-template" id="pic-list">
    <div class="row">
        {%~ it :item:index %}
        <div class="col-xs-12 col-sm-12 col-md-12">
            <div class="thumbnail bare">
                <img src="{%! item.url %}" alt="" />
            </div>
        </div>
        {%~%}
    </div>
</script>
<script type="text/javascript" src="<%= grunt.config.get('staticRoot') %>/js/logic/main.js"></script>
</body>
</html>