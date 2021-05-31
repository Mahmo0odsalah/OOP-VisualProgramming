/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

Blockly.defineBlocksWithJsonArray([{
  "type": "class",
  "message0": "Class Name %1 Properties %2 Children %3",
  "args0": [
    {
      "type": "input_value",
      "name": "NAME",
      "check": "String"
    },
    {
      "type": "input_statement",
      "name": "PROPERTIES"
    },
    {
      "type": "input_statement",
      "name": "CHILDREN"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "property",
  "message0": "Name %1 Value %2",
  "args0": [
    {
      "type": "input_value",
      "name": "NAME",
      "check": "String"
    },
    {
      "type": "input_value",
      "name": "VALUE"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 60,
  "tooltip": "Hello",
  "helpUrl": "Hi"
}]);

Blockly.JavaScript['play_sound'] = function(block) {
  let value = '\'' + block.getFieldValue('VALUE') + '\'';
  return 'MusicMaker.queueSound(' + value + ');\n';
};
