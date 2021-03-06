﻿
Features
------------

* **Clean, intuitive design** — With Slate, the description of your API is on the left side of your documentation, and all the code examples are on the right side. Inspired by [Stripe's](https://stripe.com/docs/api) and [Paypal's](https://developer.paypal.com/webapps/developer/docs/api/) API docs. Slate is responsive, so it looks great on tablets, phones, and even in print.

* **Everything on a single page** — Gone are the days when your users had to search through a million pages to find what they wanted. Slate puts the entire documentation on a single page. We haven't sacrificed linkability, though. As you scroll, your browser's hash will update to the nearest header, so linking to a particular point in the documentation is still natural and easy.

* **Slate is just Markdown** — When you write docs with Slate, you're just writing Markdown, which makes it simple to edit and understand. Everything is written in Markdown — even the code samples are just Markdown code blocks.

* **Write code samples in multiple languages** — If your API has bindings in multiple programming languages, you can easily put in tabs to switch between them. In your document, you'll distinguish different languages by specifying the language name at the top of each code block, just like with Github Flavored Markdown.

* **Out-of-the-box syntax highlighting** for [over 100 languages](https://github.com/jneen/rouge/wiki/List-of-supported-languages-and-lexers), no configuration required.

* **Automatic, smoothly scrolling table of contents** on the far left of the page. As you scroll, it displays your current position in the document. It's fast, too. We're using Slate at TripIt to build documentation for our new API, where our table of contents has over 180 entries. We've made sure that the performance remains excellent, even for larger documents.

* **Let your users update your documentation for you** — By default, your Slate-generated documentation is hosted in a public Github repository. Not only does this mean you get free hosting for your docs with Github Pages, but it also makes it simple for other developers to make pull requests to your docs if they find typos or other problems. Of course, if you don't want to use GitHub, you're also welcome to host your docs elsewhere.

Getting started with Slate is super easy! Simply fork this repository and follow the instructions below. Or, if you'd like to check out what Slate is capable of, take a look at the [sample docs](http://lord.github.io/slate).

Getting Started with Slate
------------------------------

### Prerequisites

You're going to need:

 - **Linux or OS X** — Windows may work, but is unsupported.
 - **Ruby, version 2.2.5 or newer**
 - **Bundler** — If Ruby is already installed, but the `bundle` command doesn't work, just run `gem install bundler` in a terminal.

### Getting Set Up

1. Fork this repository on Github.
2. Clone *your forked repository* (not our original one) to your hard drive with `git clone https://github.com/YOURUSERNAME/slate.git`
3. `cd slate`
4. Initialize and start Slate. You can either do this locally, or with Vagrant:

```shell
# either run this to run locally
bundle install
bundle exec middleman server

# OR run this to run with vagrant
vagrant up
```

You can now see the docs at http://localhost:4567. Whoa! That was fast!

Now that Slate is all set up on your machine, you'll probably want to learn more about [editing Slate markdown](https://github.com/lord/slate/wiki/Markdown-Syntax), or [how to publish your docs](https://github.com/lord/slate/wiki/Deploying-Slate).

If you'd prefer to use Docker, instructions are available [in the wiki](https://github.com/lord/slate/wiki/Docker).

Companies Using Slate
---------------------------------

* [NASA](https://api.nasa.gov)
* [IBM](https://docs.cloudant.com/api.html)
* [Sony](http://developers.cimediacloud.com)
* [Mozilla](http://localforage.github.io/localForage/)
* [Best Buy](https://bestbuyapis.github.io/api-documentation/)
* [Travis-CI](https://docs.travis-ci.com/api/)
* [Greenhouse](https://developers.greenhouse.io/harvest.html)
* [Woocommerce](http://woocommerce.github.io/woocommerce-rest-api-docs/)
* [Appium](http://appium.io/slate/en/master)
* [Dwolla](https://docs.dwolla.com/)
* [Clearbit](https://clearbit.com/docs)
* [Coinbase](https://developers.coinbase.com/api)
* [Parrot Drones](http://developer.parrot.com/docs/bebop/)
* [Fidor Bank](http://docs.fidor.de/)
* [Scale](https://docs.scaleapi.com/)

You can view more in [the list on the wiki](https://github.com/lord/slate/wiki/Slate-in-the-Wild).

Need Help? Found a bug?
--------------------

[Submit an issue](https://github.com/lord/slate/issues) to the Slate Github if you need any help. And, of course, feel free to submit pull requests with bug fixes or changes.

Contributors
--------------------

Slate was built by [Robert Lord](https://lord.io) while interning at [TripIt](https://www.tripit.com/).

Thanks to the following people who have submitted major pull requests:

- [@chrissrogers](https://github.com/chrissrogers)
- [@bootstraponline](https://github.com/bootstraponline)
- [@realityking](https://github.com/realityking)
- [@cvkef](https://github.com/cvkef)

Also, thanks to [Sauce Labs](http://saucelabs.com) for helping sponsor the project.

Special Thanks
--------------------
- [Middleman](https://github.com/middleman/middleman)
- [jquery.tocify.js](https://github.com/gfranko/jquery.tocify.js)
- [middleman-syntax](https://github.com/middleman/middleman-syntax)
- [middleman-gh-pages](https://github.com/edgecase/middleman-gh-pages)
- [Font Awesome](http://fortawesome.github.io/Font-Awesome/)

## API工程的主要用途：

- 把基于markdown的文档编译为API形式的HTML，用于提供在线版本的API。
- 提供实时编译的功能，刷新页面时重新编译HTML，用于写文档时查看效果。

## API工程的基本架构：

- Ruby + Nodejs 
- Ruby用于把markdown生成为HTML
- Nodejs用于增加语言的下拉框（因为我不会RUBY，只会写Nodejs)

## 如何安装

### Windows:

1. install ruby 2.3.3 X64 [http://rubyinstaller.org/downloads/](http://rubyinstaller.org/downloads/)
2. install ruby DEVELOPMENT KIT (2.0 and above X64) [http://rubyinstaller.org/downloads/](http://rubyinstaller.org/downloads/)
3. install nodejs.(最新版即可）
4. 在环境变量PATH中加入这两个程序。
5. 安装bundle。    `gem install bundler`
6. 安装grunt。     `npm install -g grunt grunt-cli`
7. 从SVN或git上取源代码。 
8. 安装slate依赖包。在slate目录下：  `bundle install`
9. 安装nodejs依赖包。在slate目录下：  `npm install`
10. 运行server(仅用于本机调试).       在slate目录下： `./run.bat`
11. 编译为HTML。     在slate目录下： `./build.bat`
12. 编译后的代码放在nginx 或 apache的web目录下,即可通过浏览器访问编译后的静态网页。

### Ubuntu:

1. install ruby:  
```shell
  sudo apt-get install ruby
  sudo apt-get install ruby-dev
```
2. install nodejs  
```shell
  curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
  sudo apt-get install -y nodejs
```
3. 安装bundle。    `gem install bundler`
4. 安装grunt。     `npm install -g grunt grunt-cli`
5. 从svn或git上取源代码。 
6. 安装slate依赖包。在slate目录下：  `bundle install`
7. 安装nodejs依赖包。在slate目录下：  `npm install`
8. 运行server(仅用于本机调试).       在slate目录下： `./run.bat`
9. 编译为HTML。     在slate目录下： `./build.bat`
10. 编译后的代码放在nginx 或 apache的web目录下,即可通过浏览器访问编译后的静态网页。


## 安装过程中的工具简单说明：

- Ruby：一种编程语言，
- Gem： ruby语言的包管理器
- Nodejs：服务器端的javascript，可以用来写后台程序
- npm: Nodejs的包管理器
- bundle: ruby语言中，管理项目所需程序包的依赖关系的程序。类似于Maven。
- middleman: ruby语言中用于生成静态资源的工具，同时能提供web功能，但一般不用于生产环境提供服务。
- mermaid: javascript前端框架，用于根据文本生成流程图。

**通过本系统写API不需要会写Ruby或Nodejs，只要懂markdown语法即可。**


## 如何使用

- source根目录下的*.md会编译为独立的HTML。如index.html.md会编译为index.html.
- source/includes中的文件可以被index.html引用，引用方式参见index.html
- markdown的语法参见：https://github.com/lord/slate/wiki/Markdown-Syntax
- markdown的例子参见：source/includes/demo.md
- mermaid的语法参见：https://knsv.github.io/mermaid/
- mermaid的例子参见：source/includes/tutorials.md

## 开发流程

1. 安装相关软件
2. 下载项目
3. 打开source/*.html.md编辑需要引用的文件。基本规则：下划线+引用中的文件名+".md". 如在文件中引用的内容是"faqs",则实际文件名是"_faqs.md"
4. 编辑引用的文件
5. 进入项目目录，执行./run.bat查看效果. 

## 发布流程

1. 安装相关软件
2. 下载项目
3. 进入项目目录，执行./build.sh (或build.bat).编译后的html在build目录下。
4. 把web服务器(nginx或apache)的目录指向build即可。
