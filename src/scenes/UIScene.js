import Phaser from "phaser";

export default class UIScene extends Phaser.Scene {
    constructor() {
        super("UIScene");
    }

    create() {
        // Dialogue box at bottom
        this.dialogueBox = this.add.rectangle(this.scale.width / 2, this.scale.height - 80, this.scale.width - 40, 100, 0x000000, 0.7).setOrigin(0.5);
        this.dialogueText = this.add.text(20, this.scale.height - 110, "", { fontSize: "24px", color: "#fff", wordWrap: { width: this.scale.width - 60 } });

        // Clue Box top right
        this.clueBox = this.add.image(this.scale.width - 100, 100, "clue_box").setInteractive().setScale(1.2);
        this.clues = [];
        this.clueBox.on("pointerdown", () => {
            if (this.clues.length > 0) {
                alert("Clues: \n" + this.clues.join("\n"));
            } else {
                alert("No clues collected yet.");
            }
        });

        // Badge top left
        this.badge = this.add.image(100, 100, "badge").setVisible(false).setScale(1.5);
    }

    showDialogue(text) {
        this.dialogueText.setText("");
        let i = 0;
        this.time.addEvent({
            delay: 30,
            repeat: text.length - 1,
            callback: () => {
                this.dialogueText.text += text[i];
                i++;
            },
        });
    }

    addClue(clue) {
        if (!this.clues.includes(clue)) {
            this.clues.push(clue);
            this.showDialogue(`New clue collected: ${clue}`);
        }
    }

    unlockBadge() {
        this.badge.setVisible(true);
        this.showDialogue("Congratulations! Badge unlocked!");
    }
}
