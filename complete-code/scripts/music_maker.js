/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
 const MusicMaker = {
  queue_: [],
  player_: new Audio(),
  queueSound: function(soundUrl) {
    this.queue_.push(soundUrl);
  },
  play: function() {
    let next = this.queue_.shift();
    if (next) {
      this.player_.src = next;
      this.player_.play();
    }
  },
};

// class Class {
//   constructor(properties) {
//   for(var key in properties)
//     this[key] = properties[key]
//   }
// }


Blockly.JavaScript['class'] = function(block) {
  var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_properties = Blockly.JavaScript.statementToCode(block, 'PROPERTIES');
  var statements_children = Blockly.JavaScript.statementToCode(block, 'CHILDREN');

  // TODO: Assemble JavaScript into code variable.
  var code = {};
  var properties = statements_properties.split(";");
  
  code.name = value_name
  properties.forEach((element,index,array) => {
    var elements = element.split(",");
    if(elements.length >=2){
      code[elements[0].trim("").replaceAll('\'','')] = elements[1]
    }
  });
  code.children = []
  statements_children.split("$").forEach(child =>{
    if(child !== ""){
      var child_json = {}
      for (var key in code){
        child_json[key] = code[key]
      }
      child = JSON.parse(child)
      for (var key in child){
        child_json[key] = child[key]
      }
      code.children= code.children.concat([child_json])
    }
  })
  //  code.children = JSON.stringify(code.children)
  return JSON.stringify(code) +"$";
};

Blockly.JavaScript['property'] = function(block) {
  var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  var value_value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC);
  var code = value_name +"," +value_value+";";
  return code;
};

MusicMaker.player_.addEventListener(
    'ended', MusicMaker.play.bind(MusicMaker));


