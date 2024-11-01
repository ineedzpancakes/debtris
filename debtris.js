'use strict';
class Debtris {

  // tetromino names
  static Z_TETROMINO = 'z';
  static S_TETROMINO = 's';
  static O_TETROMINO = 'o';
  static L_TETROMINO = 'l';
  static J_TETROMINO = 'j';
  static T_TETROMINO = 't';
  static I_TETROMINO = 'i';

  // initial positions
  static Z_INITIAL = [ 4, 1 ];
  static S_INITIAL = [ 4, 1 ];
  static O_INITIAL = [ 4, 2 ];
  static L_INITIAL = [ 4, 1 ];
  static J_INITIAL = [ 4, 1 ];
  static T_INITIAL = [ 4, 1 ];
  static I_INITIAL = [ 3, 0 ];

  static Z_BOX = [ 1, 0, 2, 3 ]; // x y hei wid
  static S_BOX = [ 1, 0, 2, 3 ];
  static O_BOX = [ 0, 0, 2, 2 ];
  static L_BOX = [ 1, 0, 2, 3 ];
  static J_BOX = [ 1, 0, 2, 3 ];
  static T_BOX = [ 1, 0, 2, 3 ];
  static I_BOX = [ 2, 0, 1, 4 ]; 
  
  static Z_ROTATIONS = [
      [
        [ 0, 0, 0 ], 
        [ 1, 1, 0 ], 
        [ 0, 1, 1 ]
      ], 
      [
        [ 0, 0, 1 ], 
        [ 0, 1, 1 ], 
        [ 0, 1, 0 ]
      ]
    ];
    
  static S_ROTATIONS = [
      [
        [ 0, 0, 0 ],
        [ 0, 1, 1 ],
        [ 1, 1, 0 ]
      ],
      [
        [ 0, 1, 0 ],
        [ 0, 1, 1 ],
        [ 0, 0, 1 ]
      ]
    ];
    
  static O_ROTATIONS = [
      [
        [ 1, 1 ],
        [ 1, 1 ]
      ]
    ];
    
  static L_ROTATIONS = [
      [
        [ 0, 0, 0 ],
        [ 1, 1, 1 ],
        [ 1, 0, 0 ]
      ],
      [
        [ 1, 1, 0 ],
        [ 0, 1, 0 ],
        [ 0, 1, 0 ]
      ],
      [
        [ 0, 0, 1 ],
        [ 1, 1, 1 ],
        [ 0, 0, 0 ]
      ],
      [
        [ 0, 1, 0 ],
        [ 0, 1, 0 ],
        [ 0, 1, 1 ]
      ]
    ];
    
  static J_ROTATIONS = [
      [
        [ 0, 0, 0 ],
        [ 1, 1, 1 ],
        [ 0, 0, 1 ]
      ],
      [
        [ 0, 1, 0 ],
        [ 0, 1, 0 ],
        [ 1, 1, 0 ]
      ],
      [
        [ 1, 0, 0 ],
        [ 1, 1, 1 ],
        [ 0, 0, 0 ]
      ],
      [
        [ 0, 1, 1 ],
        [ 0, 1, 0 ],
        [ 0, 1, 0 ]
      ]
    ];
    
  static T_ROTATIONS = [
      [
        [ 0, 0, 0 ],
        [ 1, 1, 1 ],
        [ 0, 1, 0 ]
      ],
      [
        [ 0, 1, 0 ],
        [ 1, 1, 0 ],
        [ 0, 1, 0 ]
      ],
      [
        [ 0, 1, 0 ],
        [ 1, 1, 1 ],
        [ 0, 0, 0 ]
      ],
      [
        [ 0, 1, 0 ],
        [ 0, 1, 1 ],
        [ 0, 1, 0 ]
      ]
    ];
    
  static I_ROTATIONS = [
      [
        [ 0, 0, 0, 0 ],
        [ 0, 0, 0, 0 ],
        [ 1, 1, 1, 1 ],
        [ 0, 0, 0, 0 ]
      ], 
      [
        [ 0, 0, 1, 0 ],
        [ 0, 0, 1, 0 ],
        [ 0, 0, 1, 0 ],
        [ 0, 0, 1, 0 ]
      ]
    ];
  
  
  // game states
  static STATE_DROP = 0;
  static STATE_BURN = 1;
  static STATE_ARE = 2;
  static STATE_GAME_OVER = 3;
  static STATE_PAUSE = 4;
  
  
  // events
  static GAME_START = 'game-start';
  static GAME_OVER = 'game-over';
  
  static GAME_OVER_START = 'game-over-start';
  static GAME_OVER_END = 'game-over-end';
  
  static GAME_PAUSE = 'game-pause';
  static GAME_RESUME = 'game-resume';
  
  static TETROMINO_MOVE_LEFT = 'tetromino-move-left';
  static TETROMINO_MOVE_RIGHT = 'tetromino-move-right';
  static TETROMINO_MOVE_DOWN = 'tetromino-move-down';
  static TETROMINO_HARD_DROP = 'tetromino-hard-drop';
  
  static TETROMINO_ROTATE_CLOCKWISE = 'tetromino-rotate-clockwise';
  static TETROMINO_ROTATE_COUNTERCLOCKWISE = 'tetromino-rotate-counterclockwise';
  
  static TETROMINO_LOCK = 'tetromino-lock';
  static NEXT_TETROMINO = 'next-tetromino';
  
  static LEVEL_CHANGE = 'level-change';
  static SCORE_CHANGE = 'score-change';
  
  static LINE_CLEAR_START = 'line-clear-start';
  static LINE_CLEAR_END = 'line-clear-end';
  
