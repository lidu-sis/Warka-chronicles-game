import Phaser from "phaser";

export default class AddisScene extends Phaser.Scene {
    constructor() {
        super("AddisScene");
        this.isMovingToElder = false;
    }

    create() {
        // Full-screen background
        const bg = this.add.image(0, 0, "addis_bg").setOrigin(0);
        bg.displayWidth = this.scale.width;
        bg.displayHeight = this.scale.height;

        // Nuru
        this.nuru = this.physics.add.sprite(100, this.scale.height - 150, "nuru");
        this.nuru.setScale(2).setDepth(10).setCollideWorldBounds(true);

        // Animations
        this.createAnimations();

        // Elder
        this.elder = this.add.sprite(this.scale.width - 200, this.scale.height - 150, "elder")
            .setScale(1.8).setInteractive();

        // Click-to-move anywhere
        this.input.on("pointerdown", (pointer) => {
            if (!this.isMovingToElder) {
                this.physics.moveTo(this.nuru, pointer.x, pointer.y, 200);
                this.targetX = pointer.x;
                this.targetY = pointer.y;
            }
        });

        // Click Elder to move to him
        this.elder.on("pointerdown", () => {
            this.isMovingToElder = true;
            this.physics.moveTo(this.nuru, this.elder.x - 50, this.elder.y, 150);
        });

        // Movement & animation update
        this.physics.world.on("worldstep", () => this.updateMovement());

        // Fade in
        this.cameras.main.fadeIn(1000, 0, 0, 0);
    }

    createAnimations() {
        this.anims.create({
            key: "idle",
            frames: this.anims.generateFrameNumbers("nuru", { start: 0, end: 3 }),
            frameRate: 3,
            repeat: -1
        });
        this.anims.create({
            key: "walk",
            frames: this.anims.generateFrameNumbers("nuru", { start: 4, end: 7 }),
            frameRate: 8,
            repeat: -1
        });
        this.nuru.play("idle");
    }

    updateMovement() {
        if (this.isMovingToElder || (this.targetX && this.targetY)) {
            this.nuru.play("walk", true);

            if (this.nuru.body.velocity.x < 0) this.nuru.setFlipX(true);
            else if (this.nuru.body.velocity.x > 0) this.nuru.setFlipX(false);

            let distX = this.isMovingToElder ? this.elder.x - 50 : this.targetX;
            let distY = this.isMovingToElder ? this.elder.y : this.targetY;

            if (Phaser.Math.Distance.Between(this.nuru.x, this.nuru.y, distX, distY) < 5) {
                this.nuru.body.setVelocity(0);
                this.nuru.play("idle", true);
                if (this.isMovingToElder) {
                    this.isMovingToElder = false;
                    this.triggerDialogue();
                }
            }
        } else {
            this.nuru.play("idle", true);
        }
    }

    async triggerDialogue() {
        const uiScene = this.scene.get("UIScene");

        // 3 short meaningful Amharic dialogues
        await this.showDialogueAsync(uiScene, "እንኳን ደህና መጡ ወደ አዲስ አበባ።");
        await this.showDialogueAsync(uiScene, "እዚህ ትንሽ ምልክቶች እንዲሰብስቡ እነሆ አስተምራለሁ።");
        await this.showDialogueAsync(uiScene, "የመጀመሪያ ምልክት ተሰጠዎታል።");

        // Add clue
        uiScene.addClue("የአዲስ ከተማ ካርታ ክፍል");

        // Fade to next scene
        this.time.delayedCall(3000, () => {
            this.cameras.main.fadeOut(1000, 0, 0, 0);
            this.cameras.main.once("camerafadeoutcomplete", () => {
                this.scene.start("LalibelaScene");
            });
        });
    }

    showDialogueAsync(uiScene, text) {
        return new Promise(resolve => {
            uiScene.showDialogue(text);
            this.time.delayedCall(2500 + text.length * 30, resolve);
        });
    }
}
