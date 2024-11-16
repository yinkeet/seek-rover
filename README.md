# seek-rover

## Direction Enum

| North | South | West | East | Integer |
|-------|-------|------|------|---------|
| 1     | 0     | 0    | 0    | 8       |
| 1     | 0     | 0    | 1    | 9       |
| 0     | 0     | 0    | 1    | 1       |
| 0     | 1     | 0    | 1    | 5       |
| 0     | 1     | 0    | 0    | 4       |
| 0     | 1     | 1    | 0    | 6       |
| 0     | 0     | 1    | 0    | 2       |
| 1     | 0     | 1    | 0    | 10      |

The circular array/ring buffer for 8 axis directions are as such

         8
         ↑
  10 ↖   |   ↗ 9
         |
2 ◄──────┼──────► 1
         |
   6 ↙   |   ↘ 5
         ↓
         4

```json
[8, 9, 1, 5, 4, 6, 2, 10]
```

## Wall Enums

We are using binary bits to form the walls of the tiles.

| North Wall | South Wall | West Wall | East Wall | Integer |
|------------|------------|-----------|-----------|---------|
| 0          | 0          | 0         | 0         | 0       |
| 0          | 0          | 0         | 1         | 1       |
| 0          | 0          | 1         | 0         | 2       |
| 0          | 0          | 1         | 1         | 3       |
| 0          | 1          | 0         | 0         | 4       |
| 0          | 1          | 0         | 1         | 5       |
| 0          | 1          | 1         | 0         | 6       |
| 0          | 1          | 1         | 1         | 7       |
| 1          | 0          | 0         | 0         | 8       |
| 1          | 0          | 0         | 1         | 9       |
| 1          | 0          | 1         | 0         | 10      |
| 1          | 0          | 1         | 1         | 11      |
| 1          | 1          | 0         | 0         | 12      |
| 1          | 1          | 0         | 1         | 13      |
| 1          | 1          | 1         | 0         | 14      |
| 1          | 1          | 1         | 1         | 15      |