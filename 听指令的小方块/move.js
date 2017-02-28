function ChessboardBuild(element,x,y)
{
	element.style.display="block";

	for (var q = element.childNodes.length - 1; q >= 2; q--) //去掉第一个空白节点和第一个div.cell
	{
		element.removeChild(element.childNodes[q]);
	}
	element.style.width=x*47+"px";
	element.style.height=y*47+"px";

	for( var j=0; j<y; j++)
	{
		for( var i=0; i<x; i++)
		{
			var pane=document.createElement("div");
			pane.className="panestyle";
			pane.innerHTML=i+","+j;
			element.appendChild(pane);
		}
	}
}

function Chess(element,initialX,initialY)
{
	this.element=element;
	this.initialX=initialX;
	this.initialY=initialY;
	this.currl;
	this.currt;
	this.x;
	this.y;
	this.turn=0;
	this.flag=true;
	this.switchs=0;
	this.finger=true;
	this.gate=0;
}

Chess.prototype={

				  judgeTurn:function()
							{
								if(this.turn<=-360)
								{
									this.turn=0;
								}
								if(this.turn>=360 && this.turn<450)
								{
									this.turn=0;
								}
								if(this.turn>=450)
								{
									this.turn=90;
								}					
							},

				  judgeCurr:function()
							{
								if(this.currt<47)
								{
									this.currt=47;
									this.flag=false;
								}
								if(this.currt>(this.y-2)*47)
								{
									this.currt=(this.y-2)*47;
									this.switchs=1;
								}
								if(this.currl<47)
								{
									this.currl=47;
									this.finger=false;
								}
								if(this.currl>(this.x-2)*47)
								{
									this.currl=(this.x-2)*47;
									this.gate=1;
								}
						},

				  r:function()
					{
				 		this.judgeTurn();
						this.turn+=90;
						this.element.style.transform="rotate("+this.turn+"deg)";
				 	},
				 
				  l:function()
				 	{
						this.judgeTurn();
						this.turn-=90;
						this.element.style.transform="rotate("+this.turn+"deg)";
				 	},
				
				  b:function()
					{
					 	this.judgeTurn();
						this.turn+=180;
						this.element.style.transform="rotate("+this.turn+"deg)";
					},
				
				  g:function()
					{
					 	this.judgeTurn();   
						this.judgeCurr();
						
						if(this.turn==0)
						{
							this.tt();
						}
						if(this.turn==90 || this.turn==-270)
						{
							this.tr();
						}
						if(this.turn==180 || this.turn==-180)
						{
							this.tb();
						}
						if(this.turn==270 || this.turn==-90)
						{
							this.tl();
						}
					},
					
				  tl:function()
					 {
					 	this.judgeCurr();
					    if(this.gate==1)
						{
							this.currl=(this.x-1)*47;
							this.gate=0;
						}
						this.currl-=47;
						this.element.style.left=this.currl+"px";
					 },
				
				  tt:function()
					 {
					 	this.judgeCurr();
						if(this.switchs==1)
						{
							this.currt=(this.y-1)*47;
							this.switchs=0;
						}
						this.currt-=47;
						this.element.style.top=this.currt+"px";			
					 },
				  
				  tr:function()
					 {
					 	this.judgeCurr();
						if(this.finger==false)
						{
							this.currl=0;
							this.finger=true;
						}
						this.currl+=47;
						this.element.style.left=this.currl+"px";			
					 },
				
				  tb:function()
					 {
					 	this.judgeCurr();
						if(this.flag==false)
						{
							this.currt=0;
							this.flag=true;
						}
						this.currt+=47;
						this.element.style.top=this.currt+"px";			
					 },
					
				  ml:function()
					 {
					 	if(this.turn==0)
						{
							this.l();
						}
						if(this.turn==90 || this.turn==-270)
						{
							this.b();
						}
						if(this.turn==180 || this.turn==-180)
						{
							this.r();
						}
						this.g();
					 },

				  mt:function()
					 {
					 	if(this.turn==90 || this.turn==-270)
						{
							this.l();
						}
						if(this.turn==180 || this.turn==-180)
						{
							this.b();
						}
						if(this.turn==270 || this.turn==-90)
						{
							this.r();
						}
						this.g();
					 },

				  mr:function()
					 {
					 	if(this.turn==0)
						{
							this.r();
						}
						if(this.turn==180 || this.turn==-180)
						{
							this.l();
						}
						if(this.turn==270 || this.turn==-90)
						{
							this.b();
						}
						this.g();
					 },
				
				  mb:function()
					 {
					 	if(this.turn==0)
						{
							this.b();
						}
						if(this.turn==90 || this.turn==-270)
						{
							this.r();
						}
						if(this.turn==270 || this.turn==-90)
						{
							this.l();
						}
						this.g();
					 }
};



