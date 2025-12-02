import Phaser from 'phaser';
import { PLAYER_SPEED } from '../config.js';

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'nuru');
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);
        this.speed = PLAYER_SPEED;
    }

    move(cursors) {
        this.body.setVelocity(0);

        if (cursors.left.isDown) this.body.setVelocityX(-this.speed);
        if (cursors.right.isDown) this.body.setVelocityX(this.speed);
        if (cursors.up.isDown) this.body.setVelocityY(-this.speed);
        if (cursors.down.isDown) this.body.setVelocityY(this.speed);

        this.body.velocity.normalize().scale(this.speed);
    }
}
