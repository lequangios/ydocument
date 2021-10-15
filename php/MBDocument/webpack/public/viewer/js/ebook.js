window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame   ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame    ||
      function( callback ){
        window.setTimeout(callback, 1000 / 60);
      };
})();

var Yebooks = {version:"1.0", create:"levietquangt2@gmail.com"}

Yebooks.Utils = {version:"1.0"};

Yebooks.Utils.resizeCountDown = 0;
Yebooks.Utils.isResizeStart = false;
Yebooks.Utils.isResizeEnd = true;
Yebooks.Utils.reszieEndCallback = null;
Yebooks.Utils.timeCheck = 3000; // After 3 seconds, if user don't resize auto call resize end;

Yebooks.Utils.checkElementLoaded = function(ele, callback, para)
{
	var self = this;
	self.ele = ele;
	self.callback = callback;
	self.para = para;
	self.timer = 0;
	self.currentHeight = 0;
	self.init = function()
	{
		self.currentHeight = self.ele.offsetHeight;

		self.timer = setTimeout(function(self){
			console.log("check again");
			self.checkItAgian();
		},100,self);
	}

	self.checkItAgian = function()
	{
		var h = self.ele.offsetHeight;
		// Load Done, Height not change
		if(h == self.currentHeight)
		{
			setTimeout(function(self){
				self.callback(self.para);
			},500,self);
		}
		else
		{
			self.currentHeight = h;
			self.timer = setTimeout(function(self){self.checkItAgian();},100,self);
		}
	}

	self.init();
}

Yebooks.Utils.Ajax = function(parameter)
{
	var para;
	if (!parameter) {
		para = {
			url:"",
			contents:"",
			contentType:"",
			context:null,
			data:"",
			crossDomain:true,
			timeout:10000,
			type:"GET",
			complete: function(respone){},
			error: function(){},
			ontimeout: function(){},
			httpErrorCode : 0
		};
	}
	else para = parameter;

	var httpRequest;
	if (window.XMLHttpRequest) { // Mozilla, Safari, IE7+ ...
    	httpRequest = new XMLHttpRequest();
	} else if (window.ActiveXObject) { // IE 6 and older
    	httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
	}

	httpRequest.onreadystatechange = function()
	{
		if (httpRequest.readyState == XMLHttpRequest.DONE ) 
		{
			para.httpErrorCode = httpRequest.status;
			para.complete(httpRequest);
		}
		else
		{
			para.error();
		}
	}

	httpRequest.open(para.type,para.url,true);
	httpRequest.setRequestHeader("Content-type",para.contentType);
	httpRequest.timeout = para.timeout;
	httpRequest.ontimeout = para.ontimeout;
	httpRequest.send(para.data);
}

Yebooks.Utils.getMousePosition = function (e) 
{
    if(e.pageX)
    {
        return {x:e.pageX, y:e.pageY};
    }
    else
    {
        return {x:e.changedTouches[0].pageX, y:e.changedTouches[0].pageY };
    }
};

Yebooks.Utils.getView = function()
{
	var width = window.innerWidth
	|| document.documentElement.clientWidth
	|| document.body.clientWidth;

	var height = window.innerHeight
	|| document.documentElement.clientHeight
	|| document.body.clientHeight;

	return {w:width, h:height};
}

Yebooks.Utils.addEvent = function(selector,event,callback)
{
	if((typeof selector)=="string") selector = document.querySelectorAll(selector);

	if(selector.length>0)
	{
		for(var i = 0; i < selector.length; i++)
		{
			if (window.addEventListener) selector[i].addEventListener(event, callback, false);
			else if (window.attachEvent) r = selector[i].attachEvent('on' + event, callback);
		}
	}
	else
	{
		if(selector)
		{
			if (window.addEventListener && selector.addEventListener) selector.addEventListener(event, callback, false);
			else if (window.attachEvent) r = selector.attachEvent('on' + event, callback);
		}
		
	}
}

