var table = [];
var solved = [];
var found = false;
var active = {
	x: 0,
	y: 0
};

function setup(){
	
	noCanvas();
	var div = createDiv("");
	div.elt.id = "div";
	div.elt.style.width = "360px";
	div.parent().style.backgroundColor = "#7f8c8d";
	
	for(var i=0; i<9; i++){
		
		table[i] = [];
		solved[i] = [];
		for(var j=0; j<9; j++){
			
			table[i][j] = createInput('', "tel");
			table[i][j].parent("div");
			table[i][j].elt.placeholder = "";
			table[i][j].elt.id = i*9+j;
            table[i][j].elt.pattern = "[1-9]";
			
			if(i%3 == 2) table[i][j].elt.style.borderBottom = "3px solid #2c3e50";
			if(i%3 == 0) table[i][j].elt.style.borderTop = "3px solid #2c3e50";
			if(j%3 == 2) table[i][j].elt.style.borderRight = "3px solid #2c3e50";
			if(j%3 == 0) table[i][j].elt.style.borderLeft = "3px solid #2c3e50";
			
			solved[i][j] = "";
			
		}
		
	}

	table[active.y][active.x].elt.focus();
	
}

function draw(){
	
}

function mouseReleased(){
	
	var id = document.activeElement.id;
	var x = id % 9;
	var y = floor(id / 9);
	active.x = x;
	active.y = y;
	
}

function keyReleased(){
	
	if( keyCode == UP_ARROW ) if(active.y != 0) active.y--;
	if( keyCode == DOWN_ARROW ) if(active.y != 8) active.y++;
	if( keyCode == LEFT_ARROW ) if(active.x != 0) active.x--;
	if( keyCode == RIGHT_ARROW ) if(active.y != 8) active.x++;
	table[active.y][active.x].elt.focus();
	
	if( keyCode != UP_ARROW && keyCode != DOWN_ARROW && keyCode != LEFT_ARROW && keyCode != RIGHT_ARROW){
		
		if( checkXX(active, table[active.y][active.x].elt.value) != 0 || checkYY(active, table[active.y][active.x].elt.value) != 0 || checkCC(active, table[active.y][active.x].elt.value) != 0 ) found = true;
		
		var data = 0;
		for(var i = 0; i < 9; i++){
			for(var j = 0; j < 9; j++){
				
				solved[i][j] = table[i][j].elt.value;
				if( table[i][j].elt.value == "" ){
					table[i][j].elt.placeholder = "";
				}else{
					data++;
				}

			}
		}
		
		
		
		if(data) solver(0,0);
		
		for(var i = 0; i < 9; i++){
			for(var j = 0; j < 9; j++){
				table[i][j].elt.placeholder = solved[i][j];
			}
		}
		
		found = false;
		
	}

	if( table[active.y][active.x].elt.value != "" ) table[active.y][active.x].elt.style.backgroundColor = "#bdc3c7";
	if( table[active.y][active.x].elt.value == "" ) table[active.y][active.x].elt.style.backgroundColor = "#ecf0f1";

}

function checkXX( xy, v ){
	let xx = xy.x;
	let yy = xy.y;
	let c = 0;
	
	if(v == "") return 0;

	for( var i=0; i<9; i++ ) if( table[yy][i].elt.value == v ) c++;
	
	return c-1;
	
}

function checkYY( xy, v ){
	let xx = xy.x;
	let yy = xy.y;
	let c = 0;
	
	if(v == "") return 0;
	
	for( var i=0; i<9; i++ ) if( table[i][xx].elt.value == v ) c++;
	
	return c-1;

}

function checkCC( xy, v ){
	let xx = xy.x;
	let yy = xy.y;
	let c = 0;
	
	if(v == "") return 0;
	
	var k = floor(xx/3);
	var l = floor(yy/3);
	var maxK = (k+1)*3;
	var maxL = (l+1)*3;
	
	for( var i=k*3; i<maxK; i++ )
		for( var j=l*3; j<maxL; j++ )
			if( table[j][i].elt.value == v ) c++;
	
	return c-1;
}

function checkX( y, v ){
	let yy = y;

	for( var i=0; i<9; i++ ) if( solved[yy][i] == v ) return 1;
	
	return 0;
	
}

function checkY( x, v ){
	let xx = x;
	
	for( var i=0; i<9; i++ ) if( solved[i][xx] == v ) return 1;
	
	return 0;

}

function checkC( x, y, v ){
	let xx = x;
	let yy = y;
	
	var k = floor(xx/3);
	var l = floor(yy/3);
	var maxK = (k+1)*3;
	var maxL = (l+1)*3;
	
	for( var i=k*3; i<maxK; i++ )
		for( var j=l*3; j<maxL; j++ )
			if( solved[j][i] == v ) return 1;
	
	return 0;
}

function solver( x, y ){
	let xx = x;
	let yy = y;
	
	if(found) return;
	
	if( yy > 8 ){
		xx++;
		yy = 0;
	}
	
	if( xx > 8 ){
		found = true;
		return;
	}
	
	if( solved[yy][xx] == "" ){
		
		for( var i = 1; i < 10; i++ ){
			if( checkX(yy,i) == 0 && checkY(xx,i) == 0 && checkC(xx,yy,i) == 0 ){
				solved[yy][xx] = i;
				solver(xx, yy+1);
				if( found ) return;
			}
		}
		solved[yy][xx] = "";
		
	}else solver(xx,yy+1);
	
}