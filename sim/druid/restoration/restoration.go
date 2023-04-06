package restoration

import (
	"github.com/wowsims/wotlk/sim/common"
	"github.com/wowsims/wotlk/sim/core"
	"github.com/wowsims/wotlk/sim/core/proto"
	"github.com/wowsims/wotlk/sim/druid"
)

func RegisterRestorationDruid() {
	core.RegisterAgentFactory(
		proto.Player_RestorationDruid{},
		proto.Spec_SpecRestorationDruid,
		func(character core.Character, options *proto.Player) core.Agent {
			return NewRestorationDruid(character, options)
		},
		func(player *proto.Player, spec interface{}) {
			playerSpec, ok := spec.(*proto.Player_RestorationDruid)
			if !ok {
				panic("Invalid spec value for Restoration Druid!")
			}
			player.Spec = playerSpec
		},
	)
}

func NewRestorationDruid(character core.Character, options *proto.Player) *RestorationDruid {
	restoOptions := options.GetRestorationDruid()
	selfBuffs := druid.SelfBuffs{}

	resto := &RestorationDruid{
		Druid:    druid.New(character, druid.Tree, selfBuffs, options.TalentsString),
		Rotation: restoOptions.Rotation,
		Options:  restoOptions.Options,
	}

	resto.SelfBuffs.InnervateTarget = &proto.RaidTarget{TargetIndex: -1}
	if restoOptions.Options.InnervateTarget != nil {
		resto.SelfBuffs.InnervateTarget = restoOptions.Options.InnervateTarget
	}

	resto.EnableResumeAfterManaWait(resto.tryUseGCD)
	return resto
}

type RestorationDruid struct {
	*druid.Druid

	Rotation       *proto.RestorationDruid_Rotation
	CustomRotation *common.CustomRotation
	Options        *proto.RestorationDruid_Options

	// Spells to rotate through for cyclic rotation.
	spellCycle     []*core.Spell
	nextCycleIndex int
}

func (resto *RestorationDruid) GetDruid() *druid.Druid {
	return resto.Druid
}

func (resto *RestorationDruid) GetMainTarget() *core.Unit {
	target := resto.Env.Raid.GetFirstTargetDummy()
	if target == nil {
		return &resto.Unit
	} else {
		return &target.Unit
	}
}

func (resto *RestorationDruid) Initialize() {
	resto.CurrentTarget = resto.GetMainTarget()
	resto.Druid.Initialize()
	resto.Druid.RegisterRestorationSpells()

	if resto.Rotation.Type == proto.RestorationDruid_Rotation_Custom {
		resto.CustomRotation = resto.makeCustomRotation()
	}

	if resto.CustomRotation == nil {
		resto.Rotation.Type = proto.RestorationDruid_Rotation_Cycle
		resto.spellCycle = []*core.Spell{
			resto.HealingTouch,
		}
	}
}

func (resto *RestorationDruid) Reset(sim *core.Simulation) {
	resto.Druid.Reset(sim)
}