Yebooks.Utils.ready = function(callback)
{
	if (window.addEventListener) 
	{
		window.addEventListener("DOMContentLoaded",callback,false);
	}
	else
	{
		try 
		{
			var isFrame = window.frameElement != null
        } catch(e) 
        {
        	throw Error("window.frameElement unknow function");
        }

        if ( document.documentElement.doScroll && !isFrame )
        {
        	function tryScroll(){
            	if (called) return
                try {
                    document.documentElement.doScroll("left")
                    callback();
                } catch(e) {
                    setTimeout(tryScroll, 10)
                }
            }
            tryScroll()
        }

        document.attachEvent("onreadystatechange", function(){
            if ( document.readyState === "complete" ) 
            {
                callback();
            }
        })
	}
}

Yebooks.Utils.load = function(callback)
{
	if (window.addEventListener)
	{
		window.addEventListener('load', callback, false);
	}
    else
    {
    	window.attachEvent('onload', callback);
	}
}

Yebooks.Utils.resize = function(callback)
{
	if (window.addEventListener)
	{
		window.addEventListener('resize', callback, false);
	}
    else
    {
    	window.attachEvent('onresize', callback);
	}
}

Yebooks.Utils.resizeEnd = function(callback)
{
	Yebooks.Utils.reszieEndCallback = callback;
}

