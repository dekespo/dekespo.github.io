function artificialIntelligence(player, difficulty) { if (AI_TARGET_Y === null) AI_TARGET_Y = player.y; if(difficulty == "easy") return easy(player); else if(difficulty == "artista") return medium(player); else if(difficulty == "medium") return medium(player); else if(difficulty == "hard") return hard(player); else if(difficulty == "immortal") return immortal(player); } var move = function(yFrom, yTo, speedMax) { var diff = yTo - yFrom; var newY = yFrom; if (Math.abs(diff) > speedMax) { if (diff > 0) newY += speedMax; else if (diff < 0) newY -= speedMax; } else { newY = yTo; } return checkBorders(newY); }; var setTarget = function(y, dist) { AI_TARGET_Y = checkBorders(y + dist); }; var easy = function(player) { if (player.y == AI_TARGET_Y) { if (Math.random() < 0.5) setTarget(player.y, -player.height / 2); else setTarget(player.y, player.height / 2); player.y = move(player.y, AI_TARGET_Y, 1); } else { player.y = move(player.y, AI_TARGET_Y, 1); } return player; }; var medium = function(player) { var hockeyY = SHAPELIST.hockey.y; var hockeyVx = SHAPELIST.hockey.vx; if (player.y == AI_TARGET_Y) { if (Math.random() < 0.8) { setTarget(player.y, hockeyY - player.y - player.width / 2); } else { player = easy(player); } } else { player.y = move(player.y, AI_TARGET_Y, Math.min(hockeyVx, 3)); } console.log("medium y = ", player.y); return player; }; var hard = function(player) { var hockeyVx = SHAPELIST.hockey.vx; newY = SHAPELIST.hockey.y; if (Math.random() < 0.5) newY -= player.width; else newY += player.width; diff = newY - player.y; if (Math.abs(diff) > player.width / 2) { if (diff > 0) newY = player.y + player.width / 2; else if (diff < 0) newY = player.y - player.width / 2; } player.y = move(player.y, newY, Math.min(hockeyVx, 5)); return player; }; var immortal = function(player) { player.y = SHAPELIST.hockey.y - player.height / 2; player.y = checkBorders(player.y); return player; }; function animate() { hockeyMove(); SHAPELIST.player2 = artificialIntelligence(SHAPELIST.player2, AI_LEVEL); if(ACTIVATED) { drawAll(); requestAnimFrame(function() { animate(); }); } } function redraw() { CONTEXT.strokeStyle = 'blue'; CONTEXT.lineWidth = '5'; CONTEXT.strokeRect(0, 0, CANVAS.width, CANVAS.height); SHAPELIST.player1.width = PLAYER_WIDTH; SHAPELIST.player1.height = PLAYER_HEIGHT; SHAPELIST.player2.width = PLAYER_WIDTH; SHAPELIST.player2.height = PLAYER_HEIGHT; SHAPELIST.hockey.width = HOCKEY_WIDTH; SHAPELIST.hockey.height = HOCKEY_HEIGHT; drawRectangle(SHAPELIST.player1); drawRectangle(SHAPELIST.player2); drawSquare(SHAPELIST.hockey); if(GAME_OVER) showResult(WINNER); } function drawRectangle(obj) { CONTEXT.beginPath(); CONTEXT.rect(obj.x, obj.y, obj.width, obj.height); CONTEXT.fillStyle = 'black'; CONTEXT.fill(); CONTEXT.strokeStyle = 'red'; CONTEXT.stroke(); } function drawSquare(obj) { CONTEXT.beginPath(); CONTEXT.rect(obj.x, obj.y, obj.width, obj.height); CONTEXT.fillStyle = 'yellow'; CONTEXT.fill(); CONTEXT.strokeStyle = 'blue'; CONTEXT.stroke(); } function drawAll() { CONTEXT.clearRect(0, 0, CANVAS.width, CANVAS.height); redraw(); } function main() { initialize(true); window.requestAnimFrame = (function(callback){ return function(callback) { window.setTimeout(callback, 5); }; })(); CANVAS.addEventListener('mousemove', function(evt) { if(ACTIVATED) { var mousePos = getMousePos(CANVAS, evt); moveRectangle(mousePos); } }, false); CANVAS.addEventListener("click", function(evt) { if(!GAME_OVER) { if(!ACTIVATED) start(); else stop(); } else { ACTIVATED = false; GAME_OVER = false; AI_TARGET_Y = null; initialize(false); } }, false); } function getMousePos(canvas, evt) { var rect = canvas.getBoundingClientRect(); return { x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width, y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height }; } function start() { ACTIVATED = true; document.getElementById("canvas").style.cursor = "none"; animate(); } function stop() { ACTIVATED = false; document.getElementById("canvas").style.cursor = "pointer"; } function rectangle(x, y, width, height) { this.x = x; this.y = y; this.width = width; this.height = height; } function createRectangle(x, y, width, height, name) { var newRectangle = new rectangle(x, y, width, height); SHAPELIST[name] = newRectangle; drawRectangle(newRectangle); } function moveRectangle(position) { drawAll(); SHAPELIST.player1.y = position.y - HEIGHT_TILE; SHAPELIST.player1.y = checkBorders(SHAPELIST.player1.y); } function checkBorders(y) { if(y <= 0) y = 0; if(y >= CANVAS.height - PLAYER_HEIGHT) y = CANVAS.height - PLAYER_HEIGHT; return y; } function addHockey(x, y, size, size2, name) { var square = new rectangle(x, y, size, size2); var magnitude = CANVAS.width / WIDTH_MAX * 2; var angle = Math.random() * 2 * Math.PI - Math.PI; while ( Math.PI / 4 < Math.abs(angle) && Math.abs(angle) < Math.PI * 3 / 4) angle = Math.random() * 2 * Math.PI - Math.PI; square.vx = magnitude * Math.cos(angle); square.vy = magnitude * Math.sin(angle); square.magnitude = magnitude; square.angle = angle; SHAPELIST[name] = square; drawSquare(square); } function hockeyMove() { var hockey = SHAPELIST.hockey; var p1 = SHAPELIST.player1; var p2 = SHAPELIST.player2; var leftWall = 0 >= hockey.x + hockey.vx; var rightWall = hockey.x + hockey.width + hockey.vx >= CANVAS.width; var leftPlayerX = p1.x + p1.width >= hockey.x + hockey.vx; var leftPlayerY = (hockey.y + hockey.height >= p1.y) && (p1.y + p1.height >= hockey.y); var rightPlayerX = hockey.x + hockey.width + hockey.vx >= p2.x; var rightPlayerY = (hockey.y + hockey.height >= p2.y) && (p2.y + p2.height >= hockey.y); var leftPlayerTopXLeft = (p1.x <= hockey.x) && (hockey.x <= p1.x + p1.width); var leftPlayerTopXRight = (p1.x <= hockey.x + hockey.width) && (hockey.x + hockey.width <= p1.x + p1.width); var leftPlayerTopY = (hockey.y < p1.y && p1.y) < (hockey.y + hockey.height); var leftPlayerBottomY = (hockey.y < p1.y + p1.height) && (p1.y + p1.height < hockey.y + hockey.height); var speedMax = 10; var pixelAdd = CANVAS.width / WIDTH_MAX; if ( (leftPlayerX && leftPlayerY) || (rightPlayerX && rightPlayerY) ) { if(Math.abs(hockey.vx) < speedMax) hockey.vx += (hockey.vx > 0 ? pixelAdd : -pixelAdd); hockey.vx *= -1; } if ( (leftPlayerTopXLeft || leftPlayerTopXRight) ) if (leftPlayerTopY && hockey.vy > 0) { hockey.vy *= -1; } else if ( leftPlayerBottomY && hockey.vy < 0) { hockey.vy *= -1; } if (leftPlayerX && leftPlayerY) { if(Math.abs(hockey.vy) < speedMax) hockey.vy += calculateYdirection(p1, hockey); } else if(rightPlayerX && rightPlayerY) { if(Math.abs(hockey.vy) < speedMax) hockey.vy += calculateYdirection(p2, hockey); } if(leftWall || rightWall) { ACTIVATED = false; GAME_OVER = true; document.getElementById("canvas").style.cursor = "pointer"; if(leftWall) WINNER = false; else WINNER = true; showResult(WINNER); } var topWall = 0 >= hockey.y + hockey.vy; var bottomWall = hockey.y + hockey.height + hockey.vy >= CANVAS.height; if(topWall || bottomWall) { hockey.vy *= -1; } hockey.x += hockey.vx; hockey.y += hockey.vy; } var calculateYdirection = function(player, hockey) { var midPlayerY = player.y + player.height / 2; var midHockeY = hockey.y + hockey.height / 2; var yDiff = midHockeY - midPlayerY; return yDiff / player.height; }; function selectOptionLevel() { var e = document.getElementById("selectLevel"); AI_LEVEL = e.options[e.selectedIndex].value; console.log("Level changed!"); console.log(AI_LEVEL); ACTIVATED = false; GAME_OVER = false; AI_TARGET_Y = null; initialize(false); } function selectOptionSize() { var e = document.getElementById("selectSize"); var strSize = e.options[e.selectedIndex].value; OBJ_HEIGHT_WIDTH_RATIO = Number(strSize); console.log("Size changed!"); console.log(OBJ_HEIGHT_WIDTH_RATIO); ACTIVATED = false; GAME_OVER = false; AI_TARGET_Y = null; initialize(false); } function loadGlobalVariables(firstTime) { CANVAS = document.getElementById('canvas'); CONTEXT = CANVAS.getContext('2d'); SHAPELIST = {}; TILENO = 20; WINDOW_RATIO = 2; if(firstTime) { OBJ_HEIGHT_WIDTH_RATIO = 2.5; AI_LEVEL = "artista"; } WIDTH_MAX = 1000; HEIGHT_MAX = WIDTH_MAX / WINDOW_RATIO; ACTIVATED = false; GAME_OVER = false; WINNER = null; AI_TARGET_Y = null; } function initialize(firstTime) { loadGlobalVariables(firstTime); windowtoTiles(); createRectangle(PLAYER1_POS.x, PLAYER2_POS.y, PLAYER_WIDTH, PLAYER_HEIGHT, "player1"); createRectangle(PLAYER2_POS.x, PLAYER2_POS.y, PLAYER_WIDTH, PLAYER_HEIGHT, "player2"); addHockey(HOCKEY_POS.x, HOCKEY_POS.y, HOCKEY_WIDTH, HOCKEY_HEIGHT, "hockey"); resizeCanvas(); document.getElementById('canvasResize').addEventListener('resize', resizeCanvas, false); } window.onload = function() { var canvasWindow = document.querySelector("#canvasResize"); canvasWindow.className = canvasWindow.className + ' resizable'; var resizer = document.createElement('div'); resizer.className = 'resizer'; canvasWindow.appendChild(resizer); resizer.addEventListener('mousedown', initDrag, false); var startX, startY, startWidth, startHeight; function initDrag(e) { startX = e.clientX; startWidth = parseInt(document.defaultView.getComputedStyle(canvasWindow).width, 10); document.documentElement.addEventListener('mousemove', doDrag, false); document.documentElement.addEventListener('mouseup', stopDrag, false); } function doDrag(e) { var newSize = (startWidth + e.clientX - startX); if(newSize > WIDTH_MAX) newSize = WIDTH_MAX; canvasWindow.style.width = newSize + 'px'; resizeCanvas(); } function stopDrag(e) { document.documentElement.removeEventListener('mousemove', doDrag, false); document.documentElement.removeEventListener('mouseup', stopDrag, false); } }; function showResult(res) { var contextSize = Math.floor(CANVAS.width / 20); CONTEXT.font = (contextSize).toString() + "px Arial"; CONTEXT.fillStyle = "black"; if(res) { console.log("win"); CONTEXT.fillText("YOU WIN!", CANVAS.width / 3, CANVAS.height / 3); } else { console.log("lose"); CONTEXT.fillText("YOU LOSE!", CANVAS.width / 3, CANVAS.height / 3); } CONTEXT.fillText("Click here to play again.", CANVAS.width / 3, CANVAS.height * 2 / 3); } function windowtoTiles() { WIDTH_TILE = CANVAS.width / TILENO; HEIGHT_TILE = CANVAS.height / TILENO; PLAYER_HEIGHT = HEIGHT_TILE * WINDOW_RATIO * OBJ_HEIGHT_WIDTH_RATIO; PLAYER_WIDTH = WIDTH_TILE / OBJ_HEIGHT_WIDTH_RATIO; HOCKEY_HEIGHT = HEIGHT_TILE * WINDOW_RATIO / OBJ_HEIGHT_WIDTH_RATIO; HOCKEY_WIDTH = WIDTH_TILE / OBJ_HEIGHT_WIDTH_RATIO; PLAYER1_POS = {"x": WIDTH_TILE, "y": HEIGHT_TILE * TILENO / 2 - PLAYER_HEIGHT / 2 }; PLAYER2_POS = {"x": CANVAS.width - WIDTH_TILE - PLAYER_WIDTH, "y": HEIGHT_TILE * TILENO / 2 - PLAYER_HEIGHT / 2 }; HOCKEY_POS = {"x":CANVAS.width / 2 - HOCKEY_WIDTH / 2, "y": CANVAS.height / 2 - HOCKEY_HEIGHT / 2}; } function transformSize(coor, prevSizes) { coor.x *= CANVAS.width / prevSizes.width; coor.y *= CANVAS.height / prevSizes.height; try { coor.magnitude *= CANVAS.width / prevSizes.width; coor.angle = Math.atan2(coor.vy, coor.vx); coor.vx = coor.magnitude * Math.cos(coor.angle); coor.vy = coor.magnitude * Math.sin(coor.angle); } catch(err) { console.log("error catched!"); } return coor; } function resizeCanvas() { var prevSizes = {}; prevSizes.width = CANVAS.width; prevSizes.height = CANVAS.height; var parentDiv = document.getElementById('canvasResize'); var constant = 0.8; CANVAS.width = Math.min(parentDiv.clientWidth * constant, WIDTH_MAX); CANVAS.height = Math.min(parentDiv.clientHeight * constant, HEIGHT_MAX); var ratio = CANVAS.width / CANVAS.height; if (ratio != WINDOW_RATIO) { if (CANVAS.width < WIDTH_MAX) CANVAS.height = CANVAS.width / WINDOW_RATIO; else CANVAS.height = HEIGHT_MAX; } windowtoTiles(); SHAPELIST.player1 = transformSize(SHAPELIST.player1, prevSizes); SHAPELIST.player2 = transformSize(SHAPELIST.player2, prevSizes); SHAPELIST.hockey = transformSize(SHAPELIST.hockey, prevSizes); redraw();
}