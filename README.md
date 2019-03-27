# 帮帮卖车 安装说明
`npm install -g grunt-cli`

安装 ruby 2.0 以上版本

(gem update --system  更新ruby)

gem install sass

npm install

bower install

bower-installer

grunt build-script

grunt sass

如果遇到utf-8转码失败: http://blog.csdn.net/fuguotao1/article/details/51568724
(
找到Ruby安装目录
\lib\ruby\gems\1.9.1\gems\sass-3.3.14\lib\sass\engine.rb
找到require 'sass/supports'这一行，在下面一行添加
)

