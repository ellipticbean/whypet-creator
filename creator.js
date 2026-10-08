console.log("WhyPet Creator recreation loaded.");


// ====================================================
// MAIN ELEMENTS
// ====================================================

const petBody =
    document.getElementById("pet-body");

const bodyCtx =
    petBody.getContext("2d");

const colorPicker =
    document.getElementById("color-picker");

const searchLabel =
    document.getElementById(
        "search-label"
    );

const creatorBackground =
    document.getElementById("creator-background");

const categoryMenu =
    document.getElementById("category-menu");

const partResults =
    document.getElementById("part-results");

const searchPartsInput =
    document.getElementById(
        "search-parts-input"
    );
const petPartsLayer =
    document.getElementById("pet-parts-layer");
const attachmentPointsLayer =
    document.getElementById(
        "attachment-points-layer"
    );


const petOutlineLayer =
    document.getElementById(
        "pet-outline-layer"
    );

const petOutlineCtx =
    petOutlineLayer.getContext(
        "2d",
        {
            willReadFrequently: true
        }
    );
const partScrollLeft =
    document.getElementById(
        "part-scroll-left"
    );

const partScrollRight =
    document.getElementById(
        "part-scroll-right"
    );

const partScrollTrack =
    document.getElementById(
        "part-scroll-track"
    );

const partScrollThumb =
    document.getElementById(
        "part-scroll-thumb"
    );

const petArea =
    document.getElementById(
        "pet-area"
    );


const mouseTip =
    document.getElementById(
        "mouse-tip"
    );

// ====================================================
// BODY IMAGE STATE
// ====================================================

const bodySource = new Image();

let currentBody = null;
let currentBodyColor = null;

/*
    The original Java tool box remembered which
    palette CELL was clicked separately from the
    color stored on the current body.
*/
let selectedColorCell = null;


// Hidden canvas containing the untouched original body.

const originalCanvas =
    document.createElement("canvas");

originalCanvas.width = 180;
originalCanvas.height = 180;

const originalCtx =
    originalCanvas.getContext(
        "2d",
        {
            willReadFrequently: true
        }
    );


// ====================================================
// ORIGINAL WHYVILLE BODY CATALOG
// ====================================================

const bodyCatalog = [

    {
        id: 25112,
        name: "Ball Body",
        file: "ball-body.png",

        width: 60,
        height: 60,

        anchorX: 30,
        anchorY: 58
    },

    {
        id: 25002,
        name: "Boxy Body",
        file: "boxy-body.png",

        width: 60,
        height: 60,

        anchorX: 30,
        anchorY: 58
    },

    {
        id: 25001,
        name: "Gumdrop Body",
        file: "gumdrop-body.png",

        width: 60,
        height: 60,

        anchorX: 30,
        anchorY: 58
    }

];


// ====================================================
// ORIGINAL WHYVILLE EYE CATALOG
// ====================================================

const eyeCatalog = [

    {
        id: 25005,
        name: "Big Eyes",
        file: "big-eyes.png",

        width: 60,
        height: 60,

        anchorX: 29,
        anchorY: 30,

        attachTo: ["B", "S"]
    },

    {
        id: 25100,
        name: "Cat Eyes",
        file: "cat-eyes.png",

        width: 60,
        height: 60,

        anchorX: 29,
        anchorY: 30,

        attachTo: ["B", "S"]
    },

    {
        id: 25006,
        name: "Girly Eyes",
        file: "girly-eyes.png",

        width: 60,
        height: 60,

        anchorX: 29,
        anchorY: 30,

        attachTo: ["B", "S"]
    }

];

// ====================================================
// ORIGINAL WHYVILLE MOUTH CATALOG
// ====================================================

const mouthCatalog = [

    {
        id: 25004,
        name: "Big Teeth Mouth",
        file: "big-teeth-mouth.png",

        width: 60,
        height: 60,

        anchorX: 29,
        anchorY: 38,

        attachTo: ["C", "R"]
    },

    {
        id: 25061,
        name: "Parrot Beak",
        file: "parrot-beak.png",

        width: 60,
        height: 60,

        anchorX: 29,
        anchorY: 38,

        attachTo: ["C", "R"]
    },

    {
        id: 25003,
        name: "Small Mouth",
        file: "small-mouth.png",

        width: 60,
        height: 60,

        anchorX: 29,
        anchorY: 38,

        attachTo: ["C", "R"]
    },

    {
        id: 25101,
        name: "Whiskers",
        file: "whiskers.png",

        width: 60,
        height: 60,

        anchorX: 29,
        anchorY: 38,

        attachTo: ["C", "R"]
    }

];
// ====================================================
// ORIGINAL WHYVILLE EAR CATALOG
// ====================================================

const earCatalog = [

    {
        id: 20311,
        name: "Left Cat Ear",
        file: "left-cat-ear.png",

        width: 18,
        height: 14,

        anchorX: 6,
        anchorY: 7,

        attachTo: ["I"],

        zLimited: true
    },

    {
        id: 20313,
        name: "Left Dog Ear",
        file: "left-dog-ear.png",

        width: 19,
        height: 22,

        anchorX: 5,
        anchorY: 6,

        attachTo: ["I"],

        zLimited: true
    },

    {
        id: 25020,
        name: "Left Droopy Ear",
        file: "left-droopy-ear.png",

        width: 22,
        height: 15,

        anchorX: 3,
        anchorY: 3,

        attachTo: ["I", "J", "K"],

        zLimited: true
    },

    {
        id: 25019,
        name: "Left Floppy Ear",
        file: "left-floppy-ear.png",

        width: 23,
        height: 17,

        anchorX: 10,
        anchorY: 10,

        attachTo: ["I", "J"],

        zLimited: true
    },

    {
        id: 20317,
        name: "Left Monkey Ear",
        file: "left-monkey-ear.png",

        width: 15,
        height: 16,

        anchorX: 1,
        anchorY: 1,

        attachTo: ["I"],

        zLimited: true
    },

    {
        id: 20321,
        name: "Left Mouse Ear",
        file: "left-mouse-ear.png",

        width: 23,
        height: 23,

        anchorX: 4,
        anchorY: 12,

        attachTo: ["I"],

        zLimited: true
    },

    {
        id: 25018,
        name: "Left Pointy Ear",
        file: "left-pointy-ear.png",

        width: 15,
        height: 22,

        anchorX: 7,
        anchorY: 14,

        attachTo: ["I", "J"],

        zLimited: true
    },

    {
        id: 20310,
        name: "Right Cat Ear",
        file: "right-cat-ear.png",

        width: 18,
        height: 14,

        anchorX: 12,
        anchorY: 7,

        attachTo: ["G"],

        zLimited: true
    },

    {
        id: 20312,
        name: "Right Dog Ear",
        file: "right-dog-ear.png",

        width: 19,
        height: 22,

        anchorX: 12,
        anchorY: 7,

        attachTo: ["G"],

        zLimited: true
    },

    {
        id: 25010,
        name: "Right Droopy Ear",
        file: "right-droopy-ear.png",

        width: 22,
        height: 15,

        anchorX: 19,
        anchorY: 3,

        attachTo: ["G", "F", "E"],

        zLimited: true
    },

    {
        id: 25009,
        name: "Right Floppy Ear",
        file: "right-floppy-ear.png",

        width: 23,
        height: 17,

        anchorX: 13,
        anchorY: 10,

        attachTo: ["G", "F"],

        zLimited: true
    },

    {
        id: 20316,
        name: "Right Monkey Ear",
        file: "right-monkey-ear.png",

        width: 15,
        height: 16,

        anchorX: 14,
        anchorY: 1,

        attachTo: ["G"],

        zLimited: true
    },

    {
        id: 20320,
        name: "Right Mouse Ear",
        file: "right-mouse-ear.png",

        width: 23,
        height: 23,

        anchorX: 20,
        anchorY: 12,

        attachTo: ["G"],

        zLimited: true
    },

    {
        id: 25008,
        name: "Right Pointy Ear",
        file: "right-pointy-ear.png",

        width: 15,
        height: 22,

        anchorX: 8,
        anchorY: 14,

        attachTo: ["G", "F"],

        zLimited: true
    }

];
// ====================================================
// ORIGINAL WHYVILLE ARM CATALOG
// ====================================================

const armCatalog = [

    {
        id: 25098,
        name: "Left Blue Robot Arm",
        file: "left-blue-robot-arm.png",
        width: 17,
        height: 19,
        anchorX: 3,
        anchorY: 13,
        attachTo: ["K", "J"],
        zLimited: true
    },

    {
        id: 25093,
        name: "Left Fuzzy Hug Arm",
        file: "left-fuzzy-hug-arm.png",
        width: 21,
        height: 15,
        anchorX: 3,
        anchorY: 7,
        attachTo: ["K", "J"],
        zLimited: true
    },

    {
        id: 25094,
        name: "Left Fuzzy Purple Arm",
        file: "left-fuzzy-purple-arm.png",
        width: 15,
        height: 23,
        anchorX: 4,
        anchorY: 4,
        attachTo: ["K", "J"],
        zLimited: true
    },

    {
        id: 25095,
        name: "Left Fuzzy Wave Arm",
        file: "left-fuzzy-wave-arm.png",
        width: 19,
        height: 23,
        anchorX: 3,
        anchorY: 18,
        attachTo: ["K", "J"],
        zLimited: true
    },

    {
        id: 25097,
        name: "Left Green Pipe Arm",
        file: "left-green-pipe-arm.png",
        width: 18,
        height: 16,
        anchorX: 2,
        anchorY: 10,
        attachTo: ["K", "J"],
        zLimited: true
    },

    {
        id: 25099,
        name: "Left Green Robot Arm",
        file: "left-green-robot-arm.png",
        width: 12,
        height: 24,
        anchorX: 3,
        anchorY: 3,
        attachTo: ["K", "J"],
        zLimited: true
    },

    {
        id: 25096,
        name: "Left Red Pipe Arm",
        file: "left-red-pipe-arm.png",
        width: 18,
        height: 13,
        anchorX: 3,
        anchorY: 3,
        attachTo: ["K", "J"],
        zLimited: true
    },

    {
        id: 25017,
        name: "Left Robot Arm",
        file: "left-robot-arm.png",
        width: 22,
        height: 11,
        anchorX: 5,
        anchorY: 5,
        attachTo: ["I", "J", "K"],
        zLimited: true
    },

    {
        id: 25091,
        name: "Right Blue Robot Arm",
        file: "right-blue-robot-arm.png",
        width: 17,
        height: 19,
        anchorX: 14,
        anchorY: 13,
        attachTo: ["E", "F"],
        zLimited: true
    },

    {
        id: 25086,
        name: "Right Fuzzy Hug Arm",
        file: "right-fuzzy-hug-arm.png",
        width: 21,
        height: 15,
        anchorX: 17,
        anchorY: 7,
        attachTo: ["E", "F"],
        zLimited: true
    },

    {
        id: 25087,
        name: "Right Fuzzy Purple Arm",
        file: "right-fuzzy-purple-arm.png",
        width: 15,
        height: 23,
        anchorX: 10,
        anchorY: 4,
        attachTo: ["E", "F"],
        zLimited: true
    },

    {
        id: 25088,
        name: "Right Fuzzy Wave Arm",
        file: "right-fuzzy-wave-arm.png",
        width: 19,
        height: 23,
        anchorX: 15,
        anchorY: 18,
        attachTo: ["E", "F"],
        zLimited: true
    },

    {
        id: 25090,
        name: "Right Green Pipe Arm",
        file: "right-green-pipe-arm.png",
        width: 18,
        height: 16,
        anchorX: 15,
        anchorY: 10,
        attachTo: ["E", "F"],
        zLimited: true
    },

    {
        id: 25092,
        name: "Right Green Robot Arm",
        file: "right-green-robot-arm.png",
        width: 12,
        height: 24,
        anchorX: 8,
        anchorY: 3,
        attachTo: ["E", "F"],
        zLimited: true
    },

    {
        id: 25089,
        name: "Right Red Pipe Arm",
        file: "right-red-pipe-arm.png",
        width: 18,
        height: 13,
        anchorX: 14,
        anchorY: 3,
        attachTo: ["E", "F"],
        zLimited: true
    },

    {
        id: 25007,
        name: "Right Robot Arm",
        file: "right-robot-arm.png",
        width: 22,
        height: 11,
        anchorX: 17,
        anchorY: 5,
        attachTo: ["G", "F", "E"],
        zLimited: true
    }

];
// ====================================================
// ORIGINAL WHYVILLE HORN CATALOG
// ====================================================

