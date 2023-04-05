package druid

import (
	"time"

	"github.com/wowsims/wotlk/sim/core"
)

func (druid *Druid) registerHealingTouchSpell() {
	spellCoeff := 1.61 + 0.08*float64(druid.Talents.EmpoweredTouch)

	druid.HealingTouch = druid.RegisterSpell(core.SpellConfig{
		ActionID:    core.ActionID{SpellID: 48378},
		SpellSchool: core.SpellSchoolNature,
		ProcMask:    core.ProcMaskSpellHealing,
		Flags:       core.SpellFlagHelpful,

		ManaCost: core.ManaCostOptions{
			BaseCost: 0.33,
			Multiplier: 1 - 0.03*float64(druid.Talents.Moonglow) - 0.02*float64(druid.Talents.TranquilSpirit),
		},
		Cast: core.CastConfig{
			DefaultCast: core.Cast{
				GCD:      core.GCDDefault,
				CastTime: time.Second*3 - time.Millisecond*100*time.Duration(druid.Talents.Naturalist),
			},
		},

		BonusCritRating: 0 +
            2*float64(druid.Talents.NaturesMajesty)*core.CritRatingPerCritChance +
            1*float64(druid.Talents.NaturalPerfection)*core.CritRatingPerCritChance,
		DamageMultiplier: 1 *
			(1 + .02*float64(druid.Talents.GiftOfNature)),
		CritMultiplier:   druid.DefaultHealingCritMultiplier(),
		ThreatMultiplier: 1,

		ApplyEffects: func(sim *core.Simulation, target *core.Unit, spell *core.Spell) {
			baseHealing := sim.Roll(3761, 4440) + spellCoeff*spell.HealingPower(target)
			spell.CalcAndDealHealing(sim, target, baseHealing, spell.OutcomeHealingCrit)
		},
	})
}