Yebooks.theBook = function () 
{
	var bo = this;
	bo.tableContent = null;
	bo.tableContentBtn = null;
	bo.bookmarkBtn = null;
	bo.styleBtn = null;
	bo.wrapperDiv = null;
	bo.contentDiv = null;
	bo.sectionnDiv = null;
	bo.styleWrapper = null;
	bo.loadingDiv = null;
	bo.loadingImg = null;
	bo.isShowTableContent = false;
	bo.menuHeight = 50;
	bo.view = null;
	bo.currentIndex = 0;
	bo.currentSubIndex = -1;
	bo.contentScroll = null;
	bo.isFirstStartScroll = true;
	bo.isLockUI = false;
	bo.isShowStyleEdit = false;
	bo.currentBgIndex = 0;
	bo.currentZoom = 0;
	bo.isMoveToSub = false;
	bo.isLoading = false;

	bo.offsetLeft = 0;

	bo.intBook = function()
	{
		bo.tableContent = document.querySelector("#table-content");
		bo.tableContentBtn = document.querySelector("#menu .table_content_menu");
		bo.wrapperDiv = document.querySelector("#wrapper");
		bo.contentDiv = document.querySelector("#content");
		bo.styleBtn = document.querySelector("#menu .content_font");
		bo.styleWrapper = document.querySelector("#action-menu");
		bo.loadingDiv = document.querySelector("#loading");
		bo.loadingImg = document.querySelector("#loading img");
	}

	bo.settingView = function()
	{
		bo.view = Yebooks.Utils.getView();
		var h = bo.view.h - bo.menuHeight;
		bo.tableContent.style.height = h + "px";
		bo.wrapperDiv.style.height = (h-20) + "px";
		document.querySelector('body').style.height = bo.view.h + "px";
		document.querySelector('#table-content-wrapper').style.height = (h-20) + "px";
		bo.offsetLeft = document.querySelector("#menu").offsetLeft;
		bo.tableContent.style.left=-bo.view.w-10+"px";
		if(bo.view.w <= 1000)
		{
			bo.tableContent.style.width=bo.view.w + "px";
			bo.offsetLeft = 0;
		}
		else bo.tableContent.style.width=bo.view.w/2 + "px";

		bo.loadingDiv.style.height = bo.view.h + "px";
		bo.loadingImg.style.left = (bo.view.w - 80)/2 + "px";
		bo.loadingImg.style.top = (bo.view.h - 80)/2 + "px";

		// scroll content
		new IScroll('#table-content-wrapper', { mouseWheel: true, scrollbars: true, fadeScrollbars:true });
	}

	bo.showHideLoading = function()
	{
		if(bo.isLoading == true)
		{
			bo.loadingDiv.style.display = "none";
			bo.isLoading = false;
		}
		else
		{
			bo.loadingDiv.style.display = "block";
			bo.isLoading = true;
		}
	}

	bo.bookmarkAction = function()
	{
		location.href = "http://levietquang.com/yebooks/";
	}

	bo.settingScroll = function()
	{
		if(bo.contentScroll == null)
		{
			bo.contentScroll = new IScroll('#wrapper', { mouseWheel: true, scrollbars: true, fadeScrollbars:true });
		}
		bo.contentScroll.scrollTo(0,0);
		bo.contentScroll.refresh();
		if(bo.isMoveToSub == false)
		{
			bo.contentScroll.on('scrollStart', bo.scrollFirstStart);
			bo.isFirstStartScroll = true;
		}
		else
		{
			var id = bo.currentIndex+"_"+bo.currentSubIndex;
			var num = -document.getElementById(id).offsetTop;
			bo.contentScroll.scrollTo(0,num,1000);
			bo.isMoveToSub = false;
		}
		

	}

	bo.scrollFirstStart = function()
	{
		if(bo.isFirstStartScroll == true && bo.contentScroll != null)
		{
			bo.contentScroll.scrollTo(0,0);
			bo.contentScroll.refresh();
			bo.isFirstStartScroll = false;
			bo.contentScroll.on('scrollStart', function(){return;});
		}
	}

	bo.addEvent = function()
	{
		bo.tableContentBtn.addEventListener("click",showHideTableContent,false);
		Yebooks.Utils.addEvent(".idx-content li a.chapter","click",bo.loadChapter);
		Yebooks.Utils.addEvent(".idx-content-sub1 a.sub-chapter","click",bo.loadSubChapter);
		Yebooks.Utils.addEvent("#menu .content_font","click",bo.showHideStyeMenu);
		Yebooks.Utils.addEvent("#backround-choice a","click",bo.changeBackgroundColor);

		Yebooks.Utils.addEvent("#fontsize-choice .minus","click",bo.minusZoom);
		Yebooks.Utils.addEvent("#fontsize-choice .add","click",bo.addZoom);
	}

	bo.loadBook = function()
	{
		bo.intBook();
		bo.settingView();
		bo.addEvent();
		bo.loadContent(bo.currentIndex);
	}

	bo.loadContent = function(index)
	{
		bo.showHideLoading();

		bo.isLockUI = true;
		var path = "chap"+index+".html";
		var para = {
			url:path,
			contents:"",
			contentType:"text/xml",
			context:null,
			data:"",
			crossDomain:true,
			timeout:1000,
			type:"GET",
			complete: bo.loadContentComplete,
			error: bo.loadContentError,
			ontimeout: null,
			httpErrorCode : 0
		};
		Yebooks.Utils.Ajax(para);
	}

	bo.loadContentComplete = function(request)
	{
		bo.contentDiv.innerHTML = "";
		bo.sectionnDiv = null;
		if(bo.sectionnDiv==null)
		{
			bo.sectionnDiv = document.createElement("section");
			bo.sectionnDiv.setAttribute("id", bo.currentIndex);
			bo.sectionnDiv.setAttribute("class", "section");
			bo.sectionnDiv.innerHTML = request.response;
			// bo.sectionnDiv.addEventListener("load", bo.initContentComplete);
			bo.contentDiv.appendChild(bo.sectionnDiv);
			Yebooks.Utils.checkElementLoaded(bo.contentDiv, bo.initContentComplete, bo);
			// bo.settingScroll();
			
		}

	}

	bo.loadContentError = function()
	{
		
	}

	bo.initContentComplete = function()
	{
		bo.settingScroll();
		bo.isLockUI = false;
		bo.showHideLoading();
	}

	bo.loadChapter = function(e)
	{
		showHideTableContent();
		var obj = e.target;
		if(obj.className=="chapter current") return;

		// Clear current index
		var menu = document.querySelectorAll(".idx-content li a.chapter");
		menu[bo.currentIndex].className = "chapter";

		// Clear sub menu index
		if(bo.currentSubIndex >= 0)
		{
			var menu = document.querySelectorAll(".idx-content-sub1 a.sub-chapter");
			menu[bo.currentSubIndex].className = "sub-chapter";
			bo.currentSubIndex = -1;
		}

		obj.className="chapter current";
		var index = parseInt(obj.getAttribute("data-index"));
		bo.currentIndex = index;
		bo.loadContent(index);
	}

	bo.loadSubChapter = function(e)
	{
		if(bo.isLockUI == true) return;

		showHideTableContent();

		bo.isLockUI = true;
		var obj = e.target;
		if(obj.className=="sub-chapter current") return;

		// Clear current index
		var menu = document.querySelectorAll(".idx-content li a.chapter");
		menu[bo.currentIndex].className = "chapter";

		// Clear sub menu index
		if(bo.currentSubIndex >= 0)
		{
			var menu = document.querySelectorAll(".idx-content-sub1 a.sub-chapter");
			menu[bo.currentSubIndex].className = "sub-chapter";
			bo.currentSubIndex = -1;
		}

		var str = obj.getAttribute("data-sub-index");
		var arr = str.split("_");
		var t1 = parseInt(arr[0]);
		var t2 = parseInt(arr[1]);
		
		// This is current Chapper
		if(t1 == bo.currentIndex)
		{
			// str = "#"+str;
			var chapObj = document.getElementById(str);
			var num = -chapObj.offsetTop;
			bo.contentScroll.scrollTo(0,num,1000);
			bo.currentSubIndex = t2;
			obj.className = "sub-chapter current";
			bo.isLockUI = false;
		}
		else
		{
			bo.currentIndex = t1;
			bo.currentSubIndex  = t2;
			bo.isMoveToSub = true;
			obj.className = "sub-chapter current";
			bo.loadContent(bo.currentIndex);
			bo.isLockUI = false;
		}
	}

	bo.showHideStyeMenu = function()
	{
		if(bo.isLockUI == true) return;

		bo.isLockUI = true;
		// Show
		if(bo.isShowStyleEdit == false)
		{
			bo.styleWrapper.style.display = "block";

			setTimeout(function(bo){
				bo.styleWrapper.style.opacity = 1;
				setTimeout(function(bo){
					bo.isLockUI = false;
					bo.isShowStyleEdit = true;
				},1000,bo);
			},5,bo);
			
		}
		else // Hide
		{
			bo.styleWrapper.style.opacity = 0;
			setTimeout(function(bo){
				bo.styleWrapper.style.display = "none";
				bo.isLockUI = false;
				bo.isShowStyleEdit = false;
			},1000,bo);
		}
	}

	bo.changeBackgroundColor = function(e)
	{
		var obj = e.target;
		var index = parseInt(obj.getAttribute("data"));
		if(index == bo.currentBgIndex) return;

		// bo.showHideStyeMenu();

		//Clear Old Forcus
		var item = document.querySelectorAll("#backround-choice a");
		item[bo.currentBgIndex].classList.remove("current");
		obj.classList.add("current");
		bo.currentBgIndex = index;

		var str = "template"+(index+1);
		document.querySelector("body").className = str;
	}

	bo.addZoom = function()
	{
		if(bo.currentZoom == 100 && bo.isLockUI == true) return;

		bo.isLockUI = true;
		bo.currentZoom += 10;
		if(bo.currentZoom >= 100) bo.currentZoom = 100;

		var cls = "zoom"+bo.currentZoom;
		bo.contentDiv.className = cls;
		document.querySelector("#fontsize-choice .current-size").innerHTML = bo.currentZoom+"%";
		bo.contentScroll.scrollTo(0,0);
		bo.contentScroll.refresh();
		bo.contentScroll.on('scrollStart', bo.scrollFirstStart);
		bo.isFirstStartScroll = true;

		setTimeout(function(bo){
			bo.isLockUI = false;
		},1000,bo);

	}

	bo.minusZoom = function()
	{
		if(bo.currentZoom == 0 && bo.isLockUI == true) return;

		bo.isLockUI = true;
		bo.currentZoom -= 10;
		if(bo.currentZoom <= 0) bo.currentZoom = 0;

		var cls = "zoom"+bo.currentZoom;
		bo.contentDiv.className = cls;
		document.querySelector("#fontsize-choice .current-size").innerHTML = bo.currentZoom+"%";
		bo.contentScroll.scrollTo(0,0);
		bo.contentScroll.refresh();
		bo.contentScroll.on('scrollStart', bo.scrollFirstStart);
		bo.isFirstStartScroll = true;

		setTimeout(function(bo){
			bo.isLockUI = false;
		},1000,bo);
	}

	// Function
	function showHideTableContent()
	{
		if(!bo.isShowTableContent)
		{
			bo.tableContent.style.left=bo.offsetLeft+"px";
			bo.isShowTableContent = true;
		}
		else
		{
			bo.tableContent.style.left=-bo.view.w-10+"px";
			bo.isShowTableContent = false;
		}
	}
}

var book = new Yebooks.theBook();

Yebooks.Utils.ready(function(){
	book.loadBook();
});

Yebooks.Utils.load(function(){
	// book.settingScroll();
});