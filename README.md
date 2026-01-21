Lalibela Puzzle Game
Overview

This is a 2D puzzle game built in Unity using C# where the player reconstructs a picture of Lalibela by dragging puzzle pieces to their correct positions. The game is designed as a school project to demonstrate basic Unity 2D mechanics, draggable tiles, snapping logic, and simple win detection.

Game Features

9 draggable puzzle pieces

Snap-to-position functionality

Shuffle at start (optional, can be added)

Win detection when all tiles are correctly placed

Full-screen background representing Lalibela

Simple, easy-to-play 2D interface

Project Structure
Assets/
├── Prefabs/
│   └── PuzzleTile.prefab       # Template for all 9 tiles
├── Scenes/
│   └── LalibelaPuzzle.unity    # Main scene
├── Scripts/
│   ├── PuzzleTile.cs           # Draggable tile logic
│   └── PuzzleManager.cs        # Shuffle & win detection
├── Sprites/
│   ├── piece1.png
│   ├── piece2.png
│   └── ...                     # All 9 puzzle pieces
└── PuzzleBackground.png        # Full-screen background

How to Run

Open the project in Unity 2021+ (2D Core Template recommended)

Open the scene: Scenes/LalibelaPuzzle.unity

Make sure the PuzzleManager GameObject is in the scene with all tiles and snap positions assigned

Press Play ▶️

Drag the tiles to their correct positions

Once all tiles are in place, the game will detect completion

Scripts Overview
PuzzleTile.cs

Makes tiles draggable

Snaps tiles to their target positions

Notifies PuzzleManager when a tile is placed

PuzzleManager.cs

Holds references to all tiles and correct positions

Checks if all tiles are correctly placed

Optional: Shuffle tiles at start

Setup Instructions (For Developers)

Sprites

Place all 9 puzzle pieces in Assets/Sprites

Ensure Texture Type = Sprite (2D and UI)

Set Pivot = Center

Tiles (Prefabs)

Create one tile → attach Box Collider 2D + PuzzleTile.cs

Drag it to Prefabs folder → use as a template for all tiles

Snap Targets

Create 9 empty GameObjects → name Position_1 → Position_9

Set their Transform → X/Y/Z according to the puzzle grid

Assign snapTargetName in PuzzleTile.cs for each tile

PuzzleManager

Create empty GameObject → attach PuzzleManager.cs

Drag all tiles into tiles array

Drag all snap positions into correctPositions array

Background

Add a 2D Sprite for the background

Position (0,0,1) behind tiles

Scale for full-screen coverage

Camera Settings

Camera Projection: Orthographic

Position: (0, 0, -10)

Size: Adjust to fit all tiles (recommended: 7–8)

Future Improvements

Shuffle tiles automatically at start

Add UI win message instead of Debug.Log

Add sound effects for snapping

Add hover or highlight effect on tiles

Increase puzzle difficulty (more pieces, e.g., 16-piece puzzle)

Credits

Puzzle idea inspired by the Amazing Race in Ethiopia

Lalibela image sourced from public domain references 

Developed using Unity and C#

[Click here to watch the demo](https://www.youtube.com/shorts/sZPVIjQGmxQ)