  static LINE_CLEAR = 'line-clear';
  
  
  // doard size in terms of squares
  // this is typically 10x20, but we are adding 2 invisible rows
  // at the top to have enough room to spawn all tetrominoes
  static BOARD_WIDTH = 10;
  static BOARD_HEIGHT = 22;
  
  
  // constructor needs a canvas
  constructor(canvas, {
        boardWidth = Debtris.BOARD_WIDTH,
        boardHeight = Debtris.BOARD_HEIGHT,
    
        boardX = 30,
        boardY = -35,
        squareSide = 28,
        
        scoreX = 330,
        scoreY = 100,
        levelX = 330,
        levelY = 130,
        linesX = 330,
        linesY = 160,
        cashX = 330,
        cashY = 190,
        timeX = 330,
        timeY = 220,
        nextX = 330,
        nextY = 260,
        nextOffsetX = 330,
        nextOffsetY = 280,
        pauseX = 145, 
        pauseY = 220,
        
        zColor = [ '#fe103c', '#f890a7' ],
        sColor = [ '#66fd00', '#c4fe93' ],
        oColor = [ '#ffde00', '#fff88a' ],
        lColor = [ '#ff7308', '#ffca9b' ],
        jColor = [ '#1801ff', '#5a95ff' ],
        tColor = [ '#f890a7', '#fcc2cf' ],
        iColor = [ '#00e6fe', '#86fefe' ],
        
        gameOverColor = [ '#000', '#ddd' ],
        ghostColor = [ '#000', '#fff' ],
        
        canvasFont = '17px ubuntu',
        canvasFontColor = '#fff',
        
        backgroundColor = '#222',
        tetrisBackgroundColor = '#fff',
        borderColor = '#fff',
        gridColor = '#ddd',
        
        tapClickMaxDuration = 500,
        tapClickMaxDistance = 10,
        
        rotateSound = undefined,
        moveSound = undefined,
        setSound = undefined,
        gameOverSound = undefined,
        lineSound = undefined,
        tetrisSound = undefined,
        levelChangeSound = undefined,
        pauseSound = undefined,
        gameTheme = undefined
    
      } = {}) {
    
    // game canvas
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    this.context.lineJoin = 'round';
    
    // board dimensions
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    
    // init board
    this.board = [];
    for (let i = 0; i < this.boardHeight; ++i) {
      const row = [];
      for (let j = 0; j < this.boardWidth; ++j) row.push(7);
      this.board.push(row);
    }
    
    // render parameters
    this.boardX = boardX;           // board's left
    this.boardY = boardY;           // board's top
    this.squareSide = squareSide;   // width of individual squares
    
    // board's bounding box
    this.boardBorder = [
        -0.5 + this.boardX, 
        -0.5 + this.boardY + 2 * this.squareSide, 
        0.5 + this.boardX + this.boardWidth * this.squareSide, 
        0.5 + this.boardY + this.boardHeight * this.squareSide 
      ];
    
    // HUD stuff coordinates
    this.scoreX = scoreX;             // score label coordinates
    this.scoreY = scoreY;
    this.levelX = levelX;             // level label coordinates
    this.levelY = levelY;
    this.linesX = linesX;             // lines label coordinates
    this.linesY = linesY;
    this.cashX = cashX;               // cash label coordinates
    this.cashY = cashY;
    this.timeX = timeX;               // time label coordinates
    this.timeY = timeY;
    this.nextX = nextX;               // next label coordinates
    this.nextY = nextY;
    this.nextOffsetX = nextOffsetX;   // next tetromino coords
    this.nextOffsetY = nextOffsetY;
    this.pauseX = pauseX;             // pause label coords
    this.pauseY = pauseY;
    
    // canvas font 
    this.canvasFont = canvasFont;
    this.canvasFontColor = canvasFontColor;
    
    // tetromino colors
    this.zColor = [ ...zColor ];
    this.sColor = [ ...sColor ];
    this.oColor = [ ...oColor ];
    this.lColor = [ ...lColor ];
    this.jColor = [ ...jColor ];
    this.tColor = [ ...tColor ];
    this.iColor = [ ...iColor ];
    
    // game over tile colors
    this.gameOverColor = [ ...gameOverColor ];
    this.ghostColor = [ ...ghostColor ];
    
    this.backgroundColor = backgroundColor;
    this.tetrisBackgroundColor = tetrisBackgroundColor;
    this.borderColor = borderColor;
    this.gridColor = gridColor;
    
    // max time between pointerdown and pointerup for the game to count it as click
    this.tapClickMaxDuration = tapClickMaxDuration;   // grandpa's tap/click duration!
    // maximum distance between pointer-down and pointer-up coordinates 
    // for the game to count it as a click/tap
    this.tapClickMaxDistance = tapClickMaxDistance;
    
    // sounds
    this.rotateSound = rotateSound;             // rotation
    this.moveSound = moveSound;                 // move
    this.setSound = setSound;                   // tetromino lock
    this.gameOverSound = gameOverSound;         // game over
    this.lineSound = lineSound;                 // line burn
    this.tetrisSound = tetrisSound;             // tetris
    this.levelChangeSound = levelChangeSound;   // level increase
    this.pauseSound = pauseSound;               // game paused
    this.gameTheme = gameTheme;                 // theme song
        
    // tetrominoes
    this.tetrominoes = [
      { 
        id: 0,
        name: Debtris.Z_TETROMINO,
        rot: Debtris.Z_ROTATIONS,
        iniPos: Debtris.Z_INITIAL,
        col: this.zColor,
        box: Debtris.Z_BOX
      },
      { 
        id: 1,
        name: Debtris.S_TETROMINO,
        rot: Debtris.S_ROTATIONS,
        iniPos: Debtris.S_INITIAL,
        col: this.sColor,
        box: Debtris.S_BOX
      },
      { 
        id: 2,
        name: Debtris.O_TETROMINO,
        rot: Debtris.O_ROTATIONS,
        iniPos: Debtris.O_INITIAL,
        col: this.oColor,
        box: Debtris.O_BOX
      },
      { 
        id: 3,
        name: Debtris.L_TETROMINO,
        rot: Debtris.L_ROTATIONS,
        iniPos: Debtris.L_INITIAL,
        col: this.lColor,
        box: Debtris.L_BOX
      },
      { 
        id: 4,
        name: Debtris.J_TETROMINO,
        rot: Debtris.J_ROTATIONS,
        iniPos: Debtris.J_INITIAL,
        col: this.jColor,
        box: Debtris.J_BOX
      },
      { 
        id: 5,
        name: Debtris.T_TETROMINO,
        rot: Debtris.T_ROTATIONS,
        iniPos: Debtris.T_INITIAL,
        col: this.tColor,
        box: Debtris.T_BOX
      },
      { 
        id: 6,
        name: Debtris.I_TETROMINO,
        rot: Debtris.I_ROTATIONS,
        iniPos: Debtris.I_INITIAL,
        col: this.iColor,
        box: Debtris.I_BOX
      }
    ];
    
    // movement/controls
    this.moveLeft = false;
    this.moveRight = false;
    this.moveDown = false;
    this.rotateClockwise = false;
    this.rotateCounterclockwise = false;
    this.hardDrop = true;
    this.doUndoPause = false;   // pause state changed
    
    // pointer coords
    this.xIni = undefined;
    this.yIni = undefined;
    this.tIni = undefined;
    
    // pointer game controls
    this.pointerMoveDownEnabled = false;  // flag to allow/disallow pointer to move tetromino down
    
    // game flags
    this.playing = false;       // ongoing game
    this.gameLoop = false;      // ongoing game loop (loop ends after game-over animation)
    
    this.tetromino = this.tetrominoes[0];      // current tetromino
    this.tetrominoPosition = [ 0, 0 ];         // current tetromino's position
    this.tetrominoRotation = 0;                // current tetromino's rotation
    this.next = this.tetrominoes[0];           // next tetromino

    // this.isFlashing = false;
    // this.flashFrames = 8;
    
    // game parameters
    this.startLevel = 0;
    this.level = 0;
    this.lines = 0;
    this.score = 0;
    this.pressDownScore = 0;
    this.cash = 150;
    this.currentTimer = 15;
    
    // event listeners
    this.handlers = new Map();
    this.handlers.set(Debtris.GAME_START, []);
    this.handlers.set(Debtris.GAME_OVER, []);
    this.handlers.set(Debtris.GAME_OVER_START, []);
    this.handlers.set(Debtris.GAME_OVER_END, []);
    this.handlers.set(Debtris.GAME_PAUSE, []);
    this.handlers.set(Debtris.GAME_RESUME, []);
    this.handlers.set(Debtris.TETROMINO_MOVE_LEFT, []);
    this.handlers.set(Debtris.TETROMINO_MOVE_RIGHT, []);
    this.handlers.set(Debtris.TETROMINO_MOVE_DOWN, []);
    this.handlers.set(Debtris.TETROMINO_HARD_DROP, []);
    this.handlers.set(Debtris.TETROMINO_ROTATE_CLOCKWISE, []);
    this.handlers.set(Debtris.TETROMINO_ROTATE_COUNTERCLOCKWISE, []);
    this.handlers.set(Debtris.TETROMINO_LOCK, []);
    this.handlers.set(Debtris.NEXT_TETROMINO, []);
    this.handlers.set(Debtris.LEVEL_CHANGE, []);
    this.handlers.set(Debtris.SCORE_CHANGE, []);
    this.handlers.set(Debtris.LINE_CLEAR_START, []);
    this.handlers.set(Debtris.LINE_CLEAR_END, []);
    this.handlers.set(Debtris.LINE_CLEAR, []);
      
    // animation frames counters
    this.frameCounter = 0;
    this.areFrames = -1;
    this.framesTilDrop = -1;
    
    // counters for line-clear and game-over animations
    this.columnsCleared = -1;
    this.gameOverLine = -1;
    
    // game state
    this.previousGameState = Debtris.STATE_GAME_OVER;
    this.gameState = Debtris.STATE_GAME_OVER;
    
    // an empty row used to exploit syntactic sugar
    this.emptyRow = [];
    for (let i = 0; i < this.boardWidth; ++i) this.emptyRow.push(-1);
    
    // paint something for the user to see
    this._render();
  }
  