const hornCatalog = [

    {
        id: 25013,
        name: "Bison Horns",
        file: "bison-horns.png",

        width: 40,
        height: 17,

        anchorX: 18,
        anchorY: 13,

        attachTo: ["H"],

        zLimited: true
    },

    {
        id: 25021,
        name: "Left Bull Horn",
        file: "left-bull-horn.png",

        width: 18,
        height: 24,

        anchorX: 5,
        anchorY: 17,

        attachTo: ["I", "J"],

        zLimited: true
    },

    {
        id: 20315,
        name: "Left Green Antenna",
        file: "left-green-antenna.png",

        width: 12,
        height: 19,

        anchorX: 3,
        anchorY: 14,

        attachTo: ["I"],

        zLimited: true
    },

    {
        id: 25022,
        name: "Left Ram Horn",
        file: "left-ram-horn.png",

        width: 37,
        height: 29,

        anchorX: 14,
        anchorY: 22,

        attachTo: ["I", "J"],

        zLimited: true
    },

    {
        id: 20323,
        name: "Left Robot Antenna",
        file: "left-robot-antenna.png",

        width: 14,
        height: 23,

        anchorX: 5,
        anchorY: 21,

        attachTo: ["I"],

        zLimited: true
    },

    {
        id: 25014,
        name: "Rhino Horn",
        file: "rhino-horn.png",

        width: 12,
        height: 21,

        anchorX: 6,
        anchorY: 18,

        attachTo: ["H", "C"],

        zLimited: true
    },

    {
        id: 25011,
        name: "Right Bull Horn",
        file: "right-bull-horn.png",

        width: 18,
        height: 24,

        anchorX: 13,
        anchorY: 17,

        attachTo: ["G", "F"],

        zLimited: true
    },

    {
        id: 20314,
        name: "Right Green Antenna",
        file: "right-green-antenna.png",

        width: 12,
        height: 19,

        anchorX: 8,
        anchorY: 14,

        attachTo: ["G"],

        zLimited: true
    },

    {
        id: 25012,
        name: "Right Ram Horn",
        file: "right-ram-horn.png",

        width: 37,
        height: 29,

        anchorX: 23,
        anchorY: 22,

        attachTo: ["G", "F"],

        zLimited: true
    },

    {
        id: 20322,
        name: "Right Robot Antenna",
        file: "right-robot-antenna.png",

        width: 14,
        height: 23,

        anchorX: 9,
        anchorY: 21,

        attachTo: ["G"],

        zLimited: true
    }

];
// ====================================================
// ORIGINAL WHYVILLE WING CATALOG
// ====================================================

const wingCatalog = [

    {
        id: 25077,
        name: "Left Bat Wing",
        file: "left-bat-wing.png",

        width: 24,
        height: 19,

        anchorX: 2,
        anchorY: 13,

        attachTo: ["J", "K", "L"],

        zLimited: true
    },

    {
        id: 25079,
        name: "Left Butterfly Wing 1",
        file: "left-butterfly-wing-1.png",

        width: 18,
        height: 23,

        anchorX: 3,
        anchorY: 13,

        attachTo: ["J", "K", "L"],

        zLimited: true
    },

    {
        id: 25080,
        name: "Left Butterfly Wing 2",
        file: "left-butterfly-wing-2.png",

        width: 20,
        height: 22,

        anchorX: 2,
        anchorY: 12,

        attachTo: ["J", "K", "L"],

        zLimited: true
    },

    {
        id: 25081,
        name: "Left Dove Wing",
        file: "left-dove-wing.png",

        width: 29,
        height: 35,

        anchorX: 2,
        anchorY: 20,

        attachTo: ["J", "K", "L"],

        zLimited: true
    },

    {
        id: 25082,
        name: "Left Dragon Wing",
        file: "left-dragon-wing.png",

        width: 30,
        height: 28,

        anchorX: 3,
        anchorY: 21,

        attachTo: ["J", "K", "L"],

        zLimited: true
    },

    {
        id: 25016,
        name: "Left Orange Wing",
        file: "left-orange-wing.png",

        width: 9,
        height: 15,

        anchorX: 2,
        anchorY: 2,

        attachTo: ["J", "K"],

        zLimited: true
    },

    {
        id: 25068,
        name: "Right Bat Wing",
        file: "right-bat-wing.png",

        width: 24,
        height: 19,

        anchorX: 21,
        anchorY: 13,

        attachTo: ["F", "E", "D"],

        zLimited: true
    },

    {
        id: 25070,
        name: "Right Butterfly Wing 1",
        file: "right-butterfly-wing-1.png",

        width: 18,
        height: 23,

        anchorX: 14,
        anchorY: 13,

        attachTo: ["F", "E", "D"],

        zLimited: true
    },

    {
        id: 25071,
        name: "Right Butterfly Wing 2",
        file: "right-butterfly-wing-2.png",

        width: 20,
        height: 22,

        anchorX: 17,
        anchorY: 12,

        attachTo: ["F", "E", "D"],

        zLimited: true
    },

    {
        id: 25072,
        name: "Right Dove Wing",
        file: "right-dove-wing.png",

        width: 29,
        height: 35,

        anchorX: 26,
        anchorY: 20,

        attachTo: ["F", "E", "D"],

        zLimited: true
    },

    {
        id: 25073,
        name: "Right Dragon Wing",
        file: "right-dragon-wing.png",

        width: 30,
        height: 28,

        anchorX: 27,
        anchorY: 21,

        attachTo: ["F", "E", "D"],

        zLimited: true
    },

    {
        id: 25024,
        name: "Right Orange Wing",
        file: "right-orange-wing.png",

        width: 9,
        height: 15,

        anchorX: 7,
        anchorY: 2,

        attachTo: ["F", "E"],

        zLimited: true
    }

];
// ====================================================
// ORIGINAL WHYVILLE MISC CATALOG
// ====================================================

const miscCatalog = [

    {
        id: 25078,
        name: "Left Blue Tentacle",
        file: "left-blue-tentacle.png",

        width: 18,
        height: 13,

        anchorX: 1,
        anchorY: 7,

        attachTo: ["J", "K", "L"],

        zLimited: true
    },

    {
        id: 25023,
        name: "Left Green Tentacle",
        file: "left-green-tentacle.png",

        width: 15,
        height: 18,

        anchorX: 3,
        anchorY: 3,

        attachTo: ["J", "K"],

        zLimited: true
    },

    {
        id: 20319,
        name: "Left Monkey Tail",
        file: "left-monkey-tail.png",

        width: 18,
        height: 34,

        anchorX: 1,
        anchorY: 35,

        attachTo: ["L", "K"],

        zLimited: true
    },

    {
        id: 25083,
        name: "Left Muscle Tentacle",
        file: "left-muscle-tentacle.png",

        width: 18,
        height: 14,

        anchorX: 2,
        anchorY: 8,

        attachTo: ["J", "K", "L"],

        zLimited: true
    },

    {
        id: 25084,
        name: "Left Purple Tentacle",
        file: "left-purple-tentacle.png",

        width: 17,
        height: 12,

        anchorX: 3,
        anchorY: 5,

        attachTo: ["J", "K", "L"],

        zLimited: true
    },

    {
        id: 25085,
        name: "Left Spotted Tentacle",
        file: "left-spotted-tentacle.png",

        width: 17,
        height: 20,

        anchorX: 4,
        anchorY: 12,

        attachTo: ["J", "K", "L"],

        zLimited: true
    },

    {
        id: 20325,
        name: "Left Stray Dog Tail",
        file: "left-stray-dog-tail.png",

        width: 18,
        height: 19,

        anchorX: 0,
        anchorY: 18,

        attachTo: ["L", "K"],

        zLimited: true
    },

    {
        id: 25069,
        name: "Right Blue Tentacle",
        file: "right-blue-tentacle.png",

        width: 18,
        height: 13,

        anchorX: 16,
        anchorY: 7,

        attachTo: ["F", "E", "D"],

        zLimited: true
    },

    {
        id: 25015,
        name: "Right Green Tentacle",
        file: "right-green-tentacle.png",

        width: 15,
        height: 18,

        anchorX: 12,
        anchorY: 3,

        attachTo: ["F", "E"],

        zLimited: true
    },

    {
        id: 20318,
        name: "Right Monkey Tail",
        file: "right-monkey-tail.png",

        width: 18,
        height: 34,

        anchorX: 17,
        anchorY: 35,

        attachTo: ["D", "E"],

        zLimited: true
    },

    {
        id: 25074,
        name: "Right Muscle Tentacle",
        file: "right-muscle-tentacle.png",

        width: 18,
        height: 14,

        anchorX: 15,
        anchorY: 8,

        attachTo: ["F", "E", "D"],

        zLimited: true
    },

    {
        id: 25075,
        name: "Right Purple Tentacle",
        file: "right-purple-tentacle.png",

        width: 17,
        height: 12,

        anchorX: 14,
        anchorY: 5,

        attachTo: ["F", "E", "D"],

        zLimited: true
    },

    {
        id: 25076,
        name: "Right Spotted Tentacle",
        file: "right-spotted-tentacle.png",

        width: 17,
        height: 20,

        anchorX: 13,
        anchorY: 12,

        attachTo: ["F", "E", "D"],

        zLimited: true
    },

    {
        id: 20324,
        name: "Right Stray Dog Tail",
        file: "right-stray-dog-tail.png",

        width: 18,
        height: 19,

        anchorX: 18,
        anchorY: 18,

        attachTo: ["D", "E"],

        zLimited: true
    }

];
// ====================================================
// SEARCHABLE MASTER PART CATALOG
// ====================================================

const searchableParts = [

    ...bodyCatalog.map(
        part => ({
            kind: "body",
            part: part
        })
    ),

    ...eyeCatalog.map(
        part => ({
            kind: "eyes",
            part: part
        })
    ),

    ...mouthCatalog.map(
        part => ({
            kind: "mouth",
            part: part
        })
    ),

    ...earCatalog.map(
        part => ({
            kind: "ears",
            part: part
        })
    ),

    ...armCatalog.map(
        part => ({
            kind: "arms",
            part: part
        })
    ),

    ...hornCatalog.map(
        part => ({
            kind: "horns",
            part: part
        })
    ),

    ...wingCatalog.map(
        part => ({
            kind: "wings",
            part: part
        })
    ),

    ...miscCatalog.map(
        part => ({
            kind: "misc",
            part: part
        })
    )

];

// Fast lookup used when rebuilding a pet from a Whyville desc string.

const searchablePartById =
    new Map(
        searchableParts.map(
            entry => [
                entry.part.id,
                entry
            ]
        )
    );

// ====================================================
// ORIGINAL BODY ATTACHMENT POINTS
// ====================================================

const bodyAttachmentData = {

    25112:
        "A,30,58;B,29,30;C,29,37;D,19,51;E,13,45;F,11,36;G,16,24;H,29,19;I,42,24;J,47,35;K,44,45;L,39,52;M,22,49;N,19,42;O,40,42;P,36,49;Q,29,47;R,29,41;S,29,26",

    25002:
        "A,30,58;B,29,30;C,29,38;D,11,54;E,10,46;F,9,37;G,15,22;H,29,20;I,43,21;J,49,37;K,49,46;L,47,54;M,19,52;N,19,45;O,40,45;P,40,52;Q,29,48;R,29,42;S,29,27",

    25001:
        "A,30,58;B,29,30;C,29,38;D,12,55;E,11,47;F,10,37;G,16,25;H,29,20;I,42,25;J,47,36;K,47,46;L,46,54;M,19,52;N,19,43;O,40,43;P,40,52;Q,29,48;R,29,42;S,29,27"

};


