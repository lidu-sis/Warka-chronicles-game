import Phaser from 'phaser';

export default class ElderNPC extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'elder');
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setImmovable(true);
    }

    talk(dialogue) {
        console.log("Elder says:", dialogue);
        // You can later add a UI text box to display dialogue
    }
}
