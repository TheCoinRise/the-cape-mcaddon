import { world, system, EntityComponentTypes, EquipmentSlot } from "@minecraft/server";

// Debug init
world.sendMessage("§a[The Cape] Addon Script Loaded v9 (3x Super Speed)");

system.runInterval(() => {
    for (const player of world.getAllPlayers()) {
        try {
            checkPlayer(player);
        } catch(e) {
            // Silence
        }
    }
}, 1); // Run every tick for responsive jump detection

function checkPlayer(player) {
    let hasCape = false;

    // Check equipment
    const equippable = player.getComponent(EntityComponentTypes.Equippable);
    if (equippable) {
        const mainHand = equippable.getEquipment(EquipmentSlot.Mainhand);
        const offHand = equippable.getEquipment(EquipmentSlot.Offhand);

        if ((mainHand && mainHand.typeId === "cape:the_cape") || 
            (offHand && offHand.typeId === "cape:the_cape")) {
            hasCape = true;
        }
    }

    if (hasCape) {
        // Player has the cape
        player.triggerEvent("cape:enable_flight");
        
        // --- JETPACK LOGIC ---
        // 1. Jump Button (Launch/Boost)
        // 2. Sneak (Drop)
        // 3. Neutral (Hover)
        
        let isBoosting = false;
        
        // Detect Jump Intent
        if (player.isJumping) {
            isBoosting = true;
        }
        
        // Speed Logic
        // If boosting or sneaking, we assume they are likely in the air or wanting to move fast.
        // Also check if they are "in air" by seeing if they have slow falling or levitation active
        // But simply: If they are boosting, give massive speed.
        // If hovering, give good speed.
        // If on ground (we can't easily tell), Speed 4 is okay.
        
        // We will default to High Speed (Amplifier 10) to satisfy "go faster in air"
        // But to prevent uncontrollability on ground, we might want to check vertical velocity?
        // Let's just give Speed 10 always. It's a superpower cape after all.
        // Wait, Speed 10 is very fast. Speed 4 is already fast.
        // Let's try Speed 8.
        player.addEffect("speed", 20, { amplifier: 24, showParticles: false });

        if (isBoosting) {
            // BOOST UP (Levitation)
            player.addEffect("levitation", 2, { amplifier: 30, showParticles: false });
            player.removeEffect("slow_falling");

            // While boosting, give EXTRA speed?
             player.addEffect("speed", 20, { amplifier: 45, showParticles: false });
             
        } else if (player.isSneaking) {
            // DROP DOWN
            player.removeEffect("levitation");
            player.removeEffect("slow_falling");
        } else {
            // HOVER
            player.addEffect("slow_falling", 20, { amplifier: 0, showParticles: false });
            player.removeEffect("levitation");
        }

        // Initial Feedback
        if (!player.hasTag("has_cape_flight")) {
            player.addTag("has_cape_flight");
            player.onScreenDisplay.setActionBar("§aFlight Active! Hold JUMP to boost.");
            player.playSound("armor.equip_elytra");
        }

    } else {
        // Cleanup
        if (player.hasTag("has_cape_flight")) {
            player.triggerEvent("cape:disable_flight");
            player.removeEffect("speed");
            player.removeEffect("levitation");
            player.removeEffect("slow_falling");
            player.onScreenDisplay.setActionBar("§eFlight Disabled.");
            player.removeTag("has_cape_flight");
        }
    }
}