// ====================================================
// PARSE ATTACHMENT POINTS
// ====================================================

function parseAttachmentPoints(text) {

    const points = {};

    const entries =
        text.split(";");


    for (const entry of entries) {

        const pieces =
            entry.split(",");


        if (pieces.length !== 3) {
            continue;
        }


        const letter =
            pieces[0].trim();

        const x =
            Number(pieces[1]);

        const y =
            Number(pieces[2]);


        points[letter] = {
            x: x,
            y: y
        };
    }


    return points;
}

// ====================================================
// LEGAL ATTACHMENT POINT MARKERS
// ====================================================

function clearAttachmentPointMarkers() {

    attachmentPointsLayer.replaceChildren();
}


function showSelectedPartAttachmentPoints() {

    clearAttachmentPointMarkers();


    /*
        The body itself does not attach to another
        body point, so markers only appear when an
        accessory is selected.
    */

    if (
        !selectedPart ||
        !currentBody
    ) {

        return;
    }


    const attachmentText =
        bodyAttachmentData[
        currentBody.id
        ];


    if (!attachmentText) {

        return;
    }


    const bodyPoints =
        parseAttachmentPoints(
            attachmentText
        );


    const bodyPosition =
        getCurrentBodyGlobalPosition();


    for (
        const letter
        of selectedPart.part.attachTo
    ) {

        const point =
            bodyPoints[letter];


        if (!point) {

            continue;
        }


        /*
            Exact body attachment location
            inside the full creator.
        */

        const globalX =
            bodyPosition.left +
            (point.x * 3);


        const globalY =
            bodyPosition.top +
            (point.y * 3);


        const marker =
            document.createElement(
                "div"
            );


        marker.className =
            "attachment-point-marker";


        marker.dataset.attachmentPoint =
            letter;


        /*
            Center the 4 × 4 marker on the
            actual attachment coordinate.

            pet-area starts at global Y = 46.
        */

        marker.style.left =
            `${globalX - 2}px`;


        marker.style.top =
            `${globalY - 46 - 2}px`;


        attachmentPointsLayer.appendChild(
            marker
        );
    }
}
// ====================================================
// EQUIPPED PET PARTS
// ====================================================

const equippedParts = [];


/*
    Original body begins at depth 0.

    Newly equipped pieces go above it.
*/

let bodyLayerZ = 0;
let nextPartZ = 1;


/*
    Selection state.

    The original creator lets you click a pet
    component, then MOVE FORWARD/BACKWARD acts
    on that selected component.
*/

let selectedPart = null;
let bodySelected = false;

// ====================================================
// PET PART SELECTION / JAVA-STYLE OUTLINE
// ====================================================

/*
    PetPart.get_image_outline() in the Java applet
    created a transparent image that was 2 pixels
    larger on every side.

    A transparent output pixel became opaque yellow
    when an opaque source pixel existed 1 or 2 pixels
    away in any CARDINAL direction.

    This recreates that algorithm instead of using a
    CSS drop-shadow approximation.
*/

let hoveredPetItem = null;


function clearPetOutline() {

    petOutlineCtx.clearRect(
        0,
        0,
        petOutlineLayer.width,
        petOutlineLayer.height
    );
}


function clearSelectionVisual() {

    /*
        Older recreation versions used a CSS class.
        Remove it in case an existing DOM element
        still has the class after a hot reload.
    */

    petBody.classList.remove(
        "selected-pet-part"
    );


    for (
        const instance
        of equippedParts
    ) {

        instance.element.classList.remove(
            "selected-pet-part"
        );
    }


    clearPetOutline();
}


function getPetItemElement(item) {

    if (!item) {

        return null;
    }


    if (
        item.type === "body"
    ) {

        return petBody;
    }


    return item.instance.element;
}


function getPetItemAlphaData(item) {

    if (!item) {

        return null;
    }


    // ------------------------------
    // BODY
    // ------------------------------

    if (
        item.type === "body"
    ) {

        const imageData =
            bodyCtx.getImageData(
                0,
                0,
                petBody.width,
                petBody.height
            );


        return {
            width:
                petBody.width,

            height:
                petBody.height,

            data:
                imageData.data
        };
    }


    // ------------------------------
    // ACCESSORY
    // ------------------------------

    const element =
        item.instance.element;


    if (
        element.naturalWidth <= 0 ||
        element.naturalHeight <= 0
    ) {

        return null;
    }


    let cached =
        petPartPixelCache.get(
            element
        );


    if (!cached) {

        const canvas =
            document.createElement(
                "canvas"
            );


        canvas.width =
            element.naturalWidth;

        canvas.height =
            element.naturalHeight;


        const context =
            canvas.getContext(
                "2d",
                {
                    willReadFrequently: true
                }
            );


        context.drawImage(
            element,
            0,
            0,
            canvas.width,
            canvas.height
        );


        cached = {
            canvas: canvas,
            context: context
        };


        petPartPixelCache.set(
            element,
            cached
        );
    }


    const imageData =
        cached.context.getImageData(
            0,
            0,
            cached.canvas.width,
            cached.canvas.height
        );


    return {
        width:
            cached.canvas.width,

        height:
            cached.canvas.height,

        data:
            imageData.data
    };
}


function buildJavaStyleOutlineCanvas(item) {

    const source =
        getPetItemAlphaData(
            item
        );


    if (!source) {

        return null;
    }


    const thickness = 2;


    const outlineCanvas =
        document.createElement(
            "canvas"
        );


    outlineCanvas.width =
        source.width +
        thickness * 2;


    outlineCanvas.height =
        source.height +
        thickness * 2;


    const context =
        outlineCanvas.getContext(
            "2d"
        );


    const outlineImage =
        context.createImageData(
            outlineCanvas.width,
            outlineCanvas.height
        );


    function isOpaque(
        x,
        y
    ) {

        if (
            x < 0 ||
            y < 0 ||
            x >= source.width ||
            y >= source.height
        ) {

            return false;
        }


        const index =
            (
                y *
                source.width +
                x
            ) * 4;


        return (
            source.data[
                index + 3
            ] > 0
        );
    }


    for (
        let y = -thickness;
        y < source.height + thickness;
        y++
    ) {

        for (
            let x = -thickness;
            x < source.width + thickness;
            x++
        ) {

            /*
                The Java outline only paints pixels
                that are transparent in the source.
            */

            if (
                isOpaque(
                    x,
                    y
                )
            ) {

                continue;
            }


            const neighborOpaque =
                isOpaque(
                    x - 1,
                    y
                ) ||
                isOpaque(
                    x - 2,
                    y
                ) ||
                isOpaque(
                    x + 1,
                    y
                ) ||
                isOpaque(
                    x + 2,
                    y
                ) ||
                isOpaque(
                    x,
                    y - 1
                ) ||
                isOpaque(
                    x,
                    y - 2
                ) ||
                isOpaque(
                    x,
                    y + 1
                ) ||
                isOpaque(
                    x,
                    y + 2
                );


            if (!neighborOpaque) {

                continue;
            }


            const outputX =
                x +
                thickness;


            const outputY =
                y +
                thickness;


            const outputIndex =
                (
                    outputY *
                    outlineCanvas.width +
                    outputX
                ) * 4;


            /*
                Java integer -256 == 0xFFFFFF00:
                fully opaque yellow.
            */

            outlineImage.data[
                outputIndex
            ] = 255;

            outlineImage.data[
                outputIndex + 1
            ] = 255;

            outlineImage.data[
                outputIndex + 2
            ] = 0;

            outlineImage.data[
                outputIndex + 3
            ] = 255;
        }
    }


    context.putImageData(
        outlineImage,
        0,
        0
    );


    return outlineCanvas;
}


function drawPetItemOutline(item) {

    clearPetOutline();


    if (!item) {

        return;
    }


    const element =
        getPetItemElement(
            item
        );


    const outlineCanvas =
        buildJavaStyleOutlineCanvas(
            item
        );


    if (
        !element ||
        !outlineCanvas
    ) {

        return;
    }


    /*
        Both the body canvas and equipped accessory
        images are positioned inside #pet-area, so
        offsetLeft/offsetTop already use the correct
        330 × 260 coordinate space.
    */

    petOutlineCtx.drawImage(
        outlineCanvas,
        element.offsetLeft - 2,
        element.offsetTop - 2
    );
}


function clearPetSelection() {

    selectedPart = null;
    bodySelected = false;

    clearAttachmentPointMarkers();
    clearSelectionVisual();
}


function selectBody() {

    clearSelectionVisual();
    clearAttachmentPointMarkers();


    bodySelected = true;
    selectedPart = null;


    drawPetItemOutline({
        type: "body",
        z: bodyLayerZ
    });


    console.log(
        "Selected body:",
        currentBody?.name
    );
}


function selectEquippedPart(instance) {

    clearSelectionVisual();


    bodySelected = false;
    selectedPart = instance;


    drawPetItemOutline({
        type: "part",
        instance: instance,
        z: instance.z
    });


    showSelectedPartAttachmentPoints();


    console.log(
        "Selected part:",
        instance.part.name
    );
}


function redrawCurrentPetOutline() {

    if (
        selectedPart
    ) {

        drawPetItemOutline({
            type: "part",
            instance:
                selectedPart,

            z:
                selectedPart.z
        });


        return;
    }


    if (
        bodySelected
    ) {

        drawPetItemOutline({
            type: "body",
            z: bodyLayerZ
        });


        return;
    }


    if (
        hoveredPetItem
    ) {

        drawPetItemOutline(
            hoveredPetItem
        );


        return;
    }


    clearPetOutline();
}


// ====================================================
// GET CURRENT BODY POSITION
// ====================================================

function getCurrentBodyGlobalPosition() {

    if (!currentBody) {
        return null;
    }


    return {

        left:
            160 -
            (currentBody.anchorX * 3),

        top:
            212 -
            (currentBody.anchorY * 3)

    };
}


// ====================================================
// POSITION AN EQUIPPED PART
// ====================================================

function positionEquippedPart(instance) {

    if (!currentBody) {
        return;
    }


    const bodyPosition =
        getCurrentBodyGlobalPosition();


    const attachmentText =
        bodyAttachmentData[
        currentBody.id
        ];


    if (!attachmentText) {
        return;
    }


    const bodyPoints =
        parseAttachmentPoints(
            attachmentText
        );


    const point =
        bodyPoints[
        instance.attachedPoint
        ];


    if (!point) {
        return;
    }


    /*
        Original Java positioning formula:

        BODY LEFT
        + body attachment X × 3
        - part anchor X × 3
    */

    const globalLeft =
        bodyPosition.left +
        (point.x * 3) -
        (instance.part.anchorX * 3);


    const globalTop =
        bodyPosition.top +
        (point.y * 3) -
        (instance.part.anchorY * 3);


    instance.element.style.left =
        `${globalLeft}px`;


    /*
        pet-area begins at global Y = 46.
    */

    instance.element.style.top =
        `${globalTop - 46}px`;
}
// ====================================================
// SNAP PART TO NEAREST LEGAL ATTACHMENT POINT
// ====================================================