  // set the starting level
  // does nothing if playing
  setStartLevel(level) {
    if (this.gameState === Debtris.STATE_GAME_OVER) {
      this.startLevel = Math.max(0, Math.min(19, level));  // between 0 and 19
    }
  }
  
  // set the border and fill colors for game-over squares
  setGameOverColor(color) {
    this.gameOverColor = [ ...color ];
  }
  
  // set ghost tetromino colors
  setGhostColor(color) {
    this.ghostColor = [ ...color ];
  }
  
  // set the border and fill colors for a tetromino
  setPieceColor(tetromino, color) {
    switch (tetromino) {
      case Debtris.Z_TETROMINO: this.zColor = [ ...color ]; break;
      case Debtris.S_TETROMINO: this.sColor = [ ...color ]; break;
      case Debtris.O_TETROMINO: this.oColor = [ ...color ]; break;
      case Debtris.L_TETROMINO: this.lColor = [ ...color ]; break;
      case Debtris.J_TETROMINO: this.jColor = [ ...color ]; break;
      case Debtris.T_TETROMINO: this.tColor = [ ...color ]; break;
      case Debtris.I_TETROMINO: this.iColor = [ ...color ]; break;
    }
  }

  _startCountdown() {
    // Clear any existing interval to prevent multiple timers
    if (this.timerInterval) clearInterval(this.timerInterval);
  
    // Set up the interval
    this.timerInterval = setInterval(() => {
      if (this.currentTimer > 0) {
        this.currentTimer--;
      } else {
        // Reset timer and add cash
        this.currentTimer = 15;
        this.cash += 25;
      }

    }, 1000); // Runs every 1 second
  }
  
  
  // frames before the tetromino drops 1 tile
  // depends on the level
  _getFramesPerGridcell(level) {
    if (level === 0) return      96;  //48;
    else if (level === 1) return 86;  //43;
    else if (level === 2) return 76;  //38;
    else if (level === 3) return 66;  //33;
    else if (level === 4) return 56;  //28;
    else if (level === 5) return 46;  //23;
    else if (level === 6) return 36;  //18;
    else if (level === 7) return 26;  //13;
    else if (level === 8) return 16;  //8;
    else if (level === 9) return 12;  //6;
    else if (level <= 12) return 10;  //5;
    else if (level <= 15) return 8;  //4;
    else if (level <= 18) return 6;  //3;
    else if (level <= 28) return 4;  //2;
    return 2;  //1;
  }
  
  togglePlayPause() {
    if (this.playing) {
      this.doUndoPause = true;
    } else {
      this.play();
    }
  }
  
  quit() {
    if (this.playing && this.gameState != Debtris.STATE_GAME_OVER) {
      this._triggerGameOver();
    }
  }
  
  // start new game
  async play() {
    if (this.playing) return;
    this.playing = true;
    this._startCountdown();
    
    // disable UI
    // attach event listeners
    this._disableUI();
    this._addEventListeners();
    
    // reset params
    this._resetParameters();
    
    // play theme song
    if (this.gameTheme) {
      this.gameTheme.currentTime = 0;
      this.gameTheme.loop = true;
      this.gameTheme.play();
    }
    
    // fire game start event
    this._dispatch(Debtris.GAME_START, { 
        type: Debtris.GAME_START,
        level: this.level,
        score: this.score,
        lines: this.lines,
        cash: this.cash
      });
      
    // fire new tetromino placed event
    this._dispatch(Debtris.NEXT_TETROMINO, {
      type: Debtris.NEXT_TETROMINO,
      tetromino: this.tetromino.name,
      nextPiece: this.next.name
    });
    
    // game loop
    this.gameLoop = true;
    do {
      this._process();
      this._render();
      await this._sleep();
    } while(this.gameLoop);
    
    // remove event listeners
    // enable UI
    this._removeEventListeners();
    this._enableUI();
    
    // toggle playing flag
    this.playing = false;
    
    // fire game finish event
    this._dispatch(Debtris.GAME_OVER, {
        type: Debtris.GAME_OVER,
        level: this.level,
        score: this.score,
        lines: this.lines,
        cash: this.cash
      });
  }
  
  // get game params ready for a new game
  _resetParameters() {
    //  pointer stuff
    this.pointerMoveDownEnabled = false;
    
    // movement/control flags
    this.moveLeft = false;
    this.moveRight = false;
    this.moveDown = false;
    this.rotateClockwise = false;
    this.rotateCounterclockwise = false;
    this.hardDrop = false;
    this.doUndoPause = false;
    
    //  pointer coords
    this.xIni = undefined;
    this.yIni = undefined;
    this.tIni = undefined;
    
    // select random tetrominoes
    this.tetromino = this.tetrominoes[(Math.random() * this.tetrominoes.length) | 0];
    this.next = this.tetrominoes[this._nextPieceId()];
    
    // initial tetromino's position and rotation
    this.tetrominoPosition = this.tetromino.iniPos.slice(0);
    this.tetrominoRotation = 0;
    
    // starting level, lines and score
    this.level = this.startLevel;
    this.lines = 0;
    this.score = 0;
    this.cash = 150;
    this.currentTimer = 15;
    this.pressDownScore = 0;
    
    // clear board
    for (let i = 0; i < this.boardHeight; ++i) 
      for (let j = 0; j < this.boardWidth; ++j) 
        this.board[i][j] = -1;
    
    // frame counters
    this.frameCounter = 0;
    this.areFrames = -1;
    this.framesTilDrop = -1;
    this.columnsCleared = -1;
    this.gameOverLine = -1;
    
    // frames until the tetromino automatically moves down
    this.framesTilDrop = 36 + this._getFramesPerGridcell(this.level);   // 18 + this._getFramesPerGridcell(this.level);
    
    // initial state
    this.previousGameState = Debtris.STATE_DROP;
    this.gameState = Debtris.STATE_DROP;
  }
  
