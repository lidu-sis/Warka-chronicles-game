import Phaser from "phaser";

export default class OmoScene extends Phaser.Scene {
    constructor() {
        super("OmoScene");
        this.isMovingToElder = false;
    }

    create() {
        const bg = this.add.image(0, 0, "omo_bg").setOrigin(0);
        bg.displayWidth = this.scale.width;
        bg.displayHeight = this.scale.height;

        this.nuru = this.physics.add.sprite(100, this.scale.height - 150, "nuru");
        this.nuru.setScale(2).setDepth(10).setCollideWorldBounds(true);

        this.createAnimations();

        this.elder = this.add.sprite(this.scale.width - 200, this.scale.height - 150, "elder")
            .setScale(1.8).setInteractive();

        this.input.on("pointerdown", (pointer) => {
            if (!this.isMovingToElder) {
                this.physics.moveTo(this.nuru, pointer.x, pointer.y, 200);
                this.targetX = pointer.x;
                this.targetY = pointer.y;
            }
        });

        this.elder.on("pointerdown", () => {
            this.isMovingToElder = true;
            this.physics.moveTo(this.nuru, this.elder.x - 50, this.elder.y, 150);
        });

        this.physics.world.on("worldstep", () => this.updateMovement());

        this.cameras.main.fadeIn(1000, 0, 0, 0);
    }

    createAnimations() {
        this.anims.create({ key: "idle", frames: this.anims.generateFrameNumbers("nuru", { start: 0, end: 3 }), frameRate: 3, repeat: -1 });
        this.anims.create({ key: "walk", frames: this.anims.generateFrameNumbers("nuru", { start: 4, end: 7 }), frameRate: 8, repeat: -1 });
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

        await this.showDialogueAsync(uiScene, "እንኳን ደህና መጡ ወደ ኦሞ።");
        await this.showDialogueAsync(uiScene, "እዚህ ባህላዊ ምልክት ተከፍቷል።");
        await this.showDialogueAsync(uiScene, "እንኳን ደስ አለዎት!");

        // Unlock badge
        uiScene.unlockBadge();
    }

    showDialogueAsync(uiScene, text) {
        return new Promise(resolve => {
            uiScene.showDialogue(text);
            this.time.delayedCall(2500 + text.length * 30, resolve);
        });
    }
}