function snapPartToNearestAttachment(instance) {

    if (!currentBody) {
        return;
    }


    const attachmentText =
        bodyAttachmentData[currentBody.id];


    if (!attachmentText) {
        return;
    }


    const bodyPoints =
        parseAttachmentPoints(
            attachmentText
        );


    const bodyPosition =
        getCurrentBodyGlobalPosition();


    const currentLeft =
        parseFloat(
            instance.element.style.left
        ) || 0;


    const currentTop =
        parseFloat(
            instance.element.style.top
        ) || 0;


    let nearestPoint = null;
    let nearestDistance = Infinity;


    /*
        Only examine attachment points that
        this specific part is allowed to use.

        Eyes, for example:

            B
            S
    */

    for (
        const letter
        of instance.part.attachTo
    ) {

        const point =
            bodyPoints[letter];


        if (!point) {
            continue;
        }


        /*
            Calculate where the part WOULD sit
            if attached to this point.
        */

        const candidateLeft =
            bodyPosition.left +
            (point.x * 3) -
            (instance.part.anchorX * 3);


        const candidateTop =
            bodyPosition.top +
            (point.y * 3) -
            (instance.part.anchorY * 3) -
            46;


        /*
            Compare dragged location with
            this candidate location.
        */

        const dx =
            currentLeft -
            candidateLeft;


        const dy =
            currentTop -
            candidateTop;


        const distance =
            Math.sqrt(
                (dx * dx) +
                (dy * dy)
            );


        if (
            distance <
            nearestDistance
        ) {

            nearestDistance =
                distance;

            nearestPoint =
                letter;
        }
    }


    /*
        Snap to the closest legal point.
    */

    if (nearestPoint) {

        instance.attachedPoint =
            nearestPoint;


        positionEquippedPart(
            instance
        );



        console.log(
            "Snapped",
            instance.part.name,
            "to",
            nearestPoint
        );
    }
}
// ====================================================
// RECYCLE BIN
// ====================================================

function isPointerOverRecycleBin(event) {

    /*
        Original WhyPet recycle-bin rectangle:

            x = 1
            y = 260
            width = 48
            height = 48

        These are coordinates inside the
        full 640 × 380 creator.
    */

    const creator =
        document.getElementById("creator");


    const creatorRect =
        creator.getBoundingClientRect();


    const localX =
        event.clientX -
        creatorRect.left;


    const localY =
        event.clientY -
        creatorRect.top;


    return (
        localX >= 1 &&
        localX < 49 &&
        localY >= 260 &&
        localY < 308
    );
}


// ====================================================
// REMOVE AN EQUIPPED PART
// ====================================================

function removeEquippedPart(instance) {

    const index =
        equippedParts.indexOf(
            instance
        );


    if (index !== -1) {

        equippedParts.splice(
            index,
            1
        );
    }


    instance.element.remove();
    if (
        selectedPart === instance
    ) {

        selectedPart = null;
        bodySelected = false;

        clearAttachmentPointMarkers();
        clearPetOutline();
    }

    normalizeLayerOrder();

    console.log(
        "Removed:",
        instance.part.name
    );
}
// ====================================================
// CLEAR PET
// ====================================================

function clearPet() {

    for (
        const instance
        of equippedParts
    ) {

        instance.element.remove();
    }


    equippedParts.length = 0;


    selectedPart = null;
    bodySelected = false;
    hoveredPetItem = null;


    bodyLayerZ = 0;
    nextPartZ = 1;


    /*
        Clear the chosen recolor too.
    */

    currentBodyColor = null;


    /*
        Original creator automatically ensures
        that a body still exists after CLEAR.
        Our default is the first catalog body.
    */

    loadBody(
        bodyCatalog[0]
    );


    clearSelectionVisual();
    clearAttachmentPointMarkers();

    console.log(
        "Pet cleared."
    );
}

// ====================================================
// PER-PART DRAG SETUP
// ====================================================

function enablePartDragging(instance) {

    /*
        Dragging is now handled centrally by
        #pet-area.

        We keep this function because equipPart()
        already calls it, but individual image
        elements no longer need their own
        rectangular pointer handlers.
    */

}
// ====================================================
// PIXEL-AWARE PET HIT TESTING
// ====================================================

/*
    Each accessory image gets copied to a hidden
    canvas the first time we need to inspect it.

    The canvas is cached because the accessory
    artwork itself never changes.
*/

const petPartPixelCache =
    new WeakMap();


// ----------------------------------------------------
// ACCESSORY PIXEL ALPHA
// ----------------------------------------------------

function getAccessoryAlphaAtPoint(
    element,
    clientX,
    clientY
) {

    const rect =
        element.getBoundingClientRect();


    /*
        First make sure the pointer is inside the
        rectangular bounds at all.
    */

    if (
        clientX < rect.left ||
        clientX >= rect.right ||
        clientY < rect.top ||
        clientY >= rect.bottom
    ) {

        return 0;
    }


    if (
        element.naturalWidth === 0 ||
        element.naturalHeight === 0
    ) {

        return 0;
    }


    let cached =
        petPartPixelCache.get(
            element
        );


    if (!cached) {

        const canvas =
            document.createElement(
                "canvas"
            );


        canvas.width =
            element.naturalWidth;

        canvas.height =
            element.naturalHeight;


        const context =
            canvas.getContext(
                "2d",
                {
                    willReadFrequently: true
                }
            );


        context.drawImage(
            element,
            0,
            0,
            canvas.width,
            canvas.height
        );


        cached = {
            canvas: canvas,
            context: context
        };


        petPartPixelCache.set(
            element,
            cached
        );
    }


    /*
        Convert browser-screen coordinates into
        coordinates inside the actual PNG.
    */

    let pixelX =
        Math.floor(
            (
                clientX -
                rect.left
            ) /
            rect.width *
            cached.canvas.width
        );


    let pixelY =
        Math.floor(
            (
                clientY -
                rect.top
            ) /
            rect.height *
            cached.canvas.height
        );


    pixelX =
        Math.max(
            0,
            Math.min(
                cached.canvas.width - 1,
                pixelX
            )
        );


    pixelY =
        Math.max(
            0,
            Math.min(
                cached.canvas.height - 1,
                pixelY
            )
        );


    return cached.context
        .getImageData(
            pixelX,
            pixelY,
            1,
            1
        )
        .data[3];
}


// ----------------------------------------------------
// BODY PIXEL ALPHA
// ----------------------------------------------------

function getBodyAlphaAtPoint(
    clientX,
    clientY
) {

    const rect =
        petBody.getBoundingClientRect();


    if (
        clientX < rect.left ||
        clientX >= rect.right ||
        clientY < rect.top ||
        clientY >= rect.bottom
    ) {

        return 0;
    }


    const pixelX =
        Math.floor(
            (
                clientX -
                rect.left
            ) /
            rect.width *
            petBody.width
        );


    const pixelY =
        Math.floor(
            (
                clientY -
                rect.top
            ) /
            rect.height *
            petBody.height
        );


    if (
        pixelX < 0 ||
        pixelX >= petBody.width ||
        pixelY < 0 ||
        pixelY >= petBody.height
    ) {

        return 0;
    }


    return bodyCtx
        .getImageData(
            pixelX,
            pixelY,
            1,
            1
        )
        .data[3];
}


// ----------------------------------------------------
// FIND TOPMOST VISIBLE PET PIECE
// ----------------------------------------------------

function findPetItemAtPoint(
    clientX,
    clientY
) {

    /*
        getLayerItems() returns back -> front.

        Reverse it because we want to test the
        topmost layer first.
    */

    const items =
        getLayerItems()
            .slice()
            .reverse();


    for (const item of items) {

        // ------------------------------
        // BODY
        // ------------------------------

        if (
            item.type === "body"
        ) {

            const alpha =
                getBodyAlphaAtPoint(
                    clientX,
                    clientY
                );


            if (alpha > 0) {

                return item;
            }


            continue;
        }


        // ------------------------------
        // ACCESSORY
        // ------------------------------

        const alpha =
            getAccessoryAlphaAtPoint(
                item.instance.element,
                clientX,
                clientY
            );


        if (alpha > 0) {

            return item;
        }
    }


    /*
        Nothing visible was actually underneath
        the pointer.
    */

    return null;
}


// ====================================================
// CENTRAL PIXEL-AWARE DRAGGING
// ====================================================

let activePixelDrag = null;

let activePixelPointerId = null;

let pixelDragOffsetX = 0;
let pixelDragOffsetY = 0;


// ----------------------------------------------------
// POINTER DOWN
// ----------------------------------------------------

petArea.addEventListener(
    "pointerdown",
    function (event) {

        const hit =
            findPetItemAtPoint(
                event.clientX,
                event.clientY
            );


        /*
            PetBox.mouseDown() cleared the selected part
            when the user clicked empty pet space.
        */

        if (!hit) {

            hoveredPetItem = null;

            clearPetSelection();

            return;
        }


        // ------------------------------
        // BODY SELECTED
        // ------------------------------

        if (
            hit.type === "body"
        ) {

            selectBody();


            /*
                Prevent the old rectangular HTML
                target from doing anything else.
            */

            event.preventDefault();
            event.stopPropagation();

            return;
        }


        // ------------------------------
        // ACCESSORY SELECTED
        // ------------------------------

        const instance =
            hit.instance;


        selectEquippedPart(
            instance
        );


        activePixelDrag =
            instance;


        activePixelPointerId =
            event.pointerId;


        const elementRect =
            instance.element
                .getBoundingClientRect();


        pixelDragOffsetX =
            event.clientX -
            elementRect.left;


        pixelDragOffsetY =
            event.clientY -
            elementRect.top;


        /*
            Capture on pet-area instead of the image.

            That means dragging continues even when
            the cursor leaves the visible PNG.
        */

        petArea.setPointerCapture(
            event.pointerId
        );


        event.preventDefault();
        event.stopPropagation();

    },
    true
);


// ----------------------------------------------------
// POINTER MOVE
// ----------------------------------------------------

petArea.addEventListener(
    "pointermove",
    function (event) {

        /*
            Original PetBox behavior:

            - when nothing is selected, hovering a
              visible pet piece shows the same yellow
              outline used for selection;
            - while something is selected, hover
              outlining is suppressed.
        */

        if (!activePixelDrag) {

            if (
                !selectedPart &&
                !bodySelected
            ) {

                const hoverHit =
                    findPetItemAtPoint(
                        event.clientX,
                        event.clientY
                    );


                if (
                    hoverHit !==
                    hoveredPetItem
                ) {

                    hoveredPetItem =
                        hoverHit;


                    redrawCurrentPetOutline();
                }

            } else {

                hoveredPetItem =
                    null;
            }
        }


        if (
            !activePixelDrag ||
            event.pointerId !==
            activePixelPointerId
        ) {

            return;
        }


        const layerRect =
            petPartsLayer
                .getBoundingClientRect();


        const newLeft =
            event.clientX -
            layerRect.left -
            pixelDragOffsetX;


        const newTop =
            event.clientY -
            layerRect.top -
            pixelDragOffsetY;


        activePixelDrag
            .element
            .style
            .left =
            `${newLeft}px`;


        activePixelDrag
            .element
            .style
            .top =
            `${newTop}px`;


        redrawCurrentPetOutline();


        event.preventDefault();
    }
);


// ----------------------------------------------------
// POINTER UP
// ----------------------------------------------------

petArea.addEventListener(
    "pointerup",
    function (event) {

        if (
            !activePixelDrag ||
            event.pointerId !==
            activePixelPointerId
        ) {

            return;
        }


        const instance =
            activePixelDrag;


        const droppedInRecycleBin =
            isPointerOverRecycleBin(
                event
            );


        if (
            petArea.hasPointerCapture(
                event.pointerId
            )
        ) {

            petArea.releasePointerCapture(
                event.pointerId
            );
        }


        activePixelDrag = null;
        activePixelPointerId = null;


        if (droppedInRecycleBin) {

            removeEquippedPart(
                instance
            );

            return;
        }


        /*
            Otherwise return to the closest legal
            attachment marker.
        */

        snapPartToNearestAttachment(
            instance
        );


        /*
            It may have snapped to another legal
            location, so redraw its markers.
        */

        if (
            selectedPart === instance
        ) {

            redrawCurrentPetOutline();

            showSelectedPartAttachmentPoints();
        }


        event.preventDefault();
    }
);


// ----------------------------------------------------
// POINTER CANCEL
// ----------------------------------------------------

petArea.addEventListener(
    "pointercancel",
    function (event) {

        if (
            !activePixelDrag ||
            event.pointerId !==
            activePixelPointerId
        ) {

            return;
        }


        const instance =
            activePixelDrag;


        activePixelDrag = null;
        activePixelPointerId = null;


        snapPartToNearestAttachment(
            instance
        );


        if (
            selectedPart === instance
        ) {

            redrawCurrentPetOutline();

            showSelectedPartAttachmentPoints();
        }
    }
);
// ----------------------------------------------------
// PET AREA HOVER EXIT
// ----------------------------------------------------

