/*
* 自定义裁剪插件
* imgTagId  上传的原图片所显示的控件id
* jqSelector: 裁剪后的预览图控件选择器
* */
var CustomCropper = function (imgTagId,jqSelector,opts) {
  var custom = new Object();
  custom.imgTagId = imgTagId;
  custom.callbacks = [];
  custom.postOptions = {
    bucket:""  //   设置传入的分组  image(有时间限制的链接), imgpub (用于永久链接)
  };
  var URL = window.URL || window.webkitURL;
  var options = {
    viewMode:0,//cropper的视图模式  0 没有限制  1  裁剪框只能在图片内移动  2  图片上下方有缝隙  3  图片铺满
    dragMode: "move",//‘crop’: 可以产生一个新的裁剪框   ‘move’: 只可以移动裁剪框  ‘none’: 什么也不处理
    aspectRatio: 16 / 9,//裁剪框的宽高比
    cropBoxResizable:true,//是否允许调整裁剪框的大小
    guides:false,//裁剪框上方的虚线
    preview: jqSelector||'',//预览图容器，jquery的dom选择器
    ready: function (e) {
     // console.log(e.type);
    },
    cropstart: function (e) {
    //  console.log(e.type, e.detail.action);
    },
    cropmove: function (e) {
     // console.log(e.type, e.detail.action);
    },
    cropend: function (e) {
     // console.log(e.type, e.detail.action);
    },
    crop: function (e) {
      var data = e.detail;

    //  console.log(e.type);
    },
    zoom: function (e) {
   //   console.log(e.type, e.detail.ratio);
    }
  };

  //上传图片文件，初始化裁剪控件
  //opts：可扩展的配置属性，具体属性内容可参考https://fengyuanchen.github.io/cropperjs/
  custom.uploadImg = function (file,opts) {
    var image = document.getElementById(this.imgTagId);
    if (file && /^image\/\w+/.test(file.type)) {
      var originalImageURL = image.src;

      if (this.uploadedImageURL) {
        URL.revokeObjectURL(this.uploadedImageURL);
      }
      image.src = this.uploadedImageURL = URL.createObjectURL(file);
      if (this.cropper) {
        this.cropper.destroy();
      }
      if (opts) {
        for (var key in opts) {
          options[key] = opts[key];
        }
      }
      var cropper = new Cropper(image, options);
     // $(image).on().cropper(options);
      this.cropper = cropper;
    }
    else {
      return "Please choose an image file";
    }
  }

  custom.GetPreviewAndBase64 = function () {
    const that = this;
    if (this.cropper) {
      var option = this.postOptions;
      var imgCanvas = this.cropper["getCroppedCanvas"](options);
      var base64Img = imgCanvas.toDataURL("image/jpeg");
      return this.upLoad({base64Img:base64Img,bucket:option.bucket}).then( rst =>{
        that.rstData = {
          key: rst.key,
          url: rst.url,
          imgCanvas: imgCanvas,
          base64Img: base64Img
        };
        that.runRegister();
      }).catch(function (err) {
        alert("上传图片过大，请重新选择图片。");
        // alert(err.responseJSON.message);
      });
    }
    else return "please upload a image";
  }

  custom.upLoad = function(data){
    var defer = Q.defer();
    let url = `${apiServer}/img/base64/nobody`;
    let postData = {
      prefix: 'xcxmerchant',
      bucket: data.bucket || "image",
      imgData: data.base64Img
    };
    $.post(url,postData,
      rst => {
        defer.resolve(rst);
      }).error( err => {
        defer.reject(err);
    });
    return defer.promise;
  }

  //注册裁剪完成后的回调函数
  custom.registcomplete = function(callback){
    if (callback&&typeof callback == "function") {
       this.callback = callback;
    }
  }

  //注册回调函数
  custom.register = function(fn,arguments){
     this.callbacks.push({func:fn,args:arguments});
  };

  //立即执行所有注册的回调函数
  custom.runRegister = function(){
    for (var idx in this.callbacks) {
      var obj = this.callbacks[idx];
      obj.func.apply(this, obj.args);
    }
  }

  //重置裁剪框
  custom.reset = function(){
    this.cropper.reset();
  }
//向右旋转90度
  custom.rotateRight = function() {
    this.cropper.rotate(90);
  }
  //向左旋转90度
  custom.rotateLeft = function() {
    this.cropper.rotate(-90);
  }
  return custom;
}
