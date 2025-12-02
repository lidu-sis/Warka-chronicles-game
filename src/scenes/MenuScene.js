import Phaser from "phaser";

export default class MenuScene extends Phaser.Scene {
    constructor() {
        super("MenuScene");
    }

    create() {
        this.add.text(this.scale.width / 2, this.scale.height / 2 - 50, "Nuru Adventure", { fontSize: "48px", color: "#fff" }).setOrigin(0.5);
        const startBtn = this.add.text(this.scale.width / 2, this.scale.height / 2 + 50, "Start Game", { fontSize: "32px", color: "#0f0" }).setOrigin(0.5).setInteractive();

        startBtn.on("pointerdown", () => {
            this.scene.start("AddisScene");
            this.scene.launch("UIScene");
        });
    }
}
