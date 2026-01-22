using UnityEngine;

public class PuzzleTile : MonoBehaviour
{
    private Vector3 offset;
    private bool isDragging = false;
    private Vector3 startPosition;

    [Header("Snap Settings")]
    public string snapTargetName;      // Name of the empty GameObject to snap to (Position_1, Position_2, etc.)
    private Vector3 correctPosition;
    public float snapDistance = 1f;    // How close to snap

    private bool isPlaced = false;

    void Start()
    {
        // Store start position in case player wants to reset
        startPosition = transform.position;

        // Get the snap target automatically
        GameObject target = GameObject.Find(snapTargetName);
        if (target != null)
        {
            correctPosition = target.transform.position;
        }
        else
        {
            Debug.LogError("Snap target not found: " + snapTargetName);
        }
    }

    void OnMouseDown()
    {
        if (isPlaced) return; // Don't drag if already snapped
        isDragging = true;
        // Calculate offset between mouse position and tile position
        Vector3 mousePos = Camera.main.ScreenToWorldPoint(Input.mousePosition);
        offset = transform.position - new Vector3(mousePos.x, mousePos.y, 0);
    }

    void OnMouseDrag()
    {
        if (!isDragging || isPlaced) return;
        Vector3 mousePos = Camera.main.ScreenToWorldPoint(Input.mousePosition);
        transform.position = new Vector3(mousePos.x, mousePos.y, 0) + offset;
    }

    void OnMouseUp()
    {
        if (!isDragging || isPlaced) return;
        isDragging = false;

        // Snap to target if close enough
        if (Vector3.Distance(transform.position, correctPosition) <= snapDistance)
        {
            transform.position = correctPosition;
            isPlaced = true;

            // Call PuzzleManager to check win
            PuzzleManager manager = FindObjectOfType<PuzzleManager>();
            if (manager != null)
            {
                manager.CheckWin();
            }
        }
        else
        {
            // Optional: return to start if not close enough
            // transform.position = startPosition;
        }
    }
}
