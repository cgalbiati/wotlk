package restoration

import (
	"github.com/wowsims/wotlk/sim/common"
	"github.com/wowsims/wotlk/sim/core"
	"github.com/wowsims/wotlk/sim/core/proto"
)

func (resto *RestorationDruid) OnGCDReady(sim *core.Simulation) {
	resto.tryUseGCD(sim)
}

func (resto *RestorationDruid) tryUseGCD(sim *core.Simulation) {
	if resto.CustomRotation != nil {
		resto.CustomRotation.Cast(sim)
	} else {
		spell := resto.chooseSpell(sim)

		if success := spell.Cast(sim, resto.CurrentTarget); !success {
			resto.WaitForMana(sim, spell.CurCast.Cost)
		}
	}
}

func (resto *RestorationDruid) chooseSpell(sim *core.Simulation) *core.Spell {

	// TODO: add regrowth, rejuv, sm, wg to cast on end/cd (see priest)
	for !resto.spellCycle[resto.nextCycleIndex].IsReady(sim) {
		resto.nextCycleIndex = (resto.nextCycleIndex + 1) % len(resto.spellCycle)
	}
	spell := resto.spellCycle[resto.nextCycleIndex]
	resto.nextCycleIndex = (resto.nextCycleIndex + 1) % len(resto.spellCycle)
	return spell
	
}

func (resto *RestorationDruid) makeCustomRotation() *common.CustomRotation {
	// TODO: add other spells
	return common.NewCustomRotation(resto.Rotation.CustomRotation, resto.GetCharacter(), map[int32]common.CustomSpell{
		int32(proto.RestorationDruid_Rotation_HealingTouch): {
			Spell: resto.HealingTouch,
		},
	})
}
