import Phaser from "phaser";

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super("PreloadScene");
    }

    preload() {
        // Backgrounds
        this.load.image("addis_bg", "assets/images/addis_bg.png");
        this.load.image("lalibela_bg", "assets/images/lalibela_bg.png");
        this.load.image("omo_bg", "assets/images/omo_bg.png");

        // Player & NPC
        this.load.spritesheet("nuru", "assets/images/nuru.png", { frameWidth: 48, frameHeight: 48 });
        this.load.image("elder", "assets/images/elder.png");

        // UI
        this.load.image("badge", "assets/images/badge.png");
        this.load.image("clue_box", "assets/images/clue_box.png");
        this.load.image("church_piece", "assets/images/church_piece.png");
    }

    create() {
        this.scene.start("MenuScene");
    }
}
