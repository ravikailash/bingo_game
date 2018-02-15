import random


cell_color, cell_checked = 'green', 'black'

size = 5

grid = [[{'data': x+y, 'seen':False, 'checked':cell_color} for x in range(size)] for y in range(1, size+1)]

diagonal_right = [(x, len(grid)-1-x) for x in range(len(grid))]

print(diagonal_right)


def check_seen(grid_size=0, index=0):
    for x in checked[grid_size][index]:
        grid[x[0]][x[1]]['checked'] = cell_checked
    global current_node
    current_node = random.choice(checked[index])
    

def reset_grid():
    for x, row in enumerate(grid):
        for y, value in enumerate(row):
            grid[x][y]['checked'] = cell_color


def print_grid():
    for x, row in enumerate(grid):
        for y, value in enumerate(row):
            print(value['checked'], end=" ")
        print()

                        
checked = [[[(0, 0), (0, 1), (0, 2)],
            [(0, 0), (1, 1), (2, 2)],
            [(0, 1), (1, 1), (2, 1)],
            [(0, 2), (1, 1), (2, 0)]],

           [[(0, 0), (0, 1), (0, 2), (0, 3), (0, 4)],
            [(0, 0), (1, 1), (2, 2), (3, 3), (4, 4)],
            [(0, 1), (1, 1), (2, 1), (3, 1), (4, 1)],
            [(0, 2), (1, 1), (2, 0)]]]

current_node = None

def check_row(row):
    for y in range(len(grid)):
        if grid[row][y]['checked'] != cell_checked:
            return False
    return True


def check_column(column):
    for x in range(len(grid)):
        if grid[x][column]['checked'] != cell_checked:
            return False
    return True


def check_diagonal(row, column):
    diagonals = [None, None]

    if row == column:
        diagonals[0] = False
        for x in range(len(grid)):
            if grid[x][x]['checked'] != cell_checked:
                diagonals[0] = True
                break

    if (row, column) in diagonal_right:
        diagonals[1] = False
        for n in diagonal_right:
            if grid[n[0]][n[1]]['checked'] != cell_checked:
                diagonals[1] = True
                break


    if diagonals.count(None) == 2 or False not in diagonals:
        return -1

    if diagonals.count(False) == 2:
        return 2

    return diagonals.index(False)


def validate_grid():
    check_seen()
    # print_grid()
    row, column = current_node
    print(row, column)
    if check_row(row):
        print('Row:', row)
    if check_column(column):
        print('column: ', column)
    d = check_diagonal(row, column)
    if d != -1:
        print('Diagonal:', row, column, '-', d)
  
# validate_grid()

check_seen()
print_grid()
# print(current_node)
n = (4, 0)
if n[0] == n[1] or n in diagonal_right:
    print(check_diagonal(n[0], n[1]))