petArea.addEventListener(
    "pointerleave",
    function () {

        hoveredPetItem =
            null;


        if (
            !selectedPart &&
            !bodySelected
        ) {

            clearPetOutline();
        }
    }
);


// ====================================================
// REPOSITION ALL EQUIPPED PARTS
// ====================================================

function repositionEquippedParts() {

    for (
        const instance
        of equippedParts
    ) {

        positionEquippedPart(
            instance
        );
    }


    redrawCurrentPetOutline();
}

// ====================================================
// LAYER / Z-ORDER SYSTEM
// ====================================================

function getLayerItems() {

    const items = [

        {
            type: "body",
            z: bodyLayerZ
        }

    ];


    for (
        const instance
        of equippedParts
    ) {

        items.push({

            type: "part",

            instance: instance,

            z: instance.z

        });
    }


    items.sort(
        (a, b) =>
            a.z - b.z
    );


    return items;
}


function setLayerItemZ(
    item,
    z
) {

    if (
        item.type === "body"
    ) {

        bodyLayerZ = z;

    } else {

        item.instance.z = z;
    }
}


function applyLayerStyles() {

    /*
        Add 100 so we don't need to use
        negative CSS z-index values.
    */

    petBody.style.zIndex =
        100 + bodyLayerZ;


    for (
        const instance
        of equippedParts
    ) {

        instance.element.style.zIndex =
            100 + instance.z;
    }
}


function normalizeLayerOrder() {

    const items =
        getLayerItems();


    for (
        let i = 0;
        i < items.length;
        i++
    ) {

        setLayerItemZ(
            items[i],
            i
        );
    }


    nextPartZ =
        items.length;


    applyLayerStyles();
}
function moveSelectedForward() {

    normalizeLayerOrder();


    const items =
        getLayerItems();


    let selectedIndex = -1;


    for (
        let i = 0;
        i < items.length;
        i++
    ) {

        const item =
            items[i];


        if (
            bodySelected &&
            item.type === "body"
        ) {

            selectedIndex = i;
            break;
        }


        if (
            !bodySelected &&
            selectedPart &&
            item.type === "part" &&
            item.instance === selectedPart
        ) {

            selectedIndex = i;
            break;
        }
    }


    if (
        selectedIndex === -1 ||
        selectedIndex ===
        items.length - 1
    ) {

        return;
    }


    const selectedItem =
        items[selectedIndex];

    const nextItem =
        items[selectedIndex + 1];


    /*
        Original WhyPet rule:

        the body cannot be moved in front of
        z-limited pieces such as ears, arms,
        horns, wings and miscellaneous pieces.
    */

    if (
        selectedItem.type === "body" &&
        nextItem.type === "part" &&
        nextItem.instance.part.zLimited === true
    ) {

        return;
    }


    const oldZ =
        selectedItem.z;


    setLayerItemZ(
        selectedItem,
        nextItem.z
    );


    setLayerItemZ(
        nextItem,
        oldZ
    );


    applyLayerStyles();


    console.log(
        "Moved forward:",
        bodySelected
            ? currentBody.name
            : selectedPart.part.name
    );
}
function moveSelectedBackward() {

    normalizeLayerOrder();


    const items =
        getLayerItems();


    let selectedIndex = -1;


    for (
        let i = 0;
        i < items.length;
        i++
    ) {

        const item =
            items[i];


        if (
            bodySelected &&
            item.type === "body"
        ) {

            selectedIndex = i;
            break;
        }


        if (
            !bodySelected &&
            selectedPart &&
            item.type === "part" &&
            item.instance === selectedPart
        ) {

            selectedIndex = i;
            break;
        }
    }


    if (
        selectedIndex <= 0
    ) {

        return;
    }


    const selectedItem =
        items[selectedIndex];

    const previousItem =
        items[selectedIndex - 1];


    /*
        Original restriction:

        z-limited pieces cannot be pushed
        behind the body.
    */

    if (
        selectedItem.type === "part" &&
        selectedItem.instance.part.zLimited === true &&
        previousItem.type === "body"
    ) {

        return;
    }


    const oldZ =
        selectedItem.z;


    setLayerItemZ(
        selectedItem,
        previousItem.z
    );


    setLayerItemZ(
        previousItem,
        oldZ
    );


    applyLayerStyles();


    console.log(
        "Moved backward:",
        bodySelected
            ? currentBody.name
            : selectedPart.part.name
    );
}
// ====================================================
// EQUIP A PET PART
// ====================================================

function equipPart(part) {

    /*
        Original applet allows 20 total pieces.

        The body counts as one,
        so we allow 19 additional parts.
    */

    if (equippedParts.length >= 19) {

        console.log(
            "You can only use 20 parts per pet."
        );

        return;
    }


    const image =
        document.createElement("img");


    image.className =
        "equipped-part";


    image.src =
        part.file;


    image.alt =
        part.name;


    image.draggable =
        false;


    image.style.width =
        `${part.width * 3}px`;


    image.style.height =
        `${part.height * 3}px`;


    const instance = {

        part: part,

        element: image,

        /*
            New pieces begin on their
            first legal attachment point.

            Eyes:
            B, then S

            so newly equipped eyes begin on B.
        */

        attachedPoint:
            part.attachTo[0],

        z:
            nextPartZ++

    };


    image.style.zIndex =
        instance.z;


    petPartsLayer.appendChild(
        image
    );


    equippedParts.push(
        instance
    );


    applyLayerStyles();


    /*
        Position FIRST.

        The previous fidelity build selected the new
        piece before positioning it. If its PNG was
        already cached, the yellow outline was drawn
        around the element while it was still sitting
        at its default 0,0 location.
    */

    positionEquippedPart(
        instance
    );


    selectEquippedPart(
        instance
    );


    /*
        If the PNG was not yet decoded when it was
        equipped, redraw the selected outline as soon
        as the image becomes available.
    */

    image.addEventListener(
        "load",
        function () {

            petPartPixelCache.delete(
                image
            );


            if (
                selectedPart ===
                instance
            ) {

                redrawCurrentPetOutline();

                showSelectedPartAttachmentPoints();
            }
        }
    );


    /*
        Give this equipped part its mouse/pointer
        dragging behavior.
    */

    enablePartDragging(
        instance
    );


    console.log(
        "Equipped:",
        part.name,
        "attachment:",
        instance.attachedPoint,
        "z:",
        instance.z
    );
}


// ====================================================
// LOAD A BODY
// ====================================================

function loadBody(
    body,
    preserveCurrentColor = false
) {

    currentBody = body;


    /*
        The original applet created a fresh body
        inventory item whenever the body type changed.

        That new body did NOT automatically inherit
        the previous body's recolor.
    */

    if (!preserveCurrentColor) {

        currentBodyColor = null;
    }


    bodySource.onload = function () {

        const scaledWidth =
            body.width * 3;

        const scaledHeight =
            body.height * 3;


        // Resize untouched source canvas.

        originalCanvas.width =
            scaledWidth;

        originalCanvas.height =
            scaledHeight;


        // Resize visible body canvas.

        petBody.width =
            scaledWidth;

        petBody.height =
            scaledHeight;


        originalCtx.clearRect(
            0,
            0,
            scaledWidth,
            scaledHeight
        );


        originalCtx.drawImage(
            bodySource,
            0,
            0,
            scaledWidth,
            scaledHeight
        );


        /*
            Original Java applet body point:

                BODY_POINT = 160, 212

            WhyPet images are displayed
            at scale 3.
        */

        const globalLeft =
            160 -
            (body.anchorX * 3);

        const globalTop =
            212 -
            (body.anchorY * 3);


        /*
            #pet-area begins at global Y = 46.
        */

        petBody.style.left =
            `${globalLeft}px`;

        petBody.style.top =
            `${globalTop - 46}px`;


        /*
            If this body came from an imported desc,
            its saved color was restored before the
            image loaded. Normal body replacement
            starts from the original artwork.
        */

        if (currentBodyColor) {

            recolorBody(
                currentBodyColor.r,
                currentBodyColor.g,
                currentBodyColor.b
            );

        } else {

            drawOriginalBody();
        }


        /*
            Anything already attached to the old
            body must move to the corresponding
            attachment point on the new body.
        */

        repositionEquippedParts();
        if (selectedPart) {

            showSelectedPartAttachmentPoints();
        }
    };


    bodySource.src =
        body.file;
}


// ====================================================
// DRAW ORIGINAL BODY
// ====================================================

function drawOriginalBody() {

    bodyCtx.clearRect(
        0,
        0,
        petBody.width,
        petBody.height
    );


    bodyCtx.drawImage(
        originalCanvas,
        0,
        0
    );
}


// ====================================================
// COPY creator.gif TO HIDDEN CANVAS
// ====================================================

const backgroundCanvas =
    document.createElement("canvas");

backgroundCanvas.width = 640;
backgroundCanvas.height = 380;


const backgroundCtx =
    backgroundCanvas.getContext(
        "2d",
        {
            willReadFrequently: true
        }
    );


function copyBackground() {

    backgroundCtx.clearRect(
        0,
        0,
        640,
        380
    );


    backgroundCtx.drawImage(
        creatorBackground,
        0,
        0,
        640,
        380
    );
}


creatorBackground.addEventListener(
    "load",
    copyBackground
);


if (creatorBackground.complete) {

    copyBackground();
}


// ====================================================
// COLOR PICKER SELECTION OUTLINE
// ====================================================

function showColorPickerSelection(
    row,
    column
) {

    selectedColorCell = {
        row: row,
        column: column
    };


    /*
        PetToolBox.java draws a white rectangle inside
        the selected 12 × 12 palette cell.

        The Java rectangle is effectively 10 × 10,
        leaving the cell border visible.
    */

    colorPicker.style.setProperty(
        "--selected-color-x",
        `${column * 12}px`
    );


    colorPicker.style.setProperty(
        "--selected-color-y",
        `${row * 12}px`
    );


    colorPicker.classList.add(
        "has-selected-color"
    );
}


// ====================================================
// RECOLOR BODY
// ====================================================

function recolorBody(
    red,
    green,
    blue
) {

    /*
        Remember chosen body color.
    */

    currentBodyColor = {
        r: red,
        g: green,
        b: blue
    };


    /*
        Always recolor from the untouched source.
    */

    const imageData =
        originalCtx.getImageData(
            0,
            0,
            originalCanvas.width,
            originalCanvas.height
        );


    const pixels =
        imageData.data;


    for (
        let i = 0;
        i < pixels.length;
        i += 4
    ) {

        const r =
            pixels[i];

        const g =
            pixels[i + 1];

        const b =
            pixels[i + 2];

        const alpha =
            pixels[i + 3];


        if (alpha === 0) {
            continue;
        }


        /*
            Preserve very dark pixels such as
            shadows and outlines.
        */

        const brightness =
            (r + g + b) / 3;


        if (brightness < 60) {
            continue;
        }


        pixels[i] =
            red;

        pixels[i + 1] =
            green;

        pixels[i + 2] =
            blue;
    }


    bodyCtx.clearRect(
        0,
        0,
        petBody.width,
        petBody.height
    );


    bodyCtx.putImageData(
        imageData,
        0,
        0
    );
}


// ====================================================
// ORIGINAL 12 × 3 WHYVILLE COLOR PICKER
// ====================================================

colorPicker.addEventListener(
    "click",
    function (event) {

        const rect =
            colorPicker.getBoundingClientRect();


        const localX =
            event.clientX -
            rect.left;

        const localY =
            event.clientY -
            rect.top;


        const column =
            Math.floor(
                localX / 12
            );

        const row =
            Math.floor(
                localY / 12
            );


        if (
            column < 0 ||
            column >= 12 ||
            row < 0 ||
            row >= 3
        ) {

            return;
        }


        const sampleX =
            7 +
            (column * 12) +
            6;

        const sampleY =
            337 +
            (row * 12) +
            6;


        const pixel =
            backgroundCtx.getImageData(
                sampleX,
                sampleY,
                1,
                1
            ).data;


        const red =
            pixel[0];

        const green =
            pixel[1];

        const blue =
            pixel[2];


        console.log(
            `Color selected: row=${row}, column=${column}`,
            `RGB(${red}, ${green}, ${blue})`
        );


        showColorPickerSelection(
            row,
            column
        );


        recolorBody(
            red,
            green,
            blue
        );
    }
);