  // add and remove event listeners
  _addEventListeners() {
    this.canvas.addEventListener('contextmenu', this._handleContextMenu, { capture: true, passive: false });
    document.addEventListener('pointerdown', this._handlePointerDown, { capture: true, passive: false });
    document.addEventListener('pointermove', this._handlePointerMove, { capture: true, passive: false });
    document.addEventListener('pointerup', this._handlePointerUp, { capture: true, passive: false });
    document.addEventListener('pointercancel', this._handlePointerCancel, { capture: true, passive: false });
    document.addEventListener('wheel', this._handleWheel, { capture: true, passive: false });
    document.addEventListener('keydown', this._handleKeyDown, { capture: true, passive: false });
  }
  
  _removeEventListeners() {
    this.canvas.removeEventListener('contextmenu', this._handleContextMenu, true);
    document.removeEventListener('pointerdown', this._handlePointerDown, true);
    document.removeEventListener('pointermove', this._handlePointerMove, true);
    document.removeEventListener('pointerup', this._handlePointerUp, true);
    document.removeEventListener('pointercancel', this._handlePointerCancel, true);
    document.removeEventListener('wheel', this._handleWheel, true);
    document.removeEventListener('keydown', this._handleKeyDown, true);
  }
  
  // disable/enable UI
  _disableUI() {
    this.canvas.style.touchAction = 'none';
  }
  
  _enableUI() {
    this.canvas.style.touchAction = 'auto';
  }
  
  // context menu handler: don't open during game
  _handleContextMenu = event => {
    event.preventDefault();
  }
  
  //
  // default keyboard inputs:
  //
  // action                 key           key-code
  // ---------------------------------------------
  // rotate clockwise       up arrow        38
  // down                   down arrow      40
  // left                   left arrow      37
  // right                  right arrow     39
  // rotate clockwise       'x'             88
  // rotate countercw       'z'             90 
  // hard drop              space bar       32
  // pause                  esc             27
  // pause                  'p'             80
  // 
  // key event listener
  _handleKeyDown = event => {
    
    switch (event.keyCode || event.which) {
      case 37:
        // left
        event.preventDefault();
        this.moveRight = !(this.moveLeft = true);
        break;
      case 39:
        // right
        event.preventDefault();
        this.moveLeft = !(this.moveRight = true);
        break;
      case 88:
        // rotate clockwise
        event.preventDefault();
        this.rotateCounterclockwise = !(this.rotateClockwise = true);
        break;
      case 90:
        // rotate counterclockwise
        event.preventDefault();
        this.rotateClockwise = !(this.rotateCounterclockwise = true);
        break;
      case 40:
        // down
        event.preventDefault();
        this.moveDown = true;
        break;
      case 32:
        // hard drop
        event.preventDefault();
        this.hardDrop = true;
        break;
      case 27:
      case 80:
        // pause
        event.preventDefault();
        if (this.gameState != Debtris.STATE_GAME_OVER) {
          this.doUndoPause = true;
        }
        break;
    }
  }
  
  //
  // pointer device inputs:
  //
  // action                 pointer moves
  // ------------------------------------------------------------------
  // left                   move the pointer to the left of the tetromino
  // right                  move the pointer to the right of the tetromino
  // down                   use the pointer drag the tetromino down
  // rotate clockwise       click / touch
  // rotate countercw       click / touch
  
  // pointer move handler
  _handlePointerMove = event => {
    event.preventDefault();
    
    // no movement tracking during pause
    if (this.gameState === Debtris.STATE_PAUSE) return;
    
    // find out if pointer is left or right or below the tetromino
    // then move tetromino accordingly
    const { x, y } = this._getEventCoords(event);
    
    // get pointer's row & column
    const row = ((y - this.boardY) / this.squareSide) | 0;
    const column = ((x - this.boardX) / this.squareSide) | 0;
    
    // get tetromino's bounds, calculate center column and row center 
    const { top, bottom, left, right } = this._getPieceBounds();
    const middleRow = ((top + bottom) / 2) | 0;
    const middleColumn = ((left + right) / 2) | 0;
    
    // enable pointer's ability to move down
    // if the pointer is on the tetromino or above
    if (row <= bottom) {
      this.pointerMoveDownEnabled = true;
    }
    
    // move left 
    if (column < middleColumn) {
      this.moveRight = !(this.moveLeft = true);
    }
    
    // move right
    if (column > middleColumn) {
      this.moveLeft = !(this.moveRight = true);
    }
    
    // move down
    if (this.pointerMoveDownEnabled && row > middleRow) {
      this.moveDown = true;
    }
  }
  
  
  // pointerdown handler
  _handlePointerDown = event => {
    //event.preventDefault();
    
    // do nothing during pause
    if (this.gameState === Debtris.STATE_PAUSE) return;
    
    const { x, y } = this._getEventCoords(event);
    this.xIni = x;                  // store pointer coords
    this.yIni = y;
    this.tIni = performance.now();  // time since time origin
  }
  
  // pointer up handler
  _handlePointerUp = event => {
    event.preventDefault();
    
    // do nothing during pause
    if (this.gameState === Debtris.STATE_PAUSE) return;
    
    const { x, y } = this._getEventCoords(event);
    const a = this.xIni - x;                  // calculate distance
    const b = this.yIni - y;                  // between tap-down and tap-up coordinates
    const dist = Math.sqrt(a * a + b * b);
    
    // detect tap/click:
    if (dist <= this.tapClickMaxDistance &&                           // similar coords
        performance.now() - this.tIni <= this.tapClickMaxDuration) {  // gesture was short
        
      if (event.button === 0) {
        // left mouse button, touch contact, pen contact
        // rotate tetromino clockwise
        this.rotateCounterclockwise = !(this.rotateClockwise = true);
        
      } else {
        // right button, mouse wheel...
        // rotate tetromino counterclockwise
        this.rotateClockwise = !(this.rotateCounterclockwise = true);
        
      }
    }
  }
  
  
  // pointer cancel
  _handlePointerCancel = event => {
    event.preventDefault();
    
    // reset pointer flags
    this.pointerMoveDownEnabled = false;
  }
  
