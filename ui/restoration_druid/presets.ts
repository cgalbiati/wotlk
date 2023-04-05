import {
	Consumes,
	CustomRotation,
	CustomSpell,
	Debuffs,
	EquipmentSpec,
	Flask,
	Food,
	Glyphs,
	IndividualBuffs,
	PartyBuffs,
	Potions,
	RaidBuffs,
	RaidTarget,
	TristateEffect
} from '../core/proto/common.js';
import {SavedTalents} from '../core/proto/ui.js';

import {
	RestorationDruid_Options as RestorationDruidOptions,
    RestorationDruid_Rotation as RestorationDruidRotation,
    RestorationDruid_Rotation_RotationType as RotationType,
    RestorationDruid_Rotation_SpellOption as SpellOption,
	DruidMajorGlyph,
	DruidMinorGlyph,
} from '../core/proto/druid.js';

import * as Tooltips from '../core/constants/tooltips.js';
import {NO_TARGET} from "../core/proto_utils/utils";

// Preset options for this spec.
// Eventually we will import these values for the raid sim too, so its good to
// keep them in a separate file.

// Default talents. Uses the wowhead calculator format, make the talents on
// https://wowhead.com/wotlk/talent-calc and copy the numbers in the url.
// TODO: make these for tree instead of chicken
export const Phase1Talents = {
	name: 'Phase 1',
	data: SavedTalents.create({
		talentsString: '05320031103--230023312131502331050313051',
		glyphs: Glyphs.create({
			major1: DruidMajorGlyph.GlyphOfWildGrowth,
			major2: DruidMajorGlyph.GlyphOfSwiftmend,
			major3: DruidMajorGlyph.GlyphOfNourish,
			minor1: DruidMinorGlyph.GlyphOfTyphoon,
			minor2: DruidMinorGlyph.GlyphOfUnburdenedRebirth,
			minor3: DruidMinorGlyph.GlyphOfTheWild,
		}),
	}),
};

export const Phase2Talents = {
	name: 'Phase 2',
	data: SavedTalents.create({
		talentsString: '05320031103--230023312131502331050313051',
		glyphs: Glyphs.create({
			major1: DruidMajorGlyph.GlyphOfWildGrowth,
			major2: DruidMajorGlyph.GlyphOfSwiftmend,
			major3: DruidMajorGlyph.GlyphOfNourish,
			minor1: DruidMinorGlyph.GlyphOfTyphoon,
			minor2: DruidMinorGlyph.GlyphOfUnburdenedRebirth,
			minor3: DruidMinorGlyph.GlyphOfTheWild,
		}),
	}),
};

export const DefaultRotation = RestorationDruidRotation.create({
	type: RotationType.Cycle,
    customRotation: CustomRotation.create({
        spells: [
        // TODO: add the other spells
            CustomSpell.create({ spell: SpellOption.HealingTouch, castsPerMinute: 18 }),
        ],
    }),
});

export const DefaultOptions = RestorationDruidOptions.create({
	innervateTarget: RaidTarget.create({
		targetIndex: NO_TARGET, // In an individual sim the 0-indexed player is ourself.
	}),
});

export const DefaultConsumes = Consumes.create({
    defaultPotion: Potions.SuperManaPotion,
    flask: Flask.FlaskOfTheFrostWyrm,
    food: Food.FoodFishFeast,
    prepopPotion: Potions.PotionOfWildMagic,
});

export const DefaultRaidBuffs = RaidBuffs.create({
	arcaneBrilliance: true,
	bloodlust: true,
	divineSpirit: true,
	giftOfTheWild: TristateEffect.TristateEffectImproved,
	icyTalons: true,
	moonkinAura: TristateEffect.TristateEffectImproved,
	leaderOfThePack: TristateEffect.TristateEffectImproved,
	powerWordFortitude: TristateEffect.TristateEffectImproved,
	sanctifiedRetribution: true,
	strengthOfEarthTotem: TristateEffect.TristateEffectImproved,
	trueshotAura: true,
	wrathOfAirTotem: true,
	demonicPact: 500,
});

export const DefaultIndividualBuffs = IndividualBuffs.create({
	blessingOfKings: true,
	blessingOfMight: TristateEffect.TristateEffectImproved,
	blessingOfWisdom: TristateEffect.TristateEffectImproved,
	vampiricTouch: true,
});

export const DefaultPartyBuffs = PartyBuffs.create({
	heroicPresence: false,
});

export const DefaultDebuffs = Debuffs.create({
	bloodFrenzy: true,
	ebonPlaguebringer: true,
	faerieFire: TristateEffect.TristateEffectImproved,
	heartOfTheCrusader: true,
	judgementOfWisdom: true,
	shadowMastery: true,
	sunderArmor: true,
	totemOfWrath: true,
});