// ====================================================
// WHYVILLE PART CATEGORIES
// ====================================================

const categories = [

    {
        id: 8101,
        name: "Body"
    },

    {
        id: 8102,
        name: "Eyes"
    },

    {
        id: 8103,
        name: "Mouth"
    },

    {
        id: 8104,
        name: "Ears"
    },

    {
        id: 8105,
        name: "Arms"
    },

    {
        id: 8106,
        name: "Horns"
    },

    {
        id: 8107,
        name: "Wings"
    },

    {
        id: 8108,
        name: "Misc"
    }

];



// ====================================================
// ORIGINAL-STYLE PART RESULTS SCROLLER
// ====================================================

/*
    This follows the behavior of the old Java
    Scroller class much more closely.

    Important original values:

        Scroller rectangle: 240 × 20
        Arrow area:         20 × 20 each
        Track:              200 × 16
        Thumb:              fixed 16 × 16
        Thumb color:        #FF9900
        Track color:        #E2E2E2
        Track outline:      #6666FF
        Arrow fill:         #6666CC
        Arrow outline:      #3333FF

    The Java SearchParts component scrolls by
    COLUMN INDEX rather than by arbitrary pixels.

    One result column is:

        64px tile + 10px gap = 74px
*/

const PART_SCROLL_COLUMN_WIDTH = 74;
const PART_SCROLL_THUMB_SIZE = 16;


let partScrollerMin = 0;
let partScrollerMax = 0;
let partScrollerSpan = 1;
let partScrollerPosition = 0;


let partScrollerHoldTimeout = null;
let partScrollerHoldInterval = null;
let partScrollerDirection = 0;


let draggingPartScrollbar = false;
let scrollbarGrabOffset = 0;


// ----------------------------------------------------
// LIMITS
// ----------------------------------------------------

function calculatePartScrollerLimits() {

    /*
        Original SearchParts.java:

            max = show_parts.size() / 2
            scroller.setLimits(0, max - 3)

        Java integer division floors automatically.
    */

    const resultCount =
        partResults.children.length;


    const columnCount =
        Math.floor(
            resultCount / 2
        );


    partScrollerMin = 0;


    partScrollerMax =
        Math.max(
            0,
            columnCount - 3
        );


    partScrollerSpan =
        partScrollerMax -
        partScrollerMin +
        1;
}


// ----------------------------------------------------
// VISUAL POSITION
// ----------------------------------------------------

function updatePartScroller() {

    /*
        Scroller.java uses:

            f = (pos - min) / span

        rather than dividing by (span - 1).

        That old behavior is intentionally preserved.
    */

    const trackWidth =
        partScrollTrack.clientWidth;


    const travel =
        Math.max(
            0,
            trackWidth -
            PART_SCROLL_THUMB_SIZE
        );


    const fraction =
        (
            partScrollerPosition -
            partScrollerMin
        ) /
        partScrollerSpan;


    const thumbLeft =
        Math.floor(
            fraction *
            travel
        );


    partScrollThumb.style.left =
        `${thumbLeft}px`;


    /*
        Move every visible result by the same amount.

        This avoids the modern browser's native
        scroll-range clamping and reproduces the
        original Java column-offset behavior.
    */

    partResults.style.setProperty(
        "--part-scroll-offset",
        `${
            -partScrollerPosition *
            PART_SCROLL_COLUMN_WIDTH
        }px`
    );
}


// ----------------------------------------------------
// SET POSITION
// ----------------------------------------------------

function setPartScrollerPosition(
    position
) {

    position =
        Math.max(
            partScrollerMin,
            Math.min(
                partScrollerMax,
                position
            )
        );


    partScrollerPosition =
        position;


    hidePartMouseTip();


    updatePartScroller();
}


// ----------------------------------------------------
// RESET AFTER A NEW FILTER / CATEGORY
// ----------------------------------------------------

function resetPartScroller() {

    hidePartMouseTip();


    calculatePartScrollerLimits();


    setPartScrollerPosition(
        0
    );
}


// ----------------------------------------------------
// ARROW ACTIVE COLOR
// ----------------------------------------------------

function setPartScrollerDirection(
    direction
) {

    partScrollerDirection =
        direction;


    partScrollLeft.classList.toggle(
        "scroller-active",
        direction < 0
    );


    partScrollRight.classList.toggle(
        "scroller-active",
        direction > 0
    );
}


// ----------------------------------------------------
// STOP HOLD-SCROLLING
// ----------------------------------------------------

function stopPartScrollerHold() {

    if (
        partScrollerHoldTimeout !==
        null
    ) {

        clearTimeout(
            partScrollerHoldTimeout
        );


        partScrollerHoldTimeout =
            null;
    }


    if (
        partScrollerHoldInterval !==
        null
    ) {

        clearInterval(
            partScrollerHoldInterval
        );


        partScrollerHoldInterval =
            null;
    }


    setPartScrollerDirection(
        0
    );
}


// ----------------------------------------------------
// BEGIN HOLD-SCROLLING
// ----------------------------------------------------

function startPartScrollerHold(
    amount
) {

    stopPartScrollerHold();


    setPartScrollerDirection(
        Math.sign(amount)
    );


    /*
        Original Scroller.run():

            move once immediately
            wait 500ms
            then move every 100ms
    */

    setPartScrollerPosition(
        partScrollerPosition +
        amount
    );


    partScrollerHoldTimeout =
        setTimeout(
            function () {

                partScrollerHoldInterval =
                    setInterval(
                        function () {

                            setPartScrollerPosition(
                                partScrollerPosition +
                                amount
                            );

                        },
                        100
                    );
            },
            500
        );
}


// ----------------------------------------------------
// LEFT ARROW
// ----------------------------------------------------

partScrollLeft.addEventListener(
    "pointerdown",
    function (event) {

        partScrollLeft.setPointerCapture(
            event.pointerId
        );


        startPartScrollerHold(
            -1
        );


        event.preventDefault();
    }
);


partScrollLeft.addEventListener(
    "pointerup",
    function (event) {

        stopPartScrollerHold();


        if (
            partScrollLeft.hasPointerCapture(
                event.pointerId
            )
        ) {

            partScrollLeft.releasePointerCapture(
                event.pointerId
            );
        }
    }
);


partScrollLeft.addEventListener(
    "pointercancel",
    stopPartScrollerHold
);


// ----------------------------------------------------
// RIGHT ARROW
// ----------------------------------------------------

partScrollRight.addEventListener(
    "pointerdown",
    function (event) {

        partScrollRight.setPointerCapture(
            event.pointerId
        );


        startPartScrollerHold(
            1
        );


        event.preventDefault();
    }
);


partScrollRight.addEventListener(
    "pointerup",
    function (event) {

        stopPartScrollerHold();


        if (
            partScrollRight.hasPointerCapture(
                event.pointerId
            )
        ) {

            partScrollRight.releasePointerCapture(
                event.pointerId
            );
        }
    }
);


partScrollRight.addEventListener(
    "pointercancel",
    stopPartScrollerHold
);


// ----------------------------------------------------
// DRAG THUMB
// ----------------------------------------------------

partScrollThumb.addEventListener(
    "pointerdown",
    function (event) {

        stopPartScrollerHold();


        draggingPartScrollbar =
            true;


        partScrollThumb.classList.add(
            "scroller-dragging"
        );


        const thumbRect =
            partScrollThumb
                .getBoundingClientRect();


        scrollbarGrabOffset =
            event.clientX -
            thumbRect.left;


        partScrollThumb.setPointerCapture(
            event.pointerId
        );


        event.preventDefault();
    }
);


partScrollThumb.addEventListener(
    "pointermove",
    function (event) {

        if (
            !draggingPartScrollbar
        ) {

            return;
        }


        const trackRect =
            partScrollTrack
                .getBoundingClientRect();


        const travel =
            Math.max(
                1,
                trackRect.width -
                PART_SCROLL_THUMB_SIZE
            );


        /*
            Scroller.java:

                x -= dragOff
                f = x / (barWidth - 16)
                pos = min + int(f * span)
        */

        const localLeft =
            event.clientX -
            trackRect.left -
            scrollbarGrabOffset;


        const fraction =
            localLeft /
            travel;


        const position =
            partScrollerMin +
            Math.floor(
                fraction *
                partScrollerSpan
            );


        setPartScrollerPosition(
            position
        );


        event.preventDefault();
    }
);


function stopPartScrollerDrag(
    event
) {

    draggingPartScrollbar =
        false;


    partScrollThumb.classList.remove(
        "scroller-dragging"
    );


    if (
        event &&
        partScrollThumb.hasPointerCapture(
            event.pointerId
        )
    ) {

        partScrollThumb.releasePointerCapture(
            event.pointerId
        );
    }
}


partScrollThumb.addEventListener(
    "pointerup",
    stopPartScrollerDrag
);


partScrollThumb.addEventListener(
    "pointercancel",
    stopPartScrollerDrag
);


// ----------------------------------------------------
// TRACK CLICK / HOLD
// ----------------------------------------------------

partScrollTrack.addEventListener(
    "pointerdown",
    function (event) {

        if (
            event.target ===
            partScrollThumb
        ) {

            return;
        }


        calculatePartScrollerLimits();


        const trackRect =
            partScrollTrack
                .getBoundingClientRect();


        const thumbRect =
            partScrollThumb
                .getBoundingClientRect();


        const localX =
            event.clientX -
            trackRect.left;


        const thumbX =
            thumbRect.left -
            trackRect.left;


        /*
            Original Scroller.java uses:

                max(2, span / 10)

            because _scrollLen is never overridden
            by the WhyPet Creator.
        */

        const pageAmount =
            Math.max(
                2,
                Math.floor(
                    partScrollerSpan /
                    10
                )
            );


        const amount =
            localX < thumbX
                ? -pageAmount
                : pageAmount;


        partScrollTrack.setPointerCapture(
            event.pointerId
        );


        startPartScrollerHold(
            amount
        );


        event.preventDefault();
    }
);


partScrollTrack.addEventListener(
    "pointerup",
    function (event) {

        stopPartScrollerHold();


        if (
            partScrollTrack.hasPointerCapture(
                event.pointerId
            )
        ) {

            partScrollTrack.releasePointerCapture(
                event.pointerId
            );
        }
    }
);


partScrollTrack.addEventListener(
    "pointercancel",
    stopPartScrollerHold
);


// Recalculate the thumb geometry if the browser changes size.

window.addEventListener(
    "resize",
    updatePartScroller
);


/*
    Prevent a held arrow/track from continuing if the
    pointer is released outside the browser window.
*/

window.addEventListener(
    "blur",
    stopPartScrollerHold
);


// ====================================================
// SHOW BODY PARTS
// ====================================================

function showBodyParts() {

    partResults.innerHTML =
        "";

    partResults.scrollLeft = 0;


    for (
        const body
        of bodyCatalog
    ) {

        const item =
            document.createElement(
                "div"
            );


        item.className =
            "part-result";


        item._whyPetPart =
            body;
        const image =
            document.createElement(
                "img"
            );


        image.src =
            body.file;


        image.alt =
            body.name;


        item.appendChild(
            image
        );


        item.addEventListener(
            "click",
            () => {

                console.log(
                    "Selected body:",
                    body.name,
                    body.id
                );


                loadBody(
                    body
                );
            }
        );


        partResults.appendChild(
            item
        );
    }



    requestAnimationFrame(
        resetPartScroller
    );
}


// ====================================================
// SHOW EYE PARTS
// ====================================================

