/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
 (function() {

  let currentButton;

  function handlePlay(event) {
    loadWorkspace(event.target);
    let code = Blockly.JavaScript.workspaceToCode(Blockly.getMainWorkspace());
    code += 'MusicMaker.play();';
    // Eval can be dangerous. For more controlled execution, check
    // https://github.com/NeilFraser/JS-Interpreter.
    try {
      eval(code);
    } catch (error) {
      console.log(error);
    }
  }

  function loadWorkspace(button) {
    let workspace = Blockly.getMainWorkspace();
    workspace.clear();
    if (button.blocklyXml) {
      Blockly.Xml.domToWorkspace(button.blocklyXml, workspace);
    }
  }

  function save(button) {
    button.blocklyXml = Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace());
  }

  function handleSave() {
    document.body.setAttribute('mode', 'edit');
    save(currentButton);
  }

  function enableEditMode() {
    document.body.setAttribute('mode', 'edit');
    btn = document.getElementById('build_blocks')
    btn.removeEventListener('click', handlePlay);
    btn.addEventListener('click', enableBlocklyMode);

    btn2 = document.getElementById('preview_classes')
    btn2.removeEventListener('click', handlePlay);
    btn2.addEventListener('click', enablePreviewMode);
  }

  function enableMakerMode() {
    document.body.setAttribute('mode', 'maker');
    document.querySelectorAll('.button').forEach(btn => {
      btn.addEventListener('click', handlePlay);
      btn.removeEventListener('click', enableBlocklyMode);
    });
  }

  function enableBlocklyMode(e) {
    document.body.setAttribute('mode', 'blockly');
    currentButton = e.target;
    loadWorkspace(currentButton);
  }

  function enablePreviewMode(e) {
    // document.body.setAttribute('mode', 'blockly');
    loadWorkspace(document.getElementById('build_blocks'));
    let code = Blockly.JavaScript.workspaceToCode(Blockly.getMainWorkspace());
    try {
      // eval(code);
      var classHierarchy = code.substring(0,code.length-1).split("$")
      classHierarchy = classHierarchy.map(ele => JSON.parse(ele))
      Draw(classHierarchy)

    } catch (error) {
      console.log(error);
    }
  }

  document.querySelector('#edit').addEventListener('click', enableEditMode);
  document.querySelector('#done').addEventListener('click', enableMakerMode);
  document.querySelector('#save').addEventListener('click', handleSave);

  enableEditMode();
  function Draw(classHierarchy){
    var preview = document.getElementById("overlaycontainer")
    var classElement = document.createElement("div")
    for(var key in classHierarchy[0]){
      if(key != "children"){
        var elem = document.createElement("h1")
        elem.className = "level-1 rectangle"
        if(key === "name"){
          elem.textContent =classHierarchy[0][key].replaceAll('\'','')
        }
        else{
          elem.textContent = key +": "+ classHierarchy[0][key].replaceAll('\'','')
        }
        classElement.appendChild(elem)
      }
    }

    var childrenWrapper = document.createElement("ol")
    childrenWrapper.className = "level-2-wrapper"
    classHierarchy[0].children.forEach(child =>{
      var childElement = document.createElement("li")
      classElement.appendChild(childrenWrapper)
      childrenWrapper.appendChild(childElement)
      
      for(var key in child){
        if(key != "children"){
          var childElementSub = document.createElement("h2")
          childElement.appendChild(childElementSub)
          childElementSub.className = "level-2 rectangle"
          if(key === "name"){
            childElementSub.textContent =child[key].replaceAll('\'','')
          }
          else{
            childElementSub.textContent = key +": "+ child[key].replaceAll('\'','')
          }
        }
      }
      var grandchildrenWrapper = document.createElement("ol")
      grandchildrenWrapper.className = "level-3-wrapper"
      child.children.forEach(grandchild => {
        var grandchildElement = document.createElement("li")
        childElement.appendChild(grandchildrenWrapper)
        grandchildrenWrapper.appendChild(grandchildElement)
        
        for(var key in grandchild){
          if(key != "children"){
            var grandchildElementSub = document.createElement("h3")
            grandchildElement.appendChild(grandchildElementSub)
            grandchildElementSub.className = "level-3 rectangle"
            if(key === "name"){
              grandchildElementSub.textContent =grandchild[key].replaceAll('\'','')
            }
            else{
              grandchildElementSub.textContent = key +": "+ grandchild[key].replaceAll('\'','')
            }
          }
      }});
    })
    preview.appendChild(classElement)
  }
  Blockly.inject('blocklyDiv', {
    toolbox: document.getElementById('toolbox'),
    scrollbars: true,
  });
})();