window.onload=function()
{
	var chessboard=document.getElementsByClassName("chessboard")[0];
	var multiply=document.getElementsByClassName("multiply")[0];
	var number=multiply.getElementsByClassName("number");
	var enter=multiply.getElementsByTagName("input")[2];

	var cell=chessboard.getElementsByClassName("cell")[0];
	var chess1=new Chess(cell,3,3);
	
	enter.addEventListener("click", function(){ 
		build(chess1);
	});

	function build(instanceobj)
	{
		ChessboardBuild(chessboard,number[0].value,number[1].value); 
		instanceobj.element.style.top=(instanceobj.initialY)*47+"px";
		instanceobj.element.style.left=(instanceobj.initialX)*47+"px";
	}


	var btn=document.getElementsByClassName("btn")[0];
	var conduct=btn.getElementsByTagName("input")[0];  //执行按钮

	var panel=document.getElementById("panel");
	var list=document.getElementsByTagName("ul")[0];
	var serial=list.getElementsByClassName("serial");


	panel.addEventListener("keyup", function(){
		var order=this.value.split("\n");
		var arr = [];
		for (var i = 0; i < order.length; i++) 
		{
			arr.push("<li class='serial'>"+(i+1)+"</li>");
		}
		list.innerHTML = arr.join("");
		list.scrollTop = this.scrollTop;
	})

	panel.addEventListener("scroll", function(){
		list.scrollTop = this.scrollTop;
	})
		
	conduct.addEventListener("click", function(){
		command(chess1);
	});
	
	function command(instanceobj)
	{
		instanceobj.x=number[0].value;
		instanceobj.y=number[1].value;

		var order=panel.value.split("\n");
		for (var i = 0; i < order.length; i++) 
		{

			(function(i)
			 {
			 	var timer=setTimeout(function()
			 			{
			 				instanceobj.currt=parseInt(instanceobj.element.style.top);   
							instanceobj.currl=parseInt(instanceobj.element.style.left);
							var strarr=order[i].split(" ");
					 		var text=strarr[0].toLowerCase();   //将大写字符串转化为小写
						 	var result=Chess.prototype.hasOwnProperty(text);
					 		if(result)
					 		{
					 			if(strarr.length==1)
					 			{
					 				var num=1;
					 			}
					 			else if(strarr.length==2 && !isNaN(strarr[1]) && strarr[1]!="")
					 			{
					 				var num=strarr[1];
					 			}
					 			else
					 			{
					 				clearTimeout(timer);
					 				error(i);
					 			}
					 			product(instanceobj,text,num);
					 		}
					 		else
					 		{
					 			clearTimeout(timer);
				 				error(i);
					 		}
					 		
					 	}, i*1500);
			 })(i);
		}
	}	

	function product(instanceobj,text,num)
	{
		for (var i = 0; i < num; i++) 
		{
			instanceobj[text]();
		}
	}

	function error(n)
	{
		for (var j = 0; j < serial.length; j++) 
		{
			serial[n].style.background="red";
		}
	}

	var refresh=btn.getElementsByTagName("input")[1];
	
	refresh.addEventListener("click", function(){
		reset(chess1);
	});

	function reset(instanceobj)
	{
		list.innerHTML="<li class='serial'>1</li>";
		panel.value="";
		instanceobj.element.style.top=(instanceobj.initialY)*47+"px";
		instanceobj.element.style.left=(instanceobj.initialX)*47+"px";
		instanceobj.turn=0;
		instanceobj.element.style.transform="rotate("+instanceobj.turn+"deg)";
	}
}