source 'http://rubygems.org'

gem 'jekyll', '~> 4.2.1'
gem 'kramdown-math-katex'

group :jekyll_plugins do
  gem 'jekyll-seo-tag'
  gem 'jekyll-gist'
  gem 'jekyll-feed'
  gem 'jemoji'
  gem 'jekyll-sitemap'
  gem 'jekyll-paginate-v2'
end

install_if -> { RUBY_PLATFORM =~ /linux/ } do
  gem "mini_racer"
end
