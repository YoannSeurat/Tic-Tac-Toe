class TicTacToe:
    
    """
    Classic Tic Tac Toe game.
    For 2 or more players.
    Board size is 3x3 by default but can be modified.
    """
    
    def __init__(self, size=3):
        """
        Constructor of the TicTacToe class.

        Parameters
        ----------
        size : INT
            Board size. Default is 3.
        """
        self.size = size
        self.board = []
        for i in range(size):
            self.board.append([])
            for j in range(size):
                self.board[i].append('-')
        self.finished = False
                
    def __str__(self):
        """
        Outputs the board.
        
        Returns
        -------
        b : STR
            Board converted to string.
        """
        b = ''
        for i in self.board:
            for j in i:
                b += str(j) + ' '
            b += '\n'
        return b
    
    def play(self, x, y, player):
        """
        Plays a move on the board at coordinates (x, y) with the given player symbol.
        
        Parameters
        ----------
        x : INT
            X coordinate.
        y : INT
            Y coordinate.
        player : STR
            Player symbol (example: 'X' or 'O').
            
        Returns
        -------
        STR
            Message indicating if the move was played or not, and other additionnal information.
        """
        if not self.finished:
            if self.board[x][y] == '-':
                self.board[x][y] = player
                print(M)
            else:
                return 'Frame already played'
            if self.is_finished():
                self.finished = True
                return 'Move played and game finished'
            return 'Move played'
        return 'Game finished, cannot play anymore'

    def is_finished(self):
        """
        Gives information about the game state.
        
        Returns
        -------
        BOOL
            True if the game is finished, False otherwise.
        """
        if not self.finished and True in ['-' in b for b in self.board]:
            #goes through every possibility of winning in any frame, else returns False
            for i in range(self.size):
                for j in range(self.size):
                    #in order of appearance: horizontal, vertical, diagonal, anti-diagonal
                    if (j == 0 and not (False in [self.board[i][j] == self.board[i][j+n] != '-' for n in range(1, self.size)])) \
                    or (i == 0 and not (False in [self.board[i][j] == self.board[i+n][j] != '-' for n in range(1, self.size)])) \
                    or (i == j == 0 and not (False in [self.board[i][j] == self.board[i+n][j+n] != '-' for n in range(1, self.size)])) \
                    or (i == self.size-1 and j == 0 and not (False in [self.board[i][j] == self.board[i-n][j+n] != '-' for n in range(1, self.size)])):
                        return True
            return False
        return True

s = int(input('Type in the size of the board: '))
M = TicTacToe(s)
print('\n\n\n')
print(M)


round = 0
while True:
    
    inp = input('Type in the coordinates of your move (symbol is set on default): ')
    inp = inp.split(' ')
    
    if len(inp) > 3:
        print('Invalid input')
    elif inp[0] == 'exit':
        break
    elif inp[0] == 'help':
        print('Available commands are: help, exit\nTo play a move, type in the coordinates of the move (and, if you want, the symbol), example: 0 0, or 0 0 X')
        print(help(M))
    else:
        try:
            inp[0] = int(inp[0])
            inp[1] = int(inp[1])
            #from here on, the input is valid
            currentPlayerSymbol = 'X' if round % 2 == 0 else 'O'
            if len(inp) == 3 and len(inp[2]) == 1:
                currentPlayerSymbol = inp[2]
            print(M.play(inp[0], inp[1], currentPlayerSymbol))
            if M.finished:
                break
            round += 1
        except:
            print('Invalid input')