  // wheel rotates the tetromino
  _handleWheel = event => {
    event.preventDefault();
    
    // do nothing during pause
    if (this.gameState === Debtris.STATE_PAUSE) return;
    
    if (event.deltaY > 0) {
      // rotate tetromino clockwise
      this.rotateCounterclockwise = !(this.rotateClockwise = true);
    } else if (event.deltaY < 0) {
      // rotate tetromino counterclockwise
      this.rotateClockwise = !(this.rotateCounterclockwise = true);
    }
  }
  
  
  // pointer coordinates
  _getEventCoords(event) {
    const rect = this.canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left, 
        y: event.clientY - rect.top 
      };
  }
  
  // get current tetromino's left and right bounds
  _getPieceBounds() {
    const p = this.tetromino.rot[this.tetrominoRotation];
    let top = this.boardHeight;
    let bottom = 0;
    let left = this.boardWidth;
    let right = 0;
    for (let i = 0; i < p.length; ++i) {
      for (let j = 0; j < p[i].length; ++j) {
        if (p[i][j] != 0) {
          const x = this.tetrominoPosition[0] + j;
          const y = this.tetrominoPosition[1] + i;
          left = Math.min(left, x);
          right = Math.max(right, x);
          top = Math.min(top, y);
          bottom = Math.max(bottom, y);
        }
      }
    }
    return {
      top: top,
      bottom: bottom,
      left: left,
      right: right
    };
  }
  
  _process() {
    
    // game possibly paused/unpaused
    this._pauseCheck();
    
    // process current state
    switch (this.gameState) {
      case Debtris.STATE_DROP:
        this._processDrop();
        break;
      case Debtris.STATE_BURN:
        this._processBurn();
        break;
      case Debtris.STATE_ARE:
        this._processARE();
        break;
      case Debtris.STATE_GAME_OVER:
        this._processGameOver();
        break;
      case Debtris.STATE_PAUSE:
        // do nothing if paused
        break;
    }
    // clear input flags
    this._resetInputs();
    
    // global frame counter
    ++this.frameCounter;
  }
  
  
  _processDrop() {
    // decrease drop counter
    --this.framesTilDrop;
    
    
    // do move if buffered
    if (this.moveLeft && this._canMovePiece(-1, 0)) {
      const oldPosition = [ ...this.tetrominoPosition ];
      --this.tetrominoPosition[0];
      
      // play move sound
      if (this.moveSound) {
        this.moveSound.currentTime = 0;
        this.moveSound.play();
      }
      
      // fire move left event
      this._dispatch(Debtris.TETROMINO_MOVE_LEFT, {
        type: Debtris.TETROMINO_MOVE_LEFT,
        tetromino: this.tetromino.name,
        rotation: this.tetrominoRotation,
        oldPosition: oldPosition,
        newPosition: [ ...this.tetrominoPosition ]
      });
      
    }

    if (this.moveRight && this._canMovePiece(1, 0)) {
      const oldPosition = [ ...this.tetrominoPosition ];
      ++this.tetrominoPosition[0];
      
      // play move sound
      if (this.moveSound) {
        this.moveSound.currentTime = 0;
        this.moveSound.play();
      }
      
      // fire move right event
      this._dispatch(Debtris.TETROMINO_MOVE_RIGHT, {
        type: Debtris.TETROMINO_MOVE_RIGHT,
        tetromino: this.tetromino.name,
        rotation: this.tetrominoRotation,
        oldPosition: oldPosition,
        newPosition: [ ...this.tetrominoPosition ]
      });
      
    } 

    if (this.rotateClockwise && this._canRotate((this.tetrominoRotation + 1) % this.tetromino.rot.length)) {
      const oldRotation = this.tetrominoRotation;
      this.tetrominoRotation = (this.tetrominoRotation + 1) % this.tetromino.rot.length;
      
      // play rotation sound
      if (this.rotateSound) {
        this.rotateSound.currentTime = 0;
        this.rotateSound.play();
      }
      
      // fire clockwise rotation event
      this._dispatch(Debtris.TETROMINO_ROTATE_CLOCKWISE, {
        type: Debtris.TETROMINO_ROTATE_CLOCKWISE,
        tetromino: this.tetromino.name,
        position: [ ...this.tetrominoPosition ],
        oldRotation: oldRotation,
        newRotation: this.tetrominoRotation
      });

      this.cash -= 25; // rotation cost
    }

    if (this.rotateCounterclockwise && this._canRotate((this.tetrominoRotation + this.tetromino.rot.length - 1) % this.tetromino.rot.length)) {
      const oldRotation = this.tetrominoRotation;
      this.tetrominoRotation = (this.tetrominoRotation + this.tetromino.rot.length - 1) % this.tetromino.rot.length;
      
      // play rotation sound
      if (this.rotateSound) {
        this.rotateSound.currentTime = 0;
        this.rotateSound.play();
      }
      
      // fire counterclockwise rotation event
      this._dispatch(Debtris.TETROMINO_ROTATE_COUNTERCLOCKWISE, {
        type: Debtris.TETROMINO_ROTATE_COUNTERCLOCKWISE,
        tetromino: this.tetromino.name,
        position: [ ...this.tetrominoPosition ],
        oldRotation: oldRotation,
        newRotation: this.tetrominoRotation
      });

      this.cash -= 25; // rotation cost
    }
    
    // hard drop or move down
    // move down: if drop counter says so
    //            or player pushed down
    if (this.hardDrop) {
      
      // hard drop = push tetromino as far down as possible
      // score increase is 2x the numer of dropped lines
      const oldPosition = [ ...this.tetrominoPosition ];
      while (this._canMovePiece(0, 1)) {
        ++this.tetrominoPosition[1];
        this.pressDownScore += 2;
      }
      
      // fire hard drop event
      this._dispatch(Debtris.TETROMINO_HARD_DROP, {
        type: Debtris.TETROMINO_HARD_DROP,
        tetromino: this.tetromino.name,
        rotation: this.tetrominoRotation,
        oldPosition: oldPosition,
        newPosition: [ ...this.tetrominoPosition ]
      });
      
      // do tetromino lock
      this._lockPiece();
      
    } else if (this.moveDown || this.framesTilDrop === 0) {
      if (this._canMovePiece(0, 1)) {
        
        if (this.moveDown) {
          // soft drop makes 1 point per dropped line
          ++this.pressDownScore;
        }
        const oldPosition = [ ...this.tetrominoPosition ];
        ++this.tetrominoPosition[1];
        
        // reset auto-drop frames
        this.framesTilDrop = this._getFramesPerGridcell(this.level);
        
        // fire move down event
        this._dispatch(Debtris.TETROMINO_MOVE_DOWN, {
          type: Debtris.TETROMINO_MOVE_DOWN,
          tetromino: this.tetromino.name,
          rotation: this.tetrominoRotation,
          oldPosition: oldPosition,
          newPosition: [ ...this.tetrominoPosition ],
          downPressed: this.moveDown
        });
        
      } else {
        // lock tetromino if it couldn't move down
        this._lockPiece();
      }
    }
  }
  
  _lockPiece() {
    this.framesTilDrop = -1;
    this._setPiece();
    
    // fire tetromino lock event
    this._dispatch(Debtris.TETROMINO_LOCK, {
      type: Debtris.TETROMINO_LOCK,
      tetromino: this.tetromino.name,
      rotation: this.tetrominoRotation,
      position: [ ...this.tetrominoPosition ]
    });
    
    this.linesCleared = this._getLinesCleared();
    if (this.linesCleared.length > 0) {
      
      // clear those lines
      this.columnsCleared = 0;
      this.gameState = Debtris.STATE_BURN;
      
      // remove initial columns of squares for animation
      const mid = this.boardWidth / 2;
      for (let i = 0; i < this.linesCleared.length; ++i) {
        this.board[this.linesCleared[i]][mid + this.columnsCleared] = -1;
        this.board[this.linesCleared[i]][mid - 1 - this.columnsCleared] = -1;
      }
      
      // play corresponding lines clear sound
      const sound = this.linesCleared.length === 4 ? this.tetrisSound : this.lineSound;
      if (sound) {
        sound.currentTime = 0;
        sound.play();
      }
      
      // fire burn start event
      this._dispatch(Debtris.LINE_CLEAR_START, {
        type: Debtris.LINE_CLEAR_START,
        linesBurnt: [ ...this.linesCleared ]
      });
      
    } else {
      
      // play tetromino lock sound
      if (this.setSound) {
        this.setSound.currentTime = 0;
        this.setSound.play();
      }
      
      // update score
      const oldScore = this.score;
      this.score += this.pressDownScore;
      
      // fire score change event
      this._dispatch(Debtris.SCORE_CHANGE, { 
        type: Debtris.SCORE_CHANGE,
        oldScore: oldScore,
        newScore: this.score
      });
      
      // entry delay for next tetromino
      this.areFrames = this._getARE();
      this.gameState = Debtris.STATE_ARE;
    }
  }
  
  _processBurn() {
    if ((this.frameCounter % 8) === 0) {  //4) === 0) {
      ++this.columnsCleared;
      if (this.columnsCleared < 5) {
        // remove another columns of squares
        const mid = this.boardWidth / 2;
        for (let i = 0; i < this.linesCleared.length; ++i) {
          this.board[this.linesCleared[i]][mid + this.columnsCleared] = -1;
          this.board[this.linesCleared[i]][mid - 1 - this.columnsCleared] = -1;
        }
    
      } else {
        this.columnsCleared = -1;
        
        // clean board up
        for (let i = this.linesCleared.length - 1; i >= 0; --i) {
          this.board.splice(this.linesCleared[i], 1);
        }
        while (this.board.length < this.boardHeight) {
          this.board.unshift([ ...this.emptyRow ]);
        }
        
        // add score and lines
        const oldScore = this.score;
        const oldLines = this.lines;
        this.score += this.pressDownScore + this._getLinesScore(this.linesCleared.length, this.level);
        this.lines += this.linesCleared.length;
        
        // fire lines burn end event
        this._dispatch(Debtris.LINE_CLEAR_END, {
          type: Debtris.LINE_CLEAR_END,
          linesBurnt: [ ...this.linesCleared ]
        });
        
        // fire lines clear event
        this._dispatch(Debtris.LINE_CLEAR, { 
          type: Debtris.LINE_CLEAR,
          oldLines: oldLines,
          newLines: this.lines
        });
        
        // fire score change event
        this._dispatch(Debtris.SCORE_CHANGE, { 
          type: Debtris.SCORE_CHANGE,
          oldScore: oldScore,
          newScore: this.score
        });
        
        // increase level?
        const levelTemp = this._getLevel();
        if (this.level != levelTemp) {
          const oldLevel = this.level;
          this.level = levelTemp;
          
          // play level change sound
          if (this.levelChangeSound) {
            this.levelChangeSound.currentTime = 0;
            this.levelChangeSound.play();
          }
          
          // fire level change event
          this._dispatch(Debtris.LEVEL_CHANGE, { 
            type: Debtris.LEVEL_CHANGE,
            oldLevel: oldLevel,
            newLevel: this.level
          });
          
        }
        
        // entry delay for next tetromino
        this.areFrames = this._getARE();
        this.gameState = Debtris.STATE_ARE;
      }
    }
    
  }
  
  _processARE() {
    // wait are frames
    --this.areFrames;
    if (this.areFrames === 0) {
      this.areFrames = -1;
      
      // reset drop points
      this.pressDownScore = 0;
      this.pointerMoveDownEnabled = false;
      
      // get next tetromino
      this.tetromino = this.next;
      this.tetrominoPosition = this.tetromino.iniPos.slice(0);
      this.tetrominoRotation = 0;
      this.next = this.tetrominoes[this._nextPieceId()];
      
      // try to place current tetromino
      if (this._canMovePiece(0, 0)) {
        this.framesTilDrop = this._getFramesPerGridcell(this.level);
        this.gameState = Debtris.STATE_DROP;
        
        // fire new tetromino placed event
        this._dispatch(Debtris.NEXT_TETROMINO, {
          type: Debtris.NEXT_TETROMINO,
          tetromino: this.tetromino.name,
          nextPiece: this.next.name
        });
        
      } else {
        // can't place tetromino -it's game over
        this._setPiece();
        this._triggerGameOver();
      }
    }
  }
  
  _triggerGameOver() {
    // stop theme song
    if (this.gameTheme) {
      this.gameTheme.pause();
    }
    
    // play game over sound
    if (this.gameOverSound) {
      this.gameOverSound.currentTime = 0;
      this.gameOverSound.play();
    }
    
    this.gameOverLine = 1;
    this.gameState = Debtris.STATE_GAME_OVER;
    
    // fire game-over animation start event
    this._dispatch(Debtris.GAME_OVER_START, {
      type: Debtris.GAME_OVER_START,
      level: this.level,
      score: this.score,
      lines: this.lines,
      cash: this.cash
    });
  }
  
  _processGameOver() {
    if ((this.frameCounter % 8) === 0) {  //4) === 0) {
      ++this.gameOverLine;
      if (this.gameOverLine < this.boardHeight) {
        // paint next row
        for (let i = 0; i < this.boardWidth; ++i) this.board[this.gameOverLine][i] = 7;
        
      } else {
        // game-over animation is done -stop the game loop
        this.gameLoop = false;
        
        // fire game-over animation end event
        this._dispatch(Debtris.GAME_OVER_END, {
          type: Debtris.GAME_OVER_END,
          level: this.level,
          score: this.score,
          lines: this.lines,
          cash: this.cash
        });
      }
    }
  }
  
  // pause or unpause if requested
  _pauseCheck() {
    if (this.doUndoPause) {
      if (this.gameState === Debtris.STATE_PAUSE) {
        this.gameState = this.previousGameState;

        if (this.timerInterval) clearInterval(this.timerInterval);
        
        // reset pointer flags
        this.pointerMoveDownEnabled = false;
        
        // resume theme song
        if (this.gameTheme) {
          this.gameTheme.play();
        }
        
        // fire resume event
        this._dispatch(Debtris.GAME_RESUME, {
          type: Debtris.GAME_RESUME,
          level: this.level,
          score: this.score,
          lines: this.lines,
          cash: this.cash
        });
        
      } else {
        this.previousGameState = this.gameState;
        this.gameState = Debtris.STATE_PAUSE;
        
        // pause theme song
        if (this.gameTheme) {
          this.gameTheme.pause();
        }
        
        // play pause sound
        if (this.pauseSound) {
          this.pauseSound.currentTime = 0;
          this.pauseSound.play();
        }
        
        // fire pause event
        this._dispatch(Debtris.GAME_PAUSE, {
          type: Debtris.GAME_PAUSE,
          level: this.level,
          score: this.score,
          lines: this.lines,
          cash: this.cash
        });
        
      }
    }
  }

  // get them inputs ready for the next iteration
  _resetInputs() {
    this.moveLeft = false;
    this.moveRight = false;
    this.moveDown = false;
    this.rotateClockwise = false;
    this.rotateCounterclockwise = false;
    this.hardDrop = false;
    this.doUndoPause = false;
  }
  
  _nextPieceId() {
    let nextId = (Math.random() * 8) | 0;
    if (nextId === 7 || nextId === this.tetromino.id) {
      nextId = (Math.random() * 8) | 0;
      nextId = (nextId + this.tetromino.id) % 7;
    }
    return nextId;
  }
    
  // score for lines cleared
  // depends on the level and # of lines cleared
  _getLinesScore(lines, lvl) {
    if (lines === 1) {
        this.cash += 50;
        return 40 * (lvl + 1);
    } 
    else if (lines === 2) { 
        this.cash += 100;
        return 100 * (lvl + 1);
    }
    else if (lines === 3) {
        this.cash += 250;
        return 300 * (lvl + 1);
    }
    else {
        cash += 500;
        return 1200 * (lvl + 1);    // tetris!
    }
  }
  
  // ARE is 10~18 frames depending on the height at which the tetromino locked; 
  // tetrominoes that lock in the bottom two rows are followed by 10 frames of entry delay, 
  // and each group of 4 rows above that has an entry delay 2 frames longer than the last
  _getARE() {
    const h = this._getLockHeight();
    const are = 10 + (((h + 2) / 4) | 0) * 2;
    return are * 2;   //return are;
  }
  
  // height at which the tetromino locked
  _getLockHeight() {
    let h = 0;
    const p = this.tetromino.rot[this.tetrominoRotation];
    for (let i = 0; i < p.length; ++i) {
      for (let j = 0; j < p[i].length; ++j) {
        if (p[i][j] != 0)
          h = Math.max(h, this.tetrominoPosition[1] + i);
      }
    }
    return this.boardHeight - 1 - h;
  }
  
  // when the player clears (startLevel × 10 + 10) or max(100, (startLevel × 10 - 50)) lines, 
  // whatever comes first, the level advances by 1. After this, the level advances by 1 for every 10 lines.
  _getLevel() {
    const a = this.lines - Math.min(this.startLevel * 10 + 10, Math.max(100, this.startLevel * 10 - 50));
    return this.startLevel + (a >= 0 ? ((a / 10) | 0) + 1 : 0);
  }
  
  // line clear delay is an additional 17~20 frames depending on the frame that the tetromino locks; 
  // the animation has 5 steps that advance when the global frame counter modulo 4 equals 0. 
  // As a consequence, the first step of the line clear animation is not always a set number of frames
  _getLinesCleared() {
    const arr = [];
    for (let i = 0; i < this.boardHeight; ++i) {
      let b = true;
      for (let j = 0; b && j < this.boardWidth; ++j) 
        if (this.board[i][j] === -1) b = false;
      if (b) arr.push(i);
    }
    return arr;
  }
  
  // set tetromino down on board (lock it)
  _setPiece() {
    const p = this.tetromino.rot[this.tetrominoRotation];
    for (let i = 0; i < p.length; ++i) {
      for (let j = 0; j < p[i].length; ++j) {
        if (p[i][j] != 0) {
          this.board[this.tetrominoPosition[1] + i][this.tetrominoPosition[0] + j] = this.tetromino.id;
        }
      }
    }
  }
  
  // can the tetromino move
  _canMovePiece(offsetX, offsetY) {
    return this._canMove(this.tetromino, this.tetrominoRotation, this.tetrominoPosition, offsetX, offsetY);
  }
  
  _canMove(tetromino, tetrominoRot, tetrominoPos, offsetX, offsetY) {
    const p = tetromino.rot[tetrominoRot];
    for (let i = 0; i < p.length; ++i) {
      for (let j = 0; j < p[i].length; ++j) {
        if (p[i][j] != 0) {
          const x = offsetX + tetrominoPos[0] + j;
          const y = offsetY + tetrominoPos[1] + i;
          if (x < 0 || x >= this.boardWidth || y >= this.boardHeight || this.board[y][x] != -1) 
            return false;
        }
      }
    }
    return true;
  }
  
  // can the tetromino rotate
  _canRotate(rotation) {
    // if score is less than 0 then no rotation is permitted
    if (this.cash < 0) {
        return false;
    }
    const p = this.tetromino.rot[rotation];
    for (let i = 0; i < p.length; ++i) {
      for (let j = 0; j < p[i].length; ++j) {
        if (p[i][j] != 0) {
          const x = this.tetrominoPosition[0] + j;
          const y = this.tetrominoPosition[1] + i;
          if (x < 0 || x >= this.boardWidth || y >= this.boardHeight || this.board[y][x] != -1) 
            return false;
        }
      }
    }
    return true;
  }
  
  _render() {
    this._drawBackground();
    this._drawBoard();
    this._drawGhost();
    this._drawPiece();
    this._drawHUD();
    this._drawNext();
  }
  
  _drawBackground() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.lineWidth = 1;
    
    //if burning a tetris, make background color flash
    const fillColor = this.gameState === Debtris.STATE_BURN && 
                      this.linesCleared.length === 4 &&
                      this.frameCounter % 8 ?   //4 ?
                          this.tetrisBackgroundColor :
                          this.backgroundColor;

    // draw background and border
    this.context.beginPath();
    this.context.moveTo(this.boardBorder[0], this.boardBorder[1]);
    this.context.lineTo(this.boardBorder[2], this.boardBorder[1]);
    this.context.lineTo(this.boardBorder[2], this.boardBorder[3]);
    this.context.lineTo(this.boardBorder[0], this.boardBorder[3]);
    this.context.closePath();
    this.context.fillStyle = fillColor;
    this.context.strokeStyle = this.borderColor;
    this.context.fill();
    this.context.stroke();
    
    
    if (this.gameState === Debtris.STATE_PAUSE) {
      // pause overlay:
      // write PAUSE on the board if game is paused
      this.context.font = this.canvasFont;
      this.context.fillStyle = this.canvasFontColor;
      this.context.fillText('PAUSED', this.pauseX, this.pauseY);

    } else {
      // draw grid if not paused
      this.context.lineWidth = 0.5;
      
      // horizontal lines
      this.context.strokeStyle = this.gridColor;
      const boardRight = this.boardX + this.squareSide * this.boardWidth;
      for (let i = 3; i < this.boardHeight; ++i) {
        const height = this.boardY + i * this.squareSide;
        this.context.beginPath();
        this.context.moveTo(this.boardX, height);
        this.context.lineTo(boardRight, height);
        this.context.closePath();
        this.context.stroke();
      }
      // vertical lines
      const boardTop = this.boardY + 2 * this.squareSide;
      const boardBottom = this.boardY + this.boardHeight * this.squareSide;
      for (let j = 0; j < this.boardWidth; ++j) {
        const width = this.boardX + j * this.squareSide;
        this.context.beginPath();
        this.context.moveTo(width, boardTop);
        this.context.lineTo(width, boardBottom);
        this.context.closePath();
        this.context.stroke();
      }
      
      // back to regular line width
      this.context.lineWidth = 1;
    }
  }
  
  _drawBoard() {
    if (!(this.gameState === Debtris.STATE_PAUSE)) {
      // draw the game board if the game is not paused
      for (let i = 2; i < this.boardHeight; ++i) {
        for (let j = 0; j < this.boardWidth; ++j) {
          if (this.board[i][j] != -1) {
            const col = this.board[i][j] == 7 ? 
                this.gameOverColor : 
                this.tetrominoes[this.board[i][j]].col;
            this._drawSquare(
                this.boardX + j * this.squareSide, 
                this.boardY + i * this.squareSide, 
                col[0], col[1]);
          }
        }
      }
    }
  }
  
  // draw current tetromino
  _drawPiece() {
    if (this.gameState === Debtris.STATE_DROP) {
      // current tetromino is only drawn in drop state
      const p = this.tetromino.rot[this.tetrominoRotation];
      for (let i = 0; i < p.length; ++i) {
        for (let j = 0; j < p[i].length; ++j) {
          if (p[i][j] != 0 && this.tetrominoPosition[1] + i > 1) {
            this._drawSquare(
                this.boardX + (this.tetrominoPosition[0] + j) * this.squareSide, 
                this.boardY + (this.tetrominoPosition[1] + i) * this.squareSide, 
                this.tetromino.col[0], this.tetromino.col[1]);
          }
        }
      }
    }
  }
  
  // draw ghost tetromino
  // it is a representation of where a tetromino or other tetromino will land if allowed to drop into the playfield
  _drawGhost() {
    if (this.gameState === Debtris.STATE_DROP) {
      
      // find ghost tetromino position, which is lowest position for current tetromino
      const tetrominoPos = [ this.tetrominoPosition[0], this.tetrominoPosition[1] ];
      while (this._canMove(this.tetromino, this.tetrominoRotation, tetrominoPos, 0, 1)) {
        ++tetrominoPos[1];
      }
      
      // draw ghost tetromino
      const p = this.tetromino.rot[this.tetrominoRotation];
      for (let i = 0; i < p.length; ++i) {
        for (let j = 0; j < p[i].length; ++j) {
          if (p[i][j] != 0 && tetrominoPos[1] + i > 1) {
            this._drawSquare(
                this.boardX + (tetrominoPos[0] + j) * this.squareSide, 
                this.boardY + (tetrominoPos[1] + i) * this.squareSide, 
                this.ghostColor[0], this.ghostColor[1]);
          }
        }
      }
    }
  }
  
  // draw heads-up display
  _drawHUD() {
    let scoreStr = 'SCORE:   ';
    let levelStr = 'LEVEL:   ';
    let linesStr = 'LINES:   ';
    let cashStr = 'CASH:   ';
    let timeStr = 'TIME:   ';
    let nextStr = 'NEXT';
    if (this.gameState != Debtris.STATE_PAUSE) {
      // show data only if game is not paused
      scoreStr += this.score;
      levelStr += this.level;
      linesStr += this.lines;
      cashStr += this.cash;
      timeStr += this.currentTimer;
    }
    
    this.context.font = this.canvasFont;
    this.context.fillStyle = this.canvasFontColor;
    this.context.fillText(scoreStr, this.scoreX, this.scoreY);
    this.context.fillText(levelStr, this.levelX, this.levelY);
    this.context.fillText(linesStr, this.linesX, this.linesY);
    this.context.fillText(timeStr, this.timeX, this.timeY);
    this.context.fillText(nextStr, this.nextX, this.nextY);

    // cash color based on value
    this.context.fillStyle = this.cash >= 0 ? 'green' : 'red';
    this.context.fillText(cashStr, this.cashX, this.cashY);

    // restore default font color
    this.context.fillStyle = this.canvasFontColor;
  }

  // draw next tetromino
  _drawNext() {
    if (this.gameState === Debtris.STATE_PAUSE || 
        this.gameState === Debtris.STATE_GAME_OVER) return;
    
    const p = this.next.rot[0];
    const b = this.next.box;
    for (let i = b[0]; i < b[0] + b[2]; ++i) {
      for (let j = b[1]; j < b[1] + b[3]; ++j) {
        if (p[i][j] != 0) {
          this._drawSquare(
              this.nextOffsetX + (j - b[1]) * this.squareSide, 
              this.nextOffsetY + (i - b[0]) * this.squareSide, 
              this.next.col[0], this.next.col[1]);
        }
      }
    }
  }
  
  // draw an individual square on the board
  _drawSquare(x, y, color, border) {
    this.context.beginPath();
    this.context.moveTo(x + 1, y + 1);
    this.context.lineTo(x + this.squareSide - 1, y + 1);
    this.context.lineTo(x + this.squareSide - 1, y + this.squareSide - 1);
    this.context.lineTo(x + 1, y + this.squareSide - 1);
    this.context.closePath();
    this.context.fillStyle = color;
    this.context.strokeStyle = border;
    this.context.fill();
    this.context.stroke();
  }
  
  _sleep() { return new Promise(requestAnimationFrame); }
  
  // add an event handler
  on(event, handler) {
    const handlers = this.handlers.get(event);
    if (handlers) {
      handlers.push(handler);
    }
  }
  
  // remove an event handler
  off(event, handler) {
    const handlers = this.handlers.get(event);
    if (handlers) {
      const index = handlers.indexOf(handler);
      if (index != -1) handlers.splice(index, 1);
    }
  }
  
  // fire events
  _dispatch(event, data) {
    const handlers = this.handlers.get(event);
    if (handlers) {
      for (const handler of handlers) {
        handler(data);
      }
    }
  }
}

/** changes
 * - completely rewritten (kinda)
 * - optimized ghost piece preview
 * - added next piece preview
 * - separated core tetris and debris scoring
 * - timer counts down every 15 seconds for paycheck
 * - rotating pieces now cost 25 cash
 * functional on mobile! (i hope.)
 */

/**
 * to-do
 * - implement new controls list
 * - gameplay balances
 * - flash when in debt
 * - new graphics/visuals
 * - code cleanup
 * - sfx
 */