function showEyeParts() {

    partResults.innerHTML =
        "";

    partResults.scrollLeft = 0;


    for (
        const eye
        of eyeCatalog
    ) {

        const item =
            document.createElement(
                "div"
            );


        item.className =
            "part-result";


        item._whyPetPart =
            eye;
        const image =
            document.createElement(
                "img"
            );


        image.src =
            eye.file;


        image.alt =
            eye.name;


        item.appendChild(
            image
        );


        item.addEventListener(
            "click",
            () => {

                console.log(
                    "Selected eyes:",
                    eye.name,
                    eye.id
                );


                equipPart(
                    eye
                );
            }
        );


        partResults.appendChild(
            item
        );
    }



    requestAnimationFrame(
        resetPartScroller
    );
}
// ====================================================
// SHOW SEARCH RESULTS
// ====================================================

function showSearchResults(results) {

    partResults.innerHTML = "";

    partResults.scrollLeft = 0;


    for (const result of results) {

        const part =
            result.part;


        const item =
            document.createElement("div");


        item.className =
            "part-result";


        item._whyPetPart =
            part;
        const image =
            document.createElement("img");


        image.src =
            part.file;


        image.alt =
            part.name;


        item.appendChild(
            image
        );


        item.addEventListener(
            "click",
            () => {

                /*
                    Bodies replace the existing body.

                    All other parts are equipped
                    through the normal accessory
                    system.
                */

                if (
                    result.kind === "body"
                ) {

                    console.log(
                        "Search selected body:",
                        part.name,
                        part.id
                    );


                    loadBody(
                        part
                    );

                } else {

                    console.log(
                        "Search selected part:",
                        part.name,
                        part.id
                    );


                    equipPart(
                        part
                    );
                }
            }
        );


        partResults.appendChild(
            item
        );
    }



    requestAnimationFrame(
        resetPartScroller
    );
}
function entryMatchesCategory(
    entry,
    categoryId
) {

    const kindByCategoryId = {

        8101: "body",
        8102: "eyes",
        8103: "mouth",
        8104: "ears",
        8105: "arms",
        8106: "horns",
        8107: "wings",
        8108: "misc"

    };


    return (
        entry.kind ===
        kindByCategoryId[
        categoryId
        ]
    );
}
// ====================================================
// ORIGINAL PART-NAME MOUSE TIP
// ====================================================

function hidePartMouseTip() {

    if (!mouseTip) {

        return;
    }


    mouseTip.classList.remove(
        "active"
    );


    mouseTip.setAttribute(
        "aria-hidden",
        "true"
    );
}


function showPartMouseTip(
    part,
    clientX,
    clientY
) {

    if (
        !mouseTip ||
        !part
    ) {

        hidePartMouseTip();

        return;
    }


    /*
        MouseTipText.setLabel() padded the name with
        a little whitespace.
    */

    mouseTip.textContent =
        ` ${part.name}  `;


    mouseTip.classList.add(
        "active"
    );


    mouseTip.setAttribute(
        "aria-hidden",
        "false"
    );


    const creatorRect =
        document
            .getElementById(
                "creator"
            )
            .getBoundingClientRect();


    const localMouseX =
        clientX -
        creatorRect.left;


    const localMouseY =
        clientY -
        creatorRect.top;


    const tipWidth =
        mouseTip.offsetWidth;


    const tipHeight =
        mouseTip.offsetHeight;


    /*
        The old MouseTipText sat immediately
        above/left of the pointer.
    */

    mouseTip.style.left =
        `${
            Math.max(
                0,
                localMouseX -
                tipWidth
            )
        }px`;


    mouseTip.style.top =
        `${
            Math.max(
                0,
                localMouseY -
                tipHeight
            )
        }px`;
}


/*
    Event delegation is used here so the tooltip keeps
    working after categories/search results are rebuilt.

    Each .part-result has its source PetPart stored in
    item._whyPetPart by the rendering functions.
*/

partResults.addEventListener(
    "mousemove",
    function (event) {

        const item =
            event.target.closest(
                ".part-result"
            );


        if (
            !item ||
            !partResults.contains(
                item
            ) ||
            !item._whyPetPart
        ) {

            hidePartMouseTip();

            return;
        }


        showPartMouseTip(
            item._whyPetPart,
            event.clientX,
            event.clientY
        );
    }
);


partResults.addEventListener(
    "mouseleave",
    hidePartMouseTip
);


// ====================================================
// ORIGINAL-STYLE SEARCH PARTS
// ====================================================

function searchParts(query) {

    const normalizedQuery =
        query
            .trim()
            .toLowerCase();


    /*
        SearchParts.set_filter(String):

        an empty phrase clears the type filter and
        shows ALL parts.
    */

    if (
        normalizedQuery === ""
    ) {

        currentSearchTypeId =
            -1;


        setSearchLabel(
            "ALL"
        );


        showSearchResults(
            searchableParts
        );


        return;
    }


    const matches =
        searchableParts.filter(
            entry => {

                if (
                    currentSearchTypeId >= 0 &&
                    !entryMatchesCategory(
                        entry,
                        currentSearchTypeId
                    )
                ) {

                    return false;
                }


                const partName =
                    entry.part.name
                        .toLowerCase()
                        .trim();


                const typeName =
                    entry.kind
                        .toLowerCase()
                        .trim();


                return (
                    partName.includes(
                        normalizedQuery
                    ) ||
                    typeName.includes(
                        normalizedQuery
                    )
                );
            }
        );


    setSearchLabel(
        query
    );


    showSearchResults(
        matches
    );


    console.log(
        "Search:",
        query,
        "results:",
        matches.length
    );
}

// ====================================================
// CURRENT PART FILTER
// ====================================================

let currentCategoryId = 8101;


/*
    This mirrors the Java SearchParts._search_type_id.

    -1 means ALL categories.
*/

let currentSearchTypeId = 8101;


function getCategoryById(id) {

    return categories.find(
        category =>
            category.id === id
    ) || null;
}


function setSearchLabel(text) {

    if (
        !text ||
        text.trim() === ""
    ) {

        text = "ALL";
    }


    searchLabel.textContent =
        text.toUpperCase();
}


function showCurrentCategory() {

    switch (
    currentCategoryId
    ) {

        case 8101:
            showBodyParts();
            break;

        case 8102:
            showEyeParts();
            break;

        case 8103:
            showMouthParts();
            break;

        case 8104:
            showEarParts();
            break;

        case 8105:
            showArmParts();
            break;

        case 8106:
            showHornParts();
            break;

        case 8107:
            showWingParts();
            break;

        case 8108:
            showMiscParts();
            break;
    }
}


function selectCategory(
    categoryId
) {

    currentCategoryId =
        categoryId;


    currentSearchTypeId =
        categoryId;


    searchPartsInput.value =
        "";


    const category =
        getCategoryById(
            categoryId
        );


    setSearchLabel(
        category
            ? category.name
            : "ALL"
    );


    showCurrentCategory();
}
// ====================================================
// SHOW MOUTH PARTS
// ====================================================

function showMouthParts() {

    partResults.innerHTML =
        "";

    partResults.scrollLeft = 0;


    for (
        const mouth
        of mouthCatalog
    ) {

        const item =
            document.createElement(
                "div"
            );


        item.className =
            "part-result";


        item._whyPetPart =
            mouth;
        const image =
            document.createElement(
                "img"
            );


        image.src =
            mouth.file;


        image.alt =
            mouth.name;


        item.appendChild(
            image
        );


        item.addEventListener(
            "click",
            () => {

                console.log(
                    "Selected mouth:",
                    mouth.name,
                    mouth.id
                );


                equipPart(
                    mouth
                );
            }
        );


        partResults.appendChild(
            item
        );
    }



    requestAnimationFrame(
        resetPartScroller
    );
}
// ====================================================
// SHOW EAR PARTS
// ====================================================

function showEarParts() {

    partResults.innerHTML =
        "";

    partResults.scrollLeft = 0;


    for (
        const ear
        of earCatalog
    ) {

        const item =
            document.createElement(
                "div"
            );


        item.className =
            "part-result";


        item._whyPetPart =
            ear;
        const image =
            document.createElement(
                "img"
            );


        image.src =
            ear.file;


        image.alt =
            ear.name;


        item.appendChild(
            image
        );


        item.addEventListener(
            "click",
            () => {

                console.log(
                    "Selected ear:",
                    ear.name,
                    ear.id
                );


                equipPart(
                    ear
                );
            }
        );


        partResults.appendChild(
            item
        );
    }



    requestAnimationFrame(
        resetPartScroller
    );
}
// ====================================================
// SHOW ARM PARTS
// ====================================================

function showArmParts() {

    partResults.innerHTML = "";

    partResults.scrollLeft = 0;


    for (const arm of armCatalog) {

        const item =
            document.createElement("div");

        item.className =
            "part-result";


        item._whyPetPart =
            arm;
        const image =
            document.createElement("img");

        image.src =
            arm.file;

        image.alt =
            arm.name;


        item.appendChild(image);


        item.addEventListener(
            "click",
            () => {

                console.log(
                    "Selected arm:",
                    arm.name,
                    arm.id
                );

                equipPart(arm);
            }
        );


        partResults.appendChild(item);
    }



    requestAnimationFrame(
        resetPartScroller
    );
}
// ====================================================
// SHOW HORN PARTS
// ====================================================

function showHornParts() {

    partResults.innerHTML = "";

    partResults.scrollLeft = 0;


    for (const horn of hornCatalog) {

        const item =
            document.createElement("div");

        item.className =
            "part-result";


        item._whyPetPart =
            horn;
        const image =
            document.createElement("img");

        image.src =
            horn.file;

        image.alt =
            horn.name;


        item.appendChild(
            image
        );


        item.addEventListener(
            "click",
            () => {

                console.log(
                    "Selected horn:",
                    horn.name,
                    horn.id
                );


                equipPart(
                    horn
                );
            }
        );


        partResults.appendChild(
            item
        );
    }



    requestAnimationFrame(
        resetPartScroller
    );
}
// ====================================================
// SHOW WING PARTS
// ====================================================

function showWingParts() {

    partResults.innerHTML = "";

    partResults.scrollLeft = 0;


    for (const wing of wingCatalog) {

        const item =
            document.createElement("div");

        item.className =
            "part-result";


        item._whyPetPart =
            wing;
        const image =
            document.createElement("img");

        image.src =
            wing.file;

        image.alt =
            wing.name;


        item.appendChild(
            image
        );


        item.addEventListener(
            "click",
            () => {

                console.log(
                    "Selected wing:",
                    wing.name,
                    wing.id
                );


                equipPart(
                    wing
                );
            }
        );


        partResults.appendChild(
            item
        );
    }



    requestAnimationFrame(
        resetPartScroller
    );
}
// ====================================================
// SHOW MISC PARTS
// ====================================================

function showMiscParts() {

    partResults.innerHTML = "";

    partResults.scrollLeft = 0;


    for (const misc of miscCatalog) {

        const item =
            document.createElement("div");

        item.className =
            "part-result";


        item._whyPetPart =
            misc;
        const image =
            document.createElement("img");

        image.src =
            misc.file;

        image.alt =
            misc.name;


        item.appendChild(
            image
        );


        item.addEventListener(
            "click",
            () => {

                console.log(
                    "Selected misc:",
                    misc.name,
                    misc.id
                );


                equipPart(
                    misc
                );
            }
        );


        partResults.appendChild(
            item
        );
    }



    requestAnimationFrame(
        resetPartScroller
    );
}
// ====================================================
// CREATE CATEGORY BUTTONS
// ====================================================

for (
    const category
    of categories
) {

    const button =
        document.createElement(
            "button"
        );


    button.className =
        "category-button";


    button.type =
        "button";


    button.textContent =
        category.name.toUpperCase();


    button.dataset.categoryId =
        category.id;


    button.setAttribute(
        "aria-pressed",
        "false"
    );


    button.addEventListener(
        "click",
        () => {

            console.log(
                "Selected category:",
                category.name,
                category.id
            );


            selectCategory(
                category.id
            );
        }
    );


    categoryMenu.appendChild(
        button
    );
}

// ====================================================
// STARTING BODY
// ====================================================

