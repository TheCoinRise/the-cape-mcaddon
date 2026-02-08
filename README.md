# The Cape - Minecraft Bedrock Addon

**The Cape** is a Minecraft Bedrock Edition Addon that adds a powerful new item: **The Cape**. When held, this item grants the player **Creative Flight** capabilities, **Jetpack mechanics**, and **Super Speed**, allowing for rapid traversal of the world in Survival mode.

![Banner](https://via.placeholder.com/800x200?text=The+Cape+Addon)

## 🚀 Features

*   **Custom Item**: Adds a new item `cape:the_cape` to the game.
*   **Creative Flight**: Grants native creative flight abilities when held.
*   **Jetpack Mode**: Seamlessly switches to jetpack mechanics if native flight isn't available or for faster vertical boosts.
    *   **Jump (Hold)**: Engage thrusters to fly up rapidly (Levitation).
    *   **Sneak (Hold)**: Cut engines to drop down.
    *   **Neutral**: Hover in mid-air (Slow Falling).
*   **Super Speed**:
    *   **Hover Speed**: Speed VIII (8) for fast gliding.
    *   **Boost Speed**: Speed XV (15) for supersonic travel while boosting.
*   **Visual Feedback**: Action bar messages and sound effects indicate flight status.

## 📦 Installation

1.  Download the latest `.mcaddon` file from the [Releases](#) section.
2.  Double-click the file to import it into Minecraft Bedrock Edition.
3.  Create a new world or edit an existing one.
4.  Go to **Behavior Packs** and activate **The Cape**.
5.  Go to **Resource Packs** and activate **The Cape** (if not auto-activated).
6.  **Requirements**: Ensure **Script API** (Beta APIs) is enabled in world settings if prompted (Addon uses `@minecraft/server` 1.9.0).

## 🎮 Usage

### Getting the Item
You can obtain the cape from the Creative Inventory (search for "Cape") or using the command:
```mcfunction
/give @s cape:the_cape
```

### Controls
Simply hold the item in your **Main Hand** or **Off-Hand**.

| Action | Input | Effect |
| :--- | :--- | :--- |
| **Activate** | Hold Item | Flight Mode Enabled |
| **Fly Up** | Hold `Jump` | Rapid Ascent + Speed Boost |
| **Descend** | Hold `Sneak` | Freefall / Descent |
| **Hover** | No Input | Slow Falling / Hover |

## 🛠️ Technical Details

This addon utilizes the **Minecraft Scripting API** (`@minecraft/server`) and **Entity Component System**.

*   **Scripting**: A `main.js` script runs every tick to detect if the player is holding the cape. It manages effects (Levitation, Speed, Slow Falling) based on player input (`isJumping`, `isSneaking`).
*   **Entity Modification**: The `player.json` entity file is modified to inject a custom component group `cape:flight_enabled` which grants the `minecraft:abilities` component (may_fly) and `fly_speed`.

### Project Structure
*   `BP/`: Behavior Pack (Entities, Items, Scripts)
*   `RP/`: Resource Pack (Textures, Texts)

## 📝 License

This project is open source. Feel free to modify and use it in your own worlds or modpacks.
