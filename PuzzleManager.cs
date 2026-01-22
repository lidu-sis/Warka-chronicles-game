using UnityEngine;

public class PuzzleManager : MonoBehaviour
{
    public PuzzleTile[] tiles;       // Array to hold all 9 tiles
    public Transform[] correctPositions; // Empty GameObjects showing the correct positions

    void Start()
    {
        ShuffleTiles();
    }

    void ShuffleTiles()
    {
        // Shuffle tile positions randomly
        for (int i = 0; i < tiles.Length; i++)
        {
            int randomIndex = Random.Range(0, tiles.Length);
            Vector3 temp = tiles[i].transform.position;
            tiles[i].transform.position = tiles[randomIndex].transform.position;
            tiles[randomIndex].transform.position = temp;
        }
    }

    public void CheckWin()
    {
        int correctCount = 0;

        for (int i = 0; i < tiles.Length; i++)
        {
            if (Vector3.Distance(tiles[i].transform.position, correctPositions[i].position) < 0.5f)
            {
                correctCount++;
            }
        }

        if (correctCount == tiles.Length)
        {
            Debug.Log("🎉 You completed the Lalibela puzzle!");
        }
    }
}
