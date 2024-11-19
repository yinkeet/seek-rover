# seek-rover

This project uses typescript and is powered by deno under the hood

## Getting Started

1. Start by running this command
   ```bash
   ./run.sh
   ```

1. Press `Ctrl+C` twice to exit

## Testing

1. Run tests with this command
   ```bash
   ./test.sh
   ```

## Preventing edge drops

To prevent rover from falling to its dismay, we need to know the lower left most point and the top right point of the level.

Everytime a move command is issued, we add one to the direction the rover is moving and we clamp the position to the min and max point of that axis.
The min and max point of an axis is derived from the lower left point and top right point contained in the level data.

## Calculating wall collisions

### Direction Enum

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

### Wall Enums

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