export const OtherDefaults = {
	distanceFromTarget: 18,
};

// TODO add correct gear for tree instead of chicken
export const P2_PRESET = {
	name: 'P2 Preset',
	tooltip: Tooltips.BASIC_BIS_DISCLAIMER,
	gear: EquipmentSpec.fromJsonString(` {
      "items": [
        {
          "id": 45497,
          "enchant": 3820,
          "gems": [
            41285,
            42144
          ]
        },
        {
          "id": 45133,
          "gems": [
            40048
          ]
        },
        {
          "id": 46196,
          "enchant": 3810,
          "gems": [
            39998
          ]
        },
        {
          "id": 45242,
          "enchant": 3859,
          "gems": [
            40048
          ]
        },
        {
          "id": 45519,
          "enchant": 3832,
          "gems": [
            40051,
            42144,
            40026
          ]
        },
        {
          "id": 45446,
          "enchant": 2332,
          "gems": [
            42144,
            0
          ]
        },
        {
          "id": 45665,
          "enchant": 3604,
          "gems": [
            39998,
            39998,
            0
          ]
        },
        {
          "id": 45619,
          "gems": [
            39998,
            39998,
            39998
          ]
        },
        {
          "id": 46192,
          "enchant": 3719,
          "gems": [
            39998,
            39998
          ]
        },
        {
          "id": 45537,
          "enchant": 3606,
          "gems": [
            39998,
            40026
          ]
        },
        {
          "id": 46046,
          "gems": [
            39998
          ]
        },
        {
          "id": 45495,
          "gems": [
            39998
          ]
        },
        {
          "id": 45466
        },
        {
          "id": 45518
        },
        {
          "id": 45620,
          "enchant": 3834,
          "gems": [
            39998
          ]
        },
        {
          "id": 45617
        },
        {
          "id": 40321
        }
      ]
    }`),
};

export const P1_PRESET = {
	name: 'P1 Preset',
	tooltip: Tooltips.BASIC_BIS_DISCLAIMER,
	gear: EquipmentSpec.fromJsonString(`{"items": [
		{
			"id": 44007,
			"enchant": 3819,
			"gems": [
				41401,
				40017
			]
		},
		{
			"id": 40071
		},
		{
			"id": 39719,
			"enchant": 3809,
			"gems": [
				39998
			]
		},
		{
			"id": 40723,
			"enchant": 3859
		},
		{
			"id": 44002,
			"enchant": 3832,
			"gems": [
				39998,
				40026
			]
		},
		{
			"id": 44008,
			"enchant": 2332,
			"gems": [
				39998,
				0
			]
		},
		{
			"id": 40460,
			"enchant": 3246,
			"gems": [
				40017,
				0
			]
		},
		{
			"id": 40561,
			"enchant": 3601,
			"gems": [
				39998
			]
		},
		{
			"id": 40379,
			"enchant": 3719,
			"gems": [
				39998,
				40017
			]
		},
		{
			"id": 40558,
			"enchant": 3606
		},
		{
			"id": 40719
		},
		{
			"id": 40375
		},
		{
			"id": 37111
		},
		{
			"id": 40432
		},
		{
			"id": 40395,
			"enchant": 3834
		},
		{
			"id": 39766
		},
		{
			"id": 40342
		}
	]}`),
};

export const PRE_RAID_PRESET = {
	name: 'Pre-raid Preset',
	tooltip: Tooltips.BASIC_BIS_DISCLAIMER,
	gear: EquipmentSpec.fromJsonString(`{ "items": [
		{
			"id": 42554,
			"enchant": 3820,
			"gems": [
				41285,
				40049
			]
		},
		{
			"id": 40680
		},
		{
			"id": 37673,
			"enchant": 3810,
			"gems": [
				42144
			]
		},
		{
			"id": 41610,
			"enchant": 3859
		},
		{
			"id": 39547,
			"enchant": 3832,
			"gems": [
				42144,
				40026
			]
		},
		{
			"id": 37884,
			"enchant": 2332,
			"gems": [
				0
			]
		},
		{
			"id": 39544,
			"enchant": 3604,
			"gems": [
				42144,
				0
			]
		},
		{
			"id": 40696,
			"enchant": 3601,
			"gems": [
				40014,
				39998
			]
		},
		{
			"id": 37854,
			"enchant": 3719
		},
		{
			"id": 44202,
			"enchant": 3606,
			"gems": [
				39998
			]
		},
		{
			"id": 40585
		},
		{
			"id": 43253,
			"gems": [
				40026
			]
		},
		{
			"id": 37873
		},
		{
			"id": 40682
		},
		{
			"id": 45085,
			"enchant": 3834
		},
		{
			"id": 40698
		},
		{
			"id": 40712
		}
	]}`),
};

