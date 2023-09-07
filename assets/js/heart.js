var brd = document.createElement("DIV");
	document.body.insertBefore(brd, document.getElementById("board"));

	const duration = 3000;
	const speed = 0.5;
	const cursorXOffset = 0;
	const cursorYOffset = -5;

	var hearts = [];

	function generateHeart(x, y, xBound, xStart, scale)
	{
		var heart = document.createElement("DIV");
		heart.setAttribute('class', 'heart');
		brd.appendChild(heart);
		heart.time = duration;
		heart.x = x;
		heart.y = y;
		heart.bound = xBound;
		heart.direction = xStart;
		heart.style.left = heart.x + "px";
		heart.style.top = heart.y + "px";
		heart.scale = scale;
		heart.style.transform = "scale(" + scale + "," + scale + ")";
		if(hearts == null)
			hearts = [];
		hearts.push(heart);
		return heart;
	}

	var down = false;
	var addEventListener = null;

	//add addEventListener instead of event

	var a = document.getElementById('x'); 
	a.addEventListener('click', function(e) {
		down = true;
		addEventListener=e;
	}, false);

	var before = Date.now();
	var id = setInterval(frame, 5);
	var gr = setInterval(check, 100);

	function frame()
	{
		var current = Date.now();
		var deltaTime = current - before;
		before = current;
		for(i in hearts)
		{
			var heart = hearts[i];
			heart.time -= deltaTime;
			if(heart.time > 0)
			{
				heart.y -= speed;
				heart.style.top = heart.y + "px";
				heart.style.left = heart.x + heart.direction * heart.bound * Math.sin(heart.y * heart.scale / 30) / heart.y * 200 + "px";
			}
			else
			{
				heart.parentNode.removeChild(heart);
				hearts.splice(i, 1);
			}
		}
	}
	function check()
	{
		if(down)
		{
			var start = 1 - Math.round(Math.random()) * 2;
			var scale = Math.random() * Math.random() * 0.8 + 0.2;
			var bound = 30 + Math.random() * 20;
			generateHeart(addEventListener.pageX - brd.offsetLeft + cursorXOffset, addEventListener.pageY - brd.offsetTop + cursorYOffset, bound, start, scale);
		}
	}
