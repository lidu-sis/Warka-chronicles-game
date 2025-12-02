import Phaser from "phaser";
import PreloadScene from "./scenes/PreloadScene.js";
import MenuScene from "./scenes/MenuScene.js";
import AddisScene from "./scenes/AddisScene.js";
import LalibelaScene from "./scenes/LalibelaScene.js";
import OmoScene from "./scenes/OmoScene.js";
import UIScene from "./scenes/UIScene.js";

const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    parent: "game-container",
    scale: {
        mode: Phaser.Scale.RESIZE, // Make game responsive
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    physics: {
        default: "arcade",
        arcade: {
            debug: false,
        },
    },
    scene: [PreloadScene, MenuScene, AddisScene, LalibelaScene, OmoScene, UIScene],
};

const game = new Phaser.Game(config);

// Resize listener
window.addEventListener("resize", () => {
    game.scale.resize(window.innerWidth, window.innerHeight);
});