/*
    Startup is handled at the bottom of this file.

    That allows a local URL such as:

        index.html?desc=...

    to rebuild an existing WhyPet instead of always
    beginning with Ball Body.
*/
// ====================================================
// LOAD / REBUILD A WHYVILLE PET DESCRIPTION
// ====================================================

function attachmentIndexToLetter(index) {

    /*
        Whyville stores the BODY attachment-point
        number directly:

            A = 0
            B = 1
            C = 2
            ...
            S = 18
    */

    if (
        !Number.isInteger(index) ||
        index < 0 ||
        index > 25
    ) {

        return null;
    }


    return String.fromCharCode(
        65 + index
    );
}


// ----------------------------------------------------
// JAVA SIGNED ARGB -> RGB
// ----------------------------------------------------

function javaArgbToRgb(color) {

    /*
        Java's int is signed, but JavaScript's
        unsigned right shift lets us inspect the
        same 32 bits safely.
    */

    const unsigned =
        color >>> 0;


    return {

        a:
            (unsigned >>> 24) &
            0xFF,

        r:
            (unsigned >>> 16) &
            0xFF,

        g:
            (unsigned >>> 8) &
            0xFF,

        b:
            unsigned &
            0xFF

    };
}


// ----------------------------------------------------
// CLEAR CURRENT PET WITHOUT FORCING A NEW BODY
// ----------------------------------------------------

function resetPetForDescriptionLoad() {

    for (
        const instance
        of equippedParts
    ) {

        instance.element.remove();
    }


    equippedParts.length = 0;


    selectedPart = null;
    bodySelected = false;


    bodyLayerZ = 0;
    nextPartZ = 1;


    currentBodyColor = null;


    clearSelectionVisual();
    clearAttachmentPointMarkers();
    clearPetOutline();
}


// ----------------------------------------------------
// PARSE AND REBUILD desc=
// ----------------------------------------------------

function loadWhyPetDescription(desc) {

    if (
        typeof desc !== "string" ||
        desc.trim() === ""
    ) {

        console.error(
            "Cannot load WhyPet description: empty desc."
        );

        return false;
    }


    const pieces =
        desc
            .trim()
            .split(",")
            .map(
                value =>
                    Number(
                        value.trim()
                    )
            );


    /*
        Every saved part uses exactly four values:

            catalogId,
            attachmentPointIndex,
            z,
            color
    */

    if (
        pieces.length === 0 ||
        pieces.length % 4 !== 0 ||
        pieces.some(
            value =>
                !Number.isFinite(value)
        )
    ) {

        console.error(
            "Invalid WhyPet description:",
            desc
        );

        return false;
    }


    const records = [];


    for (
        let i = 0;
        i < pieces.length;
        i += 4
    ) {

        records.push({

            catalogId:
                pieces[i],

            attachmentIndex:
                pieces[i + 1],

            z:
                pieces[i + 2],

            color:
                pieces[i + 3]

        });
    }


    /*
        Find the body by catalog ID rather than
        assuming it must appear first.
    */

    const bodyRecord =
        records.find(
            record => {

                const entry =
                    searchablePartById.get(
                        record.catalogId
                    );


                return (
                    entry &&
                    entry.kind === "body"
                );
            }
        );


    if (!bodyRecord) {

        console.error(
            "WhyPet description does not contain a recognized body."
        );

        return false;
    }


    const bodyEntry =
        searchablePartById.get(
            bodyRecord.catalogId
        );


    resetPetForDescriptionLoad();


    /*
        Restore the saved body color.

        A color of 0 means there is no saved
        recolor value to apply.
    */

    if (bodyRecord.color !== 0) {

        const rgb =
            javaArgbToRgb(
                bodyRecord.color
            );


        currentBodyColor = {

            r: rgb.r,
            g: rgb.g,
            b: rgb.b

        };

    } else {

        currentBodyColor = null;
    }


    bodyLayerZ =
        bodyRecord.z;


    /*
        currentBody is assigned synchronously by
        loadBody(), while drawing happens once the
        PNG finishes loading.
    */

    loadBody(
        bodyEntry.part,
        true
    );


    let highestZ =
        bodyLayerZ;


    for (const record of records) {

        if (
            record === bodyRecord
        ) {

            continue;
        }


        const entry =
            searchablePartById.get(
                record.catalogId
            );


        if (!entry) {

            console.warn(
                "Skipping unknown WhyPet catalog ID:",
                record.catalogId
            );

            continue;
        }


        if (
            entry.kind === "body"
        ) {

            console.warn(
                "Skipping extra body in WhyPet description:",
                record.catalogId
            );

            continue;
        }


        const attachedPoint =
            attachmentIndexToLetter(
                record.attachmentIndex
            );


        if (
            !attachedPoint ||
            !entry.part.attachTo.includes(
                attachedPoint
            )
        ) {

            console.warn(
                "Skipping part with invalid attachment point:",
                entry.part.name,
                record.attachmentIndex
            );

            continue;
        }


        /*
            Reuse the normal equip path so the
            reconstructed piece receives all of
            its usual dragging/selection behavior.
        */

        equipPart(
            entry.part
        );


        const instance =
            equippedParts[
            equippedParts.length - 1
            ];


        instance.attachedPoint =
            attachedPoint;


        instance.z =
            record.z;


        positionEquippedPart(
            instance
        );


        highestZ =
            Math.max(
                highestZ,
                record.z
            );
    }


    nextPartZ =
        highestZ + 1;


    /*
        Do NOT normalize here.

        We want to reproduce the z values exactly
        as they appeared in the supplied desc.
    */

    applyLayerStyles();


    selectedPart = null;
    bodySelected = false;

    clearSelectionVisual();


    console.log(
        "Loaded WhyPet description:",
        desc
    );


    console.log(
        "Rebuilt pieces:",
        1 + equippedParts.length
    );

    /*
        After rebuilding a pet, show BODY as the
        starting category just like a freshly opened
        creator.
    */

    selectCategory(
        8101
    );
    return true;
}


// Make the helpers easy to use directly from DevTools.

window.loadWhyPetDescription =
    loadWhyPetDescription;


// ====================================================
// WHYVILLE PET DESCRIPTION / BUY ME
// ====================================================

/*
    BUY ME deliberately hands the generated pet to
    Whyville's surviving official purchase page.

    Authentication, naming, price, and the final
    account purchase remain on Whyville's server.
*/

const WHYVILLE_BUY_URL =
    "https://b.whyville.net/smmk/pets/buyPet?desc=";



function attachmentLetterToIndex(letter) {

    /*
        Original Java attachment indexes:

        A = 0
        B = 1
        C = 2
        ...
        S = 18

        The body itself uses -1.
    */

    if (
        !letter ||
        typeof letter !== "string"
    ) {

        return -1;
    }


    return (
        letter
            .toUpperCase()
            .charCodeAt(0) -
        65
    );
}


// ----------------------------------------------------
// CONVERT RGB TO JAVA'S SIGNED ARGB INTEGER
// ----------------------------------------------------

function rgbToJavaArgb(
    red,
    green,
    blue
) {

    /*
        Java stored colors as 32-bit ARGB integers:

            0xFFRRGGBB

        Java int is signed, so many colors appear
        as negative numbers in the saved desc.
    */

    return (
        (
            0xFF000000 |
            (red << 16) |
            (green << 8) |
            blue
        )
        | 0
    );
}


// ----------------------------------------------------
// FIND ORIGINAL BODY COLOR
// ----------------------------------------------------

function getOriginalBodyJavaColor() {

    const imageData =
        originalCtx.getImageData(
            0,
            0,
            originalCanvas.width,
            originalCanvas.height
        );


    const pixels =
        imageData.data;


    /*
        Approximate the original Java applet's
        default-color discovery:

        find the first visible pixel and turn it
        into an opaque ARGB Java integer.
    */

    for (
        let i = 0;
        i < pixels.length;
        i += 4
    ) {

        const alpha =
            pixels[i + 3];


        if (alpha === 0) {
            continue;
        }


        return rgbToJavaArgb(
            pixels[i],
            pixels[i + 1],
            pixels[i + 2]
        );
    }


    return 0;
}


// ----------------------------------------------------
// BODY COLOR TO SAVE
// ----------------------------------------------------

function getBodySavedColor() {

    /*
        If the user recolored the body,
        save the selected palette color.
    */

    if (currentBodyColor) {

        return rgbToJavaArgb(
            currentBodyColor.r,
            currentBodyColor.g,
            currentBodyColor.b
        );
    }


    /*
        Otherwise save the body's original color.
    */

    return getOriginalBodyJavaColor();
}


// ----------------------------------------------------
// BUILD ORIGINAL WHYVILLE desc= STRING
// ----------------------------------------------------

function buildWhyPetDescription() {

    /*
        The Java applet normalizes all z-levels
        immediately before saving.
    */

    normalizeLayerOrder();


    const items =
        getLayerItems();


    const values = [];


    for (const item of items) {

        // ----------------------------------------
        // BODY
        // ----------------------------------------

        if (
            item.type === "body"
        ) {

            values.push(
                currentBody.id
            );


            /*
                Bodies are not attached to another
                body point.
            */

            values.push(
                -1
            );


            values.push(
                bodyLayerZ
            );


            values.push(
                getBodySavedColor()
            );


            continue;
        }


        // ----------------------------------------
        // NORMAL PET PART
        // ----------------------------------------

        const instance =
            item.instance;


        values.push(
            instance.part.id
        );


        values.push(
            attachmentLetterToIndex(
                instance.attachedPoint
            )
        );


        values.push(
            instance.z
        );


        /*
            WhyPet only recolors the BODY with the
            color picker.

            Normal accessories remain color 0 in
            our recreation.
        */

        values.push(
            0
        );
    }


    return values.join(",");
}



// Make the generator available from DevTools too.

window.buildWhyPetDescription =
    buildWhyPetDescription;

// ----------------------------------------------------
// OPEN WHYVILLE BUY PAGE
// ----------------------------------------------------

function getWhyPetBuyUrl() {

    if (!currentBody) {

        return null;
    }


    return (
        WHYVILLE_BUY_URL +
        buildWhyPetDescription()
    );
}


window.getWhyPetBuyUrl =
    getWhyPetBuyUrl;


function buyCurrentPet() {

    if (!currentBody) {

        console.log(
            "Cannot build pet: no body."
        );

        return;
    }


    const desc =
        buildWhyPetDescription();


    const buyUrl =
        WHYVILLE_BUY_URL +
        desc;


    console.log(
        "WhyPet description:",
        desc
    );


    console.log(
        "Whyville BUY ME URL:",
        buyUrl
    );


    /*
     The generated description has now been
     confirmed to work with Whyville's surviving
     Buy Pets page.
 */

    window.location.href =
        buyUrl;
}
// Initialize the custom part scroller once the page is ready.

requestAnimationFrame(
    resetPartScroller
);


// ====================================================
// SEARCH INPUT EVENTS
// ====================================================

searchPartsInput.addEventListener(
    "input",
    function () {

        searchParts(
            searchPartsInput.value
        );
    }
);
// ====================================================
// TOOL BUTTON EVENTS
// ====================================================

document
    .getElementById(
        "move-forward-button"
    )
    .addEventListener(
        "click",
        moveSelectedForward
    );


document
    .getElementById(
        "move-backward-button"
    )
    .addEventListener(
        "click",
        moveSelectedBackward
    );


document
    .getElementById(
        "clear-pet-button"
    )
    .addEventListener(
        "click",
        clearPet
    );


document

    .getElementById(
        "buy-pet-button"
    )

    .addEventListener(
        "click",
        buyCurrentPet
    );

// ====================================================
// STARTUP
// ====================================================

function startWhyPetCreator() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const desc =
        params.get(
            "desc"
        );


    /*
        If a desc was supplied in the URL,
        reconstruct that pet.

        loadWhyPetDescription() also selects
        the BODY category for us.
    */

    if (
        desc &&
        loadWhyPetDescription(
            desc
        )
    ) {

        return;
    }


    /*
        Otherwise start with the original
        default Ball Body.
    */

    loadBody(
        bodyCatalog[0]
    );


    selectCategory(
        8101,
        false
    );
}


startWhyPetCreator();