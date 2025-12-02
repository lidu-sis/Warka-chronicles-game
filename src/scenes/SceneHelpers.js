export function createCharacter(scene, x, key) {
    const img = scene.add.image(x, scene.scale.height - 20, key);
    img.setOrigin(0.5, 1);

    const maxHeight = scene.scale.height * 0.35;
    const scale = maxHeight / img.height;
    img.setScale(scale);

    return img;
}
// SceneHelpers.js
// Put this file in src/scenes/ and import as: import { createCharacter } from './SceneHelpers.js';

export function createCharacter(scene, x, key, maxScreenHeightRatio = 0.35) {
    // Create sprite at bottom area and auto-scale to fit screen nicely.
    const img = scene.add.image(x, scene.scale.height - 20, key);
    img.setOrigin(0.5, 1);

    // If texture not immediately ready, we guard for zero height.
    const resize = () => {
        const imgHeight = img.height || (scene.textures.exists(key) ? scene.textures.get(key).getSourceImage().height : 100);
        const maxHeight = scene.scale.height * maxScreenHeightRatio;
        const scale = imgHeight > 0 ? (maxHeight / imgHeight) : 0.5;
        img.setScale(Math.min(scale, 1.1)); // avoid huge scaling up
    };

    // Try immediate resize and also after next frame (texture may load later)
    resize();
    scene.time.delayedCall(10, resize);

    return img;
